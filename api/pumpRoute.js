const router = require("express").Router();
const db = require("../database/dbConfig");

//* [BASE ROUTE] /api/pump

//* [METHOD] GET
//* [ROUTE] /
//* [DESCRIPTION] To retrieve a list of pumps.
//* [TABLE] PumpTable, SiteTable, StatusTable, OrgTable
router.get("/", (req, res) => {
  try {
    db("PumpTable as pt")
      .join("StatusTable", "StatusTable.pid_sensor", "pt.sensor_pid")
      .join("SiteTable as st", "st.uid_site", "pt.site_uid")
      //.join("OrgTable as ot, ot.id", "pt.org_id")
      .select()
      .then(data => {
        res.send(data);
      });
  } catch (error) {
    console.log({ message: error.message });
  }
});

//* [METHOD] GET
//* [ROUTE] /:id
//* [DESCRIPTION] To retrieve a pump using the sensor_pid
//* [TABLE] PumpTable, SiteTable, StatusTable, OrgTable
//* Gets one pump
router.get("/:id", (req, res) => {
  try {
    db("PumpTable as pt")
      .where({ sensor_pid: req.params.id })
      .join("StatusTable", "StatusTable.pid_sensor", "pt.sensor_pid")
      .join("SiteTable as st", "st.uid_site", "pt.site_uid")
      //.join("OrgTable as ot, ot.id", "pt.org_id")
      .select()
      .returning("*")
      .then(data => {
        res.send(data);
      });
  } catch (error) {
    console.log({ message: error.message });
  }
});

//* [METHOD] GET
//* [ROUTE] /:id/date
//* [DESCRIPTION] To retrieve a pump with dates.
//* [TABLE] PumpTable, SiteTable, DateTable, OrgTable
router.get("/:id/date", (req, res) => {
  try {
    db("PumpTable as pt")
      .where({ sensor_pid: req.params.id })
      .join("DateTable as dt", "dt.pid_sensor", "pt.sensor_pid")
      .join("SiteTable as st", "st.uid_site", "pt.site_uid")
      //.join("OrgTable as ot, ot.id", "pt.org_id")
      .select()
      .returning("*")
      .then(data => {
        res.send(data);
      });
  } catch (error) {
    console.log({ message: error.message });
  }
});

//* [METHOD] POST
//* [ROUTE] /
//* [DESCRIPTION] To create a new pump.
//* [TABLE] PumpTable
router.post("/", (req, res) => {
  try {
    db.insert(req.body)
      .returning("*")
      .into("PumpTable")
      .then(data => {
        res.send(data);
      });
  } catch (error) {
    console.log({ message: error.message });
  }
});

//* [METHOD] PATCH
//* [ROUTE] /:id
//* [DESCRIPTION] To modify an existing pump using the sensor_pid.
//* [TABLE] PumpTable
router.patch("/:id", (req, res) => {
  try {
    db("PumpTable")
      .where({ sensor_pid: req.params.id })
      .update(req.body)
      .returning("*")
      .then(data => {
        res.json(data);
      });
  } catch (error) {
    console.log({ message: error.message });
  }
});

//* [METHOD] DELETE
//* [ROUTE] /:id
//* [DESCRIPTION] To remove a pump.
//* [TABLE] PumpTable
router.delete("/:id", (req, res) => {
  try {
    db("PumpTable")
      .where({ sensor_pid: req.params.id })
      .del()
      .then(() => {
        res.json({ success: true });
      });
  } catch (error) {
    console.log({ message: error.message });
  }
});

module.exports = router;
