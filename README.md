# db project
 Final Project Instructions: Setup Guide

 Entity Relationship Diagram (ERD) Creation:
Design an ERD using Draw io to visualize the tables and their relationships for the project. This diagram will help you understand the structure and connections between different entities.

 Set Up MySQL Connection and Schemas:
Install MySQL locally if you haven't already.

Create a new connection in MySQL Workbench.

Create two schemas (databases): learning_league and scholarship_sorcerer.

Download and Install Visual Studio Code:
Obtain Visual Studio Code from the official website.

Install it following the instructions provided.

 Set Up Node.jsProgramming Environment:
Initialize Project:

Open VS Code.

Select File > Open Folder and open the folder where you'll be working. This will be your workspace.

Install Essential Extensions:

Go to the Extensions view (Ctrl+Shift+X) and install useful extensions such as Prettier, Debuggers, Live Server, etc.

Initialize Node.jsProject:

Open the integrated terminal (Ctrl+~).

Navigate to your project folder.

Run npm init and follow the prompts to create package.json.

Install Required Packages:

Run the following command to install necessary packages:
bash
npm install express mysql2 sequelize dotenv body-parser cors

 Set Up Main Application File:
Create a new file named app.js which will serve as the entry point for your application.

Configure Environment Variables:
Create a .env file in the root of your project. Add your environment variables:

DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql

Define Database Models:
Create a new file named models.js in your root folder.

Populate it with data models for your tables using Sequelize.

Create insertsampledata.js to populate tables created.
Create config.js to Initialize Sequelize with environment variables.

Set up an app.js server for the student management system and to handle CRUD operations for various entities and create CrudRoutes.js function to define a set of CRUD (Create, Read, Update, Delete) routes for a given model in the app.js application.

Test server using "node app.js" to determine if connection to mysql has been established successfully.

Create the front-end of the application by writing a simple index.html code with student management form and list display using bootstrap, and style using external css, create validators.js to validate the form and create a scripts.js file to connect  to the server.

Debug codes and test connection by filling and submitting forms.








