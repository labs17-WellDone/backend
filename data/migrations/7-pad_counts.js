
exports.up = function(knex) {
    return knex.schema.createTable("pad_counts", column => {
        column.increments();
        column.integer("counts_1");
        column.integer("counts_2");
        column.integer("counts_3");
        column.integer("counts_4");      
        column
          .integer("history_id")
          .unsigned()
          .references("id")
          .inTable("history")
          .onUpdate("RESTRICT")
          .onDelete("RESTRICT");
    
      });
    };
  

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("pad_counts");

};
