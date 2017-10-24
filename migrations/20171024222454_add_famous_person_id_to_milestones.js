const pg = require('pg');
const settings = require("../settings"); 
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

exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('milestones',function(table) {
            table.integer('famous_person_id').unsigned();
            table.foreign('famous_person_id').references('famous_people.id');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('milestones',function(table) {
            table.dropColumn('famous_person_id')
        })
    ])
};
