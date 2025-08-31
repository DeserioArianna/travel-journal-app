import { useEffect, useState } from "react";
import { supabase } from "./supabase"; // Assicurati che il percorso sia corretto
import { Link } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [moodFilter, setMoodFilter] = useState("");
  const [sortByCost, setSortByCost] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      // Legge tutti i post dalla tabella "posts" nello schema public
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Errore nel fetch:", error);
      } else {
        console.log("Dati ricevuti:", data); // per debug
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  // Filtra i post
  const filteredPosts = posts
    .filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase())
    )
    .filter(post => (moodFilter ? post.mood === moodFilter : true))
    .sort((a, b) => (sortByCost ? a.costs - b.costs : 0));


  return (
    <>
      <div className="container py-4">
        <h1 className="mb-4 fw-bold">📖 Le mie tappe</h1>

        {/* Filtri e ordinamento */}
        <div className="mb-4 d-flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Cerca..."
            className="form-control"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="form-select"
            value={moodFilter}
            onChange={e => setMoodFilter(e.target.value)}
          >
            <option value="">Tutti stati d’animo</option>
            <option value="Felice">Felice</option>
            <option value="Rilassato">Rilassato</option>
            <option value="Elettrizzato">Elettrizzato</option>
            <option value="Curiosa">Curiosa</option>
            <option value="Ammirato">Ammirato</option>
          </select>
          <button
            className="btn btn-outline-primary"
            onClick={() => setSortByCost(!sortByCost)}
          >
            Ordina per costo
          </button>
        </div>

        <div className="row g-4">
          {filteredPosts.length === 0 && <p>Nessun post disponibile.</p>}
          {filteredPosts.map((post) => (
            <div key={post.id} className="col-12 col-sm-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                {post.img && (
                  <img
                    src={post.img}
                    alt={post.title}
                    className="card-img-top"
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text text-muted">{post.description}</p>
                  <p><strong>Stato d’animo:</strong> {post.mood}</p>
                  <p><strong>Costo:</strong> €{post.costs}</p>
                  <Link to={`/posts/${post.id}`} className="btn btn-primary">Dettagli</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>

  );
}

export default Posts;