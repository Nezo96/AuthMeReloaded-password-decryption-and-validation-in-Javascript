// Require sha256
const saltedSha256 = require('salted-sha256');
const mysql = require('mysql');
const fetch = require('node-fetch');

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
const registerUser = async (username, password, email) => {

    //console.log(email);
    // Make realname from username that we lowercase
    const realname = username.toLowerCase();

    // Wwait for function to getIP is done
    const ip = await getIp();
    //console.log(ip);

    // Connect to db and check for errors
    conn.connect((err) => {
        if (err) throw err;
        console.log('Connected to DB');

        // Generate new password with given password and salt
        const newPassword = generateNewPassword(salt, password);

        //console.log('New password ' + newPassword);
        // Inser constants to query sql string
        const sql = `INSERT INTO authme (username, password, email, realname, ip) VALUES ('${username}', '${newPassword}', '${email}', '${realname}', '${ip}')`;

        // Check if query sql is OK
        conn.query(sql, (err, result) => {
            if (err) throw err;
            console.log('User registered');
        });
    });
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

// Function to get user IP
const getIp = () => {
    return fetch("https://api.ipify.org/?format=json")
        .then(res => res.json())
        .then(data => data.ip)
        .catch((err) => console.log(err));
}

registerUser('TResesT', 'teste');