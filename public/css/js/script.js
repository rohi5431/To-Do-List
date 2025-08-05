 function validateForm() {
        const taskInput = document.getElementById("taskInput").value.trim();
        if (!taskInput) {
            alert("Task cannot be empty!");
            return false;
        } else {
            alert("Task added successfully!");
            return true;
        }
    }