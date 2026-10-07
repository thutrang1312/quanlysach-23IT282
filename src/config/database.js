const mongoose = require('mongoose');

const readConnection = mongoose.createConnection(
    process.env.MONGODB_READ_URI || process.env.MONGO_READ_URI
);

const writeConnection = mongoose.createConnection(
    process.env.MONGODB_WRITE_URI || process.env.MONGO_WRITE_URI
);

readConnection.on('connected', () => {
    console.log('MongoDB READ connected');
});

readConnection.on('error', (error) => {
    console.error('MongoDB READ error:', error.message);
});

writeConnection.on('connected', () => {
    console.log('MongoDB WRITE connected');
});

writeConnection.on('error', (error) => {
    console.error('MongoDB WRITE error:', error.message);
});

module.exports = {
    readConnection,
    writeConnection
};