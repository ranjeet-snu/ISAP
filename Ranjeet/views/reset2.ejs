<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        form {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 300px;
        }

        input {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            box-sizing: border-box;
        }

        button {
            background-color: #4caf50;
            color: #fff;
            padding: 10px 15px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }

        #resetSuccessMessage {
            display: none;
            margin-top: 20px;
        }

        #passwordUpdateMessage {
            display: none;
            margin-top: 20px;
        }

        #passwordUpdateMessage.green {
            color: green;
        }

        #passwordUpdateMessage.red {
            color: red;
        }
    </style>
</head>
<body>
    <form id="forgotPasswordForm">
        <h2>Forgot Password</h2>
        <p>Enter your email address to reset your password.</p>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <button type="button" onclick="initiateReset()">Reset Password</button>
    </form>

    <div id="resetSuccessMessage">
        <p>Password reset successful! You can now set a new password below.</p>
        <form id="resetPasswordForm">
            <label for="newPassword">New Password:</label>
            <input type="password" id="newPassword" name="newPassword" required>
            <button type="button" onclick="confirmReset()">Confirm Reset</button>
        </form>
        <div id="passwordUpdateMessage"></div>
    </div>

    <script>
        function initiateReset() {
            var email = document.getElementById('email').value;

            // Send a request to the server to initiate the password reset process
            fetch('/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Hide the form and display the success message
                    document.getElementById('forgotPasswordForm').style.display = 'none';
                    document.getElementById('resetSuccessMessage').style.display = 'block';
                } else {
                    // Display an error message if the email is not found
                    alert(data.message);
                }
            })
            .catch(error => console.error('Error:', error));
        }

        function confirmReset() {
            var email = document.getElementById('email').value;
            var newPassword = document.getElementById('newPassword').value;

            // Send a request to the server to confirm the password reset
            fetch('/confirm-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, newPassword: newPassword })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Display a success message
                    document.getElementById('passwordUpdateMessage').innerText = 'Password reset successful!';
                    document.getElementById('passwordUpdateMessage').className = 'green';
                    document.getElementById('passwordUpdateMessage').style.display = 'block';
                } else {
                    // Display an error message
                    document.getElementById('passwordUpdateMessage').innerText = 'Error resetting password. Please try again.';
                    document.getElementById('passwordUpdateMessage').className = 'red';
                    document.getElementById('passwordUpdateMessage').style.display = 'block';
                }
            })
            .catch(error => console.error('Error:', error));
        }
    </script>
</body>
</html>
