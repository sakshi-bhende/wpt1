const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the form on the /form route
app.get('/form', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>User Form</title>
            <script>
                function validateForm() {
                    const userId = document.getElementById("userId").value;
                    const userName = document.getElementById("userName").value;
                    const designation = document.getElementById("designation").value;

                    if (!userId || !userName || !designation) {
                        alert("All fields are required.");
                        return false;
                    }
                    return true;
                }
            </script>
        </head>
        <body>
            <h1>Create User Input Form</h1>
            <form action="/submit" method="POST" onsubmit="return validateForm()">
                <label for="userId">User ID:</label>
                <input type="text" id="userId" name="userId" required><br><br>
    
                <label for="userName">User Name:</label>
                <input type="text" id="userName" name="userName" required><br><br>
    
                <label for="designation">Designation:</label>
                <input type="text" id="designation" name="designation" required><br><br>
    
                <button type="submit">Submit</button>
            </form>
        </body>
        </html>
    `);
});

// Handle the form submission on the /submit route
app.post('/submit', (req, res) => {
    const { userId, userName, designation } = req.body;

    if (!userId || !userName || !designation) {
        return res.status(400).send("All fields are required.");
    }

    // Log the data to the console
    console.log("Form Data:");
    console.log("User ID:", userId);
    console.log("User Name:", userName);
    console.log("Designation:", designation);

    // Respond with a success message
    res.send(`
        <h1>Form Submitted Successfully!</h1>
        <p>User ID: ${userId}</p>
        <p>User Name: ${userName}</p>
        <p>Designation: ${designation}</p>
        <a href="/form">Go back to the form</a>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
