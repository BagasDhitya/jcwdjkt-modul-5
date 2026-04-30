export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-100 p-6 animate-pulse">
            <h1 className="text-3xl font-bold mb-6 text-center">Loading Posts ...</h1>
            <div className="grid md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow">
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
                        <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}