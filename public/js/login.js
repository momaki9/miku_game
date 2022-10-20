const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#user-login-email').value.trim();
    const password = document.querySelector('#user-login-password').value.trim();
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/home');
      } else {
        alert(response.statusText);
      }
    }
};

document.querySelector('.login-page').addEventListener('submit', loginFormHandler);
