const Country = require("../model/countryModel");
const State = require("../model/stateModel");
const City = require("../model/cityModel");

var message = "Invalid request";
var status = 0;

const postCountries = async (req, res) => {
  if(req.body.id){
     let result = await Country.updateOne(
        {
          _id: req.body.id,
        },
        {
          $set: {
          country_name: req.body.country_name,
          },
        }
      );
      if ((await result.acknowledged) == true) {
        res.json({
          message: "Data Updated Successfully..",
          status: 1,
        });
      } else {
        res.json({
          message: message,
          status: status,
        });
      }
    }
  else{
  const countrydata = new Country({
    country_name: req.body.country_name,
  });
  countrydata
    .save()
    .then(() => {
      message = "data save";
      status = 1;
      res.json({
        message: message,
        status: status,
      });
    })
    .catch((err) => {
      console.log(err.message);
      message = err._message;
      res.json({
        message: message,
        status: status,
      });
    });
};
};

const getCountries = async (req, res) => {
  let filter = {};
  if (req.query.id != null) {
    filter = {
      _id: req.query.id,
    };
  }
  try {
    let data = await Country.find(filter).exec();
    res.json({
      status: 1,
      data: data,
    });
  } catch (error) {
    console.log(`database fetch error ${error}`);
  }
};

const putcountries = async (req, res) => {
  let filter = {};
  if (req.query.id != null) {
    filter = {
      _id: req.query.id,
    };
    try {
      let data = await Country.deleteOne(filter).exec();
      if (data.deletedCount > 0) {
        (message = "Data delete successfully.. "), (status = 1);
      } else {
        message = "Data delete not successfully.. ";
      }
      res.json({
        message: message,
        status: status,
      });
    } catch (error) {
      console.log(`database fetch error ${error}`);
    }
  } else {
    res.json({
      message: "id is required",
      status: 0,
    });
  }
};

const getStates = async (req, res) => {
  try {
    const states = await State.find({
      country_short_name: req.body.country_code,
    });
    res.status(200).send({ success: true, msg: "states data", data: states });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};
const getCities = async (req, res) => {
  try {
    const cities = await City.find({ state_name: req.body.state_name });
    res.status(200).send({ success: true, msg: "cities data", data: cities });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

module.exports = {
  postCountries,
  getCountries,
  putcountries,
  getStates,
  getCities,
};
