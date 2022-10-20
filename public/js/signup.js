const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('.user-signup-name').value.trim();
    const email = document.querySelector('.user-signup-email').value.trim();
    const password = document.querySelector('.user-signup-password').value.trim();
    const value = name.substring(0, 6)
    if (name && email && password) {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
};

document.querySelector('.signup-page').addEventListener('submit', signupFormHandler);