/**
 * Created by Administrator on 2015/12/7 0007.
 */
Ext.define('ui.ctrl.productscore.productscoreCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    requires : [
        'ui.ctrl.productscore.productscoreConf',
        'ui.view.productscore.productscoreView',
        'ui.view.productscore.Coms.viewPanel'
    ],
    constructor : function (cfg){
        this.modelConf = Ext.create('ui.ctrl.productscore.productscoreConf' , {ctrl : cfg.ctrl});
        this.callParent(arguments);
    },

    init : function(){
        this.control({      //这里的this相当于这个控制层
            'productscorepagecentergrid' : {
                render : function(e){
                    //e.grid.getStore().load();
                }
            }
        });
    },

    //配置功能按钮功能  对应Conf类中定义的operationButtons > pmsCode { text : '新增角色+' , pmsCode : 'productscore.add' }
    //‘.’替换为 $  ,方法前加__
    __productscore$add : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        me.$showOptionsPanel('add', pmsCode ,function(panel ,win){
            //这里对panel进行处理
        },me.$getConfig('_sub_win_defparams'));
    },

    //listbtn  list的处理按钮事件，方法名前 加 '__'  ，根据权限pmscode指定方法名， .更换为$...方法前加__
    __productscore$view : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        //if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        me.$showOptionsPanel( 'view', param ,function( panel ,win ){
            //这里对panel进行处理
            if(typeof(params.callback) === 'function'){
                params.callback.call( me,panel ,win );
            }

        }, { width:600 , height:500 });
    },

    __productscore$edit : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        //if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        me.$showOptionsPanel('edit', param ,function( panel ,win ){
            //这里对panel进行处理
            if(typeof(params.callback) === 'function'){
                params.callback.call( me , panel , win );
            }
        },me.$getConfig('_sub_win_defparams'));
    },

   /* 接口：
    * 信息面板里的 按钮 事件
    * 方法名规则  __ + 信息面板类型(view,edit,add等) + Panel + $ + 按钮定义的fnName .
    * 回参为 按钮和 本信息面板自己
    */

    __editPanel$save : function( btn , infopanel ){

    },
    __editPanel$view : function( btn , infopanel ){
        var me = this;
        var view = this.$getView();
        var params = infopanel.getMyDatas();
        Ext.apply(params,{callback: function(panel,win){
            //me.$addWindowToFather(win);
        }});
        this.$fireModuleEvents('productscore','view',params);
    },

    __addPanel$save : function( btn , infopanel ){
    },

    __edit_group_field_by_id : function(params , callback){
        var me = this;
        if(!params.id && !params.field_id) return false;
        me.$requestAjax({
            url     :   me.$getUrlstrByUrlcode('get.editScoreField'),
            method :    'POST',
            params :    params,
            scope  :    me,
            backParams: {},
            callback   :    function(response , backParams){
                //console.log(response.responseText);
                var param = Ext.decode(response.responseText);
                if(param.status > 0){
                    Ext.MessageBox.alert('成功',param.msg);
                }
                if(typeof(callback) === 'function'){
                    callback.call(me,param);
                }
            }
        });
    },

    __del_group_field_by_id : function(params ,callback){
        var me = this;
        if(!params.id && !params.field_id) return false;
        me.$askYestNo({
            msg : '确认删除吗',
            yes : function(){
                me.$requestAjax({
                    url     :   me.$getUrlstrByUrlcode('get.delScoreField'),
                    method :    'POST',
                    params :    {field_id : params.field_id?params.field_id:params.id},
                    scope  :    me,
                    backParams: {},
                    callback   :    function(response , backParams){
                        //console.log(response.responseText);
                        var param = Ext.decode(response.responseText);
                        if(param.status > 0){
                            Ext.MessageBox.alert('成功',param.msg);
                        }
                        if(typeof(callback) === 'function'){
                            callback.call(me,param);
                        }
                    }
                });
            }
        });
    },

    __add_group_field_by_data : function(params ,callback){
        var me = this;
        me.$requestAjax({
            url     :   me.$getUrlstrByUrlcode('get.addScoreField'),
            method :    'POST',
            params :    params,
            scope  :    me,
            backParams: {},
            callback   :    function(response , backParams){
                //console.log(response.responseText);
                var param = Ext.decode(response.responseText);
                if(param.status > 0){
                    Ext.MessageBox.alert('成功',param.msg);
                }
                if(typeof(callback) === 'function'){
                    callback.call(me,param);
                }
            }
        });
    },
    /* 接口：
     * 功能信息面板子form的 render 处理
     * 命名规则： __  +  optype(操作类型) + _sub_render
     */
    __view_sub_render : function(theform){
        //alert(theform.getForm());
    },

    /* 接口：
     * 功能信息面板的 render 处理
     * 命名规则： __  +  optype(操作类型) + _main_render
     * 作用域 ctrl
     */
    __all_main_render : function(thepanel){
        var me = this;
        var optype = thepanel.optype;
        var myData = thepanel.getMyDatas();

        var theAddPanle = thepanel.tabpanel;//$findByparam(thepanel , {myStamp : 'theAddGroup'});
        //theAddPanle = theAddPanle.length>0?theAddPanle[0]:null;
        if(theAddPanle){
            if(optype === 'edit'){
                for(var i in theAddPanle.items.items){
                    if(theAddPanle.items.items[i].myStamp !== "theAddGroup"){
                        me.addEventsToSubtabpanel.call(me,theAddPanle.items.items[i]);
                    }else if(theAddPanle.items.items[i].myStamp === "theAddGroup"){
                        theAddPanle.items.items[i].on('beforeactivate',function(){
                            me._sub_edit_addGroup_event.call(me , theAddPanle ,myData); //添加一个组
                            return false;
                        });
                    }
                }
            }

        }
    },

    addEventsToSubtabpanel : function(subPanel){
        var me = this;
        if(!subPanel) return;
        subPanel.on('beforeclose',function(panel){
            me.$askYestNo({
                msg : '确认删除规则组吗',
                yes : function(){
                    me.$requestAjax({
                        url     :   me.$getUrlstrByUrlcode('get.delScoreGroup'),
                        method :    'POST',
                        params :    {group_id : panel.group_id},
                        scope  :    me,
                        backParams: {},
                        callback   :    function(response , backParams){
                            //console.log(response.responseText);
                            var param = Ext.decode(response.responseText);
                            if(param.status > 0){
                                panel.destroy();
                                Ext.MessageBox.alert('成功','删除组成功');
                            }
                        }
                    });
                }
            })
            return false;
        })
    },

    _sub_edit_addGroup_event : function(tabpanel ,mydata){
        var me  = this;
        var form = Ext.create("Ext.form.Panel",{
                xtype :　"form",
                layout : 'column',
                border : 0,
                padding : 10,
                items : [
                    {
                        xtype : 'textfield' ,
                        fieldLabel : '规则组名' ,
                        name : 'group_name',
                        labelWidth : 100 ,
                        columnWidth: 1 ,
                        allowBlank :false,
                        blankText:"请输入规则组名"
                    }
                ]
        });
        var win  = Ext.create("Ext.window.Window",{
            title : '新增规则组',
            layout : 'fit',
            closeAction : 'destroy',
            resizable : false,
            plain : true,
            modal : false,
            height: 150,
            width: 380,
            buttons : [
                {
                    xtype : 'button',
                    text : '新增提交',
                    handler : function(){
                        if(!form.getForm().isValid()){
                            Ext.apply('信息不完整',"请填写必要信息");
                            return ;
                        }
                        var param = form.getForm().getValues();
                        Ext.apply(param , {
                            'category_id' : mydata.id
                        });

                        me.$requestAjax({
                            url     :   me.$getUrlstrByUrlcode('get.addScoreGroup'),
                            method :    'POST',
                            params :    param,
                            scope  :    me,
                            backParams: {},
                            callback   :    function(response , backParams){
                                //console.log(response.responseText);
                                var param = Ext.decode(response.responseText);
                                if(param.status > 0){
                                    var panel = Ext.create("ui.view.productscore.Coms.subTabPanel",{
                                        ctrl : me,
                                        title : param.data.group_name,
                                        cate_id : param.data.category_id ,
                                        closable : true ,
                                        group_id : param.data.id
                                    });
                                    me.addEventsToSubtabpanel(panel);
                                    var len = tabpanel.items.items.length;
                                    tabpanel.insert(len-1,panel);
                                    tabpanel.setActiveTab(len-1);
                                }
                                win.close();
                                Ext.MessageBox.alert('成功','添加规则组成功！');
                            }
                        });
                    }
                }
            ],
            items : [form]
        });
        win.on('close' , function(){
            tabpanel.setLoading(false);
            win.setVisible(true);
            win.doLayout();
        });
        tabpanel.add(win);
        tabpanel.setLoading(true);
        setTimeout(function(){
            win.setVisible(true);
            win.setActive(true);
            win.focus(true);
            win.doLayout();
        },100);
    },
    //表单数据加载之后
    __all_post_after_main_event : function(thepanel){
        //alert('after');
        var me = this;
        var tabpanel = thepanel.tabpanel;//$findByparam(thepanel , {myStamp : 'theAddGroup'});
        var optype = thepanel.optype;
        var thePostData = thepanel.getMyDatas();
        var infoData = thepanel.$postValue;

        if(optype === 'edit'){
            var group_arr = infoData.items;
            for(var i in group_arr){
                var panel = Ext.create("ui.view.productscore.Coms.subTabPanel",{
                    ctrl : me,
                    title : group_arr[i].group_name,
                    cate_id : group_arr[i].category_id ,
                    group_id : group_arr[i].id ,
                    opType : optype,
                    closable : optype === 'edit'?true:false,
                    fields : group_arr[i].fields
                });
                me.addEventsToSubtabpanel(panel);
                var len = tabpanel.items.items.length;
                tabpanel.insert(len-1,panel);
            }
            var len = tabpanel.items.items.length;
            tabpanel.setActiveTab(0);
            if(tabpanel.items.items.length === 1){
                me._sub_edit_addGroup_event.call(me , tabpanel ,thePostData); //添加一个组
            }
        }else if(optype === 'view'){
            var scoreViewPanel = $findByparam(thepanel , {myStamp : 'theViewGroup'});
            scoreViewPanel = scoreViewPanel[0];
            var group_arr = infoData.items;
            for(var k in group_arr){
                var fieldset = Ext.create("Ext.form.FieldSet", {
                    myStamp : "theFieldSet",
                    title: group_arr[k]['group_name'] ? group_arr[k]['group_name'] : ("分组" + group_arr[k]['group_id']),
                    columnWidth: 1,
                    layout: 'form',
                    autoHeight: true
                });
                var fieldList = me.$createFieldTrend(group_arr[k]['fields']);
                for (var i in fieldList) {
                    //fieldList[i].
                    me.$checkFieldInitfn(optype,fieldList[i]);
                    fieldset.add(fieldList[i]);
                }
                scoreViewPanel.add(fieldset);
                scoreViewPanel.doLayout();
            }
        }
    },

   __add_uploadfile_to_yulan : function( theform , dataArr ){
        var me = this;
        if(!theform || !dataArr) return;

    },
/*SUBSUBSUBSUB*/
/*添加字段及编辑删除自定义字段的事件定义*/

/*添加字段及编辑删除自定义字段的事件定义--end*/
/*SUBSUBSUBSUB-----END*/

    __view_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.ScoreGroupView',
            mydata,
            thepanel,
            function(params){
                // console.log(params);
            }
        );
    },

    __add_main_render : function(thepanel){
        var me = this;
        // var mydata = thepanel.getMyDatas();
        // me.$requestFromDataAjax(
        //     'get.productscore.view',
        //     mydata,
        //     thepanel,
        //     function(params){
        //         console.log(thepanel);
        //         console.log(params);
        //     }
        // );
    },

    __edit_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.ScoreGroupView',
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
        if(field.name === 'update_time') this.$setFieldStyle(field , 'disabled');
        if(field.name === 'firstCateValue') this.$setFieldStyle(field , 'readonly');
        if(field.name === 'category_id') this.$setFieldStyle(field , 'readonly');
        if(field.name === 'end_time') this.$setFieldStyle(field , 'disabled');
        if(field.name === 'add_time') this.$setFieldStyle(field , 'disabled');


    },

    __add_fieldinit : function(field){
        if(!field) return;
        if(field.name === 'update_time') this.$setFieldStyle(field , 'hidden');
        if(field.name === 'add_time') this.$setFieldStyle(field , 'hidden');
        if(field.name === 'creater') this.$setFieldStyle(field , 'hidden');
    },

    __all_fieldinit : function(field){
        var me = this;
        if(field.name === 'update_time') this.$setFieldStyle(field , 'disabled');
        if(field.name === 'add_time') this.$setFieldStyle(field , 'disabled');
        if(field.name === 'end_time') this.$setFieldStyle(field , 'readonly');


        if(field.name == "contact" || field.name == "contact_tel"){
            me.$checkPms("product.content" ,function(flag){
                if(!flag){
                    if(field) me.$setFieldStyle(field , 'disabled');
                }
            });
        }
    },

    __check_list_btn_event : function(cfg ,record){
        if(cfg.pmsCode === 'productscore.submit'){
            if(record.data.status >1 ) return false;
        }
        return true;
    }

});