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

      // Add complete button
      const completeBtn = document.createElement("button");
      completeBtn.textContent = "✔";
      completeBtn.addEventListener("click", function () {
          li.classList.toggle("completed");
          saveTasks();
      });

      // Add delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "❌";
      deleteBtn.addEventListener("click", function () {
          li.remove();
          saveTasks();
      });

      li.appendChild(completeBtn);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
  }

  function saveTasks() {
      const tasks = [];
      document.querySelectorAll("#taskList li").forEach(li => {
          tasks.push({ text: li.textContent.replace("✔❌", ""), completed: li.classList.contains("completed") });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
