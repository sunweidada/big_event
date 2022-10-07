$(function(){
    const layer=layui.layer
    const form=layui.form
    loadCateList()
    function loadCateList(){
        $.ajax({
            method:'GET',
            url:'/my/cate/list',
            success(res){
                if(res.code!==0){
                    return layer.msg('获取文章失败')
                }
                // layer.msg('获取文章成功')
                console.log(res);
               const htmlStr= template('tpl-cate',res)
               $('tbody').empty().append(htmlStr)
            }
        })
    }
    let index=null
    $('#btnAdd').on('click',function(){
        // 打开弹窗
        index=layer.open({
            type:1,
            area: ['500px', '300px'],
            title: '添加分类名称'
            ,content: $('#addDialog').html()
          });    
    })

  
    let isEdit=false
    $('body').on('submit','#addForm',function(e){
        e.preventDefault()
       
        if(isEdit){
            $.ajax({
                method:'PUT',
                url:'/my/cate/info',
                data:$(this).serialize(),
                success(res){
                    if(res.code!==0) return layer.msg('修改分类失败')
                    layer.msg('修改分类成功')
                    loadCateList()
                    layer.close(index)
                }
            })
        }else{
            $.ajax({
                method:'POST',
                url:'/my/cate/add',
                // data:$(this).serialize()
                data:form.val('form'),
                success(res){
                    if(res.code!==0){
                        return layer.msg('添加分类失败')
                    }
                    layer.msg('添加分类成功')
                    loadCateList()
                    // layer.close(index)
                }
            })
           
        }
        isEdit=false
        layer.close(index)
        // loadCateList()
    })

    // 点击编辑
    // let indexEdit=null
    $('tbody').on('click','.btnEdit',function(){
        isEdit=true
        console.log('id是'+$(this).attr('data-id'));
        index=layer.open({
            type:1,
            area: ['500px', '300px'],
            title: '添加分类名称'
            ,content: $('#addDialog').html()
          }); 
          
        //   回显
        const id=$(this).attr('data-id')
        $.ajax({
            method:'GET',
            url:`/my/cate/info?id=${id}`,
            success(res){
                if(res.code!==0) return layer.msg('获取分类详情失败')
                form.val('form',res.data)
            }
        })
    })

    // 添加删除逻辑
    $('tbody').on('click','#btnDelete',function(){
        const id=$(this).attr('data-id')
        $.ajax({
            method:'DELETE',
            url:`/my/cate/del?id=${id}`,
            success(res){
                if(res.code!==0) return layer.msg('删除失败')
                layer.msg('删除成功')
                loadCateList()
            }
        })
    })
})