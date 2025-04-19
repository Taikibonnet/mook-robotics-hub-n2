// Main JavaScript for MOOK Robotics Hub

document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI Elements
    initModals();
    initAIAssistant();
    initSearch();
    initAnimations();
    setupEventListeners();
});

// Modal Functionality
function initModals() {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeButtons = document.querySelectorAll('.close-modal');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            signupModal.classList.add('active');
        });
    }

    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('active');
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });

    // Handle form submissions
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

// AI Assistant Functionality
function initAIAssistant() {
    const aiButton = document.getElementById('aiAssistantButton');
    const aiAssistant = document.getElementById('aiAssistant');
    const minimizeBtn = document.querySelector('.minimize-chat');
    const chatForm = document.getElementById('chatForm');
    const aiAssistBtn = document.getElementById('aiAssistBtn');

    if (aiButton) {
        aiButton.addEventListener('click', () => {
            aiAssistant.classList.add('active');
            aiButton.style.display = 'none';
        });
    }

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', () => {
            aiAssistant.classList.remove('active');
            aiButton.style.display = 'flex';
        });
    }

    if (aiAssistBtn) {
        aiAssistBtn.addEventListener('click', () => {
            aiAssistant.classList.add('active');
            aiButton.style.display = 'none';
            document.querySelector('#userMessage').focus();
        });
    }

    if (chatForm) {
        chatForm.addEventListener('submit', handleChatSubmit);
    }
}

// Search Functionality
function initSearch() {
    const searchForm = document.querySelector('.search-container');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            performSearch(searchInput.value);
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            performSearch(searchInput.value);
        });
    }
}

// Initialize Animations
function initAnimations() {
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInElements = document.querySelectorAll('.featured-grid > *, .categories-grid > *, .news-grid > *');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Explore Button
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            if (validateEmail(email)) {
                subscribeToNewsletter(email);
                e.target.reset();
                showNotification('Thank you for subscribing!', 'success');
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }

    // Robot Card Details Buttons
    const detailButtons = document.querySelectorAll('.btn-details');
    detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const robotId = e.target.closest('.robot-card').dataset.id;
            window.location.href = `/robot-details.html?id=${robotId}`;
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Form Handlers
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Admin login check (simple for demonstration)
    if (email === 'tgen.robotics@gmail.com' && password === 'Admin123!') {
        // Redirect to admin dashboard
        window.location.href = '/admin/dashboard.html';
        return;
    }
    
    // Here you would typically make an API call to authenticate
    // For demo purposes, we'll just show a success message
    loginUser(email, password)
        .then(response => {
            document.getElementById('loginModal').classList.remove('active');
            showNotification('Login successful!', 'success');
            updateUIForLoggedInUser(email);
        })
        .catch(error => {
            showNotification('Login failed. Please check your credentials.', 'error');
        });
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    // Here you would typically make an API call to register the user
    // For demo purposes, we'll just show a success message
    registerUser(name, email, password)
        .then(response => {
            document.getElementById('signupModal').classList.remove('active');
            showNotification('Registration successful! You can now log in.', 'success');
            document.getElementById('signupForm').reset();
        })
        .catch(error => {
            showNotification('Registration failed. Please try again.', 'error');
        });
}

function handleChatSubmit(e) {
    e.preventDefault();
    const userMessageInput = document.getElementById('userMessage');
    const userMessage = userMessageInput.value.trim();
    const chatMessages = document.getElementById('chatMessages');
    
    if (!userMessage) return;
    
    // Add user message to chat
    addMessageToChat('user', userMessage);
    userMessageInput.value = '';
    
    // Simulate bot response (in a real app, this would be an API call)
    setTimeout(() => {
        const botResponses = [
            "I found several articles about that robot. Would you like to know about its history or technical specifications?",
            "That's an interesting question about robotics! The technology has evolved significantly in recent years.",
            "I can help you discover more about that topic. Check out our featured robots section for related examples.",
            "Great question! Robotics in that field has made tremendous progress. Would you like me to show you some examples?"
        ];
        
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        addMessageToChat('bot', randomResponse);
    }, 1000);
}

// Utility Functions
function performSearch(query) {
    if (!query.trim()) return;
    
    // For demo purposes, just redirect to a search results page
    // In a real application, this would query your backend
    window.location.href = `/search-results.html?q=${encodeURIComponent(query)}`;
}

function addMessageToChat(type, text) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    
    const messagePara = document.createElement('p');
    messagePara.textContent = text;
    
    messageContent.appendChild(messagePara);
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom of chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.classList.add('notification');
        document.body.appendChild(notification);
    }
    
    // Set notification content and style
    notification.textContent = message;
    notification.className = 'notification'; // Reset classes
    notification.classList.add(type);
    
    // Show notification
    notification.classList.add('active');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function updateUIForLoggedInUser(email) {
    // Update UI elements for logged in state
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        authButtons.innerHTML = `
            <div class="user-menu">
                <span class="user-email">${email}</span>
                <button id="logoutBtn" class="btn-login">Log Out</button>
            </div>
        `;
        
        // Add logout functionality
        document.getElementById('logoutBtn').addEventListener('click', () => {
            logoutUser();
            window.location.reload();
        });
    }
}

// API Simulation Functions (in a real app, these would make actual API calls)
function loginUser(email, password) {
    return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
            // For demo purposes, always succeed except for specific test case
            if (email === 'fail@example.com') {
                reject(new Error('Invalid credentials'));
            } else {
                resolve({ success: true, user: { email } });
            }
        }, 1000);
    });
}

function registerUser(name, email, password) {
    return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
            // For demo purposes, always succeed except for specific test case
            if (email === 'existing@example.com') {
                reject(new Error('User already exists'));
            } else {
                resolve({ success: true });
            }
        }, 1000);
    });
}

function subscribeToNewsletter(email) {
    return new Promise((resolve) => {
        // Simulate API call
        setTimeout(() => {
            resolve({ success: true });
        }, 1000);
    });
}

function logoutUser() {
    // In a real application, this would clear session tokens etc.
    console.log('User logged out');
    return true;
}

// Helper function to add fade-in class once elements are in viewport
function observeElement(el) {
    el.classList.add('fade-in');
}