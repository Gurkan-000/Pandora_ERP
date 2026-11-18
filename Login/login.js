(() => {
  const DEMO_USER = { username: 'admin', password: 'Pandora2026!', name: 'Administrador' };
  if (localStorage.getItem('pandora_session')) location.replace('app.html');
  const form = document.getElementById('loginForm');
  const password = document.getElementById('password');
  document.getElementById('togglePassword').addEventListener('click', () => password.type = password.type === 'password' ? 'text' : 'password');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const error = document.getElementById('loginError');
    if (username === DEMO_USER.username && password.value === DEMO_USER.password) {
      localStorage.setItem('pandora_session', JSON.stringify({ username, name: DEMO_USER.name, loggedAt: new Date().toISOString() }));
      location.href = 'app.html';
    } else error.textContent = 'Usuario o contraseña incorrectos. Inténtalo nuevamente.';
  });
})();