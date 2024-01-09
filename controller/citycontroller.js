const Country = require("../model/countryModel");
const State = require("../model/stateModel");
const City = require("../model/cityModel");


var message = "Invalid request";
var status = 0;

const getCountries = async (req, res) => {
    try {
      const countries = await Country.find({
      });
      res.status(200).send({ success: true, msg: "states data", data: countries });
    } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
    }
  };

const getStates = async (req, res) => {
    try {
        // console.log(req.params.id);
      const states = await State.find({
        countryid:req.params.id,
      });
      res.status(200).send({ success: true, msg: "states data", data: states});
    } catch (error) {
      res.status(400).send({ success: false, msg: error.message});
    }
  };

    const postcity = async (req, res) => {
        if (req.body.id) {
            let result = await City.updateOne(
                {
                    _id: req.body.id,
                },
                {
                    $set: {
                        city_name: req.body.city_name,
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
        else {
            const Citydata = new City({
                countryid:req.body.countryid,
                stateid: req.body.stateid,
                city_name: req.body.city_name,
            });
            Citydata
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

    const getCity = async (req, res) => {

        try {
            var finaldata = [];
    
            if (req.query.id != null) {
                filter = {
                    _id: req.query.id,
                };
    
                finaldata = await City.find(filter).exec();
                res.json({
                    status: 1,
                    data: finaldata,
                });
            } else {
    
                City.aggregate([
                    {
                        $lookup: {
                            from: "states",
                            localField: "stateid",
                            foreignField: "_id",
                            as: "states"
                        }
                    },
                    {
                        $lookup: {
                            from: "countries",
                            localField: "countryid",
                            foreignField: "_id",
                            as: "countries"
                        }
                    }
                ]).then((data) => {
    
                    data.forEach(element => {
                        if (element.countries.length > 0) {
                            var tmp = {
                                "_id": element._id,
                                "city_name": element.city_name,
                                "state_name": element.states[0].state_name,
                                "country_name": element.countries[0].country_name
                            }
                            finaldata.push(tmp);
                            // console.log(finaldata);
                        }
                    });
                    res.json({
                        status: 1,
                        data: finaldata,
                    });
                });
            }
        } catch (error) {
            console.log(`database fetch error ${error}`);
        }
    };

const putCity = async (req, res) => {
    let filter = {};
    if (req.query.id != null) {
        filter = {
            _id: req.query.id,
        };
        try {
            let data = await City.deleteOne(filter).exec();
            if (data.deletedCount > 0) {
                (message = "Data delete successfully.. "), (status = 1);
            } else {
                (message = "Data delete not successfully.. "), (status = 0);
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

module.exports = {
    postcity,
    getCity,
    putCity,
    getStates,
    getCountries
};