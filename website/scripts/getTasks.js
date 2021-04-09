let list = document.querySelector('ol');

//getting an _id that has been passed with the user logging
//to specify from which user pull the tasks data
let _id = localStorage.getItem('_id');
let url = `http://localhost:2000/tasks/${_id}`;

let removeTask = async (item, index) => {
    let data = {
        index: index
    }

    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    item.remove();
}

onload = async () => {
    let apiData = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json()); //response from server is User's tasks array

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

