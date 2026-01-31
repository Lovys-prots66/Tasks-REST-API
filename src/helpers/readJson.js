import fs from "node:fs/promises"
export const readJSON = async (path) => {
    try {
        const raw = await fs.readFile(path, "utf-8")
        return JSON.parse(raw);
    } catch (error) {
        throw new Error("readJSON error: " + error.message);
    }
}