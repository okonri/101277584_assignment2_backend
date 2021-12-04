let mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: {
        type: String,
        required: true,
        trim: true,
        //lowercase: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        //lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        //validate: [ isEmail, 'invalid email' ]
        //validate: [validateEmail, 'Please provide a valid email address'],
        //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    }
    //total: {
      //  type: Number,
        //default: 0.0,
        //validate(v) {
          //  if(v < 0) throw new Error("Total Marks can't negative")
        //}
    
})

const Employee  = mongoose.model("Employee", EmployeeSchema)
module.exports = Employee