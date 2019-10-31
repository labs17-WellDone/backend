exports.up = function(knex) {
  return knex.schema.createTable("history", column => {
    column.increments();
    column.date("date").nullable();
    column.integer("count").nullable();
    column.integer("total").nullable();
    column.integer("status").nullable();
    column.integer("sensor_id");
    column.integer("reported_percent").nullable();
    column.integer("pad_count_1").nullable();
    column.integer("pad_count_2").nullable();
    column.integer("pad_count_3").nullable();
    column.integer("pad_count_4").nullable();
    column.integer("pad_seconds_1").nullable();
    column.integer("pad_seconds_2").nullable();
    column.integer("pad_seconds_3").nullable();
    column.integer("pad_seconds_4").nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("history");
};
