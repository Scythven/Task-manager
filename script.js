document.addEventListener("DOMContentLoaded", function () {
            const taskInput = document.getElementById("taskInput");
            const addTaskButton = document.getElementById("addTask");
            const taskList = document.getElementById("taskList");

            // Funkcja dodawania nowego zadania (z obsługą LocalStorage)
            function addTask() {
                const taskText = taskInput.value.trim();
                if (taskText === "") return;

                const taskItem = document.createElement("li");
                taskItem.classList.add("task-item");
                taskItem.innerHTML = `
                    <span>${taskText}</span>
                    <div class="task-actions">
                        <button class="btn btn-complete">Zakończ</button>
                        <button class="btn btn-edit">Edytuj</button>
                        <button class="btn btn-delete">Usuń</button>
                    </div>
                `;

                // Obsługa zakończenia zadania
                const completeButton = taskItem.querySelector(".btn-complete");
                completeButton.addEventListener("click", function () {
                    taskItem.classList.toggle("completed");
                    saveTasksToLocalStorage();
                });

                // Obsługa usuwania zadania
                const deleteButton = taskItem.querySelector(".btn-delete");
                deleteButton.addEventListener("click", function () {
                    taskList.removeChild(taskItem);
                    saveTasksToLocalStorage();
                });

                // Obsługa edycji zadania
                const editButton = taskItem.querySelector(".btn-edit");
                editButton.addEventListener("click", function () {
                    const taskSpan = taskItem.querySelector("span");
                    const updatedText = prompt("Edytuj zadanie:", taskSpan.textContent);
                    if (updatedText !== null) {
                        taskSpan.textContent = updatedText;
                        saveTasksToLocalStorage();
                    }
                });

                taskList.appendChild(taskItem);
                taskInput.value = "";
                saveTasksToLocalStorage();
            }

            // Funkcja do zapisywania zadań w LocalStorage
            function saveTasksToLocalStorage() {
                const tasks = [];
                const taskItems = document.querySelectorAll(".task-item");
                taskItems.forEach((taskItem) => {
                    const taskText = taskItem.querySelector("span").textContent;
                    const isCompleted = taskItem.classList.contains("completed");
                    tasks.push({ text: taskText, completed: isCompleted });
                });
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }

            // Funkcja do wczytywania zadań z LocalStorage
            function loadTasksFromLocalStorage() {
                const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
                tasks.forEach((task) => {
                    const taskItem = document.createElement("li");
                    taskItem.classList.add("task-item");
                    if (task.completed) {
                        taskItem.classList.add("completed");
                    }
                    taskItem.innerHTML = `
                        <span>${task.text}</span>
                        <div class="task-actions">
                            <button class="btn btn-complete">Zakończ</button>
                            <button class="btn btn-edit">Edytuj</button>
                            <button class="btn btn-delete">Usuń</button>
                        </div>
                    `;

                    // Obsługa zakończenia zadania (z obsługą LocalStorage)
                    const completeButton = taskItem.querySelector(".btn-complete");
                    completeButton.addEventListener("click", function () {
                        taskItem.classList.toggle("completed");
                        saveTasksToLocalStorage();
                    });

                    // Obsługa usuwania zadania (z obsługą LocalStorage)
                    const deleteButton = taskItem.querySelector(".btn-delete");
                    deleteButton.addEventListener("click", function () {
                        taskList.removeChild(taskItem);
                        saveTasksToLocalStorage();
                    });

                    // Obsługa edycji zadania (z obsługą LocalStorage)
                    const editButton = taskItem.querySelector(".btn-edit");
                    editButton.addEventListener("click", function () {
                        const taskSpan = taskItem.querySelector("span");
                        const updatedText = prompt("Edytuj zadanie:", taskSpan.textContent);
                        if (updatedText !== null) {
                            taskSpan.textContent = updatedText;
                            saveTasksToLocalStorage();
                        }
                    });

                    taskList.appendChild(taskItem);
                });
            }

            // Wczytaj zadania z LocalStorage po załadowaniu strony
            loadTasksFromLocalStorage();
            
            // Obsługa dodawania zadania po kliknięciu przycisku (z obsługą LocalStorage)
            addTaskButton.addEventListener("click", addTask);

            // Obsługa dodawania zadania po naciśnięciu Enter (z obsługą LocalStorage)
            taskInput.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    addTask();
                }
            });
        });