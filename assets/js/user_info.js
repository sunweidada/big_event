$(function(){
    const form=layui.form
    const layer=layui.layer
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '必须输入1-6个非空字符'
            }
        }
    })

    // 获取用户相关信息
    const initInfo=()=>{
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success(res){
                if(res.code!==0){
                    return layer.msg('请求用户信息失败')
                }
                // console.log(res);
                // 用户回显数据
                layer.msg('请求用户信息成功')
                form.val('userForm',res.data)            
            }
        })
    }
    initInfo()

    // 表单重置事件
    $('#btnReset').on('click',function(e){
        console.log(11);
        e.preventDefault()
        initInfo()
    })

    // 表单提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'PUT',
            url:'/my/userinfo',
            data: form.val('userForm'),
            success(res){
                console.log(res);
                if(res.code!==0) return layer.msg('提交信息失败')
                window.parent.getUserInfo()
                layer.msg('提交信息成功')
            }
        })
    })
})