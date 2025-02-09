document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username: username,
        password: password
      });
  
      localStorage.setItem('authToken', response.data.token);
      window.location.href = 'index.html';
    } catch (error) {
      
      document.getElementById('error-message').style.display = 'block';
      console.error('Login failed:', error);
    }
  });