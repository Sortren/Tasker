let submit = async () => {
  let email = document.getElementById("email");
  let username = document.getElementById("username");
  let password = document.getElementById("password");
  let information = document.getElementById("information");
  let confirm_password = document.getElementById("confirm-password");

  let data = {
    email: email.value,
    username: username.value,
    password: password.value,
  };

  let url = "http://localhost:2000/register";

  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const register = async () => {
    let body = await response.json();

    if (response.status === 400) {
      information.innerText = body.message;
    } else {
      information.innerText = body.message;

      //input reset after successful registration
      email.value = "";
      username.value = "";
      password.value = "";
      confirm_password.value = "";
    }
  };

  register();
};
