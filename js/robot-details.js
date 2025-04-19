// Robot Details Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI Elements
    initTabs();
    initModals();
    initCommentSystem();
    initRelatedRobots();
    initGallery();
    setupEventListeners();
});

// Tab System
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Check if URL has hash to set initial tab
    const hash = window.location.hash;
    if (hash) {
        const targetTab = document.querySelector(`.tab-btn[data-tab="${hash.substring(1)}"]`);
        if (targetTab) {
            targetTab.click();
        }
    }
}

// Modal Functionality (reuse from main.js)
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

// Comment System
function initCommentSystem() {
    const commentForm = document.getElementById('commentForm');
    
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('commentName').value;
            const email = document.getElementById('commentEmail').value;
            const comment = document.getElementById('commentText').value;
            
            // In a real application, this would send data to server
            // For demo purposes, we'll add the comment to the UI
            addNewComment(name, comment);
            
            // Reset form
            commentForm.reset();
            
            // Show success message
            showNotification('Your comment has been submitted and is awaiting moderation.', 'success');
        });
    }
    
    // Reply buttons
    const replyButtons = document.querySelectorAll('.comment-reply-btn');
    replyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const commentElement = e.target.closest('.comment');
            const authorName = commentElement.querySelector('.comment-header h4').textContent;
            
            // Scroll to comment form
            document.getElementById('commentText').focus();
            document.getElementById('commentText').value = `@${authorName} `;
            
            // Scroll comment form into view
            document.querySelector('.comment-form').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Pagination
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    paginationButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // In a real app, this would load the next page of comments
            // For demo, just update the active button
            document.querySelector('.pagination-btn.active').classList.remove('active');
            btn.classList.add('active');
            
            // Show "loading" effect on comments
            const commentsList = document.querySelector('.comments-list');
            commentsList.style.opacity = '0.5';
            setTimeout(() => {
                commentsList.style.opacity = '1';
            }, 500);
        });
    });
}

// Add a new comment to the UI
function addNewComment(name, comment) {
    const commentsList = document.querySelector('.comments-list');
    const commentsCount = document.querySelector('.comments-list h3');
    
    // Create new comment element
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.innerHTML = `
        <div class="comment-avatar">
            <img src="https://via.placeholder.com/50x50" alt="User Avatar" class="placeholder-img">
        </div>
        <div class="comment-content">
            <div class="comment-header">
                <h4>${name}</h4>
                <span class="comment-date">Just now</span>
            </div>
            <p>${comment}</p>
            <div class="comment-actions">
                <button class="comment-reply-btn">Reply</button>
            </div>
        </div>
    `;
    
    // Add reply functionality to new comment
    newComment.querySelector('.comment-reply-btn').addEventListener('click', (e) => {
        document.getElementById('commentText').focus();
        document.getElementById('commentText').value = `@${name} `;
        document.querySelector('.comment-form').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Insert at the top of the list
    commentsList.insertBefore(newComment, commentsList.querySelector('.comment'));
    
    // Update comments count
    const currentCount = parseInt(commentsCount.textContent.match(/\d+/)[0]);
    commentsCount.textContent = `Comments (${currentCount + 1})`;
}

// Related Robots
function initRelatedRobots() {
    const relatedRobots = document.querySelectorAll('.related-grid .robot-card');
    
    relatedRobots.forEach(robot => {
        robot.addEventListener('click', (e) => {
            const robotId = robot.getAttribute('data-id');
            if (e.target.classList.contains('btn-details')) {
                // Navigate to robot details page
                window.location.href = `robot-details.html?id=${robotId}`;
            }
        });
    });
}

// Gallery Functionality
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length) {
        // Create modal gallery viewer
        const galleryModal = document.createElement('div');
        galleryModal.className = 'gallery-modal';
        galleryModal.innerHTML = `
            <div class="gallery-modal-content">
                <span class="close-gallery">&times;</span>
                <div class="gallery-img-container">
                    <img id="galleryModalImg" src="" alt="Full size image">
                </div>
                <div class="gallery-caption" id="galleryModalCaption"></div>
                <button class="gallery-prev"><i class="fas fa-chevron-left"></i></button>
                <button class="gallery-next"><i class="fas fa-chevron-right"></i></button>
            </div>
        `;
        document.body.appendChild(galleryModal);
        
        let currentImageIndex = 0;
        
        // Open modal when clicking on gallery items
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const caption = item.querySelector('.gallery-caption').textContent;
                
                document.getElementById('galleryModalImg').src = img.src;
                document.getElementById('galleryModalCaption').textContent = caption;
                galleryModal.style.display = 'flex';
                currentImageIndex = index;
            });
        });
        
        // Close gallery modal
        document.querySelector('.close-gallery').addEventListener('click', () => {
            galleryModal.style.display = 'none';
        });
        
        // Close when clicking outside the image
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                galleryModal.style.display = 'none';
            }
        });
        
        // Next image
        document.querySelector('.gallery-next').addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
            const nextItem = galleryItems[currentImageIndex];
            const img = nextItem.querySelector('img');
            const caption = nextItem.querySelector('.gallery-caption').textContent;
            
            const modalImg = document.getElementById('galleryModalImg');
            modalImg.style.opacity = '0';
            setTimeout(() => {
                modalImg.src = img.src;
                document.getElementById('galleryModalCaption').textContent = caption;
                modalImg.style.opacity = '1';
            }, 300);
        });
        
        // Previous image
        document.querySelector('.gallery-prev').addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
            const prevItem = galleryItems[currentImageIndex];
            const img = prevItem.querySelector('img');
            const caption = prevItem.querySelector('.gallery-caption').textContent;
            
            const modalImg = document.getElementById('galleryModalImg');
            modalImg.style.opacity = '0';
            setTimeout(() => {
                modalImg.src = img.src;
                document.getElementById('galleryModalCaption').textContent = caption;
                modalImg.style.opacity = '1';
            }, 300);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (galleryModal.style.display === 'flex') {
                if (e.key === 'ArrowRight') {
                    document.querySelector('.gallery-next').click();
                } else if (e.key === 'ArrowLeft') {
                    document.querySelector('.gallery-prev').click();
                } else if (e.key === 'Escape') {
                    galleryModal.style.display = 'none';
                }
            }
        });
    }
}

// Additional Event Listeners
function setupEventListeners() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                
                // If target is a tab, activate that tab
                if (targetId.substring(1) === 'video') {
                    document.querySelector('.tab-btn[data-tab="gallery"]').click();
                    setTimeout(() => {
                        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                } else if (targetId.substring(1) === 'technical-specs') {
                    document.querySelector('.tab-btn[data-tab="technical"]').click();
                    setTimeout(() => {
                        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                } else {
                    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Form Handlers (reused from main.js)
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

// Update UI for logged in user
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

function logoutUser() {
    // In a real application, this would clear session tokens etc.
    console.log('User logged out');
    return true;
}

// Notification System
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
