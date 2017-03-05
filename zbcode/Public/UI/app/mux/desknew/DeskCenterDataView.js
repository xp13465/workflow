/*桌面的图标布局类*/
Ext.define('ui.mux.desknew.DeskCenterDataView', {
    extend: 'Ext.view.View',
    alias : 'widget.deskcenterdataview',
    requires: [
        'ui.extend.base.Store',
        'Ext.data.proxy.Ajax'
    ],
    mixins: {
        dragSelector: 'Ext.ux.DataView.DragSelector',
        draggable   : 'Ext.ux.DataView.Draggable'
    },
    baseCls : "my-desknew-dataview-cls",
    preserveScrollOnRefresh : true,

    constructor : function (cfg){
        var me = this, rec = cfg||{};

        Ext.apply(rec ,{
            prepareData: function(data){//数据预处理,即数据处理前.data为原始数据,类型为对象.
                //data.shortName = Ext.util.Format.ellipsis(data.name, 15);
                //data.sizeString = Ext.util.Format.fileSize(data.size);
                //data.dateString = data.lastmod.format("n/j h:ia");
                return data;
            },
            style: {
                position: 'absolute'
            },
            x: 0,
            y: 0,
            tpl: new Ext.XTemplate(me.shortcutTpl)
        });
        //向父类传递cfg参数
        me.contextMenu = new Ext.menu.Menu(me.createDesktopMenu());
        this.callParent(arguments);

    },

    createDesktopMenu: function (){
        var me = this, ret = {
            items : me.contextMenuItems || []
        };
        if (ret.items.length) {
            ret.items.push('-');
        }
        ret.items.push(
            { text: '刷新', handler: function(){
                Ext.Msg.show({
                    title: '询问',
                    msg: '确定刷新页面吗？',
                    fn: function(btn){
                        if(btn == 'yes'){
                            window.location.reload();
                        }
                    },
                    icon: Ext.Msg.QUESTION,
                    buttons: Ext.Msg.YESNO
                });
            }, scope: me, minWindows: 1 }
        );

        return ret;
    },

//桌面图标模板
    shortcutTpl: [
        '<tpl for=".">',
        '<div class="ux-desktop-shortcut" id="{name}-shortcut">',
        '<div class="ux-desktop-shortcut-icon {iconcls}">',
        '<img src="',Ext.BLANK_IMAGE_URL,'" title="{name}">',
        '</div>',
        '<span class="ux-desktop-shortcut-text">{name}</span>',
        '</div>',
        '</tpl>',
        '<div class="x-clear"></div>'
    ],

    onDesktopMenu: function (e) {
        var me = this, menu = me.contextMenu;
        e.stopEvent();
        if (!menu.rendered){
            //menu.on('beforeshow', me.onDesktopMenuBeforeShow, me);
        }
        menu.showAt(e.getXY());
        menu.doConstrain();
    },

    initComponent: function() {
        //此处调入桌面图标数据
        //var me = this.app.ctrls;

        this.store = Ext.create('ui.extend.base.Store', {
            model: 'ui.model.desknew.ShortcutModel',
            proxy : new Ext.data.proxy.Ajax({
                url : "/Admin/Access/getUserNodeList",//app.action.basisActions.basis_cuxiao_huodongquery.url,//'systemUserQuery.action',
                method : "POST"
            }),
            listeners : {
                'load' : function(str , records){

                    var me = str.theCtrl;
                    var themenu = $("#startmenudiv .clearfix dt");
                    $TheUserNodeListRecord = records;
                    for(var i in records){
                        (function(){
                            var data = records[i].data;
                            var record = records[i];
                            var atarge = document.createElement('a');
                            atarge.setAttribute("href", "javascript:;");
                            $(atarge).click(function(){
                                if(!$("#startmenudiv").hasClass("hiddenmenu")) $("#startmenudiv").addClass('hiddenmenu');
                                me.nodeitemclick.call(me,me, record);
                            });

                            var html = ["<i class='icon " + data.iconcls + "-win'></i>"+data.name+"<i class='jt'></i>"].join("");
                            $(atarge).html(html);

                            themenu.append(atarge);
                        })();
                    }
                    var atarge = document.createElement('a');
                    atarge.setAttribute("href", "javascript:;");
                    $(atarge).click(function(){
                        if(!$("#startmenudiv").hasClass("hiddenmenu")) $("#startmenudiv").addClass('hiddenmenu');
                        me.$fireModuleEvents('user','uppassword',{});
                    });
                    var thquithtml = ["<i class='icon sys-set-icon-win'></i>修改密码<i class='jt'></i>"].join("");
                    thquithtml = "<a href='javascript:;'>"+thquithtml+"</a>";
                    $(atarge).html(thquithtml);
                    themenu.append(atarge);

                    var atarge = document.createElement('a');
                    atarge.setAttribute("href", "javascript:;");
                    $(atarge).click(function(){
                        Ext.Msg.show({
                            title: '询问',
                            msg: '确定退出系统吗？',
                            fn: function(btn){
                                if(!$("#startmenudiv").hasClass("hiddenmenu")) $("#startmenudiv").addClass('hiddenmenu');
                                if(btn == 'yes'){
                                    window.document.location = "/Admin/Common/loginOut";
                                }
                            },
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.Msg.YESNO
                        });
                    });
                    var thquithtml = ["<i class='icon sys-set-icon-win'></i>退出系统<i class='jt'></i>"].join("");
                    thquithtml = "<a href='javascript:;'>"+thquithtml+"</a>";
                    $(atarge).html(thquithtml);
                    themenu.append(atarge);
                }
            }
        });
        /*
        this.mixins.dragSelector.init(this);
        this.mixins.draggable.init(this, {
            ddConfig: {
                ddGroup: 'organizerDD'
            },
            ghostTpl: [
                '<tpl for=".">',
                '<img src="../view/chooser/icons/{thumb}" />',
                '<tpl if="xindex % 4 == 0"><br /></tpl>',
                '</tpl>',
                '<div class="count">',
                '{[values.length]} images selected',
                '<div>'
            ]
        });
        */
        this.callParent();
    }
});