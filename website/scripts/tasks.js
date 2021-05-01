let list = document.querySelector("ol");
let token = localStorage.getItem("jwt");
let url = "http://localhost:2000/tasks/";

let remove = async () => {
  //DOMCheckboxes is NodeList by default, we have to convert it to array to use map/filter function
  let DOMCheckboxes = document.querySelectorAll('input[type="checkbox"]');

  let checkboxes = Array.from(DOMCheckboxes);

  let indexes = checkboxes
    .map((element, index) => {
      if (element.checked) {
        return index;
      }
    })
    .filter((element) => {
      if (element == undefined) {
        return false; // false -> item deleted from array
      } else {
        return true; // true -> item stays in array
      }
    });

  await removeTask(indexes);
  await getTasks();
};

let removeTask = async (indexes) => {
  let data = {
    indexes: indexes,
  };

  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      jwt: token,
    },
    body: JSON.stringify(data),
  });
};

let getTasks = async () => {
  let apiData = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      jwt: token,
    },
  }).then((res) => res.json()); //response from server is User's tasks array

  list.innerHTML = "";

  apiData.forEach((element) => {
    let item = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    item.appendChild(checkbox);
    item.innerHTML += element;

    list.appendChild(item);
  });
};

//Displaying tasks on page load
onload = async () => await getTasks();

//Sending a task to MongoDB
let send = async () => {
  let taskName = document.getElementById("taskName");

  let token = localStorage.getItem("jwt");

  let data = {
    tasks: taskName.value, //value from the input
  };

  let url = "http://localhost:2000/tasks";

  await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      jwt: token,
    },
    body: JSON.stringify(data),
  });

  //input field reset after invoking a function send()
  taskName.value = "";

  await getTasks();
};
