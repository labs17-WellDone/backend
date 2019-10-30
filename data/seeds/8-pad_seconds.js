
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pad_seconds').del()
    .then(function () {
      // Inserts seed entries
      return knex('pad_seconds').insert([
        {history_id: 1, seconds_1: 54, seconds_2: 22, seconds_3: 3454554, seconds_4: 46,},
        {history_id: 2, seconds_1: 53, seconds_2: 66, seconds_3: 9934544, seconds_4: 16},
        {history_id: 3, seconds_1: 34, seconds_2: 334, seconds_3: 734454, seconds_4: 454993}
      ]);
    });
};
