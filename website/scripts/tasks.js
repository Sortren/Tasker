let list = document.querySelector('ol');

let token = localStorage.getItem('jwt');
let url = 'http://localhost:2000/tasks/';

let removeTask = (item, index) => {
    let data = {
        index: index
    }

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'jwt': token
        },
        body: JSON.stringify(data)
    })

    item.remove();
}

let getTasks = async () => {
    let apiData = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'jwt': token
        },
    }).then(res => res.json()); //response from server is User's tasks array
    
    list.innerHTML = '';

    apiData.forEach((element, index) => {
        let item = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = '-';
        button.addEventListener('click', () => removeTask(item, index));
        
        item.innerText = element;
        item.appendChild(button); 

        list.appendChild(item);
    })
}

onload = async () => await getTasks();

let send = async () => {
    let taskName = document.getElementById('taskName');
    
    let token = localStorage.getItem('jwt');

    let data = {
        tasks: taskName.value //value from the input
    }

    let url = 'http://localhost:2000/tasks';

    await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'jwt': token
        },
        body: JSON.stringify(data)
    })
    
    //input field reset after invoking a function send()
    taskName.value = '';

    await getTasks();
}

