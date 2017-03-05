/**
 * Created by Administrator on 2015/12/11 0011.
 */
Ext.define('ui.view.usermsg.usermsgView', {
    extend: 'ui.extend.baseClass.baseView',
    alias: 'widget.usermsgwindow',

    title : this.modelName,
    minHeight : 100,
    minWidth : 200,
    resize : true,
    constrain :true,
    maximizable : true,
    minimizable : true,
    width: 220,
    height : 100,
    //y:alert(window.screen.availWidth-200-10),
    //x: window.screen.availWidth-200-10,
    //header : false,
    bodyCls : "user-msg-win",
    animCollapse: false,

    init: function(){
        alert(window.screen.availWidth-200-10);
    }
});