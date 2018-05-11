function pagination(pageNumber,pageSize){
    var tableDom = document.getElementById("myTable");//获取table
    var totalRow = tableDom.rows.length;//table总行数
    var totalPage;//总页数

    //总共分几页
    var pageInt = parseInt((totalRow - 1) / pageSize);
    if((totalRow - 1) / pageSize > pageInt){
        totalPage = pageInt + 1;
    }else{
        totalPage = pageInt;
    }

    //分页显示,每一页保留表头
    var startRow = (pageNumber - 1) * pageSize + 2;//开始显示的行
    var endRow = startRow + pageSize - 1;//结束显示的行
    //表格总行数小于显示大小的情况
    if(endRow > totalRow){
        endRow = totalRow;
    }
    //遍历显示数据实现分页
    for(var i = 2; i < (totalRow + 1); i++){
        var thisRow = tableDom.rows[i - 1];
        if(i >= startRow && i <= endRow){
            thisRow.style.display = "table-row";
        }else{
            thisRow.style.display = "none";
        }
    }

    //拼接分页html内容
    var pageHtml = "<span class='total_page'>共" + totalPage + "页</span>";
    //前半部分
    if(pageNumber > 1){
        pageHtml += "<span class='page_btn' onClick='pagination(" + (1) + "," + pageSize + ")'>首页</span>";
        pageHtml += "<span class='page_btn' onClick='pagination(" + (Number(pageNumber) - 1) + "," + pageSize + ")'>上一页</span>";
    }else{
        pageHtml += "<span class='page_btn'>首页</span>";
        pageHtml += "<span class='page_btn'>上一页</span>";
    }
    //当前页数显示或输入框
    pageHtml += "<input type='text' class='page_input' id='pageInput' onclick='bindSelect()' value='" + pageNumber + "' onkeypress='BindEnter(this," + totalPage + "," + pageSize + ")'/>";
    //后半部分
    if (pageNumber < totalPage) {
        pageHtml += "<span class='page_btn' onClick='pagination(" + (Number(pageNumber) + 1) + "," + pageSize + ")'>下一页</span>";
        pageHtml += "<span class='page_btn' onClick='pagination(" + (totalPage) + "," + pageSize + ")'>尾页</span>";
    } else {
        pageHtml += "<span class='page_btn'>下一页</span>";
        pageHtml += "<span class='page_btn'>尾页</span>";
    }
    //挂载到相应的div上
    document.getElementById("tablePage").innerHTML = pageHtml;//页码div，挂载分页的html
}

//页数输入框，一选中就全选文本内容
function bindSelect() {
    document.getElementById("pageInput").focus();
    document.getElementById("pageInput").select();
}
//enter键绑定跳转事件
function BindEnter(e,totalPage,size){
    if (event.keyCode == 13) {
        event.cancelBubble = true;
        event.returnValue = false;
        var p;
        if(e.value > totalPage){
            p = totalPage;
        }else if(e.value <= 0){
            p = 1;
        }else{
            p = e.value;
        }
        pagination(p,size);
    }
}