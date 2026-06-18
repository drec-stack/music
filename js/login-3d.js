// 3D Login Card Interactions
class Login3D {
    constructor() {
        this.loginCard = document.getElementById('login-card');
        this.passwordToggle = document.getElementById('password-toggle');
        this.passwordInput = document.getElementById('password-3d');
        this.loginForm = document.getElementById('login-form-3d');
        this.loginButton = document.getElementById('login-button-3d');
        
        this.init();
    }

    init() {
        this.setup3DEffect();
        this.setupPasswordToggle();
        this.setupFormSubmit();
    }

    setup3DEffect() {
        if (!this.loginCard) return;

        const handleMouseMove = (e) => {
            const rect = this.loginCard.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Convert to rotation values (increased range for more pronounced effect)
            const rotateX = (y / rect.height) * -20; // -10 to 10 degrees
            const rotateY = (x / rect.width) * 20; // -10 to 10 degrees
            
            this.loginCard.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        };

        const handleMouseLeave = () => {
            this.loginCard.style.transform = 'perspective(1500px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        };

        this.loginCard.addEventListener('mousemove', handleMouseMove);
        this.loginCard.addEventListener('mouseleave', handleMouseLeave);
    }

    setupPasswordToggle() {
        if (!this.passwordToggle || !this.passwordInput) return;

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

    setupFormSubmit() {
        if (!this.loginForm || !this.loginButton) return;

        this.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email-3d').value;
            const password = document.getElementById('password-3d').value;
            
            // Show loading state
            this.loginButton.classList.add('loading');
            
            // Simulate API call
            setTimeout(() => {
                this.loginButton.classList.remove('loading');
                
                // Call auth system to handle login
                if (window.auth) {
                    window.auth.login(email, 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop');
                }
            }, 2000);
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.login3D = new Login3D();
});
