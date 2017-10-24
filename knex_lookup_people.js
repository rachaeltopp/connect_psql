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

let name = process.argv[2];

function queryDb () {
    knex('famous_people').where('first_name', name).orWhere('last_name', name).asCallback(function(err, rows) {
        if (err) {
            return console.error("error running query", err);
        }
        console.log('Searching...');
        console.log(`Found ${rows.length} person(s) by the name ${name}:`);
        iterateArray(rows);
    })
};

function iterateArray (rows) {
    rows.forEach((element, index) => {
        console.log(`- ${element.id}: ${element.first_name} ${element.last_name}, born '${element.birthdate.toLocaleDateString()}'`);
    })
};

queryDb();
