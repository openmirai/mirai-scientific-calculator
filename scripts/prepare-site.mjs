import { rm, stat, writeFile } from "node:fs/promises"
import path from "node:path"

const rootDirectory = path.resolve(import.meta.dirname, "..")
const siteDirectory = path.resolve(rootDirectory, process.argv[2] ?? "site-dist")
const requiredFiles = [path.join(siteDirectory, "index.html"), path.join(siteDirectory, "llms.txt")]

for (const file of requiredFiles) {
  try {
    const details = await stat(file)
    if (!details.isFile()) {
      throw new Error("not a file")
    }
  } catch {
    throw new Error(`Required site input is missing: ${path.relative(rootDirectory, file)}`)
  }
}

await rm(path.join(siteDirectory, "r"), { force: true, recursive: true })

const headersText = `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), geolocation=(), microphone=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/llms.txt
  Cache-Control: public, max-age=300, s-maxage=900
`

await writeFile(path.join(siteDirectory, "_headers"), headersText)
