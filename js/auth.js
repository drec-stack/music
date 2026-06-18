// Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.selectedAvatar = null;
        this.init();
    }

    init() {
        // Load user from localStorage
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                console.log('User loaded from localStorage:', this.currentUser);
            } catch (e) {
                console.error('Error parsing saved user:', e);
                localStorage.removeItem('currentUser');
            }
        }

        // Update UI based on login state
        this.updateUI();

        // Setup event listeners for settings form
        this.setupSettingsListeners();
    }

    setupSettingsListeners() {
        // Settings form
        const settingsForm = document.getElementById('settings-form');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => this.handleSettingsUpdate(e));
        }

        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    }

    login(email, avatar) {
        // Extract name from email (before @)
        const name = email.split('@')[0];
        const nickname = name.charAt(0).toUpperCase() + name.slice(1);
        
        this.currentUser = {
            email: email,
            nickname: nickname,
            username: '@' + name.toLowerCase(),
            avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
            loginDate: new Date().toISOString()
        };
        
        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        
        // Update UI
        this.updateUI();
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateUI();
    }

    handleSettingsUpdate(e) {
        e.preventDefault();
        const nickname = document.getElementById('edit-nickname').value;
        const avatar = document.getElementById('edit-avatar').value;
        
        if (nickname.trim()) {
            this.currentUser.nickname = nickname;
            this.currentUser.username = '@' + nickname.toLowerCase().replace(/\s+/g, '');
        }
        
        if (avatar.trim()) {
            this.currentUser.avatar = avatar;
        }
        
        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        
        // Update UI
        this.updateUI();
        
        // Show success message
        alert('Профиль обновлен!');
    }

    updateUI() {
        const loginSection = document.getElementById('login-section');
        const profileSection = document.getElementById('profile-section');
        const profileAvatarLarge = document.getElementById('profile-avatar-large');
        const profileNickname = document.getElementById('profile-nickname');
        const profileUsername = document.getElementById('profile-username');
        const headerAvatar = document.getElementById('header-avatar');
        const editNickname = document.getElementById('edit-nickname');
        const editAvatar = document.getElementById('edit-avatar');

        console.log('Updating UI. Current user:', this.currentUser);

        if (this.currentUser) {
            // Show profile section, hide login section
            if (loginSection) loginSection.style.display = 'none';
            if (profileSection) profileSection.style.display = 'block';
            
            // Update profile info
            if (profileAvatarLarge) profileAvatarLarge.src = this.currentUser.avatar;
            if (profileNickname) profileNickname.textContent = this.currentUser.nickname;
            if (profileUsername) profileUsername.textContent = this.currentUser.username;
            
            // Update header avatar
            if (headerAvatar) headerAvatar.src = this.currentUser.avatar;
            
            // Update settings form
            if (editNickname) editNickname.value = this.currentUser.nickname;
            if (editAvatar) editAvatar.value = this.currentUser.avatar;
        } else {
            // Show login section, hide profile section
            if (loginSection) loginSection.style.display = 'flex';
            if (profileSection) profileSection.style.display = 'none';
            
            // Reset header avatar
            if (headerAvatar) headerAvatar.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop';
        }
    }
}

// Initialize auth system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.auth = new AuthSystem();
});
