/**
 * This is pasword decription and password checking
 * for Authme Reloaded plugin
 * This code was converted from original
 * php files by me
 * Radoslav Rác | Nezo96
 * 
 * You can use this password checking in your projects
 */

// Require sha256
const saltedSha256 = require('salted-sha256');

// This is password that we got from DB
const dbPassword = '$SHA$dc991e87ddb674f1$9c27ce343ccee87be3dca9c1f7aac79abe2f71abd7cb2825006f0a64bafdd361';

// This is our password that we want validate
const pass = 'test';

// Get salt from that password
function getSaltFromPassword(password) {

    // Split password after $
    const salt = password.split('$');

    // Our password salt is on 2. position in array. Array starts from 0
    //console.log('Password salt: ' + salt[2]);
    return salt[2];
}

// Generate new password with our salt and givent password
function generateNewPassword(salt, password) {

    // Hash given password with SHA256
    const firstHash = saltedSha256(password);

    // Hash given password with SHA256 agan and add our salt
    const secondHash = saltedSha256(firstHash, salt);

    // Concatinate all together
    const finalPassword = '$SHA$' + salt + '$' + secondHash;
    //console.log(finalPassword);

    return finalPassword;
}

// Now check our given password with password from database
function checkPassword(givenPassword, dbPassword) {

    // Save salt we got from dbPassword to saltFromPw constant
    const saltFromPw = getSaltFromPassword(dbPassword);

    // Save our new generated password to genNewPw constant
    const genNewPw = generateNewPassword(saltFromPw, givenPassword);

    // Check if our new generated password is same as password from db - dbPassword
    if (genNewPw === dbPassword) {

        // If yes
        console.log('Passwords are same');
    } else {

        // If no
        console.log('Passwords are different');
    }

}

// This function will generate encripted password to simulate password from database for testing
function genRandomPw(password) {
    // Hash given password with SHA256
    const firstHash = saltedSha256(password);

    // Hash given password with SHA256 agan and add our salt
    const secondHash = saltedSha256(firstHash, 'dc991e87ddb674f1');

    // Concatinate all together
    const finalPassword = '$SHA$' + 'dc991e87ddb674f1' + '$' + secondHash;
    console.log(finalPassword);
}

//genRandomPw('test');
checkPassword(pass, dbPassword);