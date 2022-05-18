// Require sha256
const saltedSha256 = require('salted-sha256');
const mysql = require('mysql');
require('dotenv').config();

// Create connection to mysql
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB
})

const salt = "dc991e87ddb674f1";
const newPw = "test";

// Get user password from database
const getPass = async (username, password) => {
    // Check if connection is OK

    // Hash our new password
    const hashedPassword = await generateNewPassword(salt, newPw);
    //console.log(hashedPassword);

    // Connect to database
    conn.connect((err) => {
        if (err) throw err;
        console.log('Connected to DB');

        // Inser constants to query sql string
        const sql = `UPDATE authme SET password = '${hashedPassword}' WHERE username = '${username}'`;

        // Check if query sql is OK
        conn.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result.affectedRows + ' column(s) was updated');
        })
    })
}

// Generate new password with our salt and given password
const generateNewPassword = (salt, password) => {

    // Hash given password with SHA256
    const firstHash = saltedSha256(password);

    // Hash given password with SHA256 again and add our salt
    const secondHash = saltedSha256(firstHash, salt);

    // Concatinate all together
    const finalPassword = '$SHA$' + salt + '$' + secondHash;
    //console.log(finalPassword);

    return finalPassword;
}

getPass('TResesT', newPw);