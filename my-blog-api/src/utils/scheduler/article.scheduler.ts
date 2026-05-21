import cron from "node-cron"
import prisma from "../../lib/prisma"

// * kelima dari kiri -> hari dalam minggu(0-7)
// * keempat dari kiri -> bulan(1-12)
// * ketiga dari kiri -> tanggal(1-31)
// * kedua dari kiri -> jam(0-23)
// * pertama dari kiri -> menit(0-59)

// contoh: kirim artikel jam 9 senin di pagi hari
// 0 9 * * 1

// contoh: kirim artikel setiap tanggal 10 di bulan apapun
// * * 10 * *

// perlu match antara UTC dan waktu lokal

export function startArticleScheduler(){
    cron.schedule("* * * * *", async() => {
        console.log("Running article publish scheduler ...")
        console.log("Waktu Server (UTC) saat ini:", new Date().toISOString())   

        await prisma.article.updateMany({
            where: {
                isPublished: false,
                publishedAt: {
                    lte: new Date()
                },
            },
            data: {
                isPublished: true
            }
        })
    })
}