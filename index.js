let express = require("express")
let mongoose = require("mongoose")
let employeeModel = require("./models/Employee")

let app = express()
//

mongoose.connect('mongodb+srv://ieo:ieo@cluster0.wwc5r.mongodb.net/employees?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.get('/api/v1/employees', async (req, res) => {
    const employees = await employeeModel.find({});
  
    try {
      res.send(employees);
      res.status(200).send("All employee resources are fetched");
    } catch (err) {
      res.status(500).send(err);
    }
  });

  
app.post('/api/v1/employees', async (req, res) => {
    const employee = new employeeModel(req.body);

    try {
    await employee.save();
    res.send(employee);
    res.status(201).send("A new employee is created");
    } catch (err) {
    res.status(500).send(err);
    }
});


app.get('/api/v1/employees/:id', async (req, res) => {
    const employees = await employeeModel.findById(req.params.id);
  
    try {
      res.send(employees);
      res.status(200).send("One employee resource is fetched");
    } catch (err) {
      res.status(500).send(err);
    }
  });

//Update Record
//PUT
app.put('/api/v1/employee/:id', async (req, res) => {
    try {
    await employeeModel.findByIdAndUpdate(req.params.id, req.body)
    await employeeModel.save()
    res.send(employee)
    res.status(200).send("Employee resource is updated")
    } catch (err) {
    res.status(500).send(err)
    }
})

//Delete Record
app.delete('/api/v1/employee/:id', async (req, res) => {
    try {
    const employee = await employeeModel.findByIdAndDelete(req.params.id)

    if (!employee) res.status(404).send("No employee found")
    res.status(204).send("Employee resource is deleted")
    } catch (err) {
    res.status(500).send(err)
    }
})






    //Insert New Employee
app.get("/add", async (req, res) => {

    let r = {
        _id: new mongoose.Types.ObjectId(),
        first_name: "Emmanuel",
        last_name: "Okonkwo",
        email: "me@myself.com"
    }
    let s = {
        _id: new mongoose.Types.ObjectId(),
        first_name: "Gustavo",
        last_name: "Beltran",
        email: "email@email.com"
    }

    //Create employee model object
    let new_employee1 = new employeeModel(r)
    let new_employee2 = new employeeModel(s)

    try{
        await new_employee1.save(r)
        console.log("Employee Record Saved")
        res.status(200).send("Employee Record Saved")
    }catch(err){
        console.log("ERROR: Employee Record Saved: " + err)
        res.status(500).send(err)
    }
    try{
        await new_employee2.save(s)
        console.log("Employee Record Saved")
        res.status(200).send("Employee Record Saved")
    }catch(err){
        console.log("ERROR: Employee Record Saved: " + err)
        res.status(500).send(err)
    }
})
    
app.get("/", (req, res) => {
    res.send("<h1>Employees Database</h1>")
})




app.listen(8089, () => {
    console.log("Server running at http://localhost:8089/")
})
