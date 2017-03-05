/**
 * Created by Administrator on 2015/12/7 0007.
 */

Ext.define('ui.ctrl.productauditlawer.productauditlawerCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    requires : [
        'ui.ctrl.productauditlawer.productauditlawerConf',
        'ui.view.productauditlawer.productauditlawerView',
        'ui.view.productauditlawer.Coms.viewPanel'
    ],
    constructor : function (cfg){
        this.modelConf = Ext.create('ui.ctrl.productauditlawer.productauditlawerConf');
        this.callParent(arguments);
    },

    //配置功能按钮功能  对应Conf类中定义的operationButtons > pmsCode { text : '新增角色+' , pmsCode : 'productauditlawer.add' }
    //‘.’替换为 $  ,方法前加__
    __productauditlawer$add : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
       me.$showOptionsPanel('add', pmsCode ,function(panel ,win){
            //这里对panel进行处理
        },me.$getConfig('_sub_win_defparams'));
    },

    //listbtn  list的处理按钮事件，方法名前 加 '__'  ，根据权限pmscode指定方法名， .更换为$...方法前加__
    __productauditlawer$view : function( btna , params ){
        var me = this;
        var view = this.$getView();
        Ext.apply(params,{callback: function(panel,win){
            //me.$addWindowToFather(win);
        }});
        this.$fireModuleEvents('workplatform','view',params);
    },

    __productauditlawer$support : function( btna , params ){
        var me = this;
        if(params.status != 4){
            Ext.Msg.show({
                title : '失败',
                msg  : '产品不是合同待审核状态！',
                icon: Ext.Msg.ERROR,
            });
            return;
        }
        // param = {product_id : params.id,status:2};
        var win = Ext.create("Ext.window.Window",{
            title : "请输入意见文本",
            layout : 'fit',
            width : 400,
            height: 350,
            buttons : [
                {
                    xtype : 'button',
                    text : '提交',
                    handler : function(){
                        var form = win.items.items[0];
                        form  = form.getForm();
                        var par = form.getValues();
                        var post = {id : params.id }
                        Ext.apply(post , par );
                        me.$requestAjax({
                            url     :   me.$getUrlstrByUrlcode('get.saveproductlawremark'),
                            method :    'POST',
                            params :    post,
                            scope  :    me,
                            backParams: {},
                            callback   :    function(response , backParams){
                                //console.log(response.responseText);
                                var param = Ext.decode(response.responseText);
                                if(param.status > 0){
                                    Ext.MessageBox.alert('成功','编辑成功！');
                                    me.$reloadViewGrid();
                                }
                            }
                        });
                        win.close();
                    }
                }
            ],
            items : [
                {
                    xtype : 'form',
                    layout : 'fit',
                    items : [
                        {
                            xtype : 'textarea',
                            height : 80 ,
                            name : 'law_remark',
                            emptyText : "请输入意见文本",
                            value : params.law_remark
                        }
                    ]
                }
            ]
        });
        win.show();
    },

    __productauditlawer$upload : function( btna , params ){
        var me = this;
        //getUserUploadContract
        var theDocspanel = Ext.create("ui.extend.base.Panel",{
            border : 0 ,
            columnWidth :1 ,
            myStamp : 'theDocsList',
            layout : 'column',
            hidden : true,
            items : [{
                xtype : 'label' ,
                columnWidth : 1 ,
                html : "<font color='#0D68C1'>产品部附件:</font>" ,
                labelWidth : 200
            }]
        });

        var theFawuDocsPanel = Ext.create("ui.extend.base.Panel",{
            border : 0 ,
            columnWidth :1 ,
            myStamp : 'theDocsList',
            layout : 'column',
            hidden : true,
            items : [{
                xtype : 'label' ,
                columnWidth : 1 ,
                html : "<font color='#0D68C1'>法务部附件:</font>" ,
                labelWidth : 200
            }]
        });

        me.$requestAjax({
            url : me.$getConfig('urls').get('get.getUploadContractList').url,
            method : "POST",
            params : {
                product_id: params.id
            },
            scope : me ,
            backParams: {} ,
            callback : function(response , backParams){
                //console.log(response.responseText);
                var param = Ext.decode(response.responseText);
                if(param.length>0){
                    me.__sub_showuploadlist_panel(param , theDocspanel ,theFawuDocsPanel ,params);
                }
            }
        });

        var uploadPanel = Ext.create( "ui.extend.base.Form",{
            columnWidth :1,
            layout : 'column',
            border :  0,
            padding : 10,
            styleHtmlCls : 'fileuploadfieldclass',
            styleHtmlContent : true,
            items : [
                {
                    xtype: 'filefield',
                    buttonConfig : {
                        text : '选择附件'
                    },
                    name: 'file',
                    columnWidth:.7,
                    border : 0 ,
                    blankText: '请上传文件',
                    listeners:{
                        "change" : function( field, str , eOpts ){
                            field.nextSibling().enable();
                        }
                    },
                    anchor : '100%'
                },{
                xtype : 'button',
                columnWidth:.15,
                margin : "0 5" ,
                text : '上传提交' ,
                disabled : true ,
                handler : function(btn){

                    var theform = uploadPanel.getForm();
                    if(theform.isValid()) {
                        winUpload.setLoading("上传中...");
                        uploadPanel.getForm().submit({
                            url: me.$getConfig('urls').get('get.lawAddContract').url , //'../Product/productAddContract',
                            params: {
                                product_id: params.id
                            },
                            success: function(form, action){
                                winUpload.setLoading(false);
                                Ext.Msg.alert('成功','上传成功.');
                                action.result.data.mine = 1 ;
                                me.__sub_showuploadlist_panel( [action.result.data] , theDocspanel , theFawuDocsPanel , params );
                            },
                            failure: function(form, action){
                                winUpload.setLoading(false);
                                Ext.Msg.alert('Error', action.result.msg);
                            }
                        })
                    }
                }
            }]
        });

        var winUpload=Ext.create('Ext.window.Window', {
            title: '添加合同',
            width: 600,
            height:500,
            minWidth: 300,
            minHeight: 100,
            bodyStyle:'padding:5px;',
            buttonAlign : 'center' ,
            autoScroll : true,
            items : [theFawuDocsPanel,theDocspanel],
            buttons: [uploadPanel]
        });
        winUpload.show();
    },

    __productauditlawer$approve : function( btna , params ){
        var me = this;
        params = me.$getArrayOne(params);
        if(params.status == 5){
            Ext.Msg.show({
                title : '失败',
                msg  : '已经是待审核状态！',
                icon: Ext.Msg.ERROR,
            });
            return;
        }
        params.status = 3;
        me.$askYestNo({
            msg : '确认通过吗',
            yes : function(){
                me.$requestAjax({
                    url     :   me.$getUrlstrByUrlcode('get.productauditlawer.changetongguo'),
                    method :    'POST',
                    params :    {product_id : params.id},
                    scope  :    me,
                    backParams: {},
                    callback   :    function(response , backParams){
                        //console.log(response.responseText);
                        var param = Ext.decode(response.responseText);
                        if(param.status > 0){
                            Ext.MessageBox.alert('成功',param.msg);
                            me.$reloadViewGrid();
                        }
                    }
                });
            }
        });
    },
    __productauditlawer$reject : function( btna , params ){
        var me = this;
        params = me.$getArrayOne(params);
        if(params.status == 3){
            Ext.Msg.show({
                title : '失败',
                msg  : '已经是退回状态！',
                icon: Ext.Msg.ERROR,
            });
            return;
        }
        params.status = 2;
        params.product_id=params.id;
        // param = {product_id : params.id,status:2};
        me.$askYestNo({
            msg : '确认提交吗',
            yes : function(){
                

                var win = Ext.create("Ext.window.Window",{
                    title : "请输入退回原因",
                    layout : 'fit',
                    width : 400,
                    height: 350,
                    buttons : [
                        {
                            xtype : 'button',
                            text : '确认退回',
                            handler : function(){
                                var form = win.items.items[0];
                                form  = form.getForm();
                                var par = form.getValues();
                                Ext.apply(params , par );
                                me.$requestAjax({
                                    url     :   me.$getUrlstrByUrlcode('set.productauditlawer.changeback'),
                                    method :    'POST',
                                    params :    params,
                                    scope  :    me,
                                    backParams: {},
                                    callback   :    function(response , backParams){
                                        //console.log(response.responseText);
                                        var param = Ext.decode(response.responseText);
                                        if(param.status > 0){
                                            Ext.MessageBox.alert('成功','提交成功！');
                                            me.$reloadViewGrid();
                                        }
                                    }
                                });
                                win.close();
                            }
                        }
                    ],
                    items : [
                        {
                            xtype : 'form',
                            layout : 'fit',
                            items : [
                                {
                                    xtype : 'textarea',
                                    height : 80 ,
                                    name : 'reason',
                                    fieldLable : "退回原因：",
                                    emptyText : "请输入退回原因"
                                }
                            ]
                        }
                    ]
                });
                win.show();
            }
        });
    },
    __productauditlawer$edit : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        me.$showOptionsPanel('edit', param ,function( panel ,win ){
            //这里对panel进行处理
        });
    },


    __sub_showuploadlist_panel : function(param , fatherpanel , fawupanel ,proinfo){
        var me = this;
        for(var i in param){
            var tmpanel = Ext.create("ui.extend.base.Panel" , {
                border : 0 ,
                columnWidth :1 ,
                margin : 10 ,
                layout : 'column',
                items : [
                    {
                        xtype : 'panel' ,
                        border : 0 ,
                        items : [] ,
                        columnWidth:.7 ,
                        html : "<a target='_blank' href='"+ param[i].attachment_url +"'>"+ param[i].attachment_name+"</a>"
                    },
                    {
                        xtype : 'button',
                        columnWidth:.1 ,
                        text : '下载',
                        atturl : param[i].attachment_url,
                        handler : function(btn){
                            window.open(btn.atturl);
                        }
                    }
                ]
            });

            var delbtn = Ext.create("Ext.button.Button",{
                xtype : 'button',
                columnWidth:.11 ,
                text : '删除',
                margin : "0 2",
                attid : param[i].id,
                product_id :  proinfo.id,
                handler : function(btn){
                    me.$askYestNo({
                        msg: '确认删除吗?',
                        yes: function () {
                            me.$requestAjax({
                                url : me.$getConfig('urls').get('get.delProductContract').url,
                                method : "POST",
                                params : {id : btn.attid , product_id : btn.product_id},
                                backParams: { } ,
                                callback   :	function(response , backParams){
                                    //console.log(response.responseText);
                                    var param = Ext.decode(response.responseText);
                                    var father  = btn.ownerCt;
                                    father.hide(200,function(){
                                        father.destroy();
                                    });
                                    Ext.MessageBox.alert("删除成功",param.msg);
                                }
                            });
                        }
                    })
                }
            });

            if(param[i].mine == 1){
                tmpanel.add(delbtn);
            }
            if(param[i].source == 1){
                fatherpanel.add(tmpanel);
                fatherpanel.setVisible(true);
            }else if(param[i].source == 2){
                fawupanel.add(tmpanel);
                fawupanel.setVisible(true);
            }
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

        me.$requestFromDataAjax(
            'get.productauditlawer.edit',
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
    __view_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.productauditlawer.view',
            mydata,
            thepanel
        );
    },

    __edit_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.productauditlawer.view',
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