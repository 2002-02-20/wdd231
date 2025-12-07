/**
 * History.js - Routine History Management
 * Handles displaying, filtering, sorting, and deleting saved routines
 */

import { formatDate, capitalizeString, scrollToElement } from './main.js';

// ===== DOM ELEMENTS ===== //
const routinesList = document.getElementById('routinesList');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const filterGoalSelect = document.getElementById('filterGoal');
const sortBySelect = document.getElementById('sortBy');
const clearAllBtn = document.getElementById('clearAllBtn');
const deleteModal = document.getElementById('deleteModal');
const detailsModal = document.getElementById('detailsModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const errorAlert = document.getElementById('errorAlert');

// Statistics elements
const totalRoutinesEl = document.getElementById('totalRoutines');
const strengthCountEl = document.getElementById('strengthCount');
const definitionCountEl = document.getElementById('definitionCount');
const cardioCountEl = document.getElementById('cardioCount');

// ===== STATE ===== //
let allRoutines = [];
let filteredRoutines = [];
let routineToDelete = null;

// ===== INITIALIZATION ===== //
document.addEventListener('DOMContentLoaded', () => {
    loadRoutines();
    setupEventListeners();
});

/**
 * Load routines from localStorage
 */
function loadRoutines() {
    try {
        const stored = localStorage.getItem('easyGymRoutines');
        allRoutines = stored ? JSON.parse(stored) : [];
        
        filteredRoutines = [...allRoutines];
        
        if (allRoutines.length > 0) {
            emptyState.style.display = 'none';
            routinesList.style.display = 'grid';
            updateStatistics();
            displayRoutines(filteredRoutines);
        } else {
            routinesList.style.display = 'none';
            emptyState.style.display = 'flex';
        }
    } catch (error) {
        showError('Error loading routines. Please refresh the page.');
        console.error('Error:', error);
    }
}

/**
 * Display routines in the container
 * @param {Array} routines - Routines to display
 */
function displayRoutines(routines) {
    if (routines.length === 0) {
        routinesList.innerHTML = '';
        emptyState.style.display = 'flex';
        routinesList.style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';
    routinesList.style.display = 'grid';

    // Generate routine cards using template literals
    routinesList.innerHTML = routines.map(routine => `
        <div class="routine-card" data-routine-id="${routine.id}">
            <div class="routine-header">
                <h4 class="routine-title">${capitalizeString(routine.goal)} - ${capitalizeString(routine.level)}</h4>
                <span class="routine-date">${formatDate(routine.createdAt)}</span>
            </div>
            
            <div class="routine-badges">
                <span class="meta-badge">${capitalizeString(routine.goal)}</span>
                <span class="meta-badge">${capitalizeString(routine.level)}</span>
                <span class="meta-badge">${routine.duration} min</span>
            </div>

            <div class="routine-info">
                <div class="info-item">
                    <span class="info-label">Exercises</span>
                    <span class="info-value">${routine.exercises.length}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Total Sets</span>
                    <span class="info-value">${routine.exercises.reduce((sum, ex) => sum + ex.sets, 0)}</span>
                </div>
            </div>

            <div class="exercise-preview">
                <div class="exercise-preview-title">First 3 Exercises:</div>
                <ul class="exercise-list">
                    ${routine.exercises.slice(0, 3).map(ex => `<li>${ex.name}</li>`).join('')}
                </ul>
            </div>

            <div class="routine-actions">
                <button class="btn-view" data-routine-id="${routine.id}">View Details</button>
                <button class="btn-delete" data-routine-id="${routine.id}">Delete</button>
            </div>
        </div>
    `).join('');

    // Attach event listeners to buttons
    attachCardEventListeners();
}

/**
 * Attach event listeners to routine cards
 */
function attachCardEventListeners() {
    // View details buttons
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const routineId = e.target.dataset.routineId;
            showRoutineDetails(routineId);
        });
    });

    // Delete buttons
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const routineId = e.target.dataset.routineId;
            openDeleteConfirmation(routineId);
        });
    });
}

/**
 * Show routine details in modal
 * @param {string} routineId - ID of routine to display
 */
function showRoutineDetails(routineId) {
    const routine = allRoutines.find(r => r.id === routineId);
    
    if (!routine) return;

    // Update modal content
    document.getElementById('modalTitle').textContent = 
        `${capitalizeString(routine.goal)} - ${capitalizeString(routine.level)}`;
    
    document.getElementById('modalGoal').textContent = capitalizeString(routine.goal);
    document.getElementById('modalLevel').textContent = capitalizeString(routine.level);
    document.getElementById('modalDuration').textContent = `${routine.duration} min`;
    document.getElementById('modalDate').textContent = formatDate(routine.createdAt);

    // Display exercises
    const exercisesHTML = routine.exercises.map((ex, index) => `
        <div class="modal-exercise-item">
            <div class="modal-exercise-name">${index + 1}. ${ex.name}</div>
            <div class="modal-exercise-details">
                <div><strong>Sets:</strong> ${ex.sets}</div>
                <div><strong>Reps:</strong> ${ex.reps}</div>
                <div><strong>Rest:</strong> ${ex.rest}</div>
                <div><strong>Description:</strong> ${ex.description}</div>
            </div>
        </div>
    `).join('');

    document.getElementById('modalExercises').innerHTML = exercisesHTML;

    // Show modal
    detailsModal?.showModal();
}

/**
 * Open delete confirmation modal
 * @param {string} routineId - ID of routine to delete
 */
function openDeleteConfirmation(routineId) {
    routineToDelete = routineId;
    deleteModal?.showModal();
}

/**
 * Delete routine
 */
function deleteRoutine() {
    try {
        allRoutines = allRoutines.filter(r => r.id !== routineToDelete);
        localStorage.setItem('easyGymRoutines', JSON.stringify(allRoutines));
        
        deleteModal?.close();
        routineToDelete = null;
        
        // Reload and reapply filters
        applyFiltersAndSort();
        updateStatistics();
    } catch (error) {
        showError('Error deleting routine. Please try again.');
        console.error('Error:', error);
    }
}

/**
 * Delete all routines
 */
function deleteAllRoutines() {
    if (confirm('Are you sure you want to delete ALL routines? This cannot be undone.')) {
        try {
            allRoutines = [];
            filteredRoutines = [];
            localStorage.removeItem('easyGymRoutines');
            routinesList.innerHTML = '';
            routinesList.style.display = 'none';
            emptyState.style.display = 'flex';
            updateStatistics();
        } catch (error) {
            showError('Error deleting routines. Please try again.');
            console.error('Error:', error);
        }
    }
}

/**
 * Apply filters and sorting
 */
function applyFiltersAndSort() {
    try {
        // Start with all routines
        let results = [...allRoutines];

        // Filter by goal
        const goalFilter = filterGoalSelect.value;
        if (goalFilter) {
            results = results.filter(r => r.goal === goalFilter);
        }

        // Search filter using array method
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            results = results.filter(r => 
                r.goal.toLowerCase().includes(searchTerm) ||
                r.level.toLowerCase().includes(searchTerm)
            );
        }

        // Sort using array method
        const sortBy = sortBySelect.value;
        switch (sortBy) {
            case 'newest':
                results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'goal':
                results.sort((a, b) => a.goal.localeCompare(b.goal));
                break;
        }

        filteredRoutines = results;
        displayRoutines(filteredRoutines);
    } catch (error) {
        showError('Error filtering routines. Please try again.');
        console.error('Error:', error);
    }
}

/**
 * Update statistics
 */
function updateStatistics() {
    const stats = {
        total: allRoutines.length,
        strength: allRoutines.filter(r => r.goal === 'strength').length,
        definition: allRoutines.filter(r => r.goal === 'definition').length,
        cardio: allRoutines.filter(r => r.goal === 'cardio').length
    };

    totalRoutinesEl.textContent = stats.total;
    strengthCountEl.textContent = stats.strength;
    definitionCountEl.textContent = stats.definition;
    cardioCountEl.textContent = stats.cardio;
}

/**
 * Show error message
 * @param {string} message - Error message
 */
function showError(message) {
    errorAlert.textContent = message;
    errorAlert.style.display = 'block';
    scrollToElement('errorAlert');
}

// ===== EVENT LISTENERS ===== //
function setupEventListeners() {
    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', applyFiltersAndSort);
    }

    // Filter select
    if (filterGoalSelect) {
        filterGoalSelect.addEventListener('change', applyFiltersAndSort);
    }

    // Sort select
    if (sortBySelect) {
        sortBySelect.addEventListener('change', applyFiltersAndSort);
    }

    // Clear all button
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', deleteAllRoutines);
    }

    // Delete confirmation
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', deleteRoutine);
    }

    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', () => {
            deleteModal?.close();
        });
    }

    // Modal close buttons
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('dialog');
            modal?.close();
        });
    });

    // Close details modal
    const closeDetailsBtn = document.getElementById('closeDetailsBtn');
    if (closeDetailsBtn) {
        closeDetailsBtn.addEventListener('click', () => {
            detailsModal?.close();
        });
    }

    // Close modals when clicking outside
    detailsModal?.addEventListener('click', (e) => {
        if (e.target === detailsModal) {
            detailsModal.close();
        }
    });

    deleteModal?.addEventListener('click', (e) => {
        if (e.target === deleteModal) {
            deleteModal.close();
        }
    });
}