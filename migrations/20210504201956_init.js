
exports.up = function(knex) {
    return knex.schema.createTable('persons', (table) => {
        table.increments('id').primary();
        table.string('firstName');
        table.string('lastName');
        table.string('age')
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('persons');

};
