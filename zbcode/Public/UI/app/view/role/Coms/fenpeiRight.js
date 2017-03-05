/**
 * Created by Administrator on 2016/1/4 0004.
 */
Ext.define( 'ui.view.role.Coms.fenpeiRight', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.fenpeipmsrightgrid',
    constructor : function(cfg){
        var me = this;
        this.ctrl = cfg.ctrl;
        Ext.apply(this,{
            region : 'center',
            title : '选择添加（右键添加）',
            store: Ext.create( 'ui.extend.base.Store' , {
                fields : [],
                ctrl : this.ctrl,
                proxy : Ext.create( 'ui.extend.base.Ajax',{
                    url : cfg.ctrl.$getConfig('urls').get('get.role.allpremissionlist').url    //"/Public/jsons/get.all.user.record.json",me.$getConfig('urls').get(urlCode);
                })
            }),
            columns: [
                { header: 'ID',  dataIndex: 'permission_id', hidden : true },
                { header: '权限名称',  dataIndex: 'permission_name' },
                { header: '权限点代号', dataIndex: 'permission_code', flex: 1 }
            ]
        });
        this.callParent(arguments);
        this.on('render' , this.renderInit);
    },

    initComponent : function(){
        var me = this;
        //定义数据源store
        this.menu = Ext.create("Ext.menu.Menu",{
            items : [{
                text : '添加权限'
            }],
            listeners : {
                'click' : function(e , item , c , d){
                    me.ctrl.$askYestNo({
                        msg : '确认添加吗',
                        yes : function(){
                            me.addPermisstionToRole.call(me);
                        }
                    });
                }
            }
        });

        this.callParent(arguments);
    },

    addPermisstionToRole : function(params ){
        var me = this;
        var theFatherPanel = this.ownerCt.ownerCt.ownerCt;
        if(!params){
            var records = me.getSelectionModel().getSelection();
            var ids = '';
            console.log(records);
            for(rec in records){
                ids += records[rec].data.permission_id;
                if(rec < records.length-1) ids += ",";
            }
            params = {permission_id : ids , role_id : me.myData.id};
        }

        me.ctrl.$requestAjax({
            url     :  me.ctrl.$getConfig('urls').get('set.role.addrolepermission').url,
            method :	'POST',
            params :	params,
            scope  :	me ,
            backParams:	{},
            callback   :	function(response , backParams){
                //console.log(response.responseText);
                var param = Ext.decode(response.responseText);
                if(param.status > 0){
                    theFatherPanel.leftGrid.getStore().reload();
                }
            }
        });
    },

    renderInit : function(){
        var grid = this;
        var theFatherPanel = this.ownerCt.ownerCt.ownerCt;
        theFatherPanel.rightGrid = this;
        this.myData = theFatherPanel.getMyDatas() || {};

        this.getStore().load({ params: {option : 1} });

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
                    msg : '确认添加吗',
                    yes : function(){
                        grid.addPermisstionToRole.call(grid);
                    }
                });
            },
            scope: grid // Important. Ensure "this" is correct during handler execution
        });
    },

    getLeftGrid : function(){

    }


});