const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pad_counts').del()
    .then(function () {
      // Inserts seed entries
      return knex('pad_counts').insert([
         // id 1
         {counts: 55, history_id: 1},
         // id 2
         {counts: 45, history_id: 1},       
           // id 3
           {counts: 35, history_id: 1},  
            // id 4
            {counts: 25, history_id: 1},   
           // id 5
         {counts: 60, history_id: 2},
         // id 6
         {counts: 30, history_id: 2},       
           // id 7
           {seconds: 20, history_id: 2},  
            // id 8
            {seconds: 10, history_id: 2},   
      ]);
    });
};
hadd
