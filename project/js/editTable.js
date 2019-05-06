class EditTable{
    constructor(tbody){
        this.tbody = document.querySelector(tbody);
        this.bindEvents();
    }
    bindEvents(){
        this.tbody.onclick = e => {
            let classList = Array.from(e.target.classList);
            let target = e.target;
            let tr = target.parentNode.parentNode;
            // 通过classList的数组来判断
            if(classList.includes("btn-edit")){
                this.editBtnClick(tr);
            }else if(classList.includes("btn-del")){
                this.delBtnClick(tr);
            }else if(classList.includes("btn-ok")){
                this.okBtnClick(tr);
            }else if(classList.includes("btn-cancel")){
                this.cancelBtnClick(tr);
            }
        }
    }
    editBtnClick(tr){
        Array.from(tr.querySelectorAll("span")).forEach(span =>{
            span.nextElementSibling.value = span.innerHTML;
        })
        //给tr添加class="edit"
        tr.classList.add("edit");
    }
    delBtnClick(tr){
        
        if(confirm("确定要删除吗？")){
            //请求后台删除信息
            let id = tr.getAttribute("data-id");
            tools.ajaxGetPromise("api/v1/delete.php",{id}).then(data => {
                if(data.res_code === 1){
                    alert(data.res_message);
                    getShop.init();
                }else{
                    alert(data.res_message);
                }
            })
           
        }
    }
    okBtnClick(tr){
        let inputPrice = tr.querySelector(".inputPrice"),
            inputNum = tr.querySelector(".inputNum"),
            id = tr.getAttribute("data-id"),
            price = inputPrice.value,
            num = inputNum.value;
            
        //发送更新请求
        tools.ajaxGetPromise("api/v1/ok.php",{id,price,num}).then(data =>{
            //给tr移除class="edit"
            tr.classList.remove("edit");
            alert(data.res_message);
            if(data.res_code === 1){
                inputPrice.previousElementSibling.innerHTML = inputPrice.value;
                inputNum.previousElementSibling.innerHTML = inputNum.value; 
            }
        })     
    }
    cancelBtnClick(tr){
        //给tr移除class="edit"
        tr.classList.remove("edit");
    }
}
new EditTable("#tbody");