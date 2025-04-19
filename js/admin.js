// Admin Panel JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Admin UI
    initTabs();
    initDropdowns();
    initActionButtons();
    initLogout();
    
    // Check if user is logged in as admin, if not redirect to login
    if (!isAdminLoggedIn() && !window.location.pathname.includes('/index.html')) {
        // Uncomment in production
        // window.location.href = '../index.html';
    }
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
}

// Dropdown Menus
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.user-dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            const content = dropdown.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        const dropdownContents = document.querySelectorAll('.dropdown-content');
        dropdownContents.forEach(content => {
            content.style.display = 'none';
        });
    });
}

// Initialize Action Buttons
function initActionButtons() {
    // View buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            const itemName = row.querySelector('td:first-child').textContent;
            showNotification(`Viewing ${itemName}`, 'info');
            // In a real app, this would open a modal or navigate to detail view
        });
    });
    
    // Edit buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            const itemName = row.querySelector('td:first-child').textContent;
            showNotification(`Editing ${itemName}`, 'info');
            // In a real app, this would open an edit form
        });
    });
    
    // Delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            const itemName = row.querySelector('td:first-child').textContent;
            if (confirm(`Are you sure you want to delete ${itemName}?`)) {
                // In a real app, this would make an API call to delete
                row.remove();
                showNotification(`${itemName} has been deleted`, 'success');
            }
        });
    });
    
    // Approve buttons (for comments)
    const approveButtons = document.querySelectorAll('.approve-btn');
    approveButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            const user = row.querySelector('td:first-child').textContent;
            showNotification(`Comment by ${user} approved`, 'success');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-check-double"></i>';
        });
    });
    
    // Reply buttons (for comments)
    const replyButtons = document.querySelectorAll('.reply-btn');
    replyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            const user = row.querySelector('td:first-child').textContent;
            // In a real app, this would open a reply form or modal
            showNotification(`Replying to ${user}`, 'info');
        });
    });
    
    // Mark notification as read
    const markReadButtons = document.querySelectorAll('.mark-read');
    markReadButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const notificationItem = e.target.closest('.notification-item');
            notificationItem.classList.remove('unread');
            showNotification('Notification marked as read', 'success');
        });
    });
    
    // View notification
    const viewNotificationButtons = document.querySelectorAll('.view-notification');
    viewNotificationButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const notificationItem = e.target.closest('.notification-item');
            const notificationText = notificationItem.querySelector('.notification-content p').textContent;
            // In a real app, this would navigate to the relevant section
            showNotification(`Viewing: ${notificationText}`, 'info');
        });
    });
}

// Logout Functionality
function initLogout() {
    const logoutButtons = document.querySelectorAll('#adminLogout, #headerLogout');
    
    logoutButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to log out?')) {
                // Clear admin session
                sessionStorage.removeItem('adminLoggedIn');
                // Redirect to homepage
                window.location.href = '../index.html';
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.admin-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.classList.add('admin-notification');
        document.body.appendChild(notification);
    }
    
    // Set notification content and style
    notification.textContent = message;
    notification.className = 'admin-notification'; // Reset classes
    notification.classList.add(type);
    
    // Show notification
    notification.classList.add('active');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

// Check if admin is logged in (simple session storage check for demo)
function isAdminLoggedIn() {
    return sessionStorage.getItem('adminLoggedIn') === 'true';
}

// Set admin as logged in (for demo purposes)
function loginAdmin() {
    sessionStorage.setItem('adminLoggedIn', 'true');
}

// Chart rendering (placeholder for demonstration)
// In a real application, this would use a charting library like Chart.js
function initCharts() {
    // This is just a placeholder for demo purposes
    console.log('Charts initialized');
    
    // For a real implementation, you would use:
    // 
    // const visitorsCtx = document.getElementById('visitorsChart').getContext('2d');
    // new Chart(visitorsCtx, {
    //     type: 'bar',
    //     data: {
    //         labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    //         datasets: [{
    //             label: 'Visitors',
    //             data: [1200, 1900, 2300, 1800, 2800, 2500, 3000],
    //             backgroundColor: 'rgba(58, 123, 213, 0.7)',
    //             borderColor: 'rgba(58, 123, 213, 1)',
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true
    //             }
    //         }
    //     }
    // });
    //
    // const categoriesCtx = document.getElementById('categoriesChart').getContext('2d');
    // new Chart(categoriesCtx, {
    //     type: 'pie',
    //     data: {
    //         labels: ['Humanoid', 'Industrial', 'Biomimetic', 'Domestic', 'Medical'],
    //         datasets: [{
    //             data: [35, 25, 20, 15, 5],
    //             backgroundColor: [
    //                 'rgba(58, 123, 213, 0.7)',
    //                 'rgba(0, 210, 255, 0.7)',
    //                 'rgba(255, 64, 129, 0.7)',
    //                 'rgba(118, 255, 3, 0.7)',
    //                 'rgba(255, 152, 0, 0.7)'
    //             ],
    //             borderColor: [
    //                 'rgba(58, 123, 213, 1)',
    //                 'rgba(0, 210, 255, 1)',
    //                 'rgba(255, 64, 129, 1)',
    //                 'rgba(118, 255, 3, 1)',
    //                 'rgba(255, 152, 0, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     }
    // });
}

// Data Table Functionality
function initDataTables() {
    // Sort functionality
    const tables = document.querySelectorAll('.data-table');
    
    tables.forEach(table => {
        const headers = table.querySelectorAll('th');
        
        headers.forEach((header, headerIndex) => {
            header.addEventListener('click', () => {
                const isAscending = header.classList.contains('sort-asc');
                
                // Clear all sort classes
                headers.forEach(h => {
                    h.classList.remove('sort-asc', 'sort-desc');
                });
                
                // Set new sort class
                header.classList.add(isAscending ? 'sort-desc' : 'sort-asc');
                
                // Sort the table
                sortTable(table, headerIndex, !isAscending);
            });
        });
    });
}

// Sort table by column
function sortTable(table, columnIndex, ascending) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Sort rows
    rows.sort((a, b) => {
        const aValue = a.querySelectorAll('td')[columnIndex].textContent.trim();
        const bValue = b.querySelectorAll('td')[columnIndex].textContent.trim();
        
        // Check if values are dates
        const aDate = new Date(aValue);
        const bDate = new Date(bValue);
        
        if (!isNaN(aDate) && !isNaN(bDate)) {
            return ascending ? aDate - bDate : bDate - aDate;
        }
        
        // Check if values are numbers
        if (!isNaN(aValue) && !isNaN(bValue)) {
            return ascending ? aValue - bValue : bValue - aValue;
        }
        
        // String comparison
        return ascending ? 
            aValue.localeCompare(bValue) : 
            bValue.localeCompare(aValue);
    });
    
    // Reorder rows in tbody
    rows.forEach(row => tbody.appendChild(row));
}

// Add Robot Form Validation
function initAddRobotForm() {
    const addRobotForm = document.getElementById('addRobotForm');
    
    if (addRobotForm) {
        addRobotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(addRobotForm);
            const robotData = {
                name: formData.get('robotName'),
                category: formData.get('category'),
                description: formData.get('description'),
                manufacturer: formData.get('manufacturer'),
                releaseYear: formData.get('releaseYear'),
                // In a real app, you'd handle file uploads differently
                image: formData.get('robotImage').name || 'placeholder.jpg'
            };
            
            // Validate data
            if (!robotData.name || !robotData.category || !robotData.description) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Submit data (in a real app, this would be an API call)
            console.log('Submitting robot data:', robotData);
            
            // Show success message
            showNotification(`Robot ${robotData.name} added successfully!`, 'success');
            
            // Reset form
            addRobotForm.reset();
        });
    }
}

// File Upload Preview
function initFileUploadPreview() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const preview = document.querySelector(`#${input.id}Preview`);
            
            if (preview && input.files && input.files[0]) {
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                };
                
                reader.readAsDataURL(input.files[0]);
            }
        });
    });
}

// Rich Text Editor Initialization
function initRichTextEditor() {
    // This would initialize a rich text editor for content management
    // For example, if using TinyMCE:
    //
    // if (typeof tinymce !== 'undefined') {
    //     tinymce.init({
    //         selector: '.rich-text-editor',
    //         plugins: 'link image lists table code',
    //         toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image | table | code',
    //         height: 300
    //     });
    // }
}

// Dashboard Data Refresh
function refreshDashboardData() {
    // This would fetch updated stats from an API
    // For demo purposes, we'll just update with random numbers
    
    const updateStat = (selector, min, max) => {
        const element = document.querySelector(selector);
        if (element) {
            const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
            
            // Format number with commas
            element.textContent = randomValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    };
    
    updateStat('.users-icon + .stat-value', 1200, 1500);
    updateStat('.robots-icon + .stat-value', 150, 200);
    updateStat('.views-icon + .stat-value', 20000, 30000);
    updateStat('.comments-icon + .stat-value', 800, 1000);
    
    showNotification('Dashboard data refreshed', 'success');
}

// Admin Search Functionality
function initAdminSearch() {
    const searchInput = document.querySelector('.admin-search input');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim().toLowerCase();
                if (searchTerm) {
                    performAdminSearch(searchTerm);
                }
            }
        });
    }
}

function performAdminSearch(term) {
    // In a real app, this would query your backend API
    // For demo purposes, we'll just show a notification
    showNotification(`Searching for: ${term}`, 'info');
    
    // Navigate to search results page
    // window.location.href = `search-results.html?q=${encodeURIComponent(term)}`;
}

// Export Data Functionality
function initExportData() {
    const exportButtons = document.querySelectorAll('.export-btn');
    
    exportButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const dataType = btn.getAttribute('data-type');
            const format = btn.getAttribute('data-format');
            
            // In a real app, this would generate and download a file
            showNotification(`Exporting ${dataType} as ${format}...`, 'info');
            
            // Simulate delay for export completion
            setTimeout(() => {
                showNotification(`${dataType} export complete!`, 'success');
            }, 2000);
        });
    });
}

// Admin Settings Functionality
function initAdminSettings() {
    const settingsForm = document.getElementById('adminSettingsForm');
    
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(settingsForm);
            const settings = {
                siteName: formData.get('siteName'),
                siteDescription: formData.get('siteDescription'),
                contactEmail: formData.get('contactEmail'),
                itemsPerPage: formData.get('itemsPerPage'),
                enableComments: formData.get('enableComments') === 'on',
                enableRegistration: formData.get('enableRegistration') === 'on',
                maintenanceMode: formData.get('maintenanceMode') === 'on'
            };
            
            // In a real app, this would be saved to your backend
            console.log('Saving settings:', settings);
            
            showNotification('Settings saved successfully!', 'success');
        });
    }
}

// Initialize admin features based on current page
function initCurrentPage() {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('dashboard.html')) {
        initCharts();
        // Set a refresh interval for dashboard data
        setInterval(refreshDashboardData, 60000); // Refresh every minute
    } else if (currentPath.includes('add-robot.html')) {
        initAddRobotForm();
        initFileUploadPreview();
        initRichTextEditor();
    } else if (currentPath.includes('settings.html')) {
        initAdminSettings();
    }
}

// Call this at the end of the DOM content loaded event
initCurrentPage();
initAdminSearch();
initExportData();
