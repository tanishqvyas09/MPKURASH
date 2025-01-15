const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('dotenv').config();
mongoose.connect(process.env.DB_URI);

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:tanishq%40123@kurashstudentdb.sxdbc.mongodb.net/?retryWrites=true&w=majority&appName=KurashStudentDB');




// MongoDB schema and model
const StudentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,
    weight: Number,
    address: String,
    aadharNumber: { type: String, unique: true },
    fathersName: String
});

const Student = mongoose.model('Student', StudentSchema);

// Route for registration form
app.get('/', (req, res) => {
    res.send(`
        <form action="/register" method="post">
            First Name: <input type="text" name="firstName" required><br>
            Last Name: <input type="text" name="lastName" required><br>
            Age: <input type="number" name="age" required><br>
            Gender: <input type="text" name="gender" required><br>
            Weight: <input type="number" name="weight" required><br>
            Address: <input type="text" name="address" required><br>
            Aadhar Number: <input type="text" name="aadharNumber" required><br>
            Father's Name: <input type="text" name="fathersName" required><br>
            <input type="submit" value="Register">
        </form>
    `);
});

// Route to handle form submission
app.post('/register', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.send('Registration successful!');
    } catch (error) {
        res.status(400).send('Error registering student');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

