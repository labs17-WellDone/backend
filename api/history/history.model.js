const knex = require("knex");
const config = require("../../knexfile");
const db = require("../../data/dbConfig.js");

const find = () => {
  try {
    return db("history");
  } catch (err) {
    console.log(err.message);
  }
};
const findMore = (id) => {
  try {
    return db("history")
    .join("pad_counts")
    .where({"pad_counts.history_id":id})
    // .and({"pad_seconds.history_id":id})
  }
  catch (err) {
    console.log(err.message);
}
}

const findById = id => {
  try {
    return db("history")
      .where({ id })
      .first();
  } catch (err) {
    console.log(err.message);
  }
};

function getHistoryBySensorId(id) {
  try {
    return db("history as h")
      .join("sensors as s", "s.id", "h.sensor_id")
      .where({ sensor_id: id });
  } catch (err) {
    res.status(400).json(err.message);
  }
}

const insert = async historical => {
  try {
    await db("history").insert(historical);
  } catch (err) {
    console.log(err);
  }
};

const update = async (changes, id) => {
  try {
    changes
      ? await db("history")
          .where({ id })
          .first()
          .update(changes)
      : null;
  } catch (err) {
    console.log(err);
  }
};

const remove = async id => {
  try {
    const historical = findById(id);
    if (historical) {
      const deleted = await db("history")
        .where({ id })
        .del();
      return deleted;
    } else {
      console.log(
        "There was an error finding an history with the provided id."
      );
    }
  } catch (err) {
    console.log(err.message);
  }
};

const rm = async (id) => {
  console.log(id);
  let sensor = {}
  let statuses = {}

  await db('pumps').where('sensor_ID', id).then(p => sensor = p);


  await db('history').where('sensor_id', id).then(s => statuses = s);
  console.log(statuses)

  sensor = {'sensor': sensor, 'history': statuses}
  return sensor
}

module.exports = {
  find,
  findMore,
  findById,
  insert,
  update,
  remove,
  getHistoryBySensorId,
  rm
};


