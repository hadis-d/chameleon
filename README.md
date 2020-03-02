# chameleon
Chameleon app

NodeJS + VueJS application made for purposes of applying to job position.

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
