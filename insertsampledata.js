const { 
    Students, Teachers, Classes, Attendance, Grades, Donors, Scholarships, Applicants, Awards, FundDisbursements 
} = require('./models');

(async () => {
    try {
        // Insert Student Data
        const student = await Students.create({
            first_name: 'John',
            last_name: 'Doe',
            date_of_birth: '2005-05-15',
            grade_level: '10th Grade',
            email_address: 'jdoe@gmail.com',
            gender: 'Male',
            phone_number: '1234567890',
            home_address: '123 Elm Street, Springfield',
        });
        console.log('Student record inserted successfully:', student.toJSON());

        // Insert Teacher Data
        const teacher = await Teachers.create({
            first_name: 'Jane',
            last_name: 'Smith',
            subject_specialization: 'Mathematics',
            email_address: 'jane.smith@gmail.com',
            phone_number: '9876543210',
        });
        console.log('Teacher record inserted successfully:', teacher.toJSON());

        // Insert Class Data
        const classData = await Classes.create({
            teacher_id: 9, // Use the teacher's ID dynamically
            class_name: 'Algebra 101',
            description: 'Basic Algebra',
            schedule: 'Mon-Wed-Fri 10:00-11:00',
        });
        console.log('Class record inserted successfully:', classData.toJSON());

        // Insert Attendance Data
        const attendance = await Attendance.create({
            student_id: 2, // Use the student's ID dynamically
            class_id: 3, // Use the class ID dynamically
            date: new Date(),
            status: 'Present',
        });
        console.log('Attendance record inserted successfully:', attendance.toJSON());

        // Insert Grade Data
        const grade = await Grades.create({
            student_id: 4,
            class_id: 5,
            grade: 'A',
            comments: 'Excellent performance!',
        });
        console.log('Grade record inserted successfully:', grade.toJSON());

        // Insert Donor Data
        const donor = await Donors.create({
            donor_name: 'Charity Org',
            email_address: 'charity@org.com',
            phone_number: '123-456-7890',
            organization: 'Charity Org Inc.',
        });
        console.log('Donor record inserted successfully:', donor.toJSON());

        // Insert Scholarship Data
        const scholarship = await Scholarships.create({
            scholarship_name: 'Academic Excellence Scholarship',
            criteria_description: 'Awarded to students with outstanding academic performance',
            amount: 5000,
            donor_id: 1, // Use the donor's ID dynamically
        });
        console.log('Scholarship record inserted successfully:', scholarship.toJSON());

        // Insert Applicant Data
        const applicant = await Applicants.create({
            student_id: 3,
            scholarship_id: 5, // Use the scholarship's ID dynamically
            application_date: new Date(),
            status: 'Pending',
        });
        console.log('Applicant record inserted successfully:', applicant.toJSON());

        // Insert Award Data
        const award = await Awards.create({
            student_id: 2,
            scholarship_id: 4,
            award_date: new Date(),
            award_amount: 1500.00,
        });
        console.log('Award record inserted successfully:', award.toJSON());

        // Insert Fund Disbursement Data
        const fundDisbursement = await FundDisbursements.create({
            award_id: 6, // Use the award's ID dynamically
            disbursement_date: new Date(),
            amount_disbursed: 1500.00,
        });
        console.log('Fund Disbursement record inserted successfully:', fundDisbursement.toJSON());
    } catch (error) {
        console.error('Error inserting records:', error.message);
    }
})();
