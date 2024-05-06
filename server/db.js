const mongoose = require('mongoose');
const {DB_URI} = require('./config');

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 10000
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

module.exports = mongoose;