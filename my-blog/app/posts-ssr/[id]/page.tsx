import { Metadata } from "next"
import { Post } from "@/types/post"
import axios from "axios"

// ambil data per post
async function getPostById(id: string) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return response.data
}

// bikin dynamic metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { id } = await params
    const post: Post = await getPostById(id)
    return {
        title: post.title,
        description: post.body.slice(0, 100),
        openGraph: {
            title: post.title,
            description: post.body.slice(0, 100),
            url: `https://blog-seo-ten.vercel.app/posts-ssr/${id}`,
            type: "article"
        }
    }
}

export default async function PostDetail({ params }: { params: { id: string } }) {
    const { id } = await params
    const post: Post = await getPostById(id)

    return (
        <div className="min-h-screen bg-gray-100 p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-700 leading-relaxed">{post.body}</p>
        </div>
    )
}
