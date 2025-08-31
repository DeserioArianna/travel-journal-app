import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";


function Post() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .eq("id", id)
                .single(); // prende solo un singolo record

            if (error) {
                console.error("Errore:", error);
            } else {
                setPost(data);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) return <p>Caricamento...</p>;

    return (
        <>
            <div className="container py-4">
                <h1 className="mb-4 fw-bold">{post.title}</h1>
                {post.img && (
                    <img src={post.img} alt={post.title} className="img-fluid mb-4" />
                )}
                <p>{post.description}</p>
                <p><strong>Stato d’animo:</strong> {post.mood}</p>
                <p><strong>Costo:</strong> {post.costs}€</p>
                <p><strong>Riflessione positiva:</strong> {post.positive_reflection || "N/A"}</p>
                <p><strong>Riflessione negativa:</strong> {post.negative_reflection || "N/A"}</p>
                <p><strong>Impegno fisico:</strong> {post.physical_effort || "N/A"}/5</p>
                <p><strong>Effort economico:</strong> {post.economic_effort || "N/A"}/5</p>
                <p><strong>Tags:</strong> {post.tags || "Nessuno"}</p>
                <a href="/posts" className="btn btn-success">Indietro</a>
            </div>
        </>

    );
}


export default Post;