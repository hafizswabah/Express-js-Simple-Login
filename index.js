const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const isAuthenticated=require('./Middleware/Authentication.js')
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true
}));


// Route for user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
        req.session.user = username;
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Protected route
app.get('/protected', isAuthenticated, (req, res) => {
    res.json({ message: 'Welcome to the protected route!' });
});

// Handle 404 - Not Found
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
