const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
       required:[true,'firstname is required'],
    },
    lastname:{
        type: String,
       required:[true,'lastname is required'],
    },
  email: {
    type: String,
    required: [true, 'Email is required.'],
  },
  hiredate:{
    type: String, //(year-month-date)
     required:[true,'hire date is required'],
     default: Date
  },
  jobposition:{
    type: String,
       required:[true,' name is required'],
  },
  salary:{
    type: Number,
    required: [true, 'Salary is required.'],
    min: [1000, 'Salary must be a greater than 1000 number.'],
  }
},{  timestamps: true});

module.exports = mongoose.model('User', userSchema);