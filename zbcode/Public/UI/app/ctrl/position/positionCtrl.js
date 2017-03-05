/**
 * Created by Administrator on 2015/12/7 0007.
 */

Ext.define('ui.ctrl.position.positionCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    requires : [
        'ui.ctrl.position.positionConf',
        'ui.view.position.positionView',
        'ui.view.position.Coms.viewPanel'
    ],
    views : [
        'ui.view.position.positionView'
    ],

    refs:[
        {ref:'positionWin' , selector:'positionwindow'}
    ],

    constructor : function (cfg){
        this.modelConf = Ext.create('ui.ctrl.position.positionConf');
        this.callParent(arguments);
    },

    init:function(){
        this.control({      //这里的this相当于这个控制层
            'positionpagecentergrid' : {
                render : function(e){
                    //e.grid.getStore().load();
                }
            }
        });
    },

    //配置功能按钮功能  对应Conf类中定义的operationButtons > pmsCode { text : '新增角色+' , pmsCode : 'position.add' }
    //‘.’替换为 $  ,方法前加__
    __position$add : function( btna , params ){

        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        me.$showOptionsPanel('add', pmsCode ,function(panel ,win){
            //这里对panel进行处理
        });
    },

    //listbtn  list的处理按钮事件，方法名前 加 '__'  ，根据权限pmscode指定方法名， .更换为$...方法前加__
    __position$view : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        me.$showOptionsPanel('view', param ,function( panel ,win ){
            //这里对panel进行处理
        });
    },

    __position$edit : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        me.$showOptionsPanel('edit', param ,function( panel ,win ){
            //这里对panel进行处理
        });
    },
    __position$start : function( btna , params ){
        var me = this;
        params = me.$getArrayOne(params);
        if(params.status == 1){
            Ext.Msg.show({
                title : '失败',
                msg  : '已经是启用状态！',
                icon: Ext.Msg.ERROR,
            });
            return;
        }
        params.status = 1;
        me.$askYestNo({
            msg : '确认启用吗',
            yes : function(){
                me.$requestAjax({
                    url     :   me.$getUrlstrByUrlcode('set.position.change'),
                    method :    'POST',
                    params :    params,
                    scope  :    me,
                    backParams: {},
                    callback   :    function(response , backParams){
                        //console.log(response.responseText);
                        var param = Ext.decode(response.responseText);
                        if(param.status > 0){
                            Ext.MessageBox.alert('成功','启用成功！');
                            me.$reloadViewGrid();
                        }
                    }
                });
            }
        });
    },
    __position$stop : function( btna , params ){
        var me = this;
        params = me.$getArrayOne(params);
        if(params.status == 2){
            Ext.Msg.show({
                title : '失败',
                msg  : '已经是禁用状态！',
                icon: Ext.Msg.ERROR,
            });
            return;
        }
        params.status = 2;
        me.$askYestNo({
            msg : '确认禁用吗',
            yes : function(){
                me.$requestAjax({
                    url     :   me.$getUrlstrByUrlcode('set.position.change'),
                    method :    'POST',
                    params :    params,
                    scope  :    me,
                    backParams: {},
                    callback   :    function(response , backParams){
                        //console.log(response.responseText);
                        var param = Ext.decode(response.responseText);
                        if(param.status > 0){
                            Ext.MessageBox.alert('成功','禁用成功！');
                            me.$reloadViewGrid();
                        }
                    }
                });
            }
        });
    },
    __position$delete : function( btna , params ){
        var me = this;
        params = me.$getArrayOne(params);
        if(params.status == 1){
            Ext.Msg.show({
                title : '失败',
                msg  : '节点不是无效状态！',
                icon: Ext.Msg.ERROR,
            });
            return;
        }
        params.status = 3;
        me.$askYestNo({
            msg : '确认注销吗',
            yes : function(){
                me.$requestAjax({
                    url     :   me.$getUrlstrByUrlcode('set.position.delete'),
                    method :    'POST',
                    params :    params,
                    scope  :    me,
                    backParams: {},
                    callback   :    function(response , backParams){
                        //console.log(response.responseText);
                        var param = Ext.decode(response.responseText);
                        if(param.status > 0){
                            Ext.MessageBox.alert('成功','注销成功！');
                            me.$reloadViewGrid();
                        }
                    }
                });
            }
        });
    },
    __position$cexiao : function( btna , params ){
        var me = this;
        // params = me.$getArrayOne(params);
        var ids=[];
        var records=me.$getGridSelections();
        console.log(records)
        var postParams={id:'',status:''};
        var validateFlag=true;
        Ext.each(records,function(item){
            
            if(item.data.status=='1'){
                Ext.Msg.show({
                    title : '失败',
                    msg  : '节点不是无效状态！',
                    icon: Ext.Msg.ERROR,
                });
                validateFlag=false;
                return false;
            }else{
                ids.push(item.data.id);
            }
            
        });
        postParams.id=ids.join();
        postParams.status=3;
       
        if(validateFlag){
            me.$askYestNo({
                msg : '确认注销吗',
                yes : function(){
                    me.$requestAjax({
                        url     :   me.$getUrlstrByUrlcode('set.position.delete'),
                        method :    'POST',
                        params :    postParams,
                        scope  :    me,
                        backParams: {},
                        callback   :    function(response , backParams){
                            //console.log(response.responseText);
                            var param = Ext.decode(response.responseText);
                            if(param.status > 0){
                                Ext.MessageBox.alert('成功','注销成功！');
                                me.$reloadViewGrid();
                            }
                        }
                    });
                }
            });
        }
        
    },
   /* 接口：
    * 信息面板里的 按钮 事件
    * 方法名规则  __ + 信息面板类型(view,edit,add等) + Panel + $ + 按钮定义的fnName .
    * 回参为 按钮和 本信息面板自己
    */
    __editPanel$save : function( btn , infopanel ){
        var me = this;
        var editparams = me.$getFormsParams(infopanel);
        var theFormlist = infopanel.getFormsList();
        var theform = infopanel.findTabPanel({ myStamp : 'theForm'});
        var fieldSub = theform.getForm().findField("department_pid");
        var fieldSubSub = theform.getForm().findField("department_id");
        if(!editparams.department_id && !editparams.department_pid){
            Ext.MessageBox.alert("失败","请选择部门");
            return;
        }

        editparams.department_id = editparams.department_id?editparams.department_id:editparams.department_pid;

        me.$requestFromDataAjax(
            'get.position.edit',
            editparams,
            null,
            function(params){
                if(typeof(infopanel.ownerCt) != 'undefined' && typeof(infopanel.ownerCt.close) === 'function'){
                    infopanel.ownerCt.close();
                    me.$reloadViewGrid();
                }
            }
        );
    },
    __addPanel$save : function( btn , infopanel ){

        var me = this;
        var editparams = me.$getFormsParams(infopanel);

        var theFormlist = infopanel.getFormsList();
        var theform = infopanel.findTabPanel({ myStamp : 'theForm'});
        var fieldSub = theform.getForm().findField("department_pid");
        var fieldSubSub = theform.getForm().findField("department_id");
        if(!editparams.department_id && !editparams.department_pid){
            Ext.MessageBox.alert("失败","请选择部门");
            return;
        }

        editparams.department_id = editparams.department_id?editparams.department_id:editparams.department_pid;

        if( !me.$checkValid(infopanel)) return;
        me.$requestFromDataAjax(
            'get.position.edit',
            editparams,
            infopanel,
            function(params){
                if(typeof(infopanel.ownerCt) != 'undefined' && typeof(infopanel.ownerCt.close) === 'function'){
                    infopanel.ownerCt.close();
                }
                me.$reloadViewGrid();
            }
        );
    },

    /* 接口：
     * 功能信息面板子form的 render 处理
     * 命名规则： __  +  optype(操作类型) + _sub_render
     */
    __view_sub_render : function(theform){
        alert(theform.getForm());
    },

    /* 接口：
     * 功能信息面板的 render 处理
     * 命名规则： __  +  optype(操作类型) + _main_render
     * 作用域 ctrl
     */
    __all_main_render : function(thepanel){
        var me = this;

        var optype = thepanel.optype;

        var theFormlist = thepanel.getFormsList();
        var theform = thepanel.findTabPanel({ myStamp : 'theForm'});
        if(!theform) return;
        var fieldFirst = theform.getForm().findField("organization_id");
        var fieldSub = theform.getForm().findField("department_pid");
        var fieldSubSub = theform.getForm().findField("department_id");
        if(!fieldFirst || !fieldSubSub) return;

        fieldFirst.on('change' , function(fld){
            fieldSub.getStore().organization_id = fld.getValue();
            fieldSubSub.getStore().organization_id = fld.getValue();
            fieldSub.getStore().load();
            //fieldSub.setValue("");
        });

        fieldSub.on('change' , function(fld){
            fieldSubSub.getStore().pid = fld.getValue();
            fieldSubSub.getStore().load();
            //fieldSubSub.setValue("");
        });


    },


    __view_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.position.view',
            mydata,
            thepanel
        );
    },

    __edit_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.position.view',
            mydata,
            thepanel
        );
    },
    /* 接口：
     * 功能信息面板的 字段组件的 初始 方法
     * 命名规则： __  +  optype(操作类型) + _fieldinit
     */
    __view_fieldinit : function(field){
        if(field) field.readOnly = true;
    },

    __edit_fieldinit : function(field){
        if(!field) return;
        if(field.name === 'update_time') field.disabled = true;
    },
    __add_fieldinit : function(field){
        if(!field) return;
        if(field.name === 'update_time') field.hide();
    }

});