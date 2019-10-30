
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pad_counts').del()
    .then(function () {
      // Inserts seed entries
      return knex('pad_counts').insert([
        {history_id: 1, counts_1: 34, counts_2: 11,counts_3: 3554,counts_4: 76,},
        {history_id: 2, counts_1: 23, counts_2: 3433,counts_3: 9934,counts_4: 56},
        {history_id: 3, counts_1: 15, counts_2: 4534, counts_3: 734,counts_4: 993}
      ]);
    });
};
