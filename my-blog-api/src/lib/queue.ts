import { Client } from "@upstash/qstash";
import dotenv from "dotenv"

dotenv.config()
const QSTASH_TOKEN = process.env.QSTASH_TOKEN

export const qstash = new Client({
    token: QSTASH_TOKEN
})