let submit = async () => {
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let information = document.getElementById('information');

    let data = {
        username: username.value,
        password: password.value
    }

    let url = "http://localhost:2000/login"

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }); //if status === 200 => response from the server will be User object
    
    const logging = async () => {
        let body = await response.json(); //body of returned user

        if (response.status === 200){
            //implements local storage for logging the user
            localStorage.setItem('username', body.username);//key -> username | value ->  body.username
            localStorage.setItem('password', body.password);
            localStorage.setItem('_id', body._id);
            location.href = './index.html'; //redirect to adding tasks page

        } else if (response.status === 401){
            information.innerText = body.message;
        } else if (response.status === 404){
            information.innerText = body.message;
        }
    }

    logging();
}