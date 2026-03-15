// login-modal.js
class LoginModal {
  constructor() {
    this.isLoggedIn = this.checkLoginStatus();
    this.currentMode = 'login'; // 'login' or 'signup'
    this.redirectUrl = null; // Store redirect URL after login
    this.init();
  }

  init() {
    this.createModalHTML();
    this.attachEventListeners();
    this.setupProtectedPages();
  }

  checkLoginStatus() {
    const user = localStorage.getItem('user');
    return !!user;
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  createModalHTML() {
    if (document.getElementById('login-modal-overlay')) {
      return; // Already created
    }

    const modalHTML = `
      <div id="login-modal-overlay" class="login-modal-overlay">
        <div class="login-modal">
          <button class="login-modal-close">&times;</button>
          <div class="login-modal-left"></div>
          <div class="login-modal-right">
            <!-- Login Form -->
            <div class="login-form">
              <h2>Login Now</h2>
              <p class="login-modal-subtitle">Hi, Welcome Back 👋</p>
              
              <button class="login-google-btn">
                <svg class="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Login With Google
              </button>
              
              <div class="login-divider"><span>or Login With Email</span></div>
              
              <div class="login-error-message" id="login-error"></div>
              <div class="login-success-message" id="login-success"></div>
              
              <form id="login-form-element">
                <div class="login-form-group">
                  <label for="login-email">Email</label>
                  <input type="email" id="login-email" placeholder="Enter your email" required>
                </div>
                
                <div class="login-form-group login-password-group">
                  <label for="login-password">Password</label>
                  <div class="password-input-wrapper">
                    <input type="password" id="login-password" placeholder="Enter your password" required>
                    <button type="button" class="toggle-password-visibility" tabindex="-1" aria-label="Show password">
                      <svg class="eye-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div class="login-forgot-password">
                  <a href="#forgot-password">Forget Password?</a>
                </div>
                
                <button type="submit" class="login-btn">Login</button>
              </form>
              
              <div class="login-signup-section">
                <p>Create New Account <a id="toggle-signup">Sign Up</a></p>
              </div>
            </div>

            <!-- Sign Up Form -->
            <div class="login-signup-form">
              <h2>Sign Up</h2>
              <p class="login-modal-subtitle">Join Us Today 👋</p>
              
              <div class="login-error-message" id="signup-error"></div>
              <div class="login-success-message" id="signup-success"></div>
              
              <form id="signup-form-element">
                <div class="login-form-row">
                  <div class="login-form-group">
                    <label for="signup-firstname">First Name</label>
                    <input type="text" id="signup-firstname" placeholder="First name">
                  </div>
                  <div class="login-form-group">
                    <label for="signup-lastname">Last Name</label>
                    <input type="text" id="signup-lastname" placeholder="Last name">
                  </div>
                </div>
                
                <div class="login-form-group">
                  <label for="signup-email">Email</label>
                  <input type="email" id="signup-email" placeholder="Enter your email" required>
                </div>
                
                <div class="login-form-group login-password-group">
                  <label for="signup-password">Password</label>
                  <div class="password-input-wrapper">
                    <input type="password" id="signup-password" placeholder="Create a password" required>
                    <button type="button" class="toggle-password-visibility" tabindex="-1" aria-label="Show password">
                      <svg class="eye-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="login-form-group login-password-group">
                  <label for="signup-confirm-password">Confirm Password</label>
                  <div class="password-input-wrapper">
                    <input type="password" id="signup-confirm-password" placeholder="Confirm your password" required>
                    <button type="button" class="toggle-password-visibility" tabindex="-1" aria-label="Show password">
                      <svg class="eye-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <button type="submit" class="login-btn">Sign Up</button>
              </form>
              
              <div class="login-signup-section">
                <p>Already have an account? <a id="toggle-login">Login</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  attachEventListeners() {
    // Password show/hide toggle for all password fields
    document.querySelectorAll('.toggle-password-visibility').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const input = this.parentElement.querySelector('input[type="password"], input[type="text"]');
        if (input) {
          if (input.type === 'password') {
            input.type = 'text';
            this.setAttribute('aria-label', 'Hide password');
            this.querySelector('.eye-icon').innerHTML = '<path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.81 21.81 0 0 1 5.06-6.88M1 1l22 22" stroke="currentColor" stroke-width="2" fill="none"/>';
          } else {
            input.type = 'password';
            this.setAttribute('aria-label', 'Show password');
            this.querySelector('.eye-icon').innerHTML = '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>';
          }
        }
      });
    });
    // Toggle between login and signup
    document.getElementById('toggle-signup').addEventListener('click', (e) => {
      e.preventDefault();
      this.switchMode('signup');
    });

    document.getElementById('toggle-login').addEventListener('click', (e) => {
      e.preventDefault();
      this.switchMode('login');
    });

    // Close modal
    document.querySelector('.login-modal-close').addEventListener('click', () => {
      this.closeModal();
    });

    // Close on overlay click
    document.getElementById('login-modal-overlay').addEventListener('click', (e) => {
      if (e.target.id === 'login-modal-overlay') {
        this.closeModal();
      }
    });

    // Form submissions
    document.getElementById('login-form-element').addEventListener('submit', (e) => {
      this.handleLogin(e);
    });

    document.getElementById('signup-form-element').addEventListener('submit', (e) => {
      this.handleSignup(e);
    });

    // Google login button (placeholder)
    document.querySelector('.login-google-btn').addEventListener('click', () => {
      this.handleGoogleLogin();
    });

    // Clear errors when user starts typing in inputs
    document.getElementById('login-email').addEventListener('focus', () => {
      this.clearErrors();
    });

    document.getElementById('login-password').addEventListener('focus', () => {
      this.clearErrors();
    });

    document.getElementById('signup-email').addEventListener('focus', () => {
      this.clearErrors();
    });

    document.getElementById('signup-password').addEventListener('focus', () => {
      this.clearErrors();
    });
  }

  switchMode(mode) {
    this.currentMode = mode;
    
    if (mode === 'signup') {
      // Show signup form, hide login form
      document.querySelector('.login-form').classList.add('active');
      document.querySelector('.login-signup-form').classList.add('active');
    } else {
      // Show login form, hide signup form
      document.querySelector('.login-form').classList.remove('active');
      document.querySelector('.login-signup-form').classList.remove('active');
    }

    // Clear errors
    this.clearErrors();
  }

  async handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
      this.showError('login-error', 'Please fill all fields');
      return;
    }

    const btn = e.target.querySelector('.login-btn');
    btn.classList.add('loading');
    btn.textContent = 'Logging in...';

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Login error response:', data);
        this.showError('login-error', data.error || 'Login failed');
        return;
      }

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      this.isLoggedIn = true;

      this.showSuccess('login-success', 'Login successful!');

      // Close modal and redirect
      setTimeout(() => {
        this.closeModal();
        // Redirect to the page user wanted to access
        const redirectTo = this.redirectUrl || '/discover.html';
        this.redirectUrl = null; // Reset redirect URL
        window.location.href = redirectTo;
      }, 1500);

    } catch (err) {
      console.error('Login error:', err);
      this.showError('login-error', 'Network error. Please check your connection.');
    } finally {
      btn.classList.remove('loading');
      btn.textContent = 'Login';
    }
  }

  async handleSignup(e) {
    e.preventDefault();

    const firstName = document.getElementById('signup-firstname').value.trim();
    const lastName = document.getElementById('signup-lastname').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      this.showError('signup-error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      this.showError('signup-error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      this.showError('signup-error', 'Password must be at least 6 characters');
      return;
    }

    const btn = e.target.querySelector('.login-btn');
    btn.classList.add('loading');
    btn.textContent = 'Creating account...';

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        this.showError('signup-error', data.error || 'Signup failed');
        return;
      }

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      this.isLoggedIn = true;

      this.showSuccess('signup-success', 'Signup successful! Welcome aboard 🎉');

      // Reset form
      document.getElementById('signup-form-element').reset();

      // Close modal and redirect
      setTimeout(() => {
        this.closeModal();
        // Redirect to discover page or redirect URL
        const redirectTo = this.redirectUrl || '/discover.html';
        this.redirectUrl = null; // Reset redirect URL
        window.location.href = redirectTo;
      }, 1500);

    } catch (err) {
      console.error('Signup error:', err);
      this.showError('signup-error', 'An error occurred. Please try again.');
    } finally {
      btn.classList.remove('loading');
      btn.textContent = 'Sign Up';
    }
  }

  handleGoogleLogin() {
    // Placeholder for Google OAuth
    this.showError('login-error', 'Google login coming soon!');
  }

  showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    errorEl.textContent = message;
    errorEl.classList.add('show');
  }

  showSuccess(elementId, message) {
    const successEl = document.getElementById(elementId);
    successEl.textContent = message;
    successEl.classList.add('show');
  }

  clearErrors() {
    document.querySelectorAll('.login-error-message, .login-success-message').forEach(el => {
      el.classList.remove('show');
      el.textContent = '';
    });
  }

  openModal() {
    document.getElementById('login-modal-overlay').classList.add('active');
    this.clearErrors();
    this.switchMode('login');
  }

  closeModal() {
    document.getElementById('login-modal-overlay').classList.remove('active');
  }

  logout() {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    window.location.href = '/index.html';
  }

  setupProtectedPages() {
    // List of pages that require login (except home page)
    const protectedPages = ['discover.html', 'trending.html', 'about.html', 'share.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Check if current page requires login
    if (protectedPages.includes(currentPage) && !this.isLoggedIn) {
      sessionStorage.setItem('redirectTo', window.location.href);
      this.openModal();
    }

    // Update navbar logout if user is logged in
    this.updateNavbar();
  }

  updateNavbar() {
    const navbar = document.querySelector('.navbar-menu');
    if (!navbar) return;

    // Remove existing profile menu if any
    const existingProfile = navbar.querySelector('.profile-menu-item');
    if (existingProfile) {
      existingProfile.remove();
    }

    if (this.isLoggedIn) {
      const user = this.getCurrentUser();
      const profileItem = document.createElement('li');
      profileItem.classList.add('profile-menu-item');
      
      // Use a profile icon (SVG) instead of name
      profileItem.innerHTML = `
        <a href="#" class="profile-link" title="${user.email}">
          <span class="profile-avatar-icon" style="display:inline-block; vertical-align:middle;">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#764ba2"/>
              <circle cx="16" cy="13" r="6" fill="#fff"/>
              <ellipse cx="16" cy="24" rx="9" ry="6" fill="#fff"/>
            </svg>
          </span>
          <svg class="profile-dropdown-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10l5 5 5-5z" fill="currentColor"/>
          </svg>
        </a>
        <div class="profile-dropdown">
          <a href="#" class="profile-menu-link profile-link-item">Profile</a>
          <a href="#" class="profile-menu-link settings-link">Settings</a>
          <a href="#" class="profile-menu-link logout-link">Logout</a>
        </div>
      `;
      navbar.appendChild(profileItem);

      // Toggle dropdown on click
      const profileLink = profileItem.querySelector('.profile-link');
      profileLink.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdown = profileItem.querySelector('.profile-dropdown');
        dropdown.classList.toggle('show');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!profileItem.contains(e.target)) {
          profileItem.querySelector('.profile-dropdown').classList.remove('show');
        }
      });

      // Profile link click handler
      profileItem.querySelector('.profile-link-item').addEventListener('click', (e) => {
        e.preventDefault();
        // Navigate to profile page (you can create this page later)
        console.log('Profile clicked for:', user.email);
        // window.location.href = '/profile.html';
      });

      // Settings link click handler
      profileItem.querySelector('.settings-link').addEventListener('click', (e) => {
        e.preventDefault();
        // Navigate to settings page (you can create this page later)
        console.log('Settings clicked for:', user.email);
        // window.location.href = '/settings.html';
      });

      // Logout link click handler
      profileItem.querySelector('.logout-link').addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
          this.logout();
        }
      });
    }
  }

  // Public method to check login before navigation
  static requireLogin(event, redirectUrl) {
    const modal = window.loginModal;
    if (!modal.isLoggedIn) {
      event.preventDefault();
      modal.redirectUrl = redirectUrl; // Store the redirect URL
      modal.openModal();
      return false;
    }
    if (redirectUrl) window.location.href = redirectUrl;
    return true;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  window.loginModal = new LoginModal();
});
