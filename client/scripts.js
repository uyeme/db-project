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
        const response = await fetch('http://localhost:3000/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData),
        });

        if (!response.ok) {
            throw new Error(`Failed to add student: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding student:', error);
        alert('Failed to add the student. Please check the form and try again.');
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
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.dateOfBirth}</td>
            <td>${student.gradeLevel}</td>
            <td>${student.email}</td>
            <td>${student.gender}</td>
            <td>${student.phoneNumber}</td>
            <td>${student.homeAddress}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to handle form submission
async function handleFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Gather form data
    const formData = new FormData(event.target);
    const studentData = Object.fromEntries(formData.entries());

    // Add new student
    const newStudent = await addStudent(studentData);
    if (newStudent) {
        const students = await fetchStudents(); // Refresh student list
        populateStudentTable(students);
        event.target.reset(); // Clear the form
        alert('Student added successfully!');
    }
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', async () => {
    const studentForm = document.getElementById('studentForm');

    // Fetch and populate the student table on page load
    try {
        const students = await fetchStudents();
        if (students) {
            populateStudentTable(students);
        }
    } catch (error) {
        console.error('Error populating students:', error);
    }

    // Attach the form submission handler
    studentForm.addEventListener('submit', handleFormSubmission);
});
