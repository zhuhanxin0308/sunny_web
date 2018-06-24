/** layuiAdmin.pro-v1.0.0-beta7 LPPL License By http://www.layui.com/admin/ */
;layui.define(function(e) {
    var i = (layui.$,
    layui.layer,
    layui.laytpl,
    layui.setter,
    layui.view,
    layui.admin);
    i.events.logout = function() {
        i.req({
            url: layui.setter.url+"admin/index/loginout",
            type: "get",
            data: {},
            done: function(e) {
                i.exit()
            }
        })
    }
    ,
    e("common", {})
});