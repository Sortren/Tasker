let send = () => {
    let taskName = document.getElementById('taskName');
    
    //getting an _id that has been passed with the user logging
    let _id = localStorage.getItem('_id');

    let data = {
        tasks: taskName.value //value from the input
    }

    let url = `http://localhost:2000/tasks/${_id}`;

    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    //input field reset after invoking a function send()
    taskName.value = '';
}