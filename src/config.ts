const assert = require("assert");
const dotenv = require("dotenv");

// read in the .env file
dotenv.config();

// capture the environment variables the application needs
const { 
    PORT,
    HOST,
    HOST_URL,
    SQL_SERVER,
    SQL_DATABASE,
    SQL_USER,
    SQL_PASSWORD,
    SQL_POOL_NAME,
    SQL_DRIVER,
    SQL_ENCRYPT
} = process.env;

// const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

// validate the required configuration information
assert(PORT, "PORT configuration is required.");
assert(HOST, "HOST configuration is required.");
assert(HOST_URL, "HOST_URL configuration is required.");
assert(SQL_SERVER, "SQL_SERVER configuration is required.");
assert(SQL_DATABASE, "SQL_DATABASE configuration is required.");
assert(SQL_USER, "SQL_USER configuration is required.");
assert(SQL_PASSWORD, "SQL_PASSWORD configuration is required.");
assert(SQL_POOL_NAME, "SQL_EATS_NAME configuration is required.");
assert(SQL_DRIVER, "SQL_DRIVER configuration is required.");
assert(SQL_ENCRYPT, "SQL_ENCRYPT configuration is required.");

// export the configuration information
module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    sql: {
        server: SQL_SERVER,
        database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD,
        dirver: SQL_DRIVER,
        pool_name: SQL_POOL_NAME,
        options: {
            encrypt: SQL_ENCRYPT
        }
    }
};