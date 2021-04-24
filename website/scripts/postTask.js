let send = () => {
    let taskName = document.getElementById('taskName');
    let information = document.getElementById('information')
    
    let token = localStorage.getItem('jwt');

    let data = {
        tasks: taskName.value //value from the input
    }

    let url = 'http://localhost:2000/tasks';

    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'jwt': token
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        information.innerText = data.message;
    });
    
    //input field reset after invoking a function send()
    taskName.value = '';
}