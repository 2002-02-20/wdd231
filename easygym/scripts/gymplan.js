/**
 * Gymplan.js - Routine Generator Logic
 * Handles form submission, exercise generation, and localStorage
 */

import { 
    formatDate, 
    capitalizeString, 
    generateId, 
    validateForm, 
    displayError, 
    clearErrors, 
    toggleSpinner, 
    scrollToElement 
} from './main.js';

// ===== EXERCISE DATABASE ===== //
const exerciseDatabase = {
    strength: {
        beginner: {
            exercises: [
                { name: 'Push-ups', sets: 3, reps: '8-10', rest: '60s', description: 'Basic bodyweight push-ups for chest, shoulders, and triceps' },
                { name: 'Bodyweight Squats', sets: 3, reps: '12-15', rest: '60s', description: 'Fundamental leg exercise for beginners' },
                { name: 'Dumbbell Rows', sets: 3, reps: '10-12', rest: '60s', description: 'Single arm dumbbell rows for back strength' },
                { name: 'Plank Hold', sets: 3, reps: '20-30s', rest: '45s', description: 'Core strengthening exercise' },
                { name: 'Bicep Curls', sets: 3, reps: '10-12', rest: '60s', description: 'Dumbbell curls for arm development' },
                { name: 'Shoulder Press', sets: 3, reps: '8-10', rest: '60s', description: 'Overhead pressing with dumbbells' },
                { name: 'Lunges', sets: 3, reps: '10 each leg', rest: '60s', description: 'Single leg strength builder' },
                { name: 'Tricep Dips', sets: 3, reps: '8-10', rest: '60s', description: 'Bodyweight tricep exercise' },
                { name: 'Lat Pulldowns', sets: 3, reps: '10-12', rest: '60s', description: 'Machine-assisted back exercise' },
                { name: 'Leg Press', sets: 3, reps: '12-15', rest: '90s', description: 'Compound leg strength builder' }
            ]
        },
        intermediate: {
            exercises: [
                { name: 'Barbell Bench Press', sets: 4, reps: '6-8', rest: '90s', description: 'Heavy compound chest exercise' },
                { name: 'Barbell Squats', sets: 4, reps: '6-8', rest: '2min', description: 'Heavy leg compound movement' },
                { name: 'Deadlifts', sets: 3, reps: '5-6', rest: '2min', description: 'Ultimate full body strength builder' },
                { name: 'Bent-over Rows', sets: 4, reps: '6-8', rest: '90s', description: 'Heavy back compound' },
                { name: 'Incline Dumbbell Press', sets: 3, reps: '8-10', rest: '75s', description: 'Upper chest development' },
                { name: 'Weighted Dips', sets: 3, reps: '6-8', rest: '90s', description: 'Advanced tricep and chest' },
                { name: 'Romanian Deadlifts', sets: 3, reps: '8-10', rest: '75s', description: 'Posterior chain strength' },
                { name: 'Weighted Pull-ups', sets: 4, reps: '6-8', rest: '90s', description: 'Advanced back builder' },
                { name: 'Bulgarian Split Squats', sets: 3, reps: '8 each leg', rest: '75s', description: 'Single leg strength' },
                { name: 'Chest-supported Rows', sets: 3, reps: '8-10', rest: '75s', description: 'Isolation back exercise' }
            ]
        },
        advanced: {
            exercises: [
                { name: 'Heavy Barbell Squats', sets: 5, reps: '3-5', rest: '3min', description: 'Extreme leg strength development' },
                { name: 'Heavy Deadlifts', sets: 5, reps: '2-3', rest: '3min', description: 'Maximum strength builder' },
                { name: 'Close-grip Bench Press', sets: 4, reps: '3-5', rest: '2min', description: 'Tricep-focused heavy pressing' },
                { name: 'Pin Press', sets: 4, reps: '3-5', rest: '2min', description: 'Lockout strength development' },
                { name: 'Reverse Grip Bench', sets: 3, reps: '5-6', rest: '90s', description: 'Specialization movement' },
                { name: 'Front Squats', sets: 4, reps: '3-5', rest: '2min', description: 'Advanced quad builder' },
                { name: 'Floor Press', sets: 4, reps: '3-5', rest: '2min', description: 'Lockout and tricep strength' },
                { name: 'Block Pulls', sets: 4, reps: '2-3', rest: '2min', description: 'Partial range strength' },
                { name: 'Pause Squats', sets: 4, reps: '3-4', rest: '2min', description: 'Time under tension strength' },
                { name: 'Heavy Rows', sets: 5, reps: '3-5', rest: '2min', description: 'Maximum back strength' }
            ]
        }
    },
    definition: {
        beginner: {
            exercises: [
                { name: 'Dumbbell Flyes', sets: 3, reps: '12-15', rest: '45s', description: 'Chest isolation with pump' },
                { name: 'Machine Leg Curls', sets: 3, reps: '12-15', rest: '45s', description: 'Hamstring isolation' },
                { name: 'Cable Lateral Raises', sets: 3, reps: '12-15', rest: '45s', description: 'Shoulder definition' },
                { name: 'Preacher Curls', sets: 3, reps: '12-15', rest: '45s', description: 'Isolated arm pump' },
                { name: 'Leg Extensions', sets: 3, reps: '12-15', rest: '45s', description: 'Quad definition' },
                { name: 'Machine Chest Press', sets: 3, reps: '12-15', rest: '45s', description: 'Controlled chest work' },
                { name: 'Cable Rows', sets: 3, reps: '12-15', rest: '45s', description: 'Back definition with pump' },
                { name: 'Hammer Curls', sets: 3, reps: '12-15', rest: '45s', description: 'Arm shape and definition' },
                { name: 'Machine Shoulder Press', sets: 3, reps: '12-15', rest: '45s', description: 'Controlled shoulder work' },
                { name: 'Tricep Rope Pushdowns', sets: 3, reps: '12-15', rest: '45s', description: 'Tricep definition' }
            ]
        },
        intermediate: {
            exercises: [
                { name: 'Incline Cable Flyes', sets: 4, reps: '10-12', rest: '60s', description: 'Upper chest pump and definition' },
                { name: 'Machine Leg Press', sets: 4, reps: '10-12', rest: '60s', description: 'Leg size and definition' },
                { name: 'Lateral Raises', sets: 3, reps: '12-15', rest: '45s', description: 'Shoulder width and shape' },
                { name: 'Barbell Curls', sets: 4, reps: '8-10', rest: '60s', description: 'Arm size builder' },
                { name: 'Leg Curls', sets: 4, reps: '10-12', rest: '60s', description: 'Hamstring development' },
                { name: 'Cable Crossovers', sets: 3, reps: '12-15', rest: '45s', description: 'Chest separation' },
                { name: 'Face Pulls', sets: 3, reps: '12-15', rest: '45s', description: 'Rear delt and shoulder health' },
                { name: 'EZ Bar Curls', sets: 3, reps: '10-12', rest: '60s', description: 'Arm pump and size' },
                { name: 'Machine Flyes', sets: 3, reps: '12-15', rest: '45s', description: 'Chest isolation' },
                { name: 'Leg Extensions', sets: 4, reps: '12-15', rest: '45s', description: 'Quad definition and size' }
            ]
        },
        advanced: {
            exercises: [
                { name: 'High Incline Flyes', sets: 4, reps: '8-12', rest: '60s', description: 'Upper chest aesthetic development' },
                { name: 'Hack Squats', sets: 4, reps: '8-12', rest: '75s', description: 'Quad separation and shape' },
                { name: 'Machine Shoulder Press', sets: 4, reps: '8-12', rest: '60s', description: 'Shoulder roundness' },
                { name: 'Concentration Curls', sets: 3, reps: '10-12', rest: '60s', description: 'Peak contraction biceps' },
                { name: 'Lying Leg Curls', sets: 4, reps: '10-12', rest: '60s', description: 'Hamstring definition' },
                { name: 'Pec Deck Machine', sets: 4, reps: '10-12', rest: '60s', description: 'Chest separation and striation' },
                { name: 'Reverse Flyes', sets: 4, reps: '12-15', rest: '45s', description: 'Rear delt aesthetic' },
                { name: 'Machine Curl', sets: 3, reps: '10-12', rest: '60s', description: 'Bicep peak development' },
                { name: 'Seated Machine Rows', sets: 4, reps: '8-12', rest: '60s', description: 'Back separation and width' },
                { name: 'Smith Machine Lunges', sets: 3, reps: '10-12 each', rest: '60s', description: 'Quad definition from different angle' }
            ]
        }
    },
    cardio: {
        beginner: {
            exercises: [
                { name: 'Walking on Treadmill', sets: 1, reps: 'Continuous', rest: 'N/A', description: 'Steady-state low intensity cardio' },
                { name: 'Stationary Bike', sets: 1, reps: 'Continuous', rest: 'N/A', description: 'Low impact cardio' },
                { name: 'Elliptical Machine', sets: 1, reps: 'Continuous', rest: 'N/A', description: 'Low impact full body cardio' },
                { name: 'Swimming', sets: 1, reps: 'Continuous', rest: 'N/A', description: 'Full body cardio and resistance' },
                { name: 'Rowing Machine', sets: 1, reps: 'Continuous', rest: 'N/A', description: 'Full body endurance' },
                { name: 'Jump Rope', sets: 3, reps: '1-2 min', rest: '60s', description: 'Explosive low impact cardio' },
                { name: 'Jumping Jacks', sets: 3, reps: '20-30', rest: '45s', description: 'Basic cardio conditioning' },
                { name: 'High Knees', sets: 3, reps: '30s', rest: '45s', description: 'Cardio and leg activation' },
                { name: 'Burpees (Modified)', sets: 3, reps: '8-10', rest: '60s', description: 'Beginner cardio intensity' },
                { name: 'Mountain Climbers', sets: 3, reps: '20', rest: '60s', description: 'Core and cardio combo' }
            ]
        },
        intermediate: {
            exercises: [
                { name: 'HIIT Treadmill Sprints', sets: 8, reps: '30s sprint / 30s rest', rest: '2min', description: 'High intensity interval training' },
                { name: 'Jump Rope (Advanced)', sets: 5, reps: '3 min', rest: '90s', description: 'Sustained high intensity' },
                { name: 'Battle Ropes', sets: 4, reps: '30s', rest: '30s', description: 'Upper body cardio intensity' },
                { name: 'Assault Bike Sprints', sets: 6, reps: '20s sprint / 40s recovery', rest: '3min', description: 'All-out effort cardio' },
                { name: 'Box Jumps', sets: 4, reps: '8-10', rest: '90s', description: 'Explosive power and cardio' },
                { name: 'Running (Moderate Pace)', sets: 1, reps: 'Continuous', rest: 'N/A', description: 'Sustained cardiovascular work' },
                { name: 'Rowing (Power Strokes)', sets: 5, reps: '500m sprint', rest: '90s', description: 'Intense full body cardio' },
                { name: 'Sled Push', sets: 4, reps: '30-40m', rest: '60s', description: 'Lower body explosive cardio' },
                { name: 'Stair Climber', sets: 1, reps: '15-20 min', rest: 'N/A', description: 'Lower body cardio endurance' },
                { name: 'Kettlebell Swings', sets: 5, reps: '20-30', rest: '60s', description: 'Explosive hip cardio' }
            ]
        },
        advanced: {
            exercises: [
                { name: 'Tabata Protocol', sets: 8, reps: '20s max / 10s rest', rest: '4min', description: 'Maximum intensity 4 minutes' },
                { name: 'Track Sprints', sets: 6, reps: '100m full sprint', rest: '90s', description: 'All-out running intensity' },
                { name: 'Double Unders Rope', sets: 5, reps: '2-3 min', rest: '90s', description: 'Advanced rope technique' },
                { name: 'Prowler Sprints', sets: 8, reps: '40-50m', rest: '90s', description: 'Maximum effort push sled' },
                { name: 'Versa Climber', sets: 1, reps: '15-20 min', rest: 'N/A', description: 'Extreme full body cardio' },
                { name: 'Heavy Bag Work', sets: 5, reps: '3 min rounds', rest: '60s', description: 'Intense striking cardio' },
                { name: 'Ski Erg Sprints', sets: 6, reps: '30s sprint / 30s recovery', rest: '2min', description: 'Upper body explosive cardio' },
                { name: 'Running Intervals', sets: 10, reps: '1 min hard / 1 min easy', rest: 'N/A', description: 'Sustained high intensity' },
                { name: 'Sled Drag (Backwards)', sets: 5, reps: '30m', rest: '90s', description: 'Hamstring and glute cardio' },
                { name: 'Med Ball Slams', sets: 5, reps: '20-25', rest: '90s', description: 'Full body power and cardio' }
            ]
        }
    }
};

// ===== DOM ELEMENTS ===== //
const routineForm = document.getElementById('routineForm');
const fitnessGoalSelect = document.getElementById('fitnessGoal');
const experienceLevelSelect = document.getElementById('experienceLevel');
const durationSelect = document.getElementById('duration');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorAlert = document.getElementById('errorAlert');
const resultsSection = document.getElementById('resultsSection');
const emptyState = document.getElementById('emptyState');
const exercisesList = document.getElementById('exercisesList');
const summaryList = document.getElementById('summaryList');
const saveRoutineBtn = document.getElementById('saveRoutineBtn');
const generateNewBtn = document.getElementById('generateNewBtn');
const successModal = document.getElementById('successModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalClose = document.querySelector('.modal-close');

// ===== DURATION OPTIONS ===== //
const durationOptions = [
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '60 minutes' }
];

// Populate duration options on page load
document.addEventListener('DOMContentLoaded', () => {
    durationOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        durationSelect.appendChild(optionElement);
    });
});

// ===== FORM SUBMISSION ===== //
if (routineForm) {
    routineForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await generateRoutine();
    });
}

/**
 * Generate routine based on form inputs
 */
async function generateRoutine() {
    try {
        // Clear previous errors
        clearErrors(['goalError', 'levelError', 'durationError']);

        // Get form values
        const formData = {
            fitnessGoal: fitnessGoalSelect.value,
            experienceLevel: experienceLevelSelect.value,
            duration: durationSelect.value
        };

        // Validate form
        const validation = validateForm(formData, ['fitnessGoal', 'experienceLevel', 'duration']);

        if (!validation.isValid) {
            Object.entries(validation.errors).forEach(([field, message]) => {
                displayError(`${field}Error`, message);
            });
            return;
        }

        // Show loading spinner
        toggleSpinner('loadingSpinner', true);
        errorAlert.style.display = 'none';

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Fetch exercises from database
        try {
            const exercisesData = exerciseDatabase[formData.fitnessGoal][formData.experienceLevel];

            if (!exercisesData) {
                throw new Error('Unable to fetch exercises. Please try again.');
            }

            // Generate routine with selected exercises
            const selectedExercises = generateSelectedExercises(
                exercisesData.exercises,
                parseInt(formData.duration)
            );

            // Hide loading spinner
            toggleSpinner('loadingSpinner', false);

            // Display results
            displayResults(selectedExercises, formData);

            // Store current routine in session for saving
            window.currentRoutine = {
                exercises: selectedExercises,
                goal: formData.fitnessGoal,
                level: formData.experienceLevel,
                duration: formData.duration,
                createdAt: new Date().toISOString()
            };

            // Scroll to results
            scrollToElement('resultsSection');

        } catch (error) {
            toggleSpinner('loadingSpinner', false);
            showError(`Error loading exercises: ${error.message}`);
        }

    } catch (error) {
        toggleSpinner('loadingSpinner', false);
        showError('An unexpected error occurred. Please try again.');
        console.error('Error:', error);
    }
}

/**
 * Generate selected exercises based on duration
 * @param {Array} exercises - Available exercises
 * @param {number} duration - Workout duration in minutes
 * @returns {Array} Selected exercises
 */
function generateSelectedExercises(exercises, duration) {
    // Calculate exercises count based on duration
    let exerciseCount = Math.ceil(duration / 5); // Approximate 5 min per exercise
    exerciseCount = Math.min(exerciseCount, exercises.length);

    // Shuffle and select exercises using Fisher-Yates algorithm
    const shuffled = [...exercises];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, exerciseCount);
}

/**
 * Display routine results
 * @param {Array} exercises - Selected exercises
 * @param {Object} formData - Form data
 */
function displayResults(exercises, formData) {
    // Hide empty state
    emptyState.style.display = 'none';

    // Show results section
    resultsSection.style.display = 'block';

    // Update meta information
    document.getElementById('resultGoal').textContent = capitalizeString(formData.fitnessGoal);
    document.getElementById('resultLevel').textContent = capitalizeString(formData.experienceLevel);
    document.getElementById('resultDuration').textContent = `${formData.duration} min`;

    // Generate exercise cards using template literals
    exercisesList.innerHTML = exercises.map((exercise, index) => `
        <div class="exercise-card">
            <div class="exercise-number">${index + 1}</div>
            <h4 class="exercise-name">${exercise.name}</h4>
            <div class="exercise-details">
                <div class="detail-item">
                    <span class="detail-label">Sets</span>
                    <span class="detail-value">${exercise.sets}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Reps</span>
                    <span class="detail-value">${exercise.reps}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Rest</span>
                    <span class="detail-value">${exercise.rest}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Type</span>
                    <span class="detail-value">${capitalizeString(formData.fitnessGoal)}</span>
                </div>
            </div>
            <div class="exercise-description">${exercise.description}</div>
        </div>
    `).join('');

    // Generate summary using array methods
    const totalSets = exercises.reduce((sum, ex) => sum + ex.sets, 0);
    const totalExercises = exercises.length;
    const estimatedTime = Math.ceil(exercises.reduce((sum, ex) => {
        const restTime = parseInt(ex.rest) || 0;
        return sum + (ex.sets * (2 + restTime / 60));
    }, 0));

    summaryList.innerHTML = `
        <li><span class="summary-label">Total Exercises:</span> <span class="summary-value">${totalExercises}</span></li>
        <li><span class="summary-label">Total Sets:</span> <span class="summary-value">${totalSets}</span></li>
        <li><span class="summary-label">Estimated Duration:</span> <span class="summary-value">${estimatedTime} min</span></li>
        <li><span class="summary-label">Difficulty:</span> <span class="summary-value">${capitalizeString(formData.experienceLevel)}</span></li>
        <li><span class="summary-label">Generated:</span> <span class="summary-value">${formatDate(new Date())}</span></li>
    `;
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

// ===== SAVE ROUTINE ===== //
if (saveRoutineBtn) {
    saveRoutineBtn.addEventListener('click', () => {
        if (window.currentRoutine) {
            try {
                // Get existing routines from localStorage
                const routines = JSON.parse(localStorage.getItem('easyGymRoutines')) || [];

                // Add new routine with unique ID
                const newRoutine = {
                    id: generateId(),
                    ...window.currentRoutine
                };

                routines.push(newRoutine);

                // Save to localStorage
                localStorage.setItem('easyGymRoutines', JSON.stringify(routines));

                // Show success modal
                showSuccessModal('Routine saved successfully! View it in "My Routines".');
            } catch (error) {
                showError('Error saving routine. Please try again.');
                console.error('Error:', error);
            }
        }
    });
}

/**
 * Show success modal
 * @param {string} message - Success message
 */
function showSuccessModal(message) {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.textContent = message;
    }
    successModal?.showModal();
}

// ===== MODAL CONTROLS ===== //
if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
        successModal?.close();
    });
}

if (modalClose) {
    modalClose.addEventListener('click', () => {
        successModal?.close();
    });
}

successModal?.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.close();
    }
});

// ===== GENERATE NEW ROUTINE ===== //
if (generateNewBtn) {
    generateNewBtn.addEventListener('click', () => {
        routineForm.reset();
        emptyState.style.display = 'flex';
        resultsSection.style.display = 'none';
        scrollToElement('routineForm');
    });
}