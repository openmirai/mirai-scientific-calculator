# Mirai Scientific Calculator

[![CI](https://img.shields.io/github/actions/workflow/status/openmirai/mirai-scientific-calculator/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/openmirai/mirai-scientific-calculator/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@openmirai/calculator-core?style=flat-square&label=core)](https://www.npmjs.com/package/@openmirai/calculator-core)
[![GitHub Release](https://img.shields.io/github/v/release/openmirai/mirai-scientific-calculator?style=flat-square)](https://github.com/openmirai/mirai-scientific-calculator/releases)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fcalculator.openmirai.dev&style=flat-square&label=website)](https://calculator.openmirai.dev)
[![License: MIT](https://img.shields.io/badge/license-MIT-2A9D90?style=flat-square)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178C6?style=flat-square)](https://www.typescriptlang.org/)

A scientific, graphing, statistics, and math tools calculator with two
distribution channels:

- **Editable React UI:** the `@openmirai/calculator` shadcn registry item
- **Headless APIs:** the dependency-free `@openmirai/calculator-core` npm package

The registry provides the responsive calculator component as editable source.
The core package provides the calculation engines without React, styles, or UI
dependencies.

[Website](https://calculator.openmirai.dev) ·
[Playground](https://calculator.openmirai.dev/playground) ·
[Installation](https://calculator.openmirai.dev/docs/installation) ·
[Core API](https://calculator.openmirai.dev/docs/core) ·
[v0.2.0 release](https://github.com/openmirai/mirai-scientific-calculator/releases/tag/v0.2.0)

## Interface

|                                                          Scientific calculator                                                          |                                                         Graphing calculator                                                         |
| :-------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
| ![Scientific calculator](https://raw.githubusercontent.com/openmirai/mirai-scientific-calculator/main/docs/images/scientific-light.png) | ![Graphing calculator](https://raw.githubusercontent.com/openmirai/mirai-scientific-calculator/main/docs/images/graphing-light.png) |

|                                                               Statistics in dark mode                                                               |                                                       Math tools                                                        |
| :-------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: |
| ![Statistics calculator in dark mode](https://raw.githubusercontent.com/openmirai/mirai-scientific-calculator/main/docs/images/statistics-dark.png) | ![Math tools](https://raw.githubusercontent.com/openmirai/mirai-scientific-calculator/main/docs/images/tools-light.png) |

## Features

### Scientific

- Arithmetic, powers, roots, factorials, percentages, fractions, and absolute values
- Trigonometric, inverse-trigonometric, logarithmic, and statistical functions
- Degree and radian modes
- Variables, reusable function definitions, answer memory, history, undo, and redo
- Keyboard entry and a six-column calculator keypad

### Graphing

- Explicit and implicit equations
- Point lists and connected shapes
- Variables with interactive sliders
- Pan, zoom, grid controls, and curve tracing
- Roots, extrema, and intersections
- Data tables and regression summaries

### Statistics

- Scatter, histogram, box, dot, and residual charts
- Descriptive statistics, variance, standard deviation, correlation, and covariance
- Linear, quadratic, cubic, exponential, logarithmic, and power regression

### Math tools

- Percent calculations
- Ratio simplification and scaling
- Coordinate distance, midpoint, slope, and line equations
- Circle, triangle, and rectangular-prism measures

## Install the editable UI

Run the shadcn CLI in an existing shadcn project:

```bash
pnpm dlx shadcn@latest add @openmirai/calculator
```

The `@openmirai` namespace is resolved from shadcn’s public registry directory.

The registry item copies the calculator into
`components/mirai-calculator`, installs its shadcn primitives, and automatically
installs `@openmirai/calculator-core`. The copied component owns its styles, so
there is no separate UI package or stylesheet package to install.

The calculator preserves the layout and control baseline from `v0.1.6` while
leaving product branding and surrounding practice scenery to the host app.

The registry supports projects initialized with Base UI or Radix without
replacing unrelated components or global theme variables.

## Use the UI

Import the installed component from your application:

```tsx
import {
  CalculatorExtension,
  MiraiCalculator,
  type CalculatorMode,
} from "@/components/mirai-calculator/mirai-calculator"

export function CalculatorPage() {
  const handleModeChange = (mode: CalculatorMode) => {
    console.log("Calculator mode:", mode)
  }

  return (
    <div className="h-[660px]">
      <MiraiCalculator
        extensions={[CalculatorExtension.SCIENTIFIC, CalculatorExtension.GRAPHING]}
        defaultMode={CalculatorExtension.SCIENTIFIC}
        defaultTheme="system"
        onModeChange={handleModeChange}
      />
    </div>
  )
}
```

### Host-controlled layout

The registry intentionally excludes practice questions, answer choices, and
other preview scenery. Applications own that backdrop and the calculator's
dimensions. The calculator fills its parent instead of exposing width or height
props, so the same component responds to any page, panel, or resizable shell.

```tsx
import { MiraiCalculator } from "@/components/mirai-calculator/mirai-calculator"

export function PracticePlayer() {
  return (
    <div className="relative h-[760px] overflow-hidden">
      <YourAppBackdrop />
      <div className="absolute inset-x-[4%] top-[18%] bottom-[4%]">
        <MiraiCalculator title="OpenMirai Calculator" />
      </div>
    </div>
  )
}
```

No calculator stylesheet is required. All component styling is expressed with
Tailwind utilities and semantic shadcn tokens such as `bg-background`,
`text-foreground`, and `border-border`, so the installed source follows the
consumer's theme customization.

### Controlled state

Mode, angle mode, theme, and visibility can each be controlled or uncontrolled.

```tsx
import { useState } from "react"
import {
  CalculatorExtension,
  MiraiCalculator,
  type CalculatorMode,
  type CalculatorTheme,
} from "@/components/mirai-calculator/mirai-calculator"

export function ControlledCalculator() {
  const [mode, setMode] = useState<CalculatorMode>(CalculatorExtension.GRAPHING)
  const [theme, setTheme] = useState<CalculatorTheme>("dark")

  return (
    <MiraiCalculator
      mode={mode}
      onModeChange={setMode}
      theme={theme}
      onThemeChange={setTheme}
      angleMode="degrees"
      hidden={false}
    />
  )
}
```

### Component API

| Prop                | Type                             |        Default | Description                                     |
| ------------------- | -------------------------------- | -------------: | ----------------------------------------------- |
| `className`         | `string`                         |              — | Additional class names for the calculator panel |
| `extensions`        | `readonly CalculatorExtension[]` |      all modes | Enabled modes in their navigation order         |
| `mode`              | `CalculatorMode`                 |              — | Controlled calculator mode                      |
| `defaultMode`       | `CalculatorMode`                 | `"scientific"` | Initial uncontrolled mode                       |
| `onModeChange`      | `(mode) => void`                 |              — | Called after the mode changes                   |
| `angleMode`         | `"degrees" \| "radians"`         |              — | Controlled angle mode                           |
| `defaultAngleMode`  | `"degrees" \| "radians"`         |    `"degrees"` | Initial uncontrolled angle mode                 |
| `onAngleModeChange` | `(mode) => void`                 |              — | Called after the angle mode changes             |
| `theme`             | `"light" \| "dark" \| "system"`  |              — | Controlled color theme                          |
| `defaultTheme`      | `"light" \| "dark" \| "system"`  |      `"light"` | Initial uncontrolled theme                      |
| `onThemeChange`     | `(theme) => void`                |              — | Called after the theme changes                  |
| `hidden`            | `boolean`                        |              — | Controlled hidden state                         |
| `defaultHidden`     | `boolean`                        |        `false` | Initial uncontrolled hidden state               |
| `onHiddenChange`    | `(hidden) => void`               |              — | Called after the hidden state changes           |
| `startFullscreen`   | `boolean`                        |        `false` | Opens the panel in fullscreen mode              |
| `title`             | `string`                         | `"Calculator"` | Accessible panel title                          |
| `onClose`           | `() => void`                     |              — | Adds a close button and handles its action      |

```ts
const CalculatorExtension = {
  SCIENTIFIC: "scientific",
  GRAPHING: "graphing",
  STATISTICS: "statistics",
  TOOLS: "tools",
} as const

type CalculatorMode = (typeof CalculatorExtension)[keyof typeof CalculatorExtension]
type CalculatorTheme = "light" | "dark" | "system"
```

## Use the headless APIs

Install version `0.2.0` of the dependency-free core package:

```bash
pnpm add @openmirai/calculator-core@0.2.0
```

Import each calculator domain directly so bundlers and readers only resolve the APIs in use:

```ts
import { evaluateExpression } from "@openmirai/calculator-core/engine"
import { calculateStatistics, fitRegression } from "@openmirai/calculator-core/statistics"
import { calculatePercent } from "@openmirai/calculator-core/tools"

const value = evaluateExpression("sin(30) + sqrt(81)", {
  angleMode: "degrees",
})

const summary = calculateStatistics([2, 4, 4, 5, 7, 8, 9])
const percent = calculatePercent(15, 240)
const regression = fitRegression([1, 2, 3], [3, 5, 7], "linear")
```

The package provides focused module exports and no aggregate barrel:

| Export                                       | APIs                                                        |
| -------------------------------------------- | ----------------------------------------------------------- |
| `@openmirai/calculator-core`                 | Alias of the expression engine export                       |
| `@openmirai/calculator-core/engine`          | Expression evaluation, formatting, and calculator engine    |
| `@openmirai/calculator-core/configuration`   | Calculator modes, display settings, and normalization       |
| `@openmirai/calculator-core/graphing`        | Expression compilation, roots, extrema, and intersections   |
| `@openmirai/calculator-core/graphing-data`   | Headless graphing initial-data contracts                    |
| `@openmirai/calculator-core/graphing-view`   | Viewport projection, pan, zoom, and point projection        |
| `@openmirai/calculator-core/statistics`      | Descriptive statistics, correlation, covariance, regression |
| `@openmirai/calculator-core/statistics-data` | List parsing, pairing, bins, frequencies, and sampling      |
| `@openmirai/calculator-core/tools`           | Percent, ratio, coordinate, and shape calculations          |

All exports include TypeScript declarations.

## Development

Use Node 24. The included `.nvmrc` follows the current LTS line:

```bash
nvm use
```

Install dependencies and start the demo:

```bash
pnpm install
pnpm dev
```

The repository is split into focused workspaces:

- `packages/calculator-core` — the publishable dependency-free library
- `packages/calculator-registry` — the canonical shadcn calculator source
- `apps/web` — the TanStack Router showcase and registry consumer

`pnpm app:install` builds the core, builds the registry item, and installs the
calculator into the web app with the shadcn CLI. The installed copy is generated
and is not maintained separately.

Run the repository checks:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test:coverage
pnpm build
pnpm publint
pnpm registry:build
pnpm build:site
pnpm smoke:site
pnpm smoke:registry
```

## Continuous integration and release

CI runs formatting, type-aware linting, TypeScript checks, tests and coverage,
the dependency-free core build, package-export validation, registry validation,
and Base UI and Radix registry consumer smoke tests.

The release workflow is designed to publish the committed
`@openmirai/calculator-core` version, create the matching Git tag, and create a
GitHub Release. The React UI is distributed only through the shadcn registry;
it is not published as an npm package or bundled as a package release asset.

### Release status

[`@openmirai/calculator-core@0.2.0`](https://www.npmjs.com/package/@openmirai/calculator-core)
is published with npm provenance. The matching
[`v0.2.0`](https://github.com/openmirai/mirai-scientific-calculator/releases/tag/v0.2.0)
GitHub Release includes the package tarball and generated registry artifacts.
The interactive showcase is live at
[`calculator.openmirai.dev`](https://calculator.openmirai.dev).
The legacy `mirai-scientific-calculator` releases `0.1.0` through `0.1.6` remain
available but are deprecated with migration guidance; they were not unpublished.

Future publishing remains an explicit Release workflow dispatch. Release-it
validates the checkout, publishes the committed core version, creates the Git
tag and GitHub Release, uploads the generated assets, verifies npm, and deploys
the showcase. Package deprecation stays a separate manual-only workflow.

### npm Trusted Publishing

The Release workflow publishes `@openmirai/calculator-core` with npm Trusted
Publishing through GitHub Actions OIDC. It has `id-token: write`, uses the npm
registry, disables release-build caching, and does not require an
`NPM_TOKEN` or `NODE_AUTH_TOKEN`. npm generates provenance automatically for
trusted publishes.

Configure the trusted publisher for
`@openmirai/calculator-core` in its npm package settings:

- GitHub organization: `openmirai`
- Repository: `mirai-scientific-calculator`
- Workflow filename: `release.yml`
- Environment: `cloudflare-production`
- Allowed action: `npm publish`

The same relationship can be configured with npm CLI 11.15 or newer by a
maintainer with package write access and account-level two-factor
authentication:

```sh
npm trust github @openmirai/calculator-core \
  --repo openmirai/mirai-scientific-calculator \
  --file release.yml \
  --environment cloudflare-production \
  --allow-publish
```

See npm's [Trusted Publishing documentation](https://docs.npmjs.com/trusted-publishers/)
and [`npm trust` documentation](https://docs.npmjs.com/cli/v11/commands/npm-trust/)
for the provider settings. After configuration, run the existing **Release**
workflow; no npm token is needed for package publication. The separate
`deprecate-legacy.yml` workflow remains token-authenticated because it performs
the administrative `npm deprecate` operation rather than `npm publish`.

## License

Released under the [MIT License](./LICENSE).
