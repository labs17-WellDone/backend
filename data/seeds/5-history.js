exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("history")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("history").insert([
        {
          date: "2019-05-07",
          count: 2,
          total: 789456,
          status: 3,
          sensor_id: 1,
          reported_percent: 12,
          pad_count_1: 1,
          pad_count_2: 1,
          pad_count_3: 1,
          pad_count_4: 1,
          pad_seconds_1: 1,
          pad_seconds_2: 1,
          pad_seconds_3: 1,
          pad_seconds_4: 1
        },
        {
          date: "2019-08-15",
          count: 2,
          total: 9456,
          status: 3,
          sensor_id: 2,
          reported_percent: 12,
          pad_count_1: 1,
          pad_count_2: 1,
          pad_count_3: 1,
          pad_count_4: 1,
          pad_seconds_1: 1,
          pad_seconds_2: 1,
          pad_seconds_3: 1,
          pad_seconds_4: 1
        },
        {
          date: "2019-10-19",
          count: 1,
          total: 45600,
          status: 2,
          sensor_id: 3,
          reported_percent: 12,
          pad_count_1: 1,
          pad_count_2: 1,
          pad_count_3: 1,
          pad_count_4: 1,
          pad_seconds_1: 1,
          pad_seconds_2: 1,
          pad_seconds_3: 1,
          pad_seconds_4: 1
        }
      ]);
    });
};
