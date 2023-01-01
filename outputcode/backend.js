

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a schema
const valueSchema = new mongoose.Schema({
  value: String
});

// Create a model
const Value = mongoose.model('Value', valueSchema);

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create a route
app.post('/value', (req, res) => {
  const value = new Value(req.body);
  value.save()
    .then(item => {
      res.send("Value saved to database");
    })
    .catch(err => {
      res.status(400).send("Unable to save to database");
    });
});

// Listen for requests
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});