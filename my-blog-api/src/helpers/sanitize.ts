// sanitizeString -> helper untuk membersihkan string dari tag HTML/Script

export function sanitizeString(input: unknown){
    if (typeof input !== "string"){
        return ""
    }

    return input
    .trim()
    // menghilangkan tag html sepenuhnya
    .replace(/<\/?[^>]+(>|$)/g, "")

}

// sanitizeId -> helper untuk membersihkan ID (memastikan hanya alphanumeric/uuid/integer)
// mencegah karakter aneh masuk query

export function sanitizeId(input: unknown){
    if(typeof input !== "string"){
        return ""
    }

    // hanya izinkan huruf, angka, strip (untuk UUID), dan underscore
    return input.trim().replace(/[^a-zA-Z0-9-_]/g, "")
}