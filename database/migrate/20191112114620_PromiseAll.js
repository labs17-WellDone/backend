exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable("OrgTable", function(table) {
      table.increments("id");
      table.string("org_name").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.string("sms").notNullable();
      table.boolean("isAdmin");
      table.timestamps(true, true);
    }),
    knex.schema.createTable("PumpTable", function(table) {
      table.increments("id");
      table.integer("pump_uid");
      table.integer("sensor_pid");
      table.string("site_uid");
      table.biginteger("org_id");
      table.date("constructed");
      table.integer("depth");
      table.integer("yield");
      table.integer("static");
      table.integer("level_dynamic");
      table.float("latitude");
      table.float("longitude");
      table.timestamps(true, true);
    }),
    knex.schema.createTable("SiteTable", function(table) {
      table.increments("id");
      table.string("uid_site");
      table.string("village");
      table.string("commune");
      table.string("district");
      table.string("province");
      table.timestamps(false, true);
    }),
    knex.schema.createTable("StatusTable", function(table) {
      table.increments("id");
      table.biginteger("pid_sensor");
      table.integer("status");
      table.integer("count");
      table.integer("second");
      table.float("percent");
      table.integer("total_second");
      table.integer("unreported_second");
      table.integer("pad_second_one");
      table.integer("pad_second_two");
      table.integer("pad_second_three");
      table.integer("pad_second_four");
      table.integer("pad_count_one");
      table.integer("pad_count_two");
      table.integer("pad_count_three");
      table.integer("pad_count_four");
      table.timestamps(false, true);
    }),
    knex.schema.createTable("DateTable", function(table) {
      table.primary(["pid_sensor", "date"]);
      table.biginteger("pid_sensor");
      table.date("date");
      table.integer("count");
      table.integer("total");
      table.integer("pad_second_one");
      table.integer("pad_second_two");
      table.integer("pad_second_three");
      table.integer("pad_second_four");
      table.integer("pad_count_one");
      table.integer("pad_count_two");
      table.integer("pad_count_three");
      table.integer("pad_count_four");
      table.float("percent");
      table.integer("status");
      table.timestamps(false, true);
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable("OrgTable"),
    knex.schema.dropTable("PumpTable"),
    knex.schema.dropTable("SiteTable"),
    knex.schema.dropTable("StatusTable"),
    knex.schema.dropTable("DateTable")
  ]);
};
