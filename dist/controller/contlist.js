/** layuiAdmin.pro-v1.0.0 LPPL License By http://www.layui.com/admin/ */
;layui.define(["table", "form",'layedit'], function(t) {
    var e = (layui.$,
    layui.admin)
      , i = layui.view
      , n = layui.table
      , l = layui.form,
      $=layui.jquery,
      layedit=layui.layedit;
      var edit2;
      var catelist;

       $.ajax({
        url:layui.setter.url+'admin/post/cate',
        type:'POST',
         xhrFields: {
           withCredentials: true
       },
        success:function(res){
            var str=``;
           
            if(res.length>0){
                res.forEach(item => {
                    str+=`<option value="${item.id}">${item.name}</option>`
                });
                catelist=str
               
            }
        }
    })
    n.render({
        elem: "#LAY-app-content-list",
        url: layui.setter.url+"admin/post/article",
        cols: [[{
            type: "checkbox",
            fixed: "left"
        }, {
            field: "id",
            width: 100,
            title: "文章ID",
            sort: !0
        }, {
            field: "tag",
            title: "文章标签",
            minWidth: 100
        }, {
            field: "title",
            title: "文章标题"
        }, {
            field: "catename",
            title: "分类"
        }, {
            field: "create_time",
            title: "上传时间",
            sort: !0
        }, {
            field: "status",
            title: "发布状态",
            templet: "#buttonTpl",
            minWidth: 80,
            align: "center"
        }, {
            title: "操作",
            minWidth: 150,
            align: "center",
            fixed: "right",
            toolbar: "#table-content-list"
        }]],
        page: !0,
        limit: 10,
        limits: [10, 15, 20, 25, 30],
        text: "对不起，加载出现异常！"
    }),
    n.on("tool(LAY-app-content-list)", function(t) {
        var n = t.data;
        "del" === t.event ? layer.confirm("确定删除此文章？", function(e) {
            t.del(),

            $.ajax({
            	url:layui.setter.url+'admin/post/postdel',
            	type:'POST',
                 xhrFields: {
           withCredentials: true
       },
            	data:{
            		id:t.data.id
            	},
            	success:function(res){
            		layer.msg(res.msg)
            	}
            })
            layer.close(e)
        }) : "edit" === t.event && e.popup({
            title: "编辑文章",
            area: ["550px", "550px"],
            id: "LAY-popup-content-edit",
            success: function(t, e) {
                i(this.id).render("article/article/listform", n).done(function() {
                	
					     layedit.set({
					  uploadImage: {
					    url: layui.setter.url+'admin/post/upload_img' //接口url
					    ,type: 'POST' //默认post
					  }
					});
                	 edit2 =layedit.build('edit');
                	$('#cates').append(catelist);
                    l.render(null, "layuiadmin-app-form-list"),
                    l.on("submit(layuiadmin-app-form-submit)", function(t) {
                        console.log(t.field)
                        t.field.status=t.field.status=="on"?1:0
                       var content= layedit.getContent(edit2)
                       if(content==""){
                       	layer.msg('正文内容不能为空')
                       }
                        t.field.content=content;
    
			               $.ajax({
				            url:layui.setter.url+'admin/post/update',
				            type:'POST',
                             xhrFields: {
           withCredentials: true
       },
				            data:t.field,
				            success:function(res){
			              layer.msg(res.msg)
			              }
			          })
                      
                        layui.table.reload("LAY-app-content-list"),
                        layer.close(e)
                    })
                })
            }
        })
    }),
    n.render({
        elem: "#LAY-app-content-tags",
        url: layui.setter.url+'admin/post/articlecate',
        cols: [[ {
            field: "id",
            width: 100,
            title: "ID",
            sort: !0
        }, {
            field: "name",
            title: "分类名",
            minWidth: 100
        }, {
            field: "create_time",
            title: "创建时间",
            minWidth: 100
        }, {
            title: "操作",
            width: 150,
            align: "center",
            fixed: "right",
            toolbar: "#layuiadmin-app-cont-tagsbar"
        }]],
        page: !0,
        text: "对不起，加载出现异常！"
    }),
    n.on("tool(LAY-app-content-tags)", function(t) {
        var n = t.data;
        "del" === t.event ? layer.confirm("确定删除此分类？", function(e) {
            t.del(),
             $.ajax({
            	url:layui.setter.url+'admin/post/catedel',
            	type:'POST',
                 xhrFields: {
           withCredentials: true
       },
            	data:{
            		id:t.data.id
            	},
            	success:function(res){
            		layer.msg(res.msg)
            	}
            })
            layer.close(e)
        }) : "edit" === t.event && e.popup({
            title: "编辑分类",
            area: ["450px", "200px"],
            id: "LAY-popup-content-tags",
            success: function(t, e) {
                i(this.id).render("article/cate/tagsform", n).done(function() {
                    l.render(null, "layuiadmin-form-tags"),
                    l.on("submit(layuiadmin-app-tags-submit)", function(t) {
                        t.field;
                        $.ajax({
                        	url:layui.setter.url+'admin/post/cateupdate',
                        	type:'post',
                             xhrFields: {
           withCredentials: true
       },
                        	data:t.field,
                        	success:function(res){
                        		layer.msg(res.msg)
                        	}
                        })
                        layui.table.reload("LAY-app-content-tags"),
                        layer.close(e)
                    })
                })
            }
        })
    }),
    n.render({
        elem: "#LAY-app-content-comm",
        url: layui.setter.url+"admin/post/comment",
        cols: [[{
            type: "checkbox",
            fixed: "left"
        }, {
            field: "pid",
            width: 100,
            title: "文章ID",
            sort: !0
        }, {
            field: "email",
            title: "评论者",
            minWidth: 100
        }, {
            field: "content",
            title: "评论内容",
            minWidth: 100
        }, {
            field: "create_time",
            title: "评论时间",
            minWidth: 100,
            sort: !0
        }, {
            title: "操作",
            width: 150,
            align: "center",
            fixed: "right",
            toolbar: "#table-content-com"
        }]],
        page: !0,
        limit: 10,
        limits: [10, 15, 20, 25, 30],
        text: "对不起，加载出现异常！"
    }),
    n.on("tool(LAY-app-content-comm)", function(t) {
        var n = t.data;
        "del" === t.event ? layer.confirm("确定删除此条评论？", function(e) {
            t.del(),
             $.ajax({
                url:layui.setter.url+'admin/post/comdel',
                type:'POST',
                 xhrFields: {
           withCredentials: true
       },
                data:{
                    id:t.data.id
                },
                success:function(res){
                    layer.msg(res.msg)
                }
            })
            layer.close(e)
        }) : "edit" === t.event && e.popup({
            title: "编辑评论",
            area: ["450px", "300px"],
            id: "LAY-popup-content-comm",
            success: function(t, e) {
                i(this.id).render("article/comment/contform", n).done(function() {
                    l.render(null, "layuiadmin-form-comment"),
                    l.on("submit(layuiadmin-app-com-submit)", function(t) {
                        t.field;
                        $.ajax({
                        	url:layui.setter.url+'admin/post/comupdate',
                        	type:'post',
                             xhrFields: {
           withCredentials: true
       },
                        	data:t.field,
                        	success:function(res){
                        		layer.msg(res.msg)
                        	}
                        })
                        layui.table.reload("LAY-app-content-comm"),
                        layer.close(e)
                    })
                })
            }
        })
    }),
    n.render({
        elem: "#LAY-app-recly-list",
        url: layui.setter.url+"admin/post/recly",
        cols: [[{
            type: "checkbox",
            fixed: "left"
        }, {
            field: "id",
            width: 100,
            title: "文章ID",
            sort: !0
        }, {
            field: "tag",
            title: "文章标签",
            minWidth: 100
        }, {
            field: "title",
            title: "文章标题"
        }, {
            field: "update_time",
            title: "删除日期"
        }, {
            field: "create_time",
            title: "上传时间",
            sort: !0
        }, {
            title: "操作",
            minWidth: 150,
            align: "center",
            fixed: "right",
            toolbar: "#table-recly-list"
        }]],
        page: !0,
        limit: 10,
        limits: [10, 15, 20, 25, 30],
        text: "对不起，加载出现异常！"
    }),
    n.on("tool(LAY-app-recly-list)", function(t) {
        var n = t.data;
        "del" === t.event ? layer.confirm("确定删除此条数据？", function(e) {
            t.del(),
             $.ajax({
                url:layui.setter.url+'admin/post/reclydel',
                type:'POST',
                 xhrFields: {
           withCredentials: true
       },
                data:{
                    id:t.data.id
                },
                success:function(res){
                    layer.msg(res.msg)
                }
            })
            layer.close(e)
        }) : "back" === t.event && layer.confirm('确定要还原吗？分类不存在的文章将会还原到默认分类！', function(index) {
         
         
         $.ajax({
          url:layui.setter.url+"admin/post/getback",
          type:'post',
           xhrFields: {
           withCredentials: true
       },
          data:{
            id:t.data.id
          },
          success:function(res){
           layer.msg(res.msg)
          }
         })

          layui.table.reload('LAY-app-recly-list');
          layer.close(index);
        });
    }),
    n.render({
        elem: "#LAY-app-log-comm",
        url: layui.setter.url+"admin/logs/sloglist",
        cols: [[{
            type: "checkbox",
            fixed: "left"
        }, {
            field: "id",
            width: 100,
            title: "ID",
            sort: !0
        }, {
            templet:'<div>管理员<div>',
            title: "用户",
            minWidth: 100
        }, {
            field: "do",
            title: "行为",
            minWidth: 100
        }, {
            field: "ip",
            title: "ip地址",
            minWidth: 100
        },{
            field: "create_time",
            title: "操作时间",
            minWidth: 100,
            sort: !0
        }, {
            title: "操作",
            width: 150,
            align: "center",
            fixed: "right",
            toolbar: "#table-content-log"
        }]],
        page: !0,
        limit: 10,
        limits: [10, 15, 20, 25, 30],
        text: "对不起，加载出现异常！"
    }),
    n.on("tool(LAY-app-log-comm)", function(t) {
        var n = t.data;
        "del" === t.event ? layer.confirm("确定要删除？", function(e) {
            t.del(),
             $.ajax({
                url:layui.setter.url+'admin/logs/slogdel',
                type:'POST',
                 xhrFields: {
           withCredentials: true
       },
                data:{
                    id:t.data.id
                },
                success:function(res){
                    layer.msg(res.msg)
                }
            })
            layer.close(e)
        }) : "edit" === t.event
    }),n.render({
        elem: "#LAY-app-user-comm",
        url: layui.setter.url+"admin/logs/bloglist",
        cols: [[{
            type: "checkbox",
            fixed: "left"
        }, {
            field: "id",
            width: 100,
            title: "ID",
            sort: !0
        }, {
            templet:'<div>匿名用户<div>',
            title: "用户",
            minWidth: 100
        }, {
            field: "do",
            title: "行为",
            minWidth: 100
        }, {
            field: "ip",
            title: "ip地址",
            minWidth: 100
        }, {
            field: "city",
            title: "省份",
            minWidth: 100
        },{
            field: "create_time",
            title: "操作时间",
            minWidth: 100,
            sort: !0
        }, {
            title: "操作",
            width: 150,
            align: "center",
            fixed: "right",
            toolbar: "#table-content-user"
        }]],
        page: !0,
        limit: 10,
        limits: [10, 15, 20, 25, 30],
        text: "对不起，加载出现异常！"
    }),
    n.on("tool(LAY-app-user-comm)", function(t) {
        var n = t.data;
        "del" === t.event ? layer.confirm("确定要删除？", function(e) {
            t.del(),
             $.ajax({
                url:layui.setter.url+'admin/logs/blogdel',
                type:'POST',
                 xhrFields: {
           withCredentials: true
       },
                data:{
                    id:t.data.id
                },
                success:function(res){
                    layer.msg(res.msg)
                }
            })
            layer.close(e)
        }) : "edit" === t.event
    })

    t("contlist", {})
});
