// Demo credentials for educational/development purposes only.
// In a production application, credential validation must be performed
// server-side via a secure authentication endpoint, and session state
// should be managed using HTTP-only cookies or JWT tokens rather than
// client-side storage.
const DEMO_USERNAME = 'admin';
const DEMO_PASSWORD = 'admin123';

document.addEventListener('DOMContentLoaded', () => {
    // If already logged in, go straight to the main app
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'index.html';
        return;
    }

    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const loginBtn = document.getElementById('login-btn');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;

        if (!username || !password) {
            showLoginError('Please enter both username and password.');
            return;
        }

        if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('loggedInUser', username);
            window.location.href = 'index.html';
        } else {
            showLoginError('Invalid username or password. Please try again.');
            document.getElementById('login-password').value = '';
            document.getElementById('login-password').focus();
        }
    });

    function showLoginError(message) {
        loginError.textContent = message;
        loginError.style.display = 'block';
        setTimeout(() => {
            loginError.style.display = 'none';
        }, 5000);
    }
});
