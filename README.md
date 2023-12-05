## Todo list Application

- This Application is used to create the tasks that we would like to perform.
- ReactJs and todo's api is used in creation of this application.

### Usage:

- This application has only one single page, where we can add, fetch, delete and update the todos.
- From the api given, we can fetch or make the get request to fetch the todos.
- The post, put and delete are the dummy requests.
- When we try to add the task, it will add the task to react state but not for any database. So when we refresh the it will comes to its original state.
- Same goes with update and delete tasks.

### Folder Structure

```

React-Todo-App
    |
    |               |--->favicon.ico
    |               |--->logo192.png
    |               |--->index.html
    |--->public---->|--->robots.txt
    |               |--->logo512.png
    |               |--->manifest.json
    |
    |                                |--->TodoComponent.jsx
    |            |--->components---->|--->TodoComponent.module.css
    |--->src---->|--->App.js
    |            |--->App.css
    |            |--->index.css
    |            |--->index.js
    |
    |
    |-->node_modules
    |-->.gitignore
    |--> package-lock.json
    |--> package.json

```

### How to setup the project on local system

- Clone this project into the system.
- Run the command **npm i** or **npm install** for installing all the required dependencies.
- Now Run the command **npm start**.
- Open the browser and navigate to **http://localhost:3000/** to start the application.
