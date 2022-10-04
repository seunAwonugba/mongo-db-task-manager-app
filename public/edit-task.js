const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const taskCompletedDOM = document.querySelector(".task-edit-completed");
const editFormDOM = document.querySelector(".single-task-form");
const editBtnDOM = document.querySelector(".task-edit-btn");
const formAlertDOM = document.querySelector(".form-alert");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");
let tempName;

const showTask = async () => {
    try {
        const response = await axios.get(`/api/v1/tasks/${id}`);
        const taskId = response.data.data._id;
        const taskName = response.data.data.name;
        const taskStatus = response.data.data.completed;

        taskIDDOM.textContent = taskId;
        taskNameDOM.value = taskName;
        tempName = taskName;
        if (taskStatus == true) {
            taskCompletedDOM.checked = true;
        }
    } catch (error) {
        console.log(error);
    }
};

showTask();

editFormDOM.addEventListener("submit", async (e) => {
    editBtnDOM.textContent = "Loading...";
    e.preventDefault();
    try {
        const taskName = taskNameDOM.value;
        const taskCompleted = taskCompletedDOM.checked;

        const update = await axios.patch(`/api/v1/tasks/${id}`, {
            name: taskName,
            completed: taskCompleted,
        });

        const updatedTaskId = update.data.data._id;
        const updatedTask = update.data.data.name;
        const updatedTaskStatus = update.data.data.completed;

        taskIDDOM.textContent = updatedTaskId;
        taskNameDOM.value = updatedTask;
        tempName = updatedTask;
        if (updatedTaskStatus) {
            taskCompletedDOM.checked = true;
        }
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = `success, edited task`;
        formAlertDOM.classList.add("text-success");
    } catch (error) {
        taskNameDOM.value = tempName;
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = error.response.data.data;
    }
    editBtnDOM.textContent = "Edit";
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 5000);
});
