const container = document.querySelector('.container');
const loginLink =
  document.querySelector('.SignInLink') || document.querySelector('.SignInlink');
const registerLink =
  document.querySelector('.SignUpLink') || document.querySelector('.SignUplink');

registerLink?.addEventListener('click', (event) => {
  event.preventDefault();
  container?.classList.add('active');
});

loginLink?.addEventListener('click', (event) => {
  event.preventDefault();
  container?.classList.remove('active');
});

const API_BASE = 'http://127.0.0.1:8000/api';

function redirectAfterAuth(user) {
  const isAdmin = user?.role === 'admin';

  showMsg(
    isAdmin
      ? 'Authentication successful! Redirecting to dashboard...'
      : 'Authentication successful! Dashboard access is for admin only, redirecting to the website.',
    'success'
  );

  setTimeout(() => {
    window.location.href = isAdmin ? 'admain/WEB.html' : 'index.html';
  }, 900);
}

if (localStorage.getItem('token')) {
  try {
    redirectAfterAuth(JSON.parse(localStorage.getItem('user') || 'null'));
  } catch (_) {
    window.location.href = 'index.html';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.form-box.Login form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleLogin();
    });
  }

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleRegister();
    });
  }
});

async function handleLogin() {
  const inputs = document.querySelectorAll('.form-box.Login input');
  const email = inputs[0]?.value?.trim();
  const password = inputs[1]?.value?.trim();

  if (!email || !password) {
    showMsg('Please fill in all fields.', 'error');
    return;
  }

  const btn = document.querySelector('.form-box.Login .btn');
  if (btn) {
    btn.textContent = 'Signing in...';
    btn.disabled = true;
  }

  try {
    const res = await fetch(API_BASE + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && (data.data?.token || data.token)) {
      const token = data.data?.token || data.token;
      const user = data.data?.user || data.user;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      redirectAfterAuth(user);
      return;
    }

    const msg = data.errors?.email?.[0] || data.message || 'Invalid credentials.';
    showMsg(msg, 'error');
  } catch (_) {
    showMsg('Cannot reach server. Check that Laravel is running on port 8000.', 'error');
  } finally {
    if (btn) {
      btn.textContent = 'Login';
      btn.disabled = false;
    }
  }
}

async function handleRegister() {
  const nameInput = document.querySelector('#register-form input[name="name"]');
  const emailInput = document.getElementById('reg-email');
  const pwdInput = document.getElementById('reg-password');
  const cpwdInput = document.getElementById('reg-confirm-password');
  const errEl = document.getElementById('reg-password-error');
  const submitBtn = document.querySelector('#register-form .btn');

  const name = nameInput?.value?.trim();
  const email = emailInput?.value?.trim();
  const password = pwdInput?.value || '';
  const password_confirmation = cpwdInput?.value || '';

  if (!name || !email || !password || !password_confirmation) {
    showMsg('Please fill in all registration fields.', 'error');
    return;
  }

  if (password !== password_confirmation) {
    if (errEl) {
      errEl.textContent = 'Passwords do not match.';
      errEl.style.display = 'block';
    }
    return;
  }

  if (errEl) {
    errEl.style.display = 'none';
  }

  if (submitBtn) {
    submitBtn.textContent = 'Creating account...';
    submitBtn.disabled = true;
  }

  try {
    const res = await fetch(API_BASE + '/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name, email, password, password_confirmation }),
    });

    const data = await res.json();

    if (res.ok && (data.data?.token || data.token)) {
      const token = data.data?.token || data.token;
      const user = data.data?.user || data.user;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      redirectAfterAuth(user);
      return;
    }

    const msg =
      data.errors?.email?.[0] ||
      data.errors?.password?.[0] ||
      data.errors?.name?.[0] ||
      data.message ||
      'Registration failed.';
    showMsg(msg, 'error');
  } catch (_) {
    showMsg('Cannot reach server. Check that Laravel is running on port 8000.', 'error');
  } finally {
    if (submitBtn) {
      submitBtn.textContent = 'Register';
      submitBtn.disabled = false;
    }
  }
}

function showMsg(text, type) {
  document.querySelector('.login-api-msg')?.remove();

  const div = document.createElement('div');
  div.className = 'login-api-msg';
  div.textContent = text;
  div.style.cssText = `
    position:fixed; top:80px; left:50%; transform:translateX(-50%);
    background:${type === 'success' ? '#16a34a' : '#dc2626'};
    color:#fff; padding:12px 24px; border-radius:10px;
    font-size:0.9rem; font-weight:600; z-index:99999;
    box-shadow:0 4px 20px rgba(0,0,0,0.3);
    animation: fadeInDown 0.3s ease;
  `;
  document.body.appendChild(div);

  if (type !== 'success') {
    setTimeout(() => div.remove(), 4000);
  }
}
