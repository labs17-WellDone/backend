const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pad_seconds').del()
    .then(function () {
      // Inserts seed entries
      return knex('pad_seconds').insert([
        // id 1
        {seconds: 28, history_id: 1},
        // id 2
        {seconds: 18, history_id: 1},       
          // id 3
          {seconds: 10, history_id: 1},  
           // id 4
           {seconds: 5, history_id: 1},   

            // id 1
        {seconds: 28, history_id: 1},
        // id 2
        {seconds: 18, history_id: 1},       
          // id 3
          {seconds: 10, history_id: 1},  
           // id 4
           {seconds: 5, history_id: 1},   
      ]);
    });
};
pad_seconds.seconds[0]




