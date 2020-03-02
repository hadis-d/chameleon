# chameleon
Chameleon app

NodeJS + VueJS application made for purposes of applying to job position.

#use command "$  npm install" to install necesarry packages 

Technologies used:
NodeJS (express, mongoose)
VueJS (Vuex, vuex-persisted-state, vuedraggable, busboy and few others)
MongoDB

Backend app - NodeJS
Application can be launched via "$ node server" command.
It pretty much utilizes MVC pattern but in this case "V"-view component is left for the frontend app.
Express is base framework, lightweight and without too much imposed structure.
server.js is entry point, and all logic resides in expressRoutes folder which contains files for:
authRoutes.js - user authentication (login/register) and authenticated user retrieval
todoRoutes.js - all api endpoints necesarry to manage todos in database
uploadRoutes.js - contains route for accepting image files from within application. requires token header to grant access.
Application also has models folder which contains relevant database schema objects.


Frontend app - VueJS
Application can be started via "$  npm start" command.
Application has couple of screens including:
Login screen - authenticates user and lets him into the app
Register screen - registers user and lets him into the app
Dashboard screen - main screen of the application. It has two column design when it comes to functional part of the design with elements inside those columns draggable to each other.
Application is pretty much todo scheduler, as soon as new item is added and focus switches to something else data is persisted in database. Item can be dragged to another column or sent from pending to done via checkbox.
Elements support image element.

MongoDB is used for storing data. Create database named chameleon or edit config/DB.js to suit your connection string in order to store data.

I used following plugins for these reasons:
Vuex - I used it in order to store flag about users logged in status, can be used for more complex state management, wasn't necesarry in my case.
vuex-persisted-state - used in order to automatically preserve vuex store data on browser tab reload so user stays logged in
vue-draggable - plugin that I built on top all the functionalities of dashboard screen, neat plugin for drag/drop operations.
busboy - helped me to receive and save image to the file system uploaded via http request.

Unit tests etc missing
