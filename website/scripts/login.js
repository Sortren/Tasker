let submit = async () => {
  let username = document.getElementById("username");
  let password = document.getElementById("password");
  let information = document.getElementById("information");

  let data = {
    username: username.value,
    password: password.value,
  };

  let url = "http://localhost:2000/login";

  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const logging = async () => {
    let body = await response; //body of returned user
    let data = await body.json();

    if (response.status === 200) {
      localStorage.setItem("jwt", body.headers.get("jwt"));
      localStorage.setItem("username", data.username);
      location.href = "./index.html";
    } else if (response.status === 401) {
      information.innerText = data.message;
    } else if (response.status === 404) {
      information.innerText = data.message;
    }
  };

  logging();
};
