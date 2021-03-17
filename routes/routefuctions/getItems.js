const mongoose = require('mongoose');
const dbs = mongoose.models;

module.exports = async (query, type) => {
    const data = await dbs[type].find(query);
    console.log(data)
    return data;
}