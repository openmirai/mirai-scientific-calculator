import { access, readFile } from "node:fs/promises"
import path from "node:path"

const rootDirectory = path.resolve(import.meta.dirname, "..")
const siteDirectory = path.resolve(rootDirectory, process.argv[2] ?? "site-dist")

async function readSiteFile(relativePath) {
  const file = path.join(siteDirectory, relativePath)

  try {
    return await readFile(file, "utf8")
  } catch {
    throw new Error(`Missing site output: ${path.relative(rootDirectory, file)}`)
  }
}

const [indexHtml, llmsText, headersText, wranglerConfig] = await Promise.all([
  readSiteFile("index.html"),
  readSiteFile("llms.txt"),
  readSiteFile("_headers"),
  readFile(path.join(rootDirectory, "wrangler.toml"), "utf8"),
])

try {
  await access(path.join(siteDirectory, "r"))
  throw new Error("The calculator site still includes the hosted registry directory")
} catch (error) {
  if (error instanceof Error && error.message.includes("still includes")) {
    throw error
  }
  if (error?.code !== "ENOENT") {
    throw error
  }
}

if (!llmsText.includes("pnpm dlx shadcn@latest add @openmirai/calculator")) {
  throw new Error("llms.txt does not include the canonical installation command")
}

if (!llmsText.includes("@openmirai/calculator-core@0.2.0")) {
  throw new Error("llms.txt does not include the published core release")
}

if (!indexHtml.includes("https://calculator.openmirai.dev/open-graph.png")) {
  throw new Error("index.html does not reference the social preview image")
}

try {
  await access(path.join(siteDirectory, "open-graph.png"))
} catch {
  throw new Error("The built site does not include open-graph.png")
}

for (const expectedHeader of [
  "/assets/*",
  "max-age=31536000, immutable",
  "X-Content-Type-Options: nosniff",
]) {
  if (!headersText.includes(expectedHeader)) {
    throw new Error(`_headers is missing: ${expectedHeader}`)
  }
}

for (const expectedConfig of [
  'name = "mirai-scientific-calculator"',
  'compatibility_date = "2026-07-31"',
  "workers_dev = false",
  "preview_urls = false",
  'pattern = "calculator.openmirai.dev"',
  "custom_domain = true",
  'directory = "./site-dist"',
  'not_found_handling = "single-page-application"',
]) {
  if (!wranglerConfig.includes(expectedConfig)) {
    throw new Error(`wrangler.toml is missing: ${expectedConfig}`)
  }
}

const assetPaths = [
  ...indexHtml.matchAll(/(?:href|src)=["']\/(assets\/[^"'?#]+)(?:[?#][^"']*)?["']/g),
].map((match) => match[1])

if (assetPaths.length === 0) {
  throw new Error("index.html does not reference any built assets")
}

await Promise.all(
  assetPaths.map(async (assetPath) => {
    try {
      await access(path.join(siteDirectory, assetPath))
    } catch {
      throw new Error(`index.html references a missing asset: ${assetPath}`)
    }
  })
)
