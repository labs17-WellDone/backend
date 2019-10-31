const Data = require("../assets/cache/pumps.json");
const PumpModel = require("../api/pumps/pumps.model");
const router = require("express").Router();
const knex = require("knex");
const config = require("../knexfile");
const db = require("../data/dbConfig");
const newData = require("../services/jsonCache")

function addPump(pump) {
  return db("pumps")
    .insert(pump)
    .returning("id")
    .then(res => {
      console.log(res);
    });
}

function addSensor(sensor) {
  return db("sensors")
    .insert(sensor)
    .returning("id")
    .then(res => {
      console.log(res);
    });
}

function addHistory(history) {
  return db("history")
    .insert(history)
    .returning("id")
    .then(res => {
      console.log(res);
      console.log("THIS IS IT", history)
    });
}


function addStatus(history) {
  return db("history")
    .join("pad_counts")
    .returning("history")
    .then(res => {
      console.log(res);
    })
}


const seedJSONSensors = () => {
  Data.pumps.map(data => {
    const {
      id,
      finish_construction,
      well_depth,
      yield,
      static,
    } = data;
    const sensor = {
      physical_id: id,
      data_finished: finish_construction,
      depth: well_depth,
      yield: yield,
      static: static
    };
    addSensor(sensor);
  });
};

seedJSONSensors()

const seedJSONPumps = () => {
  Data.pumps.map(data => {
    const {
      id,
      latitude,
      longitude,
      village: { village, commune, district, province }
    } = data;
    const pump = {
      sensor_ID: id,
      latitude: latitude,
      longitude: longitude,
      country_name: village,
      commune_name: commune,
      district_name: district,
      province_name: province
    };
    addPump(pump);
  });
};

seedJSONPumps();

// const seedJSONHistory = () => {
//   let history = getPumps;
//     addHistory(history);
//     addStatus(history);
//   }
// ;

// seedJSONHistory()







//seedJSONHistory,
module.exports = 
seedJSONPumps, 
// seedJSONHistory, 
seedJSONSensors;






// // helper 1 save date
// date_array_from_api.forEach((date, index) => {
//   saveStatus(status_array[index], date, sensor_id)

// } )


// saveStatus(status, date, sensor_id) {
//   status_id = status_db_helper({'date': date,'seonsor_id': sensor_id,'count': 'blah', 'count': 'blah'}) // non_array fields and the helper has to return the id of the status that is a key
//   pad_counts_db_helper({'status_id': status_id, 'pad_count_1': status.pad_count[0]})
//   pad_second_db_helper({'status_id': status_id, 'pad_seconds_1': status.pad_count[0]})

// }

// // helper 2 save pad counts to query
// pad_counts_db_helper(pad_counts_object){
// save_to_db
// }

// //helper 3 save pad seconds
// pad_seconds_db_helper(pad_seconds_object){
//   save_to_db
// }

// // helper 4 query the data
// getStatus(date, sensor_id) {
//   status = Knex('status').where({date: date, sensor_id: sensor_id})
//   counts = Knex('pad_counts').where({status_id: status.id})
//   seconds = Knex('pad_seconds').where({status_id: status.id})
//   return {...status, counts: counts, seconds: seconds}
// }