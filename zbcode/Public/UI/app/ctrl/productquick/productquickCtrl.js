/**
 * Created by Administrator on 2015/12/7 0007.
 */

Ext.define('ui.ctrl.productquick.productquickCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    requires : [
        'ui.ctrl.productquick.productquickConf',
        'ui.view.productquick.productquickView',
        'ui.view.productquick.Coms.viewPanel'
    ],
    views : [
        'ui.view.productquick.productquickView'
    ],

    refs:[
        {ref:'productquickWin' , selector:'productquickwindow'}
    ],

    constructor : function (cfg){
        this.modelConf = Ext.create('ui.ctrl.productquick.productquickConf' , {ctrl : cfg.ctrl});
        this.callParent(arguments);
    },

    init : function(){
        this.control({      //这里的this相当于这个控制层
            'productquickpagecentergrid' : {
                render : function(e){
                    //e.grid.getStore().load();
                }
            }
        });
    },

    //配置功能按钮功能  对应Conf类中定义的operationButtons > pmsCode { text : '新增角色+' , pmsCode : 'productquick.add' }
    //‘.’替换为 $  ,方法前加__
    __productquick$add : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        
        me.$showOptionsPanel('add', pmsCode ,function(panel ,win){
            //这里对panel进行处理
        },me.$getConfig('_sub_win_defparams'));
    },

    //listbtn  list的处理按钮事件，方法名前 加 '__'  ，根据权限pmscode指定方法名， .更换为$...方法前加__
    __productquick$view : function( btna , params ){
        var me = this;
        var view = this.$getView();
        Ext.apply(params,{callback: function(panel,win){
            //me.$addWindowToFather(win);
        }});
        this.$fireModuleEvents('workplatform','view',params);
    },

    __productquick$edit : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        me.$showOptionsPanel('edit', param ,function( panel ,win ){
            //这里对panel进行处理
        },me.$getConfig('_sub_win_defparams'));
    },

    __productquick$plcexiao : function(btna , params){
        var me = this;
        var records = me.$getGridSelections();
        me.__sub_cexiao_product.call(me,records);
    },

    __productquick$cexiao : function(btna , params){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        var records = me.$getGridSelections();
        me.__sub_cexiao_product.call(me,records);
    },

    __sub_cexiao_product : function(records){
       var me = this;
       if(records.length <= 0){
            Ext.Msg.show({
                title : '失败',
                msg  : '请选择产品！',
                icon: Ext.Msg.ERROR,
            });
            return;
        }

        var idstr = "";
        for(var i in records){
            idstr += records[i].data.id;
            if(i<records.length-1) idstr += ",";
        }
        var params = {
            id : idstr
        }

        me.$askYestNo({
            msg : '确认撤销吗?',
            yes : function(){
                me.$requestAjax({
                    url     :   me.$getUrlstrByUrlcode('get.cexiaoproduct'),
                    method :	'POST',
                    params :	params,
                    scope  :	me,
                    backParams: { } ,
                    callback   :	function(response , backParams){
                        //console.log(response.responseText);
                        var param = Ext.decode(response.responseText);
                        if(param.status > 0){
                            Ext.MessageBox.alert('成功','撤销成功！');
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
        var cateInfo = [];
        var selfInfo = [];
        var scoreInfo = [];
        var baseInfo = {};
        var product_id = infopanel.getMyDatas().id;

        var theform = infopanel.findTabPanel({ myStamp : 'theForm'});
        var selfform = infopanel.findTabPanel({ myStamp : 'selfField'});
        var scoreform = infopanel.findTabPanel({ myStamp : 'thePingfen'});

        if(!product_id || !infopanel.checkValid() || !theform) return;
        baseInfo = theform.getForm().getFieldValues();

        var theFeildPanel = $findChldByFieldName(theform.items.items , {myStamp : "theFieldPanel"});
        var items = theFeildPanel.items.items;
        for(var k in items){
            var tmp = {};
            if(typeof(items[k].getValue) === 'function' && items[k].fieldLabel!=""){
                tmp['product_id'] = product_id;
                tmp['field_name'] = items[k].fieldLabel;
                tmp['field_id'] = items[k].field_id;
                tmp['field_value'] = items[k].getValue();

                cateInfo.push(tmp);
            }
        }

        var items = selfform.queryBy(function(){
            if(typeof(this.field_id)!='undefined'){
                return true;
            }else{
                return false;
            }
        });
        for(var k in items){
            var tmp = {};
            if(typeof(items[k].getValue) === 'function' && items[k].fieldLabel!=""){
                tmp['product_id'] = product_id;
                tmp['field_name'] = items[k].fieldLabel;
                tmp['field_id'] = items[k].field_id;
                tmp['field_value'] = items[k].getValue();

                selfInfo.push(tmp);
            }
        }

        var items = scoreform.queryBy(function(){
            if(typeof(this.field_id)!='undefined'){
                return true;
            }else{
                return false;
            }
        });
        for(var k in items){
            var tmp = {};
            if(typeof(items[k].getValue) === 'function' && items[k].fieldLabel!=""){
                tmp['product_id'] = product_id;
                tmp['field_name'] = items[k].fieldLabel;
                tmp['field_id'] = items[k].field_id;
                tmp['field_value'] = items[k].getValue();

                scoreInfo.push(tmp);
            }
        }

        var postparams = {
            id : product_id,
            baseInfo : baseInfo ,
            selfInfo : selfInfo,
            cateInfo : cateInfo,
            scoreInfo : scoreInfo
        }
        me.$requestFromDataAjax(
            'get.productquick.edit',
            Ext.encode(postparams),
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
        var addparams = me.$getFormsParams(infopanel);
        var cateInfo = [];

        var theform = infopanel.findTabPanel({ myStamp : 'theForm'});
        var theFeildPanel = $findChldByFieldName(theform.items.items , {myStamp : "theFieldPanel"});
        var items = theFeildPanel.queryBy(function(){
            if(typeof(this.field_id)!='undefined'){
                return true;
            }else{
                return false;
            }
        });
        for(var k in items){
            var tmp = {};
            //if(typeof(items[k].getValue) === 'function' && items[k].fieldLabel!=""){
                tmp['field_name'] = items[k].fieldLabel;
                tmp['field_id'] = items[k].field_id;
                tmp['field_value'] = items[k].getValue();

                cateInfo.push(tmp);
            //}
        }

        var params = {};
        params['baseInfo'] = addparams;
        params['cateInfo'] = cateInfo;
        //var $json = file_get_contents("php://input");
        me.$requestFromDataAjax(
            'get.productquick.add',
            Ext.encode(params),
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

        var theFormlist = thepanel.getFormsList();
        var theform = thepanel.findTabPanel({ myStamp : 'theForm'});
        if(!theform) return;
        var fieldFirst = theform.getForm().findField("firstCateValue");
        var fieldSub = theform.getForm().findField("category_id");
        if(!fieldFirst) return;

        var fieldFirstValue = fieldFirst.getValue();
        if(fieldFirstValue>0){
            fieldSub.getStore().firstCategoryid = fieldFirst.getValue();
            if(fieldSub.getStore().getProxy().extraParams){
                fieldSub.getStore().getProxy().extraParams = {'category_id' : fieldSub.getStore().firstCategoryid}
            }
            fieldSub.getStore().load()
        }

        fieldFirst.on('change' , function(field){
            fieldSub.setValue('');
            fieldSub.getStore().firstCategoryid = {'category_id' : field.getValue()};
            fieldSub.getStore().load();
        });

        var theFeildPanel = $findChldByFieldName(theform.items.items , {myStamp : "theFieldPanel"});
        if(!theFeildPanel){
            Ext.require([
                "ui.view.productquick.Coms.extraFieldPanel"
            ],function(){
                theFeildPanel = Ext.create("ui.view.productquick.Coms.extraFieldPanel");
                theform.add(theFeildPanel);
            });
        }

        fieldSub.on('change', function(field , newValue, oldValue, eOpts){
            theFeildPanel.removeAll();
            var value = field.getValue();
            //alert(value);
            if(value === oldValue || !value || value == '') return ;
            if(field.optype != 'add')return;
            var params = {category_id : newValue};
            me.$requestAjax({
                url     :   "../Product/getProductCategoryField",
                method :	'POST',
                params :	params,
                scope  :	me,
                backParams:	{},
                callback   :	function(response , backParams){
                    //console.log(response.responseText);
                    //if(typeof(field.initfield) === 'undefined')
                    var param = Ext.decode(response.responseText);
                    var baseInfo = param;

                    if(baseInfo){
                        var fieldList = me.$createFieldTrend(baseInfo);
                        theFeildPanel.removeAll();
                        for(var i in fieldList){
                            me.$checkFieldInitfn(optype,fieldList[i]);
                            theFeildPanel.add(fieldList[i]);
                        }
                        theFeildPanel.doLayout();
                    }

                }
            });

        })


    },
    //表单数据加载之后
    __all_post_after_main_event : function(thepanel){
        //alert('after');
        var me = this;
        var optype = thepanel.optype;
        if(Ext.Array.indexOf(['view','add','edit'],optype)>-1){
            var data = thepanel.$postValue;
            var baseinfo = data.baseInfo;
            var scoreInfo = data.scoreInfo;
            var selfInfo = data.selfInfo;
            var attatch = data.attatch;

            me.$setDataToPanelForms.call(me, thepanel , baseinfo.base);

            var theFormlist = thepanel.getFormsList();
            var theform = thepanel.findTabPanel({ myStamp : 'theForm'});
            var theFeildPanel = $findChldByFieldName(theform.items.items , {myStamp : "theFieldPanel"});
            if(!theFeildPanel){
                Ext.require([
                    "ui.view.productquick.Coms.extraFieldPanel"
                ],function(){
                    theFeildPanel = Ext.create("ui.view.productquick.Coms.extraFieldPanel");
                    theform.add(theFeildPanel);
                });
            }


            if(baseinfo){
                if(baseinfo.cate){
                    var fieldList = me.$createFieldTrend(baseinfo.cate , optype);
                    theFeildPanel.removeAll();
                    for(var i in fieldList){
                        me.$checkFieldInitfn(optype,fieldList[i]);
                        theFeildPanel.add(fieldList[i]);
                    }
                    theFeildPanel.doLayout();
                }
            }

            if(scoreInfo) {
                var thepinfenPanel = thepanel.findTabPanel({myStamp: 'thePingfen'});
                //alert(thepinfenPanel);
                if (thepinfenPanel){
                    for (var k in scoreInfo){
                        if (scoreInfo[k]['group_id'] && scoreInfo[k]['fields'] && scoreInfo[k]['fields'].length) {
                            var fieldset = Ext.create("Ext.form.FieldSet", {
                                myStamp : "theFieldSet",
                                title: scoreInfo[k]['group_name'] ? scoreInfo[k]['group_name'] : ("分组" + scoreInfo[k]['group_id']),
                                columnWidth: 1,
                                layout: 'form',
                                autoHeight: true
                            });
                            var fieldList = me.$createFieldTrend(scoreInfo[k]['fields']);
                            for (var i in fieldList) {
                                //fieldList[i].
                                me.$checkFieldInitfn(optype,fieldList[i]);
                                fieldset.add(fieldList[i]);
                            }
                            thepinfenPanel.add(fieldset);
                            thepinfenPanel.doLayout();
                        }
                    }
                }
            }

            var isEditAdd = ( optype === 'add' || optype === 'edit' && baseinfo.base);
            if(selfInfo){
                var theselfPanel = thepanel.findTabPanel({ myStamp : 'selfField'});
                if (theselfPanel) {
                    var thefilepanel = Ext.create("ui.extend.base.Panel",{
                        myStamp : "theFieldSet",
                        columnWidth:1,
                        border : 0,
                        layout : "column" ,
                        items : []
                    });
                    var fieldList = me.$createFieldTrend(selfInfo);
                    for(var i in fieldList){
                        me.$checkFieldInitfn(optype,fieldList[i]);
                        if( isEditAdd ){
                             var panel = me.__createFieldPanel_event(fieldList[i] , thefilepanel , baseinfo);
                        }else{
                            fieldList[i].columnWidth = 1 ;
                        }
                        if(panel){
                            thefilepanel.add(panel);
                        }else{
                            thefilepanel.add(fieldList[i]);
                        }
                    }
                    theselfPanel.add(thefilepanel);
                }
            }


            if(isEditAdd){
                var buttonpanel = Ext.create("ui.extend.base.Panel",{
                    columnWidth:1,
                    border : 0,
                    layout : "column" ,
                    items : [{
                        xtype : 'button',
                        columnWidth:.15,
                        baseCls : 'button-qianyanse',
                        margin : "0 0 0 6",
                        text : "添加字段",
                        theBase : baseinfo.base,
                        handler : function(btn){
                            var params = {
                                product_id : btn.theBase.id
                            }
                            me.__addSelfFields_event.call( me, params , thefilepanel );
                        }
                    }]
                });
                theselfPanel.add(buttonpanel);

                theselfPanel.doLayout();
            }
        }
    },

/*SUBSUBSUBSUB*/
/*添加字段及编辑删除自定义字段的事件定义*/
    __createFieldPanel_event : function(field , thefilepanel , baseinfo){
        var me = this;
        field.columnWidth = .82 ;
        var panel = Ext.create("ui.extend.base.Panel",{
            columnWidth:1,
            border : 0,
            layout : "column" ,
            myStamp : 'thelinefieldpanel',
            items : [field,{
                xtype : 'button',
                columnWidth:.08,
                baseCls : 'button-qianyanse',
                text : "编辑",
                theBase : baseinfo.base,
                fieldto : field,
                handler : function(){
                    var params = { product_id : this.theBase.id?this.theBase.id:this.theBase.product_id };
                    Ext.apply( params , {
                        field_id : field.field_id ,
                        field_name : field.field_name,
                        fieldLable : field.field_name,
                        product_id : field.product_id
                    });
                    me.__editSelfFields_event.call( me, this.fieldto , thefilepanel );
                }
            },{
                xtype : 'button',
                columnWidth:.08,
                baseCls : 'button-qianyanse',
                margin : "0 0 0 6",
                fieldto : field ,
                text : "删除",
                handler : function(){
                    me.__delSelfFields_event.call(me,this.fieldto);
                }
            }]
        });

        return panel;
    },

    __editSelfFields_event : function(field , thefilepanel ){
        var me = this;
        var thepane = $findFatherByFieldName(field,{myStamp : 'thelinefieldpanel'});
        var params = {};
        Ext.apply( params , {
            field_name : field.fieldLabel,
            field_id    : field.field_id,
            product_id    : field.product_id
        });

        var theform = Ext.create("Ext.form.Panel",{
            xtype : 'form',
            layout : 'column',
            padding : 10,
            border : 0,
            columnWidth: 1 ,
            autoScroll : true,
            items : [{
                    xtype : "textfield",
                    fieldLabel : '产品id',
                    name : 'product_id',
                    hidden : true,
                    columnWidth: 1 ,
                    labelWidth : 80,
                    value : params.product_id,
                    margin: 6
                },{
                    xtype : "textfield",
                    fieldLabel : '字段id',
                    name : 'field_id',
                    hidden : true,
                    columnWidth: 1 ,
                    labelWidth : 80,
                    value : params.field_id,
                    margin: 6
                },{
                    xtype : "textfield",
                    fieldLabel : '字段标题',
                    name : 'field_name',
                    columnWidth: 1 ,
                    labelWidth : 80,
                    allowBlank : false,
                    blankText : '字段标题必填',
                    value : params.field_name,
                    margin: 6
                }]
            });

        var win = Ext.create("Ext.window.Window",{
            title : '编辑自定义字段',
            layout : 'column',
            height: 200,
            width: 400,
            buttons : [{
                xtype : "button",
                text : "提交",
                columnWidth:.3 ,
                margin: 6,
                handler : function(){
                    if(!theform.getForm().isValid())return;
                    var params = theform.getForm().getFieldValues();

                    me.$requestAjax({
                        url : me.$getUrlstrByUrlcode('get.saveproductselffield'),
                        method : "POST",
                        params : params ,
                        backParams : params,
                        callback : function(response , backParams){
                            var param = Ext.decode(response.responseText);
                            //console.log(field.fieldLabel);
                            if(param.status == 1){
                                field.fieldLabel = backParams.field_name;
                                field.field_name = backParams.field_name;
                                win.close();
                            }
                            thepane.doLayout();
                            //console.log(field.fieldLabel);
                        }
                    });
                }
            }],
            items : [theform]
        });
        thefilepanel.add(win);
        win.show();
        thefilepanel.doLayout();
    },

    __delSelfFields_event : function(field){
        var me = this;
        var thepane = $findFatherByFieldName(field,{myStamp : 'thelinefieldpanel'});

        var params = {
            product_id : field.product_id ,
            field_id : field.field_id
        }
        me.$askYestNo({
            msg : '确认删除字段吗',
            yes : function(){
                me.$requestAjax({
                    url     :   me.$getUrlstrByUrlcode('get.delproductselffield'),
                    method :	'POST' ,
                    params :	params ,
                    scope  :	me ,
                    backParams:	{} ,
                    callback   :	function(response , backParams){
                        //console.log(response.responseText);
                        var param = Ext.decode(response.responseText);
                        if(param.status > 0){
                            thepane.destroy();
                        }
                    }
                });
            }
        });
    },

    __addSelfFields_event : function(params,thefilepanel ){
        var me = this;
        var product_id = params.product_id;
        if(!product_id) return;

        var theform = Ext.create("Ext.form.Panel",{
            xtype : 'form',
            layout : 'column',
            padding : 10,
            border : 0,
            columnWidth: 1 ,
            autoScroll : true,
            items : [{
                xtype : "textfield",
                fieldLabel : '产品id',
                name : 'product_id',
                hidden : true,
                columnWidth: 1 ,
                labelWidth : 80,
                value : product_id,
                margin: 6
            },{
                xtype : "textfield",
                fieldLabel : '字段标题',
                name : 'field_name',
                columnWidth: 1 ,
                labelWidth : 80,
                allowBlank : false,
                blankText : '字段标题必填',
                value : params.field_name,
                margin: 6
            },{
                xtype : "combobox",
                fieldLabel : '字段类型',
                name : 'field_type',
                columnWidth: 1 ,
                labelWidth : 80,
                allowBlank : false,
                blankText : '类型必选',
                margin: 6,
                editable:false,
                displayField	: 'display',
                valueField 	: "value",
                store : new Ext.data.ArrayStore({
                    fields	: 	['value', 'display'] ,
                    data	:	[[1,'文本框'],[2,'富文本']]
                })
            }]
        });

        var win = Ext.create("Ext.window.Window",{
            title : '新增自定义字段',
            layout : 'column',
            height: 200,
            width: 400,
            buttons : [{
                xtype : "button",
                text : "提交",
                columnWidth:.3 ,
                margin: 6,
                handler : function(){
                    if(!theform.getForm().isValid())return;
                    var params = theform.getForm().getFieldValues();

                    me.$requestAjax({
                        url : me.$getUrlstrByUrlcode('get.saveproductselffield') ,
                        method : "POST",
                        params : params ,
                        backParams : params,
                        callback : function(response , backParams){
                            var param = Ext.decode(response.responseText);
                            if(param.status == 1){
                                var field_id = param.data.field_id;
                                //console.log(backParams);

                                var fieldparams = {
                                    field_id : field_id ,
                                    fieldLabel : backParams.field_name ,
                                    field_name : backParams.field_name ,
                                    product_id : product_id ,
                                    field_value : "",
                                    field_type : backParams.field_type
                                }

                                var fieldList = me.$createFieldTrend([fieldparams]);
                                if(thefilepanel && fieldList[0]){
                                    var pane = me.__createFieldPanel_event(fieldList[0] , thefilepanel , {base : fieldparams});
                                    thefilepanel.add(pane);
                                }

                                thefilepanel.doLayout();
                                win.close();
                            }
                        }
                    });
                }
            }],
            items : [theform]
        });
        thefilepanel.add(win);
        win.show();
        thefilepanel.doLayout();
    },

    __addEditSelfFields_event : function( selfPanel , params ,fields){
        var me = this;
        var product_id = params.id?params.id:params.product_id;
        var field_id = params.field_id
        var field_name = params.field_name

        var theform = Ext.create("Ext.form.Panel",{
            xtype : 'form',
            layout : 'column',
            padding : 10,
            border : 0,
            columnWidth: 1 ,
            autoScroll : true,
            items : [{
                xtype : "textfield",
                fieldLabel : '字段标题',
                name : 'field_name',
                columnWidth: 1 ,
                labelWidth : 80,
                allowBlank : false,
                blankText : '字段标题必填',
                value : field_name?field_name:"",
                margin: 6
            },{
                xtype : "combobox",
                fieldLabel : '字段类型',
                name : 'field_type',
                columnWidth: 1 ,
                labelWidth : 80,
                allowBlank : false,
                blankText : '类型必选',
                hidden : field_id?true:false,
                disabled : field_id?true:false,
                margin: 6,
                editable:false,
                displayField	: 'display',
                valueField 	: "value",
                store : new Ext.data.ArrayStore({
                    fields	: 	['value', 'display'] ,
                    data	:	[[1,'文本框'],[2,'富文本']]
                })
            }]
        });

        var win = Ext.create("Ext.window.Window",{
            title : field_id?'编辑自定义字段':"添加自定义字段",
            layout : 'column',
            height: 200,
            width: 400,
            buttons : [{
                xtype : "button",
                text : "提交",
                columnWidth:.3 ,
                margin: 6,
                handler : function(){
                    if(!theform.getForm().isValid()) return;
                    var params = theform.getForm().getFieldValues();

                    Ext.apply(params, {product_id : product_id});
                    if(field_id){
                        Ext.apply(params,{ field_id : field_id});
                    }
                    me.$requestAjax({
                        url : me.$getUrlstrByUrlcode('get.saveproductselffield') ,
                        method : "POST",
                        params : params ,
                        backParams : params,
                        callback : function(response , backParams){
                            var param = Ext.decode(response.responseText);
                            if(param.status == 1){
                                if(!backParams.field_id){
                                    var field_id = param.data.field_id;
                                    var fieldList = me.$createFieldTrend([{
                                        filed_id : field_id ,
                                        fieldLabel : backParams.filed_name ,
                                        filed_name : backParams.filed_name ,
                                        product_id : product_id ,
                                        field_value : "",
                                        field_type : params.field_type
                                    }]);
                                    //console.log(fieldList[0]);
                                    selfPanel.add(fieldList[0]);
                                    win.close();
                                    selfPanel.doLayout();
                                }else if(params.field_id && fields){
                                    fields.fieldLable = params.filed_name;
                                }
                            }
                        }
                    });
                }
            }],
            items : [theform]
        });

        if(selfPanel) selfPanel.add(win);
        win.show();

    },

/*添加字段及编辑删除自定义字段的事件定义--end*/
/*SUBSUBSUBSUB-----END*/

    __view_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.productquick.view',
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
        //     'get.productquick.view',
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
            'get.productquick.view',
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
    }

});