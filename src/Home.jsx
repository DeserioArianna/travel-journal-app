function Home() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-3x1 font-bold">🌏 Travel Journal</h1>
            <p className="mt-2 text-gray-600">
                Benvenuto nel mio diario di viaggio!
            </p>
            <a href="/posts" className="btn btn-primary">Vedi i Posts</a>
        </div>
    )
}

export default Home;