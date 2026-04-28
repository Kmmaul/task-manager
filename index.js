const tasks = [];

function addTask(task)
{
    tasks.push(task);
    console.log("Task added:", task);
}

function listTasks()
{
    console.log("Your tasks:");
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
}


//test
addTask("learn JavaScript");
addTask("Start my dev career");
addTask("Apply to dev jobs");
listTasks();