class Pagination{
    constructor(){
        this.ul = document.querySelector("#page-container");
        this.next = document.querySelector("#next-page");
        this.bindEvent();
    }
    render(selectList){
        this.selectList = selectList;
        //先把上一次的分页删除
        Array.from(this.ul.querySelectorAll(".page-li")).forEach(li =>{
            li.remove();
        })
        //用来生成页码li，渲染到页面上
        for(let i = 1; i <= this.selectList.pageCount; i++){
            let li = document.createElement("li");
            li.className = i === this.selectList.pageIndex ? "active page-li" : "page-li";
            li.innerHTML= `<a href= "javascript:;" class="page">${i}</a>`;
            //li添加到next之前
            this.ul.insertBefore(li,this.next);
        }
    }
    bindEvent(){
        this.ul.onclick = e => {
            let target = e.target;
            let targetClass =Array.from(e.target.classList);
            //let targetClass =[...e.target.classList];
             if(targetClass.includes("page")){
                //点击了页码数的分页
                this.selectList.pageIndex = Number(target.innerHTML);
                this.selectList.init();
             }else if(targetClass.includes("prev-page")){
                 if(--this.selectList.pageIndex < 1){
                     this.selectList.pageIndex = 1;
                     return;
                 }
                 this.selectList.init();
             }else if(targetClass.includes("next-page")){
                 if(++this.selectList.pageIndex > this.selectList.pageCount){
                    this.selectList.pageIndex = this.selectList.pageCount;
                 return;
                 }
                 this.selectList.init();
            }
        }
    }
}
let pagination = new Pagination();