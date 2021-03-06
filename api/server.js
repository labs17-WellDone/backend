const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const secrets = require("../config/secrets.js");
const request = require('request')


console.log("environment:", secrets.environment);
const server = express();

// import database functions

const mapData = require("../services/mapData");

//routes
const authRouter = require("./auth/auth.router");
const orgRouter = require("./organizations/organizations.router");
const pumpsRouter = require("./pumps/pumps.router");
const accountsRouter = require("./accounts/accounts.router");
const smsNotificationsRouter = require("./sms_notifications/sms_notifications.router");
const sensorsRouter = require("./sensors/sensors.router");
const historyRouter = require("./history/history.router");
const padSecondsRouter = require("./pad_seconds/pad_seconds.router")     
const padCountsRouter = require("./pad_counts/pad_counts.router") 
const lastFetchRouter = require("./lastFetch/lastFetch.router")  

var reqTimer = setTimeout(function wakeUp() {
  request("https://welldone-db.herokuapp.com/api/auth/login", function() {
     console.log("WAKE UP DYNO");
  });
  return reqTimer = setTimeout(wakeUp, 1200000);
}, 1200000);

reqTimer


server.use(express.json());
server.use(helmet());
server.use(cors());
// server.use(cors({ credentials: true, origin: `http://localhost:3000/`})); 
// server.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });


server.use("/api/auth", authRouter);
server.use("/api/orgs", orgRouter);
server.use("/api/pumps", pumpsRouter);
server.use("/api/sensors", sensorsRouter);
server.use("/api/accounts", accountsRouter);
server.use("/api/sms_notifications", smsNotificationsRouter);
server.use("/api/history", historyRouter);
server.use("/api/pad_counts", padCountsRouter);
server.use("/api/pad_seconds", padSecondsRouter)
server.use("/api/last_fetch", lastFetchRouter)

//update database functions
// server.use(mapData.getUpdated)



server.get("/", (req, res) => {
  res.status(200).json(`Welcome to the Jungle`);
});


module.exports = server;