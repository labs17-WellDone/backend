const history_model = require("../api/history/history.model")
const pumps_model = require("../api/pumps/pumps.model")

// history_model.rm(4715).then(data => console.log("outside"))

console.log(history_model.rm(4715))

// pumps_model.addPump({
//     org_id: 1,
//     country_name: '2st country',
//     province_name: '2st province',
//     district_name: '2st district',
//     commune_name: '2st commune',
//     latitude: 1.234444,
//     longitude: 2.3445
// })


// pumps_model.getPumpById(4715).then(data => console.log(data))