/**
 * Created by Administrator on 2016/1/3 0003.
 */
$(function(){
    if(!$) return;

    var toolbanner = function(win){
        this.init(win);
    }
    toolbanner.fn = toolbanner.prototype = {
        defaults : {},
        dd: 'ddd',
        init : function(win){
            var me = this;
            var thea = document.createElement("a");
            $("#btnsgroup").append(thea);
            $(thea).html('按钮名字').addClass('btn');
            this.rendtoWin = win;

            $(thea).click(function(){
                me.clickfn.call(me);
            });
        },
        clickfn : function(e){
           this.rendtoWin.show();
            //console.log(this.rendtoWin);
        }
    }
    var win = Ext.create('Ext.window.Window',{
        title:'测试窗',
        width:300 ,
        height:300 ,
        contentEl:'window',
        layout:'fit'
    });
    win.thebar =  new toolbanner(win);
    //win.show();



});