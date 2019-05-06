class SelectList{
    constructor(tbody){
        this.tbody = document.querySelector(tbody);
        //默认处于第一页
        this.pageIndex = 1;
        //当前页有多少条,count为多少条数，不能被修改
        Object.defineProperty(this,"count",{
            writable : false,
            value : 6
        });
        //默认总页数为一页（临时默认值）
        this.pageCount = 1;
        this.init();
    }
    init(){
        let {pageIndex,count} = this;//结构赋值
        tools.ajaxGetPromise("api/v1/select.php",{pageIndex,count}).then(data =>{
            //console.log(data);
            if(data.res_code === 1){
                this.render(data.res_body.data);
                this.pageCount = data.res_body.pageCount;
                //根据总页数渲染分页,当前处于第几页
                pagination.render(this);
            }else{
                //查询失败的话弹出失败信息
                alert(data.res_message);
            }
        })
    }
    render(list){
        let html = "";
        list.forEach((shop,index)  => {
            html += `<tr data-id="${shop.id}">
            <td>${(this.pageIndex-1)*this.count + index + 1}</td>
            <td>${shop.name}</td>
            <td>
                <span>${shop.price}</span>
                <input type="text" class="inputPrice">
            </td>
            <td>
                <span>${shop.num}</span>
                <input type="text" class="inputNum">
            </td>
            <td>
                <button type="button" class="btn btn-xs btn-edit btn-success">编辑</button>
                <button type="button" class="btn btn-xs btn-del btn-danger">删除</button>
                <button type="button" class="btn btn-xs btn-ok btn-info">确定</button>
                <button type="button" class="btn btn-xs btn-cancel btn-warning">取消</button>
            </td>
        </tr>`;
        });
        this.tbody.innerHTML = html;
    }
}
let getShop = new SelectList("#tbody");