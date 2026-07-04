const modal =
document.getElementById("taskModal");

const addTaskBtn =
document.getElementById("addTaskBtn");

const closeModal =
document.getElementById("closeModal");

const saveTask =
document.getElementById("saveTask");

let tasks =
JSON.parse(localStorage.getItem("kanbanTasks")) || [];

addTaskBtn.addEventListener("click",()=>
{
    modal.style.display = "flex";
});

closeModal.addEventListener("click",()=>
{
    modal.style.display = "none";
});

window.addEventListener("click",(e)=>
{
    if(e.target === modal)
    {
        modal.style.display = "none";
    }
});

function saveTasks()
{
    localStorage.setItem(
        "kanbanTasks",
        JSON.stringify(tasks)
    );
}

function createTaskElement(task,index)
{
    const taskDiv =
    document.createElement("div");

    taskDiv.className = "task";

    taskDiv.innerHTML = `
        <h3>${task.title}</h3>

        <p>${task.description}</p>

        <button
            class="delete-btn"
            onclick="deleteTask(${index})"
        >
            Delete
        </button>
    `;

    return taskDiv;
}

function renderTasks()
{
    document.getElementById("todo").innerHTML = "";
    document.getElementById("progress").innerHTML = "";
    document.getElementById("done").innerHTML = "";

    tasks.forEach((task,index)=>
    {
        const element =
        createTaskElement(task,index);

        document
        .getElementById(task.column)
        .appendChild(element);
    });
}

saveTask.addEventListener("click",()=>
{
    const title =
    document
    .getElementById("taskTitle")
    .value
    .trim();

    const description =
    document
    .getElementById("taskDescription")
    .value
    .trim();

    const column =
    document
    .getElementById("taskColumn")
    .value;

    if(title === "")
    {
        alert("Please enter task title.");
        return;
    }

    tasks.push({
        title,
        description,
        column
    });

    saveTasks();

    renderTasks();

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskColumn").value = "todo";

    modal.style.display = "none";
});

function deleteTask(index)
{
    if(confirm("Delete this task?"))
    {
        tasks.splice(index,1);

        saveTasks();

        renderTasks();
    }
}

document
.getElementById("taskTitle")
.addEventListener("keydown",(e)=>
{
    if(e.key === "Enter")
    {
        saveTask.click();
    }
});

renderTasks();