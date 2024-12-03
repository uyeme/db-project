// Function to fetch student data from the server
async function fetchStudents() {
    try {
        const response = await fetch('http://localhost:3000/api/students');
        if (!response.ok) {
            throw new Error(`Failed to fetch students: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching student data:', error);
        alert('Unable to fetch students. Please try again later.');
        return [];
    }
}

// Function to add a new student to the server
async function addStudent(studentData) {
    try {
        console.log('Sending student data to API:', studentData);

        const response = await fetch('http://localhost:3000/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData),
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const error = await response.json();
            console.error('API error:', error);
            throw new Error(error.error || 'Failed to add student');
        }

        const result = await response.json();
        console.log('Student added successfully:', result);
        return result;
    } catch (error) {
        console.error('Error in addStudent:', error);
        alert('Error adding student: ' + error.message);
        return null;
    }
}

// Function to populate the student table
function populateStudentTable(students) {
    const tableBody = document.querySelector('#studentTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    students.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.first_name}</td>
            <td>${student.last_name}</td>
            <td>${student.date_of_birth}</td>
            <td>${student.grade_level}</td>
            <td>${student.email_address}</td>
            <td>${student.gender}</td>
            <td>${student.phone_number}</td>
            <td>${student.home_address}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to handle form submission
async function handleFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Gather form data
    const formData = new FormData(event.target); // `event.target` refers to the form
    const studentData = Object.fromEntries(formData.entries());
    console.log('Form data collected:', studentData);

    // Validate form data
    const requiredFields = ['first_name', 'last_name', 'date_of_birth', 'grade_level', 'email_address', 'gender', 'phone_number', 'home_address'];
    for (const field of requiredFields) {
        if (!studentData[field]) {
            alert(`Please fill out the ${field} field.`);
            return;
        }
    }

    try {
        // Add new student
        const newStudent = await addStudent(studentData);
        if (newStudent) {
            console.log('New student added successfully:', newStudent);

            // Refresh student list
            const students = await fetchStudents();
            console.log('Fetched updated student list:', students);

            populateStudentTable(students);
            event.target.reset(); // Clear the form
            alert('Student added successfully!');
        }
    } catch (error) {
        console.error('Error handling form submission:', error);
        alert('Failed to add student.');
    }
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', async () => {
    const studentForm = document.getElementById('studentForm');

    // Fetch and populate the student table on page load
    try {
        const students = await fetchStudents();
        if (students.length > 0) {
            populateStudentTable(students);
        }
    } catch (error) {
        console.error('Error populating students:', error);
    }

    // Attach the form submission handler
    studentForm.addEventListener('submit', handleFormSubmission);
});
