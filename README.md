# Getting Started

### Demo
hosted on github pages:

https://seriousnasser.github.io/trackman/

Github pages has some restrictions, so for testing full functionality please run locally.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\

## More info
- by case, I decided when should use a literal object or es6 classes
- localStorage considered for mock API storage (compatibility and simplicity), but I could use indexedDB as well
  Network and API errors are handled inside the component level, but we can take it in our networking layer without interfering representational layer in the complex architecture.
- IE 11 and below is not the project's target
- The API mock system could be implemented in an easier way, but I considered this, we can switch between real API and mock API whenever we need.
- test covered for some services and components (appx 10% coverage)
- used hash map data structure to increase getOne performance (O(1))
- automatically deploys on Github pages after each push on the main branch (after merging the pull request)
- using mui with css-in-js approach and CSS modules together in the same project is not optimal. I did into this project to speed up development.