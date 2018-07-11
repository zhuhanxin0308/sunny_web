/** layuiAdmin.pro-v1.0.0-beta7 LPPL License By http://www.layui.com/admin/ */
;layui.define(function(e) {
    var chartdata;
    layui.use(["admin", "carousel"], function() {
        var e = layui.$
          , t = (layui.admin,
        layui.carousel)
          , a = layui.element
          , i = layui.device();
            e('.cache').click(function(){
                var index=layer.load()
                e.ajax({
                    url:layui.setter.url+'admin/index/clear',
                    type:'post',
		    xhrFields: {
          		 withCredentials: true
      		     },
                    success:function(res){
                        if(res.code==200){
                            layer.msg(res.msg, {
                                icon: 1
                              });
                              layer.close(index);
                        }else{
                            layer.msg(res.msg, {
                                icon: 2
                              });
                              layer.close(index);
                        }
                    }
                })
            })
          e.ajax({
        url:layui.setter.url+"admin/index/main",
        type:"POST",
	xhrFields: {
           withCredentials: true
       },
        async:false,
        success:function(res){
        	//构造快捷方式dom
        	var quick="";
        	res.data.quick.forEach(function(current,index,arr){
        		
        		if(current.icon==null||current.icon==""||current.icon==undefined){
        			current.icon="layui-icon-set";
        		}
        		if(current.pparent){
        			current.name=current.pparent.name+'/'+current.parent.name+'/'+current.name;
        		}else{
        			current.name=current.parent.name+'/'+current.name+'/';
        		}
        		if(index%8==0){
        			if(index==0){
        				quick+=`<ul class="layui-row layui-col-space10">
        			<li class="layui-col-xs3">
                      <a lay-href="`+current.name+`">
                         <i class="layui-icon `+current.icon+`"></i>
                         <cite>`+current.title+`</cite>
                       </a>
                    </li>`
                }else{
                	quick+=`</ul><ul class="layui-row layui-col-space10">
        			<li class="layui-col-xs3">
                      <a lay-href="`+current.name+`">
                         <i class="layui-icon `+current.icon+`"></i>
                         <cite>`+current.title+`</cite>
                       </a>
                    </li>`
                }
        			
        		}else{
        			quick+=`<li class="layui-col-xs3">
                      <a lay-href="`+current.name+`">
                         <i class="layui-icon `+current.icon+`"></i>
                         <cite>`+current.title+`</cite>
                       </a>
                    </li>`
        		}
        		
        		
        		
        	},this)
        	quick+=`</ul>`;
        	
       	   e('#php_version').append(res.data.php_version);
           e('#quick').append(quick)
          
        } 
      })
           e.ajax({
        url:layui.setter.url+"admin/index/tongji",
        type:"POST",
	xhrFields: {
           withCredentials: true
       },
        async:false,
        success:function(res){
            //构造快捷方式dom
            var quick="";

            res.data.forEach(function(current,index){
                
                
                if(index%4==0){
                    if(index==0){
                        quick+=`<ul class="layui-row layui-col-space10">
                    <li class="layui-col-xs6">
                      <a lay-href="" class="layadmin-backlog-body">
                        <h3>`+current.name+`</h3>
                        <p><cite>`+current.value+`</cite></p>
                      </a>
                    </li>`
                }else{
                    quick+=`</ul><ul class="layui-row layui-col-space10">
                    <li class="layui-col-xs6">
                      <a lay-href="" class="layadmin-backlog-body">
                        <h3>`+current.name+`</h3>
                        <p><cite>`+current.value+`</cite></p>
                      </a>
                    </li>`
                }
                    
                }else{
                    quick+=`<li class="layui-col-xs6">
                      <a lay-href="" class="layadmin-backlog-body">
                        <h3>`+current.name+`</h3>
                        <p><cite>`+current.value+`</cite></p>
                      </a>
                    </li>`
                }
                
                
                
            },this)
            quick+=`</ul>`;
            
          
           e('#info').append(quick)
          
        } 
      })
         e.ajax({
            url:layui.setter.url+'admin/index/testdata',
            async:false,
		xhrFields: {
           withCredentials: true
       },
            success:function(res){

                chartdata=res.data;
                
            }
         })
        e(".layadmin-carousel").each(function() {
            var a = e(this);
            t.render({
                elem: this,
                width: "100%",
                arrow: "none",
                interval: a.data("interval"),
                autoplay: a.data("autoplay") === !0,
                trigger: i.ios || i.android ? "click" : "hover",
                anim: a.data("anim")
            })
        }),
        a.render("progress")
    }),
    layui.use(["carousel", "echarts"], function() {
        var e = layui.$
          , t = layui.carousel
          , a = layui.echarts
          , i = []
          , l = [{
            title: {
                text: "",
                x: "center",
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: "axis"
            },
            legend: {
                data: ["ip", "pv"]
            },
            xAxis: [{
                type: "category",
                boundaryGap: !1,
                data: ['10:00','12:00','14:00','16:00','18:00','20:00']
            }],
            yAxis: [{
                type: "value"
            }],
            series: [{
                name: "pv",
                type: "line",
                smooth: !0,
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: "default"
                        }
                    }
                },
                data: chartdata.one
            }, {
                name: "ip",
                type: "line",
                smooth: !0,
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: "default"
                        }
                    }
                },
                data:chartdata.two
            }]
        }]
          , n = e("#LAY-index-dataview").children("div")
          , r = function(e) {
            i[e] = a.init(n[e], layui.echartsTheme),
            i[e].setOption(l[e]),
            window.onresize = i[e].resize
        };
        
        if (n[0]) {
            r(0);
            var o = 0;
            t.on("change(LAY-index-dataview)", function(e) {
                r(o = e.index)
            }),
            layui.admin.on("side", function() {
                setTimeout(function() {
                    r(o)
                }, 300)
            }),
            layui.admin.on("hash(tab)", function() {
                layui.router().path.join("") || r(o)
            })
        }
    }),
    layui.use("table", function() {
        var e = (layui.$,
        layui.table);
        e.render({
            elem: "#LAY-index-topSearch",
            url: layui.setter.url+"admin/index/testdata2",
            page: !0,
            cols: [[{
                field: "id",
                fixed: "left",
                title:"id",
            }, {
                field: "ques",
                title: "内容",
                minWidth: 300,
            }, {
                field: "create_time",
                title: "时间",
                minWidth: 120,
                templet: '<div>{{ layui.util.timeAgo(d.create_time) }}</div>',
            }]],
            skin: "line"
        }),
        e.render({
            elem: "#LAY-index-topCard",
            url: layui.setter.url+"admin/index/testdata3",
            page: !0,
            cellMinWidth: 120,
            cols: [[  {
                field: "create_time",
                title:'时间',
                templet: '<div>{{ layui.util.timeAgo(d.create_time) }}</div>'
            },{
                field: "username",
                title: "信息",
                minWidth: 300,
                templet: '<div>用户{{d.username}}注册</div>'
            }
                ]],
            skin: "line"
        })
    }),
     layui.use(["admin", "carousel"], function() {
        var e = layui.$
          , t = (layui.admin,
        layui.carousel)
          , a = layui.element
          , i = layui.device();

        setInterval(function(){
            //读取系统存储信息
            e.ajax({
                url:layui.setter.url+"admin/index/memory",
                type:"POST",
		xhrFields: {
           withCredentials: true
       },
                success:function(data){
                    
                    a.progress('memory', (100-data.data.memory)+'%')
                    
                }
            })
         },5000);

      }),
    e("console", {})
});
