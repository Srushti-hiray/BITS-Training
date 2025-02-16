interface LoginResponse {
  token: string;
}

const subt = document.getElementById('login-form') as HTMLFormElement;
subt.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = (document.getElementById('username') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  try {
    const response = await axios.post<LoginResponse>('https://fakestoreapi.com/auth/login', {
      username: username,
      password: password
    });

    localStorage.setItem('authToken', response.data.token);
    window.location.href = 'index.html';
  } catch (error) {
    const errmess = document.getElementById('error-message') as HTMLElement;
    errmess.style.display = 'block';
    console.error('Login failed:', error);
  }
});