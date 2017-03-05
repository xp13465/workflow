/*
语言配置
 */
Ext.define("ui.conf.I18n",{
    //系统信息类
    extend: 'Ext.util.Observable',
    /*s：string =》 信息文本唯一标识字符串
    * t: string =》 指定语言类型 默认cn*/
    getText : function (s,t){
        var me = this;
        if(Ext.isEmpty(t)) t = "cn";
        return me.data[t][s];
    },

    constructor : function (app){
        this.app = app;
        this.callParent(arguments);
    },

    data : {
        "cn":{
                "sys.wring" : "警告",
                "sys.nologon" : "用户未登录"
              }
    }
});
