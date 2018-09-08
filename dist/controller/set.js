/** layuiAdmin.pro-v1.0.0-beta7 LPPL License By http://www.layui.com/admin/ */
;layui.define(["form", "upload"], function(t) {
    var i = layui.$
      , e = layui.layer
      , n = (layui.laytpl,
    layui.setter,
    layui.view,
    layui.admin)
      , a = layui.form
      , s = layui.upload;
    i("body");
    a.render(),
    a.verify({
        nickname: function(t, i) {
            return new RegExp("^[a-zA-Z0-9_一-龥\\s·]+$").test(t) ? /(^\_)|(\__)|(\_+$)/.test(t) ? "用户名首尾不能出现下划线'_'" : /^\d+\d+\d$/.test(t) ? "用户名不能全为数字" : void 0 : "用户名不能有特殊字符"
        },
        pass:function(value){
          if(value.length<5||value.length>12){
            return '密码长度应该介于5~12之间';
          }
        },
        repass: function(t) {
            if (t !== i("#LAY_password").val())
                return "两次密码输入不一致"
        }
    }),
    a.on("submit(set_website)", function(t) {
        i.ajax({
            url:layui.setter.url+'admin/web/web',
            type:'POST',
	xhrFields: {
           withCredentials: true
       },
            data:t.field,
            success:function(res){
                if(res.code==200){
                     layer.msg('保存成功', {
                  offset: '15px'
                  ,icon: 1
                  ,time: 1000
                }, function(){
                //   location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/';
                })
                }else{
                   layer.msg(res.error, {
                  offset: '15px'
                  ,icon: 2
                  ,time: 1000
                }, function(){
                //   location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/';
                }) 
                }
            }

        })
       
        
    }),
    a.on("submit(setemail)", function(t) {
   
        i.ajax({
            url:layui.setter.url+'admin/web/email',
            type:'POST',
	    xhrFields:{
          	 withCredentials: true
      	     },
            data:t.field,
            success:function(res){
                if(res.code==200){
                     layer.msg('保存成功', {
                  offset: '15px'
                  ,icon: 1
                  ,time: 1000
                }, function(){
                  //location.hash =  '/';
                })
                }else{
                   layer.msg(res.error, {
                  offset: '15px'
                  ,icon: 2
                  ,time: 1000
                }, function(){
                  //location.hash =  '/';
                }) 
                }
            }

        })
    }),
    a.on("submit(setmyinfo)", function(t) {
        console.log(t)
        i.ajax({
            url:layui.setter.url+'admin/admin/info',
            type:'POST',
		xhrFields: {
           withCredentials: true
       },
            data:t.field,
            success:function(res){
                    if(res.code==200){
                    layer.msg('修改成功', {
                          offset: '15px'
                          ,icon: 1
                          ,time: 1000
                        }, function(){
                            
                        });
                }else{
                    layer.msg(res.error, {
                          offset: '15px'
                          ,icon: 2
                          ,time: 1000
                        }, function(){
                         
                        });
                }
            }
        })
    }),
    a.on("submit(setmymenu)", function(t) {
    	var addmenu=layer.load();
    	i.ajax({
    		url:layui.setter.url+'admin/menu/addmenu',
    		type:'POST',
			xhrFields: {
           withCredentials: true
       },
    		data:t.field,
    		success:function(data){
    			if(data.code==200){
    				layer.msg(data.msg, {
				          offset: '15px'
				          ,icon: 1
				          ,time: 1000
				        }, function(){
                            location.hash = '/';
				        });
    			}else{
    				layer.msg(data.msg, {
				          offset: '15px'
				          ,icon: 2
				          ,time: 1000
				        }, function(){
				         
				        });
    			}
    			layer.close(addmenu)
    		}
    	})
        // return e.msg(JSON.stringify(t.field)),
         //!1
    });
    var r = i("#LAY_avatarSrc");
    s.render({
        url: "/api/upload/",
        elem: "#LAY_avatarUpload",
        done: function(t) {
            0 == t.status ? r.val(t.url) : e.msg(t.msg, {
                icon: 5
            })
        }
    }),
    n.events.avartatPreview = function(t) {
        var i = r.val();
        e.photos({
            photos: {
                title: "查看头像",
                data: [{
                    src: i
                }]
            },
            shade: .01,
            closeBtn: 1,
            anim: 5
        })
    }
    ,
    a.on("submit(setmypass)", function(t) {
        i.ajax({
            url:layui.setter.url+'admin/admin/password',
            type:'POST',
		xhrFields: {
           withCredentials: true
       },
            data:t.field,
            success:function(res){
                if(res.code==200){
                    layer.msg('修改成功 请从新登录', {
                          offset: '15px'
                          ,icon: 1
                          ,time: 1000
                        }, function(){
                            layui.admin.exit();
                        });
                }else{
                    layer.msg(res.error, {
                          offset: '15px'
                          ,icon: 2
                          ,time: 1000
                        }, function(){
                         
                        });
                }
            }
        })
    }),
    t("set", {})
});
