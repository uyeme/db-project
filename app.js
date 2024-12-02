const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, Students, Teachers, Classes, Attendance, Grades, Donors, Scholarships, Applicants, Awards, FundDisbursements } = require('./models'); // Import models
const createCrudRoutes = require('./crudRoutes'); // Assuming this is a helper for CRUD routes
const errorHandler = require('./middleware/errorHandler'); // Custom middleware for error handling
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://127.0.0.1:5500', optionsSuccessStatus: 200 }));
app.use(bodyParser.json());
app.use(express.json());

// Authenticate and connect to the database
sequelize.authenticate()
    .then(() => {
        console.log('Connection to MySQL database has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

// Sync database
(async () => {
    try {
        await sequelize.sync(); // Sync Sequelize models with the database
        console.log('Database synced successfully!');
    } catch (error) {
        console.error('Error syncing the database:', error);
    }
})();

// CRUD routes for various models
createCrudRoutes(app, 'students', Students);
createCrudRoutes(app, 'teachers', Teachers);
createCrudRoutes(app, 'classes', Classes);
createCrudRoutes(app, 'attendance', Attendance);
createCrudRoutes(app, 'grades', Grades);
createCrudRoutes(app, 'donors', Donors);
createCrudRoutes(app, 'scholarships', Scholarships);
createCrudRoutes(app, 'applicants', Applicants);
createCrudRoutes(app, 'awards', Awards);
createCrudRoutes(app, 'fund_disbursements', FundDisbursements);

// Custom endpoints for Students
app.post('/students', async (req, res) => {
    const { first_name, last_name, date_of_birth, grade_level, email_address, phone_number, home_address } = req.body;

    // Validate input
    if (!first_name || !last_name || !date_of_birth || !grade_level || !email_address || !phone_number || !home_address) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newStudent = await Students.create({
            first_name,
            last_name,
            date_of_birth,
            grade_level,
            email_address,
            phone_number,
            home_address
        });
        res.status(201).json(newStudent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error inserting student' });
    }
});


app.get('/api/students', async (req, res) => {
    try {
        const students = await Students.findAll();
        res.json(students);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.put('/api/students/:id', async (req, res) => {
    try {
        const updated = await Students.update(req.body, { where: { id: req.params.id } });
        if (updated[0] > 0) {
            res.json({ message: 'Student updated successfully' });
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
        } catch (err) {
        console.error('Error updating student:', err);
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/students/:id', async (req, res) => {
    try {
        const deleted = await Students.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Student deleted successfully' });
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).json({ error: err.message });
    }
});

// Error Handling Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
