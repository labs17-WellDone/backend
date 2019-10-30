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


select * FROM history 
JOIN pad_counts 
JOIN pad_seconds  
where history.id=pad_counts.history_id 
AND history.id=pad_seconds.history_id