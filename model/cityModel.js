const mongooes = require('mongoose');

const cityModel= mongooes.model('city',
    mongooes.Schema({
        countryid: mongooes.Schema.Types.ObjectId,
        stateid: mongooes.Schema.Types.ObjectId,
        city_name: String,
        
    })
);

module.exports=cityModel;