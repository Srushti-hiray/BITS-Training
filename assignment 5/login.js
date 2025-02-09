document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      // Send login request to the API
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username: username,
        password: password
      });
  
      // Save the token to localStorage
      localStorage.setItem('authToken', response.data.token);
  
      // Redirect to the main page
      window.location.href = 'index.html';
    } catch (error) {
      // Show error message if login fails
      document.getElementById('error-message').style.display = 'block';
      console.error('Login failed:', error);
    }
  });