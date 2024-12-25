let taskCount = 0;
let completedCount = 0;

document.addEventListener('DOMContentLoaded', function() {

    function addTask() {
        const taskInput = document.getElementById('task');
        const taskText = taskInput.value;
        if (taskText === '') return;

        taskCount++;
        const date = new Date().toLocaleDateString();
        const taskList = document.getElementById('task-list');
        const row = document.createElement('tr');
        
        row.setAttribute('data-id', taskCount);

        row.innerHTML = `
            <td>${taskCount}</td>
            <td><span class="task-text">${taskText}</span></td>
            <td>${date}</td>
            <td class="status" onclick="toggleStatus(this)">✔️</td>
            <td class="delete" onclick="deleteTask(this)">❌</td>
            <td class="edit" onclick="editTask(this)">✏️</td>
        `;
        taskList.appendChild(row);

        taskInput.value = '';
        updateCounter();
    }

    window.addTask = addTask;
});

function toggleStatus(el) {
    const row = el.parentElement; 
    const taskText = row.querySelector('.task-text');
    
    if (el.textContent === '✔️') {
        row.style.textDecoration = 'line-through'; 
        el.style.color = 'blue'; 
        completedCount++;
    } else {
        row.style.textDecoration = 'none';  
        el.style.color = 'green'; 
        completedCount--;
    }
    updateCounter();
}

function deleteTask(el) {
    const row = el.parentElement; // Get the row (tr) that contains the delete button
    const status = row.querySelector('.status').textContent;
    
    // If the task is marked as completed, reduce the completed count
    if (status === '✔️') {
        completedCount--;
    }
    
    // Decrease the task count and remove the row from the table
    taskCount--;
    row.remove();
    
    // Update the task list counter
    updateCounter();
}

function editTask(el) {
    const row = el.parentElement;
    const taskText = row.querySelector('.task-text');
    const currentText = taskText.textContent;

    // Create an input field for editing
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = currentText;
    inputField.classList.add('p-2', 'border', 'border-gray-300', 'rounded-md', 'w-full');

    taskText.innerHTML = '';
    taskText.appendChild(inputField);

    // Change the button to a save button
    el.innerHTML = '💾';
    
    // Handle saving the updated task text
    el.onclick = function () {
        const newText = inputField.value;
        taskText.textContent = newText;

        // Change the button back to edit mode
        el.innerHTML = '✏️';

        // Revert the edit button to its original functionality
        el.onclick = function () {
            editTask(el);
        };
    };
}

function updateCounter() {
    const counter = document.querySelector('.counter');
    counter.textContent = `${taskCount} Total, ${completedCount} Completed, ${taskCount - completedCount} Pending`;
}
