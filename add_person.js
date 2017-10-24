const pg = require('pg');
const settings = require("./settings"); 
const knex = require('knex')({
    client: 'pg',
    connection: {
        user     : settings.user,
        password : settings.password,
        database : settings.database,
        host     : settings.hostname,
        port     : settings.port,
        ssl      : settings.ssl
    }
});

let first_name = process.argv[2];
let last_name = process.argv[3];
let birthdate = process.argv[4];

function insertDb () {
    knex('famous_people').insert({first_name, last_name, birthdate}).asCallback(function (err, rows) {
        if (err) {
            return console.error("error", err);
        }
        console.log('done');
        knex.destroy();
    });
};

insertDb();