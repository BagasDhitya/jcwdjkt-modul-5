import { Metadata } from "next"
import Link from "next/link"
import axios from "axios"
import { Post } from "@/types/post"

export const metadata: Metadata = {
    title: "Post SSR",
    description: "Halaman post dengan Server Side Rendering (SSR)",
    keywords: ["Next.js", "SSR", "CSR", "Blog", "React"],
    authors: [{ name: "John Doe" }],
    openGraph: {
        title: "Post SSR",
        description: "Halaman post dengan Server Side Rendering (SSR)",
        siteName: "Post SSR",
        url: "https://blog-seo-ten.vercel.app/posts-ssr",
        images: "https://blog-seo-ten.vercel.app/nextjs.jpg",
        type: "website"
    }
}

async function getPosts() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=6")
    return response.data
}

export default async function PostsSSR() {
    const posts = await getPosts()

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Post SSR</h1>
            <div className="grid md:grid-cols-3 gap-4">
                {posts?.map((post: Post) => (
                    <Link key={post.id} href={`/posts-ssr/${post.id}`}>
                        <div className="bg-white p-4 rounded-xl shadow">
                            <h2 className="font-semibold text-lg mb-2">{post.title}</h2>
                            <p className="text-gray-600 text-sm">{post.body}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
