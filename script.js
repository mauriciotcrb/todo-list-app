document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  // Load tasks from localStorage
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));

  addTaskBtn.addEventListener("click", function () {
      const taskText = taskInput.value.trim();
      if (taskText === "") return;

      addTaskToDOM(taskText, false);
      saveTasks();

      taskInput.value = "";
  });

  function addTaskToDOM(taskText, isCompleted) {
      const li = document.createElement("li");
      li.textContent = taskText;

      if (isCompleted) li.classList.add("completed");

      // Create container for buttons
      const taskActions = document.createElement("div");
      taskActions.classList.add("task-actions");

      // Add complete button
      const completeBtn = document.createElement("button");
      completeBtn.textContent = "✔";
      completeBtn.classList.add("complete-btn");
      completeBtn.addEventListener("click", function () {
          li.classList.toggle("completed");
          saveTasks();
      });

      // Add delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "❌";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", function () {
          li.remove();
          saveTasks();
      });

      taskActions.appendChild(completeBtn);
      taskActions.appendChild(deleteBtn);

      li.appendChild(taskActions);
      taskList.appendChild(li);
  }

  function saveTasks() {
      const tasks = [];
      document.querySelectorAll("#taskList li").forEach(li => {
          tasks.push({ text: li.textContent.replace("✔❌", ""), completed: li.classList.contains("completed") });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Add Task Filtering
  document.querySelectorAll('input[name="filter"]').forEach((radio) => {
    radio.addEventListener("change", function () {
        const filter = document.querySelector('input[name="filter"]:checked').id;
        
        document.querySelectorAll("#taskList li").forEach(li => {
            if (filter === "showAll") {
                li.style.display = "flex";
            } else if (filter === "showCompleted") {
                li.style.display = li.classList.contains("completed") ? "flex" : "none";
            } else if (filter === "showPending") {
                li.style.display = !li.classList.contains("completed") ? "flex" : "none";
            }
        });
    });
  });
});

