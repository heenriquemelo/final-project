var mongoose = require('mongoose'); // loads module.
var db = mongoose.connection; 

// Establishes connection to db. If run locally, u must create a new terminal window, and run the db from there.
// The command "mongod --port <port number>" takes care of the work.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:12345');

// Once the connection is made, execute the callback.
db.once('open', function() {
    console.log("Connected to database");
});

var userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    stocks: { type: Array } // [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stock' }]
});

// Based on the schema, create a certain model.
// Many models can share the same schema. 'Client' could be another model in this case.
var User = mongoose.model('User', userSchema);

module.exports = {
    User: User
}
