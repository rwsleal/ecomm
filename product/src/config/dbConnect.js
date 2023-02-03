import mongoose from 'mongoose';

mongoose.connect('mongodb://admin:secret@localhost:27017/?authMechanism=DEFAULT');
const db = mongoose.connection;

export default db;