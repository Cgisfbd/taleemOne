# taleemOne ERP — web

First screen: a responsive, light emerald/gold splash using the supplied original crest, local fonts, and a finite 3.2-second entrance. Product branding is deliberately hardcoded. The replay control restarts the presentation; OS reduced-motion preferences bypass it.

## Run

```powershell
cd C:\taleem\web-app
npm ci
npm run dev
```

Open http://localhost:3000. For production use `npm run build` followed by `npm start`.

## Checks

```powershell
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Browser checks use the installed Microsoft Edge via Playwright. They cover responsive bounds, asset loading, JavaScript errors, keyboard replay, and reduced motion. A production build is needed before the browser checks.

## Structure

`src/app` composes routes. `src/widgets/splash` owns the presentation. `src/shared` contains product constants, local font registration and reusable controls. The original image lives in `public/brand`. See `../SPLASH_DESIGN.md` for shared platform timings.

This is the splash screen only. It holds the final composition until a future screen is connected; the ornamental gold line does not claim backend loading progress.
