const axios = require("axios");
const db = require("./database/dbConfig");
const url =
  "https://dashboard.welldone.org/.netlify/functions/get_momo_status?id=";

// * GET STATUS *
async function getStatus() {
  const pid_sensor = [
    4724,
    4763,
    4728,
    4723,
    4755,
    4725,
    4727,
    4746,
    4764,
    //7418, not found
    4721,
    4747,
    4743,
    4734,
    4717,
    4750,
    4729,
    4749,
    4754,
    4719
  ];
  try {
    // * Loops through sensors
    for (let i = 0; i < pid_sensor.length; i++) {
      const response = await axios.get(`${url}${pid_sensor[i]}`);
      if (Object.keys(response.data).length > 3) {
        status(response.data, pid_sensor[i]);
        // * Loops through statuses and dates
        for (let j = 0; j < response.data.dates.length; j++) {
          date(
            response.data.statuses[j],
            response.data.dates[j],
            pid_sensor[i]
          );
        }
      } else {
      }
    }
  } catch (err) {
    console.log({ getStatus_fail: err.message });
  }
}
getStatus();

// * STATUS SEED *
const status = function(response, pid_sensor) {
  let StatusSeed = {
    pid_sensor: pid_sensor,
    status: response.status,
    count: response.reportCount,
    second: response.reportedSeconds,
    percent: response.reportedPercent,
    total_second: response.totalSeconds,
    unreported_second: response.unreportedSeconds,
    pad_second_one: response.padSeconds[0],
    pad_second_two: response.padSeconds[1],
    pad_second_three: response.padSeconds[2],
    pad_second_four: response.padSeconds[3],
    pad_count_one: response.padCounts[0],
    pad_count_two: response.padCounts[1],
    pad_count_three: response.padCounts[2],
    pad_count_four: response.padCounts[3]
  };
  console.log("StatusSeed |", StatusSeed);
  addStatusSeed(StatusSeed);
};

// * ADD STATUS SEED *
function addStatusSeed(StatusSeed) {
  return (
    db("StatusTable")
      .insert(StatusSeed)
      //.returning("id")
      .then(res => {
        console.log("addStatusSeed_success |", res);
      })
      .catch(error => {
        console.log({ addStatusSeed_fail: error.message });
      })
  );
}

// * DATE SEED *
const date = function(response, date, pid_sensor) {
  console.log(response.count);
  let DateSeed = {
    pid_sensor: pid_sensor,
    date: date,
    count: response.count,
    total: response.total,
    status: response.status,
    percent: response.reportedPercent,
    pad_second_one: response.padSeconds[0],
    pad_second_two: response.padSeconds[1],
    pad_second_three: response.padSeconds[2],
    pad_second_four: response.padSeconds[3],
    pad_count_one: response.padCounts[0],
    pad_count_two: response.padCounts[1],
    pad_count_three: response.padCounts[2],
    pad_count_four: response.padCounts[3]
  };
  console.log("DateSeed |", DateSeed);
  addDateSeed(DateSeed);
};

// * ADD DATE SEED *
function addDateSeed(DateSeed) {
  return (
    db("DateTable")
      .insert(DateSeed)
      //.returning("id")
      .then(res => {
        console.log("addDateSeed_success |", res);
      })
      .catch(error => {
        console.log({ addDateSeed_fail: error.message });
      })
  );
}
