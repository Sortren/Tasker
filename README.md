# Tasker
Web application that is based on classic TO-DO List concept, but extended specifically in back-end.
Technologies that are used in this project are following:<br>
👉HTML/CSS/JS (on front-end part)<br>
👉JavaScript <br>
👉Node.js<br>
👉Express.js<br>
👉MongoDB<br>
👉JWT<br>
👉Bcrypt<br>
👉NodeMailer<br>
App allows to create an user account with full data validation, also the login part is validated too. All of the user's data is stored in a non-relational database - MongoDB.
After the user registered his account, an activation link is being sent on the given address and the user is supossed to confirm the account on his e-mail.
Logging system is also interesting, I've implemented JSON Web Token to authorize the account and to distinct which user sends and receives tasks. 
Also all of the sensitive data are encrypted using the bcrypt. 

