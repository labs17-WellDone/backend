const fs = require("fs")
const axios = require("axios")
const prismic = require("./prismicData")
const moment = require("moment")
const history_model = require("../api/history/history.model")
const pumps_model = require("../api/pumps/pumps.model")

async function cacheResource(resourceName, resourceLoader) {
  const resource = await resourceLoader()
  const json = JSON.stringify(resource)
  const path = __dirname + "/../assets/cache/" + resourceName + ".json"
  return new Promise((resolve, reject) => {
    fs.writeFile(path, json, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

async function main() {
  try {
    console.log("Fetching Init")
    await cacheResource("pumps", getPumps)
    await cacheResource("longStore", createStore)
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

const url =
  "https://dashboard.welldone.org/.netlify/functions/get_momo_status?id="
async function getPumps() {
    let pumps = {}
    const prismicPumps = await prismic.getDocs("pump")
    await asyncForEach(prismicPumps.results, async pump => {
      let village = null
      if (pump.data && pump.data.village.id && !pump.data.village.isBroken) {
        village = await prismic.getVillage(pump.data.village.id)
      }
      if (pump.data && pump.data.latitude && pump.data.longitude) {
        pumps_model.addPump({
          org_id: 1, // Must be updated when feature is added
          country_name: village.id,
          province_name: village.province,
          district_name: village.district,
          commune_name: village.commune,
          latitude: pump.data.latitude,
          longitude: pump.data.longitude,
          sensor_ID: pump.uid
        });
        pumps = {
          ...pumps,
          [pump.uid]: {
            ...pump.data,
            village,
          },
        }
      } else {
        console.log(`Missing data on pump #${pump.uid}`)
      }
    })

    let results = []
    await asyncForEach(Object.keys(pumps), async (pump, index) => {
      try {
        const res = await axios.get(`${url}${pump}`)
        let newData = {}
        res.data
          ? res.data.dates.forEach((date, index) => {
            history_model.insert({
              date: date,
              count: res.data.statuses[index].count,
              total: res.data.statuses[index].total,
              status: res.data.statuses[index].status,
              sensor_id: pump,
              reported_percent: res.data.statuses[index].reportedPercent,
              pad_count_1: res.data.statuses[index].padCounts[0],
              pad_count_2: res.data.statuses[index].padCounts[1],
              pad_count_3: res.data.statuses[index].padCounts[2],
              pad_count_4: res.data.statuses[index].padCounts[3],
              pad_seconds_1: res.data.statuses[index].padSeconds[0],
              pad_seconds_2: res.data.statuses[index].padSeconds[1],
              pad_seconds_3: res.data.statuses[index].padSeconds[2],
              pad_seconds_4: res.data.statuses[index].padSeconds[3]
            })
              newData = {
                ...newData,
                statuses: {
                  date: date,
                  count: res.data.statuses[index].count,
                  total: res.data.statuses[index].total,
                  status: res.data.statuses[index].status,
                  pad_counts: res.data.statuses[index].padCounts,
                  pad_seconds: res.data.statuses[index].padSeconds,
                  reported_percent:res.data.statuses[index].reportedPercent
                },
              }
            })
          : {}
           
        results.push({
          id: pump,
          ...pumps[pump],
          status: res.data.status,
          statuses: newData,
        })
      } catch (err) {
        console.error(`Error on pump #${pump}`)
        results.push({ id: pump, ...pumps[pump], status: 0, error: "500" })
      }
    })
    console.log("Fetching Pumps Success")
    return { lastFetch: moment().unix(), pumps: results }
  } 
 

async function createStore() {

  const data = require("../assets/cache/pumps.json")
  let pumps = {}
  data.pumps.forEach(({ id, dates, statuses }, index) => {

  
    pumps = {
      ...pumps,
      [id]: {
       
        ...data.pumps.find(pump => pump.id === id).statuses,
      },
    }
  })

  return { pumps }
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
     
main();


module.exports = {
  getPumps
}
