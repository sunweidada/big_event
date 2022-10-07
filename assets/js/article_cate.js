$(function(){
    const layer=layui.layer
    loadCateList()
    function loadCateList(){
        $.ajax({
            method:'GET',
            url:'/my/cate/list',
            success(res){
                if(res.code!==0){
                    return layer.msg('获取文章失败')
                }
                layer.msg('获取文章成功')
                console.log(res);
               const htmlStr= template('tpl-cate',res)
               $('tbody').append(htmlStr)
            }
        })
    }
    $('#btnAdd').on('click',function(){
        layer.open({
            type:1,
            area: ['500px', '300px'],
            title: '添加分类名称'
            ,content: $('#addDialog').html()
          });    
    })
})