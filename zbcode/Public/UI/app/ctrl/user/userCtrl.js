/**
 * Created by Administrator on 2015/12/7 0007.
 */

Ext.define('ui.ctrl.user.userCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    requires : [
        'ui.ctrl.user.userConf',
        'ui.view.user.userView',
        'ui.view.user.Coms.viewPanel'
    ],
    views : [
        'ui.view.user.userView'
    ],
    refs:[
        {ref:'userWin' , selector:'userwindow'}
    ],
    constructor : function (cfg){
        this.modelConf = Ext.create('ui.ctrl.user.userConf',{ctrl : cfg.ctrl});
        this.callParent(arguments);
    },
    init:function(){
        this.control({      //这里的this相当于这个控制层
            'userpagecentergrid' : {
                render : function(e){
                    //e.grid.getStore().load();
                }
            }
        });
    },

    //配置功能按钮功能  对应Conf类中定义的operationButtons > pmsCode { text : '新增角色+' , pmsCode : 'user.add' }
    //‘.’替换为 $  ,方法前加__
    __user$add : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        me.$showOptionsPanel('add', pmsCode ,function(panel ,win){
            //这里对panel进行处理
        },me.$getConfig('_sub_win_defparams'));
    },

    __user$modirole : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        //if(!pmsCode) return;
        if(typeof(params) === 'string'){
            var records=me.$getGridSelections();
            params = records[0].data;
        }
        if(typeof(params.id) === "undefined" ){
            Ext.Msg.show({
                title : '失败',
                msg  : '请选择用户记录',
                icon: Ext.Msg.ERROR,
            });
            return;
        }

        var params = params;
        me.$showOptionsPanel('modirole', params ,function(panel ,win){
            //这里对panel进行处理

        }, {width:650 , height:470 });
    },
    //listbtn  list的处理按钮事件，方法名前 加 '__'  ，根据权限pmscode指定方法名， .更换为$...方法前加__
    __user$view : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        me.$showOptionsPanel('view', param ,function( panel ,win ){
            //这里对panel进行处理
        },me.$getConfig('_sub_win_defparams'));
    },

    __user$edit : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        me.$showOptionsPanel('edit', param ,function( panel ,win ){
            //这里对panel进行处理
        },me.$getConfig('_sub_win_defparams'));
    },
    __user$uppassword : function( btna , params ){
        var me = this;
        var pwd=Ext.create("Ext.form.field.Text",{
            name: 'old_password',
            // id:'otc_code',
            fieldLabel: '原始密码',
            inputType: 'password',
            blankText:"请选择类型",
            allowBlank :false,
            columnWidth :.8 ,
            labelWidth: 80

        });
        var newpwd=Ext.create("Ext.form.field.Text",{
            name: 'new_password',
            // id:'otc_code',
            fieldLabel: '新密码',
            inputType: 'password',
            blankText:"请选择类型",
            allowBlank :false,
            columnWidth :.8 ,
            labelWidth: 80

        });
        var newpwd1=Ext.create("Ext.form.field.Text",{
            name: 'sure_password',
            // id:'otc_code',
            fieldLabel: '确认密码',
            inputType: 'password',
            blankText:"请选择类型",
            allowBlank :false,
            columnWidth :.8 ,
            labelWidth: 80

        });
        
        var infopanel = Ext.create("ui.extend.base.Form",{
            border : 0 ,
            columnWidth :1 ,
            // myStamp : 'theDocsList',
            layout : 'column',
            items : [pwd,newpwd,newpwd1]
        });
        var winUpload=Ext.create('Ext.window.Window', {
            title: '修改密码',
            width: 350,
            height:200,
            minWidth: 300,
            minHeight: 100,
            bodyStyle:'padding:5px;',
            // buttonAlign : 'center' ,
            autoScroll : true,
            items : [infopanel],
            buttons: [{
                xtype : 'button',
                columnWidth:.15,
                margin : "0 5" ,
                text : '保存' ,
                // disabled : true ,
                handler : function(btn){
                    if(!infopanel.getForm().isValid()) return;
                    var params = infopanel.getForm().getValues();
                    if(params.new_password !== params.new_password){
                        Ext.MessageBox.alert("失败","两次输入不符,请重试");
                        return;
                    }
                    me.$requestAjax({
                        url : '../user/updateSelfPassword',
                        method : "POST",
                        params : params,
                        scope : me ,
                        backParams: {} ,
                        callback : function(response , backParams){
                            //console.log(response.responseText);
                            var param = Ext.decode(response.responseText);
                            Ext.MessageBox.alert('成功','修改成功！');
                            winUpload.close();
                        }
                    });
                }
            }]
        });
        winUpload.show();
        // me.$showOptionsPanel('edit', param ,function( panel ,win ){
        //     //这里对panel进行处理
        // },me.$getConfig('_sub_win_defparams'));
    },

    __user$add : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        me.$showOptionsPanel('add', param ,function( panel ,win ){
            //这里对panel进行处理
        },me.$getConfig('_sub_win_defparams'));
    },

    __user$start : function( btna , params ){
        var me = this;
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
                    url     :   me.$getUrlstrByUrlcode('set.user.change'),
                    method :	'POST',
                    params :	params,
                    scope  :	me,
                    backParams:	{},
                    callback   :	function(response , backParams){
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
    __user$resetpassword : function( btna , params ){
        var me = this;
        // if(params.status == 1){
        //     Ext.Msg.show({
        //         title : '失败',
        //         msg  : '已经是启用状态！',
        //         icon: Ext.Msg.ERROR,
        //     });
        //     return;
        // }
        // params.status = 1;
        me.$askYestNo({
            msg : '确认修改吗',
            yes : function(){
                me.$requestAjax({
                    url     :   me.$getUrlstrByUrlcode('set.user.resetPassword'),
                    method :    'POST',
                    params :    params,
                    scope  :    me,
                    backParams: {},
                    callback   :    function(response , backParams){
                        //console.log(response.responseText);
                        var param = Ext.decode(response.responseText);
                        if(param.status > 0){
                            Ext.MessageBox.alert('成功','修改成功！');
                            me.$reloadViewGrid();
                        }
                    }
                });
            }
        });
    },

    __user$stop : function( btna , params ){
        var me = this;
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
                    url     :   me.$getUrlstrByUrlcode('set.user.change'),
                    method :	'POST',
                    params :	params,
                    scope  :	me,
                    backParams:	{},
                    callback   :	function(response , backParams){
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

   /* 接口：
    * 信息面板里的 按钮 事件
    * 方法名规则  __ + 信息面板类型(view,edit,add等) + Panel + $ + 按钮定义的fnName .
    * 回参为 按钮和 本信息面板自己
    */
    __editPanel$save : function( btn , infopanel ){
        var me = this;
        var editparams = me.$getFormsParams(infopanel);
        if( !me.$checkValid(infopanel)) return;

        me.$requestFromDataAjax(
            'get.user.edit',
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

        me.$requestFromDataAjax(
            'get.user.addUser',
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
        var optype = thepanel.optype;
        var thePostData = thepanel.getMyDatas();
        var baseinfoPanel = $findByparam(thepanel , {myStamp : 'theBasePanel'});
        var infopanel = baseinfoPanel[0];
        if(!infopanel) return ;
        infopanel = infopanel.getForm();
        if(optype == 'add'){
            var organizationChangeFn = function(organization_id){
                var leaderfield = infopanel.findField('leader_id');
                var firstfield = infopanel.findField('firstdepartment_id');
                var tmp = leaderfield.getStore().getProxy().extraParams;
                Ext.apply(tmp , {organization_id : organization_id});
                leaderfield.getStore().load();

                var tmp = firstfield.getStore().getProxy().extraParams;
                Ext.apply(tmp , {organization_id : organization_id});
                firstfield.getStore().load();
            }

            var firstdepChangeFn = function(firstdepartment_id){
                var departfield = infopanel.findField('department_id');
                var tmp = departfield.getStore().getProxy().extraParams;
                Ext.apply(tmp , {pid : firstdepartment_id});
                departfield.getStore().load();

                var positionfield = infopanel.findField('position_id');
                var tmp = positionfield.getStore().getProxy().extraParams;
                Ext.apply(tmp , {department_id : firstdepartment_id});
                departfield.getStore().load();
            }

            var departmentChangeFn = function(department_id){
                var positionfield = infopanel.findField('position_id');
                var tmp = positionfield.getStore().getProxy().extraParams;
                Ext.apply(tmp , {department_id : department_id});
                positionfield.getStore().load();
            }

            var oranzisionfield = infopanel.findField('organization_id');
            if(optype == "edit" || optype == 'add'){
                oranzisionfield.on("change",function( field , newvalue , oldvalue ){
                    //alert("oranzisionchange");
                    organizationChangeFn(newvalue);
                    var leaderfield = infopanel.findField('leader_id');
                    var firstfield = infopanel.findField('firstdepartment_id');
                    var departfield = infopanel.findField('department_id');
                    //leaderfield.setValue("");
                    //firstfield.setValue("");
                    // departfield.setValue("");
                });
            }

            var thefirstField = infopanel.findField('firstdepartment_id');
            if(optype == "edit" || optype == 'add'){
                thefirstField.on("change",function( field , newvalue , oldvalue ){
                    firstdepChangeFn(newvalue);
                    var departfield = infopanel.findField('department_id');
                    var leaderfield = infopanel.findField('leader_id');
                    var positionfield = infopanel.findField('position_id');
                    //departfield.setValue("");
                    // leaderfield.setValue("");
                    //positionfield.setValue("");
                });

                var departmentField = infopanel.findField('department_id');
                departmentField.on("change",function(field , newvalue , oldvalue){
                    departmentChangeFn(newvalue);
                    var positionfield = infopanel.findField('position_id');
                    // positionfield.setValue("");
                })
            }
        }
    },

    __view_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.user.view',
            mydata,
            thepanel
        );
    },

    __edit_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.user.view',
            mydata,
            thepanel
        );
    },

    __modirole_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.user.view',
            mydata,
            thepanel
        );
        var params = thepanel.getMyDatas() || {};
        var par = {uid : params.id };
    },

    //表单数据加载之后
    __all_post_after_main_event : function(thepanel){
        var me = this;
        var optype = thepanel.optype;
        var thePostData = thepanel.getMyDatas();
        var baseinfoPanel = $findByparam(thepanel , {myStamp : 'theBasePanel'});

        if( optype== 'edit' || optype=='add' || optype=='view'){
            var data = thepanel.$postValue;
            var infopanel = baseinfoPanel[0];
            if(!infopanel) return ;
            infopanel = infopanel.getForm();
            /*
 add_time: "2016-01-22 14:37:28"
 check_remark: ""
 department_id: "58"
 department_name: "调研部"
 email: "diaoyan@zb.com"
 firstdepartment_id: "54"
 firstdepartment_name: "战略发展部"
 id: "86"
 leader_id: "48"
 leader_name: "调研总监"
 organization_id: "109"
 organization_name: "资邦投资"
 password: "e10adc3949ba59abbe56e057f20f883e"
 position_id: "49"
 position_name: "调研专员"
 realname: "调研"
 status: "1"
 update_time: "0000-00-00 00:00:00"
* */

            var organizationChangeFn = function(organization_id){
                var leaderfield = infopanel.findField('leader_id');
                var firstfield = infopanel.findField('firstdepartment_id');
                var tmp = leaderfield.getStore().getProxy().extraParams;
                Ext.apply(tmp , {organization_id : organization_id});
                leaderfield.getStore().load();

                var tmp = firstfield.getStore().getProxy().extraParams;
                Ext.apply(tmp , {organization_id : organization_id});
                firstfield.getStore().load();
            }

            var organization_id = data.organization_id;
            if(organization_id){
                organizationChangeFn(organization_id);
            }

            var firstdepChangeFn = function(firstdepartment_id){
                var departfield = infopanel.findField('department_id');
                var tmp = departfield.getStore().getProxy().extraParams;
                Ext.apply(tmp , {pid : firstdepartment_id});
                departfield.getStore().load();

                var positionfield = infopanel.findField('position_id');
                var tmp = positionfield.getStore().getProxy().extraParams;
                Ext.apply(tmp , {department_id : firstdepartment_id});
                departfield.getStore().load();
            }

            var departmentChangeFn = function(department_id){
                var positionfield = infopanel.findField('position_id');
                var tmp = positionfield.getStore().getProxy().extraParams;
                Ext.apply(tmp , {department_id : department_id});
                positionfield.getStore().load();
            }

            var firstdepartment_id = data.firstdepartment_id;
            if(firstdepartment_id){
                firstdepChangeFn(firstdepartment_id);
            }

            var department_id = data.department_id;
            if(department_id){
                var positionfield = infopanel.findField('position_id');
                var tmp = positionfield.getStore().getProxy().extraParams;
                Ext.apply(tmp , {department_id : department_id});
                positionfield.getStore().load();
            }else if(!department_id && firstdepartment_id){
                var positionfield = infopanel.findField('position_id');
                var tmp = positionfield.getStore().getProxy().extraParams;
                Ext.apply(tmp , {department_id : firstdepartment_id});
                positionfield.getStore().load();
            }

            var oranzisionfield = infopanel.findField('organization_id');
            if(optype == "edit" || optype == 'add'){
                oranzisionfield.on("change",function( field , newvalue , oldvalue ){
                    //alert("oranzisionchange");
                    organizationChangeFn(newvalue);
                    var leaderfield = infopanel.findField('leader_id');
                    var firstfield = infopanel.findField('firstdepartment_id');
                    var departfield = infopanel.findField('department_id');
                    //leaderfield.setValue("");
                    //firstfield.setValue("");
                   // departfield.setValue("");
                });
            }

            var thefirstField = infopanel.findField('firstdepartment_id');
            if(optype == "edit" || optype == 'add'){
                thefirstField.on("change",function( field , newvalue , oldvalue ){
                    firstdepChangeFn(newvalue);
                    var departfield = infopanel.findField('department_id');
                    var leaderfield = infopanel.findField('leader_id');
                    var positionfield = infopanel.findField('position_id');
                    //departfield.setValue("");
                   // leaderfield.setValue("");
                    //positionfield.setValue("");
                });

                var departmentField = infopanel.findField('department_id');
                departmentField.on("change",function(field , newvalue , oldvalue){
                    departmentChangeFn(newvalue);
                    var positionfield = infopanel.findField('position_id');
                   // positionfield.setValue("");
                })
            }

        }
    },
    /* 接口：
     * 功能信息面板的 字段组件的 初始 方法
     * 命名规则： __  +  optype(操作类型) + _fieldinit
     */

    __view_fieldinit : function(field , optype , theform){
        if(field) field.readOnly = true;
    },

    __edit_fieldinit : function(field , optype , theform){
        if(!field) return;
        if(field.name === 'update_time') field.disabled = true;
    },

    __add_fieldinit : function(field , optype , theform){
        if(!field)return;
        if(field.name == 'update_time') field.hidden = true;
        if(field.name == 'id') field.disabled = true;
        if(field.name == 'status') field.hidden = true;
    },

    __all_fieldinit : function(field , optype , theform){

    },
    //user.uppassword,

    __check_list_btn_event : function(cfg ,record){
        if(cfg.pmsCode === 'user.uppassword'){
            return false;
        }
        return true;
    }

});