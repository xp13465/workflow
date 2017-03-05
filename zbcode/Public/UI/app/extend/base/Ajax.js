/**
 * Created by Administrator on 2015/12/14 0014.
 */

Ext.define('ui.extend.base.Ajax', {
    extend: 'Ext.data.proxy.Ajax',
    actionMethods:{
        create: "POST", read: "POST", update: "POST", destroy: "POST"
    },
    reader : {
        type : 'json',
        rootProperty : 'items'
    },
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
        }
    },
    init: function() {

    }
});