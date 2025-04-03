# Cribl Home Exercise - Log Viewer

## Summary
A log viewer to view a long logs from a network response.

## Documents:

* [High level design](https://github.com/lix42/log-viewer/wiki/Log-Viewer-High-Level-Design)
* [Virtualization list decision](https://github.com/lix42/log-viewer/wiki/Virtualization-List)
* [Tasks list](./Tasks.md)

## Goals
### Functional
* [x] Fetch data from the given URL
* [x] Render list view
* [x] Render individual item in the list view
* [] Render time line
* [] Error handling
### Performance
* [x] Deal with streaming response
* [] Suspense transition
* [x] Virtualization list view (add only)
* [] Virtualization list view (add and remove)
* [] Local storage cache
### Style
* [] light/dark mode
* [] Responsive design
### Other
* [] A11Y
* [] Keyboard shortcut
### Extra features
* [] Support url from user input
* [] Filtering and search
* [] Export logs
* [] Theming