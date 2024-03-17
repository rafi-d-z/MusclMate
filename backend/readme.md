# How To Run The Backend
- if there's no directory (folder) called `node_modules`
    - make sure your terminal is currently in the `backend` directory
        - if you can't tell, run `ls` in the terminal and see if it lists the 
        contents of the `backend` directory
    - run `npm install` in the terminal
    - this will install all necessary libaries into this folder

- then, once all libraries are installed - run `npm start`
    - this will run the server on your local network 
- `index.ts` is the app that will be run
    - if you're ever confused about the required inputs and ouputs from an api, you can check there
    - we use `nodemon` in the backend to auto-reload on the event that the server source code is changed
        - so if you find yourself tinkering with the backend - please run `nodemon` not `npm` to see your changes in real time

# How To Run Tests
- we use `jest` to run the tests and `supertest` to interface with the server
- you can run the tests using `npm test`
- it will run all scripts in the `/tests` directory
- on each run, all outputs are saved to `test_output.json`
    - it might not save in a human-readable format so use `Beautify JSON` (<kbd>Ctrl</kbd>/<kbd>&#8984;</kbd> + <kbd>Shift</kbd> + <kbd>j</kbd>)
## PS 👀
- you can view this `markdown` file in better quality by hitting
    - `windows`: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>v</kbd>
    - `mac`: <kbd>&#8984;</kbd> + <kbd>Shift</kbd> + <kbd>v</kbd>