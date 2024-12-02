const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./config'); // Adjust the path as necessary

// Define Models
const Students = sequelize.define('Students', {
   student_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,  // Ensures this field is required
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    grade_level: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    email_address: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    home_address: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
}, {
    tableName: 'Students',
    timestamps: false
});

const Teachers = sequelize.define('Teachers', {
    teacher_id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    first_name: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    last_name: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    subject_specialization: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
    },
    email_address: { 
        type: DataTypes.STRING(100), 
        allowNull: false, 
        validate: { 
            isEmail: true 
        } 
    },
    phone_number: { 
        type: DataTypes.STRING(20), 
        allowNull: false 
    }
}, {
    tableName: 'teachers',
    timestamps: false
});

// Define the Classes model
const Classes = sequelize.define('Classes', {
    class_id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    class_name: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    description: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    schedule: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    teacher_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'teachers', key: 'teacher_id' } 
    }
}, {
    tableName: 'classes',
    timestamps: false
});

// Define the Attendance model
const Attendance = sequelize.define('Attendance', {
    attendance_id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    student_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'students', key: 'student_id' } 
    },
    class_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'classes', key: 'class_id' } 
    },
    date: { 
        type: DataTypes.DATE, 
        allowNull: false 
    },
    status: { 
        type: DataTypes.STRING(10), 
        allowNull: false 
    }
}, {
    tableName: 'attendance',
    timestamps: false
});

const Grades = sequelize.define('Grades', {
    grade_id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    student_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'students', key: 'student_id' } 
    },
    class_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'classes', key: 'class_id' } 
    },
    grade: { 
        type: DataTypes.CHAR(2), 
        allowNull: false 
    },
    comments: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    }
}, {
    tableName: 'grades',
    timestamps: false
});

const Donors = sequelize.define('Donors', {
    donor_id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    donor_name: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
    },
    email_address: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    phone_number: { 
        type: DataTypes.STRING(20), 
        allowNull: false 
    },
    organization: { 
        type: DataTypes.STRING(255), 
        allowNull: true 
    }
}, {
    tableName: 'donors',
    timestamps: false
});

const Scholarships = sequelize.define('Scholarships', {
    scholarship_id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    scholarship_name: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    criteria_description: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    amount: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    },
    donor_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { 
            model: 'donors', 
            key: 'donor_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        } 
    }
}, {
    tableName: 'scholarships',
    timestamps: false
});

const Applicants = sequelize.define('Applicants', {
    application_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Automatically increments the application_id
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Students',  // Refers to the Students table
            key: 'student_id',  // Foreign key references student_id
        },
        onDelete: 'CASCADE',  // Optional: Deletes applicants when a student is deleted
    },
    scholarship_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Scholarships',  // Refers to the Scholarships table
            key: 'scholarship_id',  // Foreign key references scholarship_id
        },
        onDelete: 'CASCADE',  // Optional: Deletes applicants when a scholarship is deleted
    },
    application_date: {
        type: DataTypes.DATEONLY,  // Use DATEONLY for date fields without time
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
        allowNull: false,
        defaultValue: 'Pending',  // Default value is Pending
    },
}, {
    tableName: 'Applicants',  // Explicitly set the table name
    timestamps: false,        // Disable automatic timestamp fields (createdAt, updatedAt)
});

const Awards = sequelize.define('Awards', {
    award_id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    student_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'students', key: 'student_id' } 
    },
    scholarship_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'scholarships', key: 'scholarship_id' } 
    },
    award_date: { 
        type: DataTypes.DATE, 
        allowNull: false 
    },
    award_amount: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    }
}, {
    tableName: 'awards',
    timestamps: false
});

const FundDisbursements = sequelize.define('FundDisbursements', {
    disbursement_id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    award_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'awards', key: 'award_id' } 
    },
    disbursement_date: { 
        type: DataTypes.DATE, 
        allowNull: false 
    },
    amount_disbursed: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    }
}, {
    tableName: 'fund_disbursements',
    timestamps: false
});

// Define relationships
Teachers.hasMany(Classes, { foreignKey: 'teacher_id' }); 
Classes.belongsTo(Teachers, { foreignKey: 'teacher_id' });

Classes.hasMany(Attendance, { foreignKey: 'class_id' });
Classes.hasMany(Grades, { foreignKey: 'class_id' });

Students.hasMany(Grades, { foreignKey: 'student_id' }); 
Grades.belongsTo(Students, { foreignKey: 'student_id' }); 

Classes.hasMany(Grades, { foreignKey: 'class_id' }); 
Grades.belongsTo(Classes, { foreignKey: 'class_id' }); 

Students.hasMany(Attendance, { foreignKey: 'student_id' }); 
Attendance.belongsTo(Students, { foreignKey: 'student_id' }); 

Classes.hasMany(Attendance, { foreignKey: 'class_id' }); 
Attendance.belongsTo(Classes, { foreignKey: 'class_id' });

Donors.hasMany(Scholarships, { foreignKey: 'donor_id' });
Scholarships.belongsTo(Donors, { foreignKey: 'donor_id' });

Students.hasMany(Applicants, { foreignKey: 'student_id' });
Applicants.belongsTo(Students, { foreignKey: 'student_id' });

Scholarships.hasMany(Applicants, { foreignKey: 'scholarship_id' });
Applicants.belongsTo(Scholarships, { foreignKey: 'scholarship_id' });

Students.hasMany(Awards, { foreignKey: 'student_id' });
Awards.belongsTo(Students, { foreignKey: 'student_id' });

Scholarships.hasMany(Awards, { foreignKey: 'scholarship_id' });
Awards.belongsTo(Scholarships, { foreignKey: 'scholarship_id' });



sequelize.sync({ force: false }).then(() => {
    console.log('Database synced successfully!');
}).catch(error => {
    console.error('Error syncing the database:', error);
});

module.exports = { sequelize, Students, Teachers, Classes, Attendance, Grades, Donors, Scholarships, Applicants, Awards, FundDisbursements };
