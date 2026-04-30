"use client"
import { useState, useEffect } from "react"
import { Post } from "@/types/post"
import axios from "axios"

export default function PostsCSR() {
    const [posts, setPost] = useState<Post[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    async function getPosts() {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
            setPost(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Post CSR</h1>
            {loading ? (<p className="text-center">Loading ...</p>) : (
                <div className="grid md:grid-cols-3 gap-4">
                    {posts?.map((post: Post) => (
                        <div key={post.id} className="bg-white p-4 rounded-xl shadow">
                            <h2 className="font-semibold text-lg mb-2">{post.title}</h2>
                            <p className="text-gray-600 text-sm">{post.body}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
