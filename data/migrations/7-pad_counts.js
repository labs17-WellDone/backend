
exports.up = function(knex) {
    return knex.schema.createTable("pad_counts", column => {
        column.increments();
        column.string("counts");
        column
          .integer("history_id")
          .unsigned()
          .references("id")
          .inTable("history")
          .onUpdate("RESTRICT")
          .onDelete("RESTRICT");
    
      });
    };

    id
    date
    sensor_id 
    pad seconds value_1 
    pad seconds value_2
    pad seconds value_3
    pad seconds value_4

joins in the helper function at the sensor_id in the get request 

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("pad_counts");

};