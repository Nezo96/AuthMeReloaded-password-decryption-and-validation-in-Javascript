// Require sha256
const saltedSha256 = require('salted-sha256');
const mysql = require('mysql');
const { inflateRaw } = require('pako');

require('dotenv').config()

const salt = "dc991e87ddb674f1";

// Create connection to mysql
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB
})

// Function for register new user
function registerUser(username, password, email) {

    // Check if there is email or not
    if ((email === "") || (email === undefined)) {
        email = "your@domain.com";
    } else {
        email = email;
    }
    console.log(email);

    // Connect to db and check for errors
    conn.connect((err) => {
        if (err) throw err;
        console.log('Connected to DB');
    })

    // Generate new password with given password and salt
    //const newPassword = generateNewPassword(salt, password);
}

registerUser('Test', 'test');