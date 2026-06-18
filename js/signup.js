// User Database System (localStorage-based)
class UserDatabase {
    constructor() {
        this.dbKey = 'musicPlatformUsers';
        this.currentUserKey = 'musicPlatformCurrentUser';
        this.init();
    }

    init() {
        // Initialize users array if not exists
        if (!localStorage.getItem(this.dbKey)) {
            localStorage.setItem(this.dbKey, JSON.stringify([]));
        }
    }

    getUsers() {
        return JSON.parse(localStorage.getItem(this.dbKey) || '[]');
    }

    saveUsers(users) {
        localStorage.setItem(this.dbKey, JSON.stringify(users));
    }

    addUser(userData) {
        const users = this.getUsers();
        
        // Check if email or username already exists
        if (users.some(u => u.email === userData.email || u.username === userData.username)) {
            return { success: false, message: 'Email или имя пользователя уже заняты' };
        }

        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        this.saveUsers(users);
        return { success: true, user: newUser };
    }

    loginUser(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem(this.currentUserKey, JSON.stringify(user));
            return { success: true, user };
        }
        
        return { success: false, message: 'Неверный email или пароль' };
    }

    getCurrentUser() {
        const userStr = localStorage.getItem(this.currentUserKey);
        return userStr ? JSON.parse(userStr) : null;
    }

    logout() {
        localStorage.removeItem(this.currentUserKey);
    }

    hasRegisteredUsers() {
        return this.getUsers().length > 0;
    }
}

// Signup Modal System
class SignupModal {
    constructor() {
        this.modal = document.getElementById('signup-modal');
        this.backdrop = document.getElementById('signup-backdrop');
        this.passwordToggle = document.getElementById('password-toggle');
        this.passwordInput = document.getElementById('password');
        this.signupButton = document.getElementById('signup-button');
        this.loginLink = document.getElementById('login-link');
        this.db = new UserDatabase();
        
        this.init();
    }

    init() {
        // Check if there are any registered users
        const currentUser = this.db.getCurrentUser();
        
        if (!currentUser && !this.db.hasRegisteredUsers()) {
            // Show modal on page load for new users
            this.showSignupModal();
        } else if (!currentUser) {
            // If there are users but not logged in, show login modal
            this.showLoginModal();
        }

        // Ensure body class is set if modal is visible
        if (this.modal && !this.modal.classList.contains('hidden')) {
            document.body.classList.add('signup-modal-open');
            document.body.style.overflow = 'hidden';
        }

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Password toggle
        if (this.passwordToggle && this.passwordInput) {
            this.passwordToggle.addEventListener('click', () => {
                const isPassword = this.passwordInput.type === 'password';
                this.passwordInput.type = isPassword ? 'text' : 'password';
                
                const icon = this.passwordToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-eye', 'fa-eye-slash');
                    icon.classList.add(isPassword ? 'fa-eye-slash' : 'fa-eye');
                }
            });
        }

        // Signup button
        if (this.signupButton) {
            this.signupButton.addEventListener('click', () => this.handleSignup());
        }

        // Login link
        if (this.loginLink) {
            this.loginLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLoginModal();
            });
        }

        // Close on backdrop click
        if (this.backdrop) {
            this.backdrop.addEventListener('click', () => {
                // Don't allow closing without signup
                alert('Пожалуйста, создайте аккаунт для продолжения');
            });
        }

        // Prevent ESC key from closing
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                e.preventDefault();
                alert('Пожалуйста, создайте аккаунт для продолжения');
            }
        });
    }

    showModal() {
        if (this.modal) {
            // Add body class immediately before showing modal
            document.body.classList.add('signup-modal-open');
            document.body.style.overflow = 'hidden';
            
            this.modal.classList.remove('hidden');
            this.modal.classList.add('active');
        }
    }

    hideModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
            this.modal.classList.add('hidden');
            
            // Remove body class after hiding modal
            document.body.classList.remove('signup-modal-open');
            document.body.style.overflow = '';
        }
    }

    showLoginModal() {
        // Convert signup modal to login modal
        const title = document.querySelector('.signup-title');
        const subtitle = document.querySelector('.signup-subtitle');
        const button = document.getElementById('signup-button');
        const footerText = document.querySelector('.signup-footer-text');
        
        if (title) title.textContent = 'Войти';
        if (subtitle) subtitle.textContent = 'Добро пожаловать обратно!';
        if (button) button.textContent = 'Войти';
        if (footerText) footerText.innerHTML = 'Нет аккаунта? <a href="#" class="signup-link" id="signup-link">Создать аккаунт</a>';
        
        // Hide unnecessary fields
        const firstNameGroup = document.getElementById('firstName').closest('.form-group');
        const lastNameGroup = document.getElementById('lastName').closest('.form-group');
        const usernameGroup = document.getElementById('username').closest('.form-group');
        const termsGroup = document.querySelector('.checkbox-group');
        
        if (firstNameGroup) firstNameGroup.style.display = 'none';
        if (lastNameGroup) lastNameGroup.style.display = 'none';
        if (usernameGroup) usernameGroup.style.display = 'none';
        if (termsGroup) termsGroup.style.display = 'none';
        
        // Add event listener for signup link
        const signupLink = document.getElementById('signup-link');
        if (signupLink) {
            signupLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSignupModal();
            });
        }
        
        // Change button handler to login
        if (button) {
            button.onclick = () => this.handleLogin();
        }
        
        this.showModal();
    }

    showSignupModal() {
        // Convert back to signup modal
        const title = document.querySelector('.signup-title');
        const subtitle = document.querySelector('.signup-subtitle');
        const button = document.getElementById('signup-button');
        const footerText = document.querySelector('.signup-footer-text');
        
        if (title) title.textContent = 'Создать аккаунт';
        if (subtitle) subtitle.textContent = 'Добро пожаловать! Создайте аккаунт для начала работы';
        if (button) button.textContent = 'Создать аккаунт';
        if (footerText) footerText.innerHTML = 'Уже есть аккаунт? <a href="#" class="login-link" id="login-link">Войти</a>';
        
        // Show all fields
        const firstNameGroup = document.getElementById('firstName').closest('.form-group');
        const lastNameGroup = document.getElementById('lastName').closest('.form-group');
        const usernameGroup = document.getElementById('username').closest('.form-group');
        const termsGroup = document.querySelector('.checkbox-group');
        
        if (firstNameGroup) firstNameGroup.style.display = '';
        if (lastNameGroup) lastNameGroup.style.display = '';
        if (usernameGroup) usernameGroup.style.display = '';
        if (termsGroup) termsGroup.style.display = '';
        
        // Re-add event listener for login link
        const loginLink = document.getElementById('login-link');
        if (loginLink) {
            loginLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLoginModal();
            });
        }
        
        // Change button handler back to signup
        if (button) {
            button.onclick = () => this.handleSignup();
        }
        
        this.showModal();
    }

    handleSignup() {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const terms = document.getElementById('terms').checked;

        // Validation
        if (!firstName || !lastName || !username || !email || !password) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        if (!terms) {
            alert('Пожалуйста, примите условия использования');
            return;
        }

        // Save user to database
        const result = this.db.addUser({
            firstName,
            lastName,
            username,
            email,
            password
        });

        if (result.success) {
            // Auto-login after signup
            this.db.loginUser(email, password);
            
            // Hide modal and restore music player
            this.hideModal();
            
            console.log('Signup successful:', result.user);
        } else {
            alert(result.message);
        }
    }

    handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validation
        if (!email || !password) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        // Login user
        const result = this.db.loginUser(email, password);

        if (result.success) {
            // Hide modal and restore music player
            this.hideModal();
            
            console.log('Login successful:', result.user);
        } else {
            alert(result.message);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.signupModal = new SignupModal();
});
