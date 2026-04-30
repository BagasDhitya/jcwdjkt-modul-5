import Link from "next/link"

export default function NotFound() {
    return (
        <div className="w-screen min-h-screen bg-blue-100 text-black flex flex-col justify-center items-center space-y-5xw">
            <h1 className="text-2xl">Halaman yang kamu cari tidak ditemukan</h1>
            <Link className="shadow rounded-md p-5 bg-blue-300" href={'/'}>Back to Landing</Link>
        </div>
    )
}
