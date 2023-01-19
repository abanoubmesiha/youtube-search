# Getting Started with Youtube Search App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

**Note: Runs typescript linter at first to make sure no errors are found**

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

**Note: Runs typescript linter at first to make sure no errors are found**

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

**Note: Runs typescript linter at first to make sure no errors are found**

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npx stylelint '**/*.css'`

Runs the linter of the styles in the whole app.

## Styles

### StyleSheets File Structure

* `assets/styles/` directory has the general styles and variables use in the whole app.

Folder/File  | Contents
------------- | -------------
variables  | All variables use in the whole app.
`general.css` | General styles, mainly the ones related to popular HTML elements like `body` and headings, ...etc.
`index.css`  | All `assets/styles` files are imported to this file, which is imported in the `app.tsx`.

* `any-component/**.css` has the styles related to the `any-component`.
## React ( TSX )

### React File Structure
1. All folders and file should have filenames in kebab-case
1. Any folder should have an `index.tsx` file which is the main file of that folder.

Folder  | Contents
------------- | -------------
actions  | actions which will be dispatched to update the store.
apis | Axios Singleton Class and API related data
assets | styles and images of the app.
layout  | header, footer, and any side menus which shared between pages.
pages  | Main pages of the app
reusable  | Reusable components used in pages
router | React-Router related components
stores | different stores saving data used in the components.
types | all typescript types, interfaces, emuns and more used in our components or files

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
