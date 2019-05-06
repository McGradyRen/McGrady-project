let unloginUl = document.querySelector("#unlogin-ul"),
    loginUl = document.querySelector("#login-ul"),
    usernameSpan = document.querySelector("#username-span"),
    exit = document.querySelector("#exit"),
    username = tools.cookie("username");
if(username){
    unloginUl.classList.add("hidden");
    usernameSpan.innerHTML = username;
    loginUl.classList.remove("hidden");
}

exit.onclick = () =>{
      if(username){
          loginUl.classList.add("hidden");
          unloginUl.classList.remove("hidden");
          tools.cookie("username", username, {expires: -1, path: "/"});
      }
  }