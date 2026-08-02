import { Link, Outlet } from "@tanstack/react-router"
import { CheckCircle2, ExternalLink, PackageOpen, Shapes } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CodeBlock } from "@/site/code-block"
import {
  CORE_EXAMPLE,
  CORE_EXPORTS,
  CORE_INSTALL_COMMAND,
  DOCS_NAVIGATION,
  INSTALLATION_EXAMPLE,
  INSTALL_COMMAND,
  INSTALLATION_NOTES,
} from "@/site/constants/docs"
import { CORE_PACKAGE_URL, CURRENT_RELEASE, CURRENT_RELEASE_URL } from "@/site/constants/site"

/** Renders the shared documentation navigation and nested route outlet. */
export function DocsLayout() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:px-10">
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Documentation
        </p>
        <nav className="mt-4 grid gap-1" aria-label="Documentation">
          {DOCS_NAVIGATION.map((item) => (
            <Button
              key={item.to}
              variant="ghost"
              nativeButton={false}
              className="justify-start"
              render={<Link to={item.to} activeProps={{ className: "bg-muted text-foreground" }} />}
            >
              {item.label}
            </Button>
          ))}
        </nav>
      </aside>
      <article className="min-w-0 max-w-4xl">
        <Outlet />
      </article>
    </div>
  )
}

/** Documents registry installation and initial calculator composition. */
export function InstallationPage() {
  return (
    <div>
      <Badge variant="secondary">Single-command install</Badge>
      <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em]">Installation</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
        The shadcn registry is the complete UI distribution. It installs editable source and brings
        the headless core with it. The @openmirai namespace is listed in shadcn’s public registry
        directory, so no separate registry setup step is required.
      </p>

      <div className="mt-10">
        <CodeBlock code={INSTALL_COMMAND} label="Terminal" language="shell" />
      </div>

      <ul className="mt-8 grid gap-3">
        {INSTALLATION_NOTES.map((note) => (
          <li key={note} className="flex gap-3 text-sm">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
            {note}
          </li>
        ))}
      </ul>

      <Separator className="my-12" />

      <section>
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">Choose built-in extensions</h2>
        <p className="mt-4 leading-7 text-muted-foreground">
          Use uppercase enum-like constants. The array controls availability and order; no
          additional extension package is installed.
        </p>
        <div className="mt-6">
          <CodeBlock code={INSTALLATION_EXAMPLE} label="calculator-workspace.tsx" />
        </div>
      </section>

      <Separator className="my-12" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <Shapes className="mb-3 size-5 text-primary" />
            <CardTitle>Editable UI</CardTitle>
            <CardDescription>
              Change layout, controls, and styling inside your own component directory.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <PackageOpen className="mb-3 size-5 text-primary" />
            <CardTitle>Stable calculations</CardTitle>
            <CardDescription>
              Keep calculation behavior in the small core dependency installed by the registry.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

/** Documents the headless calculator-core package and its module boundaries. */
export function CorePage() {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">Framework-independent</Badge>
        <Badge
          variant="outline"
          render={
            <a href={CURRENT_RELEASE_URL} target="_blank" rel="noreferrer">
              {CURRENT_RELEASE} published
            </a>
          }
        />
      </div>
      <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em]">Headless core</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
        <code className="font-mono text-base text-foreground">@openmirai/calculator-core</code>{" "}
        contains calculation utilities only: no React, no DOM, and no stylesheet. The shadcn item
        adds it automatically, while advanced consumers can use it directly.
      </p>

      <div className="mt-10">
        <CodeBlock code={CORE_INSTALL_COMMAND} label="Optional direct install" language="shell" />
      </div>
      <div className="mt-5">
        <CodeBlock code={CORE_EXAMPLE} label="core-example.ts" language="ts" />
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button
          variant="outline"
          nativeButton={false}
          render={
            <a
              href={CORE_PACKAGE_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="View @openmirai/calculator-core on npm"
            />
          }
        >
          View on npm <ExternalLink />
        </Button>
        <Button
          variant="ghost"
          nativeButton={false}
          render={
            <a
              href={CURRENT_RELEASE_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${CURRENT_RELEASE} release notes`}
            />
          }
        >
          Release notes <ExternalLink />
        </Button>
      </div>

      <Separator className="my-12" />

      <section>
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">Subpath exports</h2>
        <p className="mt-4 text-muted-foreground">
          Import only the subsystem you need. Each export is available in ESM, CommonJS, and
          TypeScript declaration formats.
        </p>
        <Card className="mt-6 gap-0 overflow-hidden py-0">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Import</TableHead>
                  <TableHead>Purpose</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CORE_EXPORTS.map((item) => (
                  <TableRow key={item.path}>
                    <TableCell className="font-mono text-xs">{item.path}</TableCell>
                    <TableCell className="text-muted-foreground">{item.purpose}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
