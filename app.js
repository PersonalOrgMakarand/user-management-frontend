// API Base URL
const API_BASE_URL = 'https://user-management-accenture.azurewebsites.net';

// DOM Elements
const userForm = document.getElementById('user-form');
const usersTbody = document.getElementById('users-tbody');
const loadingDiv = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const refreshBtn = document.getElementById('refresh-btn');
const formTitle = document.getElementById('form-title');
const deleteModal = document.getElementById('delete-modal');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const cancelDeleteBtn = document.getElementById('cancel-delete');

// Form Input Elements
const userIdInput = document.getElementById('user-id');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');

// State
let isEditMode = false;
let deleteUserId = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    userForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', resetForm);
    refreshBtn.addEventListener('click', loadUsers);
    confirmDeleteBtn.addEventListener('click', confirmDelete);
    cancelDeleteBtn.addEventListener('click', closeDeleteModal);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === deleteModal) {
            closeDeleteModal();
        }
    });
}

// Show/Hide Loading
function showLoading() {
    loadingDiv.style.display = 'block';
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

function hideLoading() {
    loadingDiv.style.display = 'none';
}

// Show Messages
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

// API Functions
async function loadUsers() {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/users`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const users = await response.json();
        displayUsers(users);
        hideLoading();
    } catch (error) {
        hideLoading();
        showError(`Failed to load users: ${error.message}`);
        console.error('Error loading users:', error);
    }
}

async function createUser(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const newUser = await response.json();
        showSuccess('User created successfully!');
        resetForm();
        loadUsers();
    } catch (error) {
        showError(`Failed to create user: ${error.message}`);
        console.error('Error creating user:', error);
    }
}

async function updateUser(id, userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const updatedUser = await response.json();
        showSuccess('User updated successfully!');
        resetForm();
        loadUsers();
    } catch (error) {
        showError(`Failed to update user: ${error.message}`);
        console.error('Error updating user:', error);
    }
}

async function deleteUser(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        showSuccess('User deleted successfully!');
        loadUsers();
    } catch (error) {
        showError(`Failed to delete user: ${error.message}`);
        console.error('Error deleting user:', error);
    }
}

// Display Users in Table
function displayUsers(users) {
    usersTbody.innerHTML = '';

    if (!users || users.length === 0) {
        usersTbody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">
                    <p>No users found. Add your first user!</p>
                </td>
            </tr>
        `;
        return;
    }

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id || 'N/A'}</td>
            <td>${escapeHtml(user.username || '')}</td>
            <td>${escapeHtml(user.email || '')}</td>
            <td>${escapeHtml(user.firstName || '')}</td>
            <td>${escapeHtml(user.lastName || '')}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-warning btn-small" onclick="editUser(${user.id})"><span class="btn-icon" aria-hidden="true">✏️</span>Edit</button>
                    <button class="btn btn-danger btn-small" onclick="showDeleteModal(${user.id})"><span class="btn-icon" aria-hidden="true">🗑️</span>Delete</button>
                </div>
            </td>
        `;
        usersTbody.appendChild(row);
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Form Handlers
function handleFormSubmit(e) {
    e.preventDefault();

    const userData = {
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        firstName: firstNameInput.value.trim(),
        lastName: lastNameInput.value.trim()
    };

    if (isEditMode) {
        const userId = userIdInput.value;
        updateUser(userId, userData);
    } else {
        createUser(userData);
    }
}

function resetForm() {
    userForm.reset();
    userIdInput.value = '';
    isEditMode = false;
    formTitle.textContent = 'Add New User';
    setButtonLabelWithIcon(submitBtn, '➕', 'Add User');
    cancelBtn.style.display = 'none';
}

function setButtonLabelWithIcon(button, icon, label) {
    const iconSpan = document.createElement('span');
    iconSpan.className = 'btn-icon';
    iconSpan.setAttribute('aria-hidden', 'true');
    iconSpan.textContent = icon;

    button.replaceChildren(iconSpan, document.createTextNode(label));
}

// Edit User
async function editUser(id) {
    try {
        showLoading();
        const response = await fetch(`${API_BASE_URL}/users/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const user = await response.json();
        hideLoading();

        // Populate form with user data
        userIdInput.value = user.id;
        usernameInput.value = user.username;
        emailInput.value = user.email;
        firstNameInput.value = user.firstName;
        lastNameInput.value = user.lastName;

        // Update form state
        isEditMode = true;
        formTitle.textContent = 'Edit User';
        setButtonLabelWithIcon(submitBtn, '💾', 'Update User');
        cancelBtn.style.display = 'inline-block';

        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        hideLoading();
        showError(`Failed to load user details: ${error.message}`);
        console.error('Error loading user:', error);
    }
}

// Delete Modal Functions
function showDeleteModal(id) {
    deleteUserId = id;
    deleteModal.style.display = 'block';
}

function closeDeleteModal() {
    deleteUserId = null;
    deleteModal.style.display = 'none';
}

function confirmDelete() {
    if (deleteUserId !== null) {
        deleteUser(deleteUserId);
        closeDeleteModal();
    }
}
