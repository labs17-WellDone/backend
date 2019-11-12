const Prismic = require("prismic-javascript");
const db = require("./database/dbConfig");
const prismicURL = "https://welldone-dashboard.cdn.prismic.io/api/v2";

// * GET PUMP *
const getPump = async function() {
  try {
    const api = await Prismic.getApi(prismicURL);
    const result = await api.query([
      Prismic.Predicates.at("document.type", "pump")
    ]);
    pump(result.results);
  } catch (error) {
    console.log({ getPump_fail: error.message });
  }
};
getPump();

// * PUMP SEED *
const pump = function(pump) {
  for (let i = 0; i < pump.length; i++) {
    let PumpSeed = {
      pump_uid: pump[i].id,
      sensor_pid: pump[i].uid,
      site_uid: pump[i].data.village.id,
      constructed: pump[i].data.finish_construction,
      depth: pump[i].data.well_depth,
      yield: pump[i].data.yield,
      static: pump[i].data.static,
      level_dynamic: pump[i].data.level_dynamic,
      latitude: pump[i].data.latitude,
      longitude: pump[i].data.longitude
    };
    //console.log("PumpSeed: ", PumpSeed);
    addPumpSeed(PumpSeed);
  }
};

// * ADD PUMP SEED *
function addPumpSeed(PumpSeed) {
  return (
    db("PumpTable")
      .insert(PumpSeed)
      //.returning("id")
      .then(res => {
        console.log("addPumpSeed_success |", res);
      })
      .catch(error => {
        console.log({ addPumpSeed_fail: error.message });
      })
  );
}
