class Register {
  constructor () {
    this.inputUserName = document.querySelector("#inputUserName");
    this.inputPassword = document.querySelector("#inputPassword");
    this.btn = document.querySelector("#btn");
    this.bindEvent();
  }

  bindEvent () {
    this.btn.onclick = () => {
      let username = this.inputUserName.value,
          password = this.inputPassword.value;
      
      // 发送请求
      tools.ajax("POST", "../api/v1/register.php", {username, password}, data => {
        if(data.res_code === 1){
          alert(data.res_message);
          window.location.href = "../html/login.html";
        }
      })

      return false;

    }
  }


}

new Register();