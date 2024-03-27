# Read!!!!

## File Structure
- all ui components are stored under `src/components`
    - this is where all the `.jsx` files will be located
- do not touch `main.jsx` under any condition aside from routing - it's incredibly important
- `App.jsx` is the page that `main.jsx` renders, so make sure to not rename it or the `App()` function
- `App()` is the main function, it calls on components in `/components` that we can edit and import into our page
- keep the `components/` directory for components of web pages only, and keep actual pages in the `src` directory
- `components/ui` is where `shadcn/ui` generates its' ui components

## Notes
- the UI for the home page `App.jsx` is pinned on discord - please look at it
- for now, don't worry about pulling from the api's we've made - the information on the components can be static