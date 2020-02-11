# Blyncsy Coding Challenge

Hello and Welcome!

## Setup

You have access to this code, so that's a great start! Here's the next steps:

1) run `yarn`
  - If yarn errors, it is likely because you are not currently on a compatible version of node. The error should specify what version you need. If you have `nvm` installed on your computer, you can use that to change the node version. If not, and you do not want to update your node version on your computer, we have a computer set up and ready to go with this project.
2) run `yarn start`
3) If you weren't directed there automatically, open a browser and go to [http://localhost:3000](http://localhost:3000)


## Challenge Specifics

After you successfully follow the setup steps above, you should see a page showing off a cool datepicker. The problem is that the datepicker does not exist yet. That's where you come in! The challenge is for you to create a datepicker so it is displayed within the empty rectangle. Here are some expectations for how it should function:

- It should be a calendar (month) view by default. Don't worry about creating a text input that you click to open a datepicker. You are just creating what would appear in that situation.
- The user should be able to navigate back and forth through the months to find the date they want.
- By default, it should have the current day selected.
- It should be wired up to the accompanied redux state. If you are not familiar with Redux, follow the steps below for removing Redux. In that case, Create the component in such a way that it can be reused in different places and the dates that are chosen can be retrieved out of the component.
- It should look presentable. Don't get caught up in design too much, but give it a little thought at least.
- We might want to add the following features in the future, so as you are designing the code, think about how these might be added:
  - selecting a date range instead of a single date
  - a view that allows the user to select a year and a view that allows a user to select a month. After these are selected, we will show the calendar datepicker so they can select a day.
  - the ability to disable certain dates.

### Bonuses:

We only want you to spend a few hours on this challenge. Don't feel like you need to spend forever getting this thing perfect. But if you are fast, here are a few bonus tasks:

- Make it so that when the user clicks the checkbox for "Select Date Range", the datepicker switches over to do just that. If the checkbox is unchecked, the datepicker goes back to selecting a single date.
- Make the datepicker responsive. Currently its size is hardcoded in `App.jsx`. If I were to change the size of the div in that file, would the Datepicker adapt to fill the new container?

### Notes:

- We tried to set you up with a basic framework to start with. We have already installed React, Redux, Redux-Thunks, Redux-Sagas, Moment, and Reselect for you to use if you want. If you would like to install a different package to use, just ask us. We just want to make sure it's not a package that will make this challenge too easy. (No, you can't just install react-datepicker!)

- The entry point for the app is [src/index.js](./src/index.js). The main app is [src/App/app.component.js](./src/App/app.component.js)

- If you don't know redux, and you are worried it will tank your ability to do this challenge, see the notes below for ripping redux out of the app.

- We set things up using a directory structure similar to what we use in Blyncsy's repo. Each directory that is pascal-cased (StartsWithCapitalLikeThis) is what we call a "component directory" and encapsulates all code that relates to a certain component. The components, reducers, utils, etc are separated out into their own files with dot notation descriptors of what they are. (example: myThing.component.js, myThing.reducer.js, myThing.utils.js, etc). Each one of these directories has an `index.js` file that is used for exporting whatever the component is allowing to be used externally. Each directory that starts with an underscore and is camel-cased (_likeThisHere) is what we call a "collection directory". This is just a directory designed to collect similar "component directories". Please don't get too wound up about following the directory structure. We wanted to give you a look at how we structure things and an opportunity to learn to work within it (FYI: in the actual blyncsy repo we have scripts that auto create things like the index file to remove manual boilerplate). If the directory structure is slowing you down too much, just build things however you need to be productive at the challenge.

- Feel free to change around any of the existing code. We just provided it as a starting point. If you think of a better way to do things, then do it!

- Use Google! Look up other datepickers, search for that javascript syntax you just forgot for some reason, look at a cute puppy photo to releave some stress. We want you to treat this like it was any other assignment, and we know how often we need to consult Google when we are building things!

- Don't be afraid to ask questions! Again, treat this like any other assignment. If you are confused about something or you want to make sure you are building to our specifications, just ask. Also feel free to draw out some designs on paper or write some pseudocode and ask for approval if that's how you normally operate.

- Jest is already set up, so you should be able to write tests immediately. Run tests with `yarn test`.

### Removing Redux:

[Here's a basic Redux tutorial](https://react-redux.js.org/introduction/basic-tutorial), if you're keen on learning it.

We use Redux as our data layer, so you will need to learn it if you want to work at Blyncsy. But if you're a great developer who just has not used Redux before, we don't want that to disqualify you. So if you think Redux will hamper your ability to finish this challenge in a reasonable time and showcase your best work, here are the steps for removing it from this codebase:

1) Open [src/App/app.component.jsx](./src/App/app.component.jsx). You will see a constant called `store` that is created with a `buildStore` method. Delete that constant.
2) Then, in the jsx in that same file, delete the `<Provider` tag. that wraps the rest of the JSX.
3) Delete the `Provider`, `buildStore`, and `appReducer` imports at the top of that file.

Ok, that removes Redux as the data layer for the app. But we still have components called `AppDatepicker` and `AppDatepickerControls` that are connected to the now nonexistant data layer. Let's swap those out.

4) Still in [src/App/app.component.jsx](./src/App/app.component.jsx), swap out the import statement for `AppDatepicker` and change it to be: `import Datepicker from '../_components/Datepicker/'`.
5) Update the `<AppDatepicker />` jsx tag to be `<Datepicker />`.
6) Now do the same swaps for `AppDatepickerControls`. Change the import to be `import DatepickerControls from '../_components/DatepickerControls/'` and change jsx tag from `<AppDatepickerControls />` to `<DatepickerControls />`

Nice, the app is now no longer connected to Redux. Go forth and build a kickass datepicker!

Good Luck!









# Original Readme

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
