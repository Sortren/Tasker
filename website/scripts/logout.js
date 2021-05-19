let logout = async () => {
  localStorage.clear();
  location.href = "./login.html";
};

let userInfo = document.getElementById("user-info");
let username = localStorage.getItem("username");
userInfo.innerText = `${username}`;
