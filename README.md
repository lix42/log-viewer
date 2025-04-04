# Cribl Home Exercise - Log Viewer

## Summary
A log viewer to view a long logs from a network response.

## Install
```
pnpm install
```

## Scripts
* `pnpm dev` start a dev server
* `pnpm check` lint, TS check, and unit tests
* `pnpm storybook` start a storybook server (there should be more stories)
* `pnpm build` build to `dist` folder

## Documents:

* [High level design](https://github.com/lix42/log-viewer/wiki/Log-Viewer-High-Level-Design)
* [Tasks list](./Tasks.md)
* [Virtualization list decision](https://github.com/lix42/log-viewer/wiki/Virtualization-List)
* [Timeline design](https://github.com/lix42/log-viewer/wiki/Timeline-Component)
* [Future works](https://github.com/lix42/log-viewer/wiki/Future-works)

## Goals
### Functional
* [x] Fetch data from the given URL
* [x] Render list view
* [x] Render individual item in the list view
* [x] Render time line
* [] Error handling
### Performance
* [x] Deal with streaming response
* [] Suspense transition
* [x] Virtualization list view (add only)
* [] Virtualization list view (add and remove)
* [] Local storage cache
### Style
* [x] light/dark mode
* [x] Responsive design
### Other
* [x] A11Y
* [] Keyboard shortcut
### Extra features
* [] Support url from user input
* [] Filtering and search
* [] Export logs
* [] Theming