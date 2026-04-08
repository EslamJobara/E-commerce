import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, "src/config/.env") })

import express from "express"
import bootStrap from "./src/app.controller.js"

const app = express()
const port = process.env.PORT || 3000

await bootStrap(app, express)

app.listen(port, () => console.log(`Server app listening on port ${port}!`))

export default app;