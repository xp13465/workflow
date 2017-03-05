/**
 * Created by Administrator on 2015/12/7 0007.
 */
//对extjs框架store扩展
Ext.define('ui.extend.base.Store', {
    extend: 'Ext.data.Store',
    listeners:{
        exception: function(proxy, response, operation)
        {
            Ext.MessageBox.show(
                {
                    title: '请求处理错误',
                    msg: Ext.isString(operation.getError())? operation.getError() : '请确认网络或服务是否正常',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
        },
        load : function( me, records, successful, eOpts ){
            //alert(Ext.encode(eOpts));
            if(successful){
                var response = Ext.decode(eOpts.getResponse().responseText);
                if(response.sys_error == 1){
                    Ext.MessageBox.show(
                        {
                            title: '系统错误',
                            msg: response.msg,
                            icon: '',
                            buttons: Ext.Msg.OK
                        });
                }else if(response.status == 0){
                    Ext.MessageBox.show(
                        {
                            title: '业务逻辑错误',
                            msg:  response.msg,
                            icon: '',
                            buttons: Ext.Msg.OK
                        });
                }
            }else{
                var response = Ext.decode(eOpts.error.response.responseText);
                Ext.MessageBox.show({
                        title: '系统错误',
                        msg: response.msg,
                        icon: '',
                        buttons: Ext.Msg.OK
                });
            }
        }
    },
    constructor : function(cfg){
        var params = cfg || {};
        Ext.apply(this,cfg);

        this.callParent(arguments );
    },
    initComponent: function (){
        var me = this;
        me.callParent(arguments);
    }
});