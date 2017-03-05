Ext.define('ui.mux.desknew.DeskCenter', {
    // This must be a toolbar. we rely on acquired toolbar classes and inherited toolbar methods for our
    // child items to instantiate and render correctly.
    extend: 'Ext.panel.Panel',
    uses: [
        'ui.model.desknew.ShortcutModel',
        'Ext.ux.DataView.DragSelector',
        'Ext.ux.DataView.LabelEditor',
        'ui.mux.desknew.DeskCenterDataView'
    ],

    windowsList : [],  //记录所有打开窗口的列表

    alias: 'widget.ndeskcenter',
    html : "&#160;",
    baseCls : "",
    region : "center",
    layout : 'fit',
    id :'mainDeskCenter',
    shortcutItemSelector: 'div.ux-desktop-shortcut',

    constructor : function (app){
        this.app = app;
        this.callParent(arguments);
    },
    initComponent : function (){
        var me =  this;
        me.html = this.getHtmlstrs();

        this.win = Ext.create("Ext.window.Window",{constrain: true,width:200,height:200});
        me.border = false;
        me.items = [me.createDataView()];
        me.callParent();
        me.isReady = true;
    },

    getHtmlstrs : function(){

        var htmls = [
            '<div id="table-hover-ganying-div"> ',
            '<div id="main-message-box">',
            '    <div class="panel-hide-show-btn my-li-a-trans2 panel-hide-show-btn-hover">',
            '   <a href="javascript:;"class="hs-btn-a">&gt;</a>',
            '    </div>',
            '    <div id="user-message-box"  class="message-box">',
            '        <div class="message-box-title">',
            '            <span class="myli message-box-title-icon"></span>',
            '            <span class="myli message-box-title-txt">最新公告</span>',
            '            <i id="newMsgBtn" class="shua"></i>',
            '            <a href="javascript:;" class="myli message-box-title-close"></a>',
            '            <a href="javascript:;" id="publicmore" class="myli message-box-title-more" title="查看更多"></a>',
            '        </div>',
            '    </div>',
            '    <div id="user-worktable-box" class="message-box">',
            '        <div class="message-box-title">',
            '            <span class="myli message-box-title-icon work-table"></span>',
            '            <span class="myli message-box-title-txt">待办事项</span>',
            '            <i id="newSameBtn" class="shua"></i>',
            '            <a href="javascript:;" class="myli message-box-title-close"></a>',
            '            <a href="javascript:;" id="daibanmore" class="myli message-box-title-more"></a>',
            '        </div>',
            '    </div>',
            '</div>',
            '</div>'].join("");
        return htmls;
    },

    createDataView: function(){
        var me = this;
        var cfg = {
            xtype: 'dataview',
            overItemCls: 'x-view-over my-x-view-over my-x-view-over-shuijing',     //下划线样式
            trackOver: true,
            preserveScrollOnRefresh : true,
            itemSelector: me.shortcutItemSelector,
            autoScroll : false,
            multiSelect : true,
            autoHeight: false,
            shrinkWrap : false,
            bodyStyle : "overflow:hidden;",
            app : this.app,
            //width:300,
            //border : 10,
            emptyText: '没有可用的图片'
        };
        var dataview = new ui.mux.desknew.DeskCenterDataView(cfg);
        return dataview;
    },

    addWindow : function(win){
        var me = this;
        var modelCode = win.modelCode;
        if(Ext.isEmpty(modelCode)) return false;
        if(this.queryWinByCode(modelCode) == null) {
            me.add(win);
            me.windowsList.push(win);
            return true;
        }else{
            return false;
        }
    },

    queryWinByCode : function(modelCode){
        for(var i ; i<this.windowsList.length; i++){
            if(this.windowsList[i].modelCode == modelCode){
                return this.windowsList[i];
            }
        }
        return null;
    }
});