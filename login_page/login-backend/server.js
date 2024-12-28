
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5005;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',          // Your MySQL host
    user: 'root',               // Your MySQL username
    password: 'Prasad@007',     // Your MySQL password
    database: 'login_db',       // Your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// API Route for Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send({ message: 'Server Error' });
        } else if (results.length > 0) {
            res.status(200).send({ message: 'Login Successful' });
        } else {
            res.status(401).send({ message: 'Invalid Credentials' });
        }
    });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



// // 1. Setup Express and Middleware
// const express = require('express');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = 5001;


// // 2. Configure Middleware
// app.use(cors());
// app.use(bodyParser.json());



// // 3. Connect to MySQL
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root', // MySQL username
//     password: '', // MySQL password
//     database: 'login_db', // The database you created earlier
// });

// // Connect to MySQL
// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err.stack);
//         return;
//     }
//     console.log('Connected to MySQL database.');
// });



// // 4. Create the Login API
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
//     db.query(sql, [username, password], (err, results) => {
//         if (err) {
//             return res.status(500).send({ error: 'Database query failed' });
//         }
//         if (results.length > 0) {
//             res.send({ message: 'Login successful!' });
//         } else {
//             res.status(401).send({ message: 'Invalid credentials' });
//         }
//     });
// });


// // 5. Start the Server

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
