# phonebook-ui

A React application that reads Jumia customers phone numbers,
This application was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `npm run docker-build`

Runs the `build.sh` script which:
- Runs `npm install`.
- Builds the app for production to the `build` folder.
- Builds the docker image of the built application.

### `npm run docker-start`

Starts the built docker image of the application in a docker container on `http://localhost:80`. 
YOU MUST RUN `npm run docker-build` BEFORE `docker-compose up`, or just use the default scripts.

### `npm run docker-stop`

stops the running docker container of the application. 

### `npm run docker-push`

push the build docker image to docker-hub if you have permission.