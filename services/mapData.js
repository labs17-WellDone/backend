const Data = require("../assets/cache/pumps.json");
const PumpModel = require("../api/pumps/pumps.model");
const router = require("express").Router();
const knex = require("knex");
const config = require("../knexfile");
const db = require("../data/dbConfig");


//const getPumps = Data.pumps.map(pump => console.log("getPumps", pump))



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


   const seedJSONHistory = () => {
     Data.pumps.map(data => {
        // console.log('current data map = ', data);
        let sensor_ID = ''; 
        let count = 0; 
        let total = 0; 
        let status = 0;
        let date = '';
        let pad_seconds = [];
        let pad_counts = []; 
        let reported_percent = 0;
        let history = {};

        if(typeof data.statuses.statuses != 'undefined'){

          sensor_ID = data.id;
          count = data.statuses.statuses.count;
          total = data.statuses.statuses.total;
          status = data.statuses.statuses.status;
          date = data.statuses.statuses.date;
          pad_seconds = JSON.stringify(data.statuses.statuses.pad_seconds);
          pad_counts = JSON.stringify(data.statuses.statuses.pad_counts);
          reported_percent = data.statuses.statuses.reported_percent;
          
          
          history = {
            sensor_ID,
            count,
            total,
            status,
            date,
            pad_seconds,
            pad_counts,
            reported_percent
          }  
          let currentId = history.sensor_id   
          addHistory(history);
        }
      console.log("*******************history****************", history);
       //addStatus(history);
     })
   };

  seedJSONHistory()

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
      });
  }

  function addCounts(counts) {
    return db("counts")
    .insert(counts)
  }

  function addSeconds(seconds) {
    return db("pad_seconds")
    .insert(seconds)
  }

  function getHistoryFilter(filter) {
    return db("history")
    .where(filter)

    
  }

  function addStatusTest(filter) {
    try {
    return db("history")
    .where(filter)
    .first()
    } catch (err) {
      console.log(err.message)

    }
  }

  function addPadCounts(counts) {
    return db("pad_counts")
      .insert(counts)
      .returning("id")
      .then(res => {
        console.log(res);
      });
  }

  function addPadSeconds(seconds) {
    return db("pad_seconds")
      .insert(seconds)
      .returning("id")
      .then(res => {
        console.log(res);
      });
  }

// function addStatus (history){
//   const {sensor_id} = history
//   addStatusTest({sensor_id})
//     .then(res => {
//       const getPadCounts = Data.pumps.forEach((data, idx) => {
//         const insertPadCounts = data.statuses.statuses.pad_counts.map(item => {
//           let counts = {
//           history_id: res.id,
//           counts: item
//           }
//           console.log(counts)
//           addPadCounts(counts, console.log("help"))
//         })
//       })
//       const getPadSeconds = Data.pumps.forEach((data, idx) => {
//         const insertPadSeconds = data.statuses.statuses.pad_seconds.map(item => {
//           let seconds = {
//           history_id: res.id,
//           seconds: item
//           }
//           console.log(seconds)
//           addPadSeconds(seconds, console.log("help"))
//         })
//       })
//     })
//   }
        
module.exports = seedJSONPumps, seedJSONHistory, seedJSONSensors;
