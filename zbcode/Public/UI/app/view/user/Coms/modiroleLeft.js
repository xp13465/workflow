/**
 * Created by Administrator on 2016/1/4 0004.
 */
Ext.define( 'ui.view.user.Coms.modiroleLeft', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.modiroleleftgrid',
    constructor : function(cfg){
        var me = this;
        this.ctrl = cfg.ctrl;
        Ext.apply(this,{
            region : 'west',
            width : 350,
            title : '用户已有角色',
            split: true,
            border : 1,
            store: Ext.create( 'ui.extend.base.Store', {
                fields : [],
                ctrl : this.ctrl,
                proxy : Ext.create( 'ui.extend.base.Ajax',{
                    url : cfg.ctrl.$getConfig('urls').get('get.role.userlist').url     //"/Public/jsons/get.all.user.record.json",
                })
            }),
            columns: [
                { header: 'ID',  dataIndex: 'id' , hidden : true },
                { header: '角色名',  dataIndex: 'title' },
                { header: '角色说明', dataIndex: 'remark', flex: 1 }
            ]
        });
        this.callParent(arguments);

        this.on('render' , me.renderAutoload);
    },

    initComponent : function(){
        var me = this;
        this.menu = Ext.create("Ext.menu.Menu",{
            items : [{
                text : '删除角色'
            }],
            listeners : {
                'click' : function(e , item , c , d){
                    me.ctrl.$askYestNo({
                        msg : '确认删除吗',
                        yes : function(){
                            me.delRoleToUser.call(me);
                        }
                    });
                }
            }
        });
        this.callParent(arguments);
    },

    renderAutoload : function(){
        var grid = this;
        var theFatherPanel = this.ownerCt.ownerCt.ownerCt;
        theFatherPanel.leftGrid = this;
        this.myData = theFatherPanel.getMyDatas() || {};

        var par = {uid : this.myData.id};
        this.getStore().load({params:par});

        grid.on({
            rowcontextmenu: function(gr,record, htm , rowIndex ,e){
                e.stopEvent();
                e.preventDefault(); //覆盖默认右键
                grid.menu.showAt(e.getXY());
            },
            rowdblclick : function(gr, record, htm , rowIndex , e){
                e.stopEvent();
                e.preventDefault(); //覆盖默认
                grid.ctrl.$askYestNo({
                    msg : '确认删除选择角色吗',
                    yes : function(){
                        grid.delRoleToUser.call(grid);
                    }
                });
            },
            scope: grid // Important. Ensure "this" is correct during handler execution
        });
    },

    delRoleToUser : function(params){
        var me = this;
        if(!params){
            var records = me.getSelectionModel().getSelection();
            var ids = '';
            for(rec in records){
                ids += records[rec].data.id;
                if(rec < records.length-1) ids += ",";
            }
            params = {role_id : ids , uid : me.myData.id};
        }

        me.ctrl.$requestAjax({
            url     :  me.ctrl.$getConfig('urls').get('set.role.deluserrole').url,
            method :	'POST',
            params :	params,
            scope  :	me ,
            backParams: { },
            callback   :	function(response , backParams){
                //console.log(response.responseText);
                var param = Ext.decode(response.responseText);
                if(param.status > 0){
                    Ext.MessageBox.alert('成功','删除角色成功！');
                    me.getStore().reload();
                }
            }
        });
    }
});