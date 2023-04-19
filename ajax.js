// Tableau pour stocker les tâches
let tasks = [];
      
// Fonction pour ajouter une tâche
function addTask() {
  let taskInput = document.getElementById("tache");
  let deadlineInput = document.getElementById("deadline");
  
  // Vérifier si les champs sont remplis
  if (taskInput.value === "" || deadlineInput.value === "") {
    alert("Veuillez remplir tous les champs.");
    return;
  }
  
  // Ajouter la tâche au tableau
  let task = {
    name: taskInput.value,
    deadline: new Date(deadlineInput.value)
  };
  ajoutbdd(task);
  tasks.push(task);
  
  
  // Réinitialiser les champs du formulaire
  taskInput.value = "";
  deadlineInput.value = "";
  
  // Mettre à jour la liste des tâches
  updateTaskList();
}

function delTask(){
  let tasknum = document.getElementById("taskdel")
  dTask(tasknum.value);
  return;
}

function dTask(elem) {
let taskList = document.getElementById("taskList");
taskList.innerHTML = "";

if (elem !== "") {
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    if (task.name === elem) {
      tasks.splice(i, 1);
      break; // stop iterating once the task is found and removed
    }
  }
}
updateTaskList();
}

// Fonction pour mettre à jour la liste des tâches
function updateTaskList() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  
  // Parcourir toutes les tâches et les ajouter à la liste
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let li = document.createElement("li");
    li.innerHTML = task.name + " - Date de fin : " + task.deadline.toLocaleDateString();
    var str = task.deadline.toISOString();
    str.split()
    let timeLeft = document.createElement("span");
    taskList.appendChild(li);
  }
}
  // Fonction pour mettre à jour le temps restant toutes les secondes
function updateTimers() {
// Parcourir toutes les tâches et mettre à jour leur temps restant
for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      let li = document.getElementById("task" + i);
      let timeLeft = li.querySelector("span");
  }
}

function response(){
  $.ajax({
    url: 'ajout.php',
    type: 'POST',
    dataType: 'JSON',
    success: function(response){
        console.log(response)
      }
    }
  );
}

function ajoutbdd(task){
    var formData = {
      nom: task.name,
      deadline: task.deadline.toLocaleDateString(),
    };

    console.log(formData);

    $.ajax({
      type: "POST",
      url: "ajout.php",
      data: formData,
      dataType: "json",
      encode: true,
    }).done(function (data) {
      console.log(data);
      response();
    });
};
