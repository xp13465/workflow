/**
 * Created by Administrator on 2015/12/7 0007.
 */

Ext.define('ui.ctrl.workplatform.workplatformCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    requires : [
        'ui.ctrl.workplatform.workplatformConf',
        'ui.view.workplatform.workplatformView',
        'ui.view.workplatform.Coms.viewPanel'
    ],
    views : [
        'ui.view.workplatform.workplatformView'
    ],

    refs:[
        {ref:'workplatformWin' , selector:'workplatformwindow'}
    ],

    constructor : function (cfg){
        this.modelConf = Ext.create('ui.ctrl.workplatform.workplatformConf' , {ctrl : cfg.ctrl});
        this.callParent(arguments);
    },

    init : function(){
        this.control({      //这里的this相当于这个控制层
            'workplatformpagecentergrid' : {
                render : function(e){
                    //e.grid.getStore().load();
                }
            }
        });
    },

    //配置功能按钮功能  对应Conf类中定义的operationButtons > pmsCode { text : '新增角色+' , pmsCode : 'workplatform.add' }
    //‘.’替换为 $  ,方法前加__
    __workplatform$add : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        //if(!pmsCode) return;
        
        me.$showOptionsPanel('add', pmsCode ,function(panel ,win){
            //这里对panel进行处理
        },me.$getConfig('_sub_win_defparams'));
    },

    //listbtn  list的处理按钮事件，方法名前 加 '__'  ，根据权限pmscode指定方法名， .更换为$...方法前加__
    __workplatform$view : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        //if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        me.$showOptionsPanel('view', param ,function( panel ,win ){
            //这里对panel进行处理
            if(typeof(params.callback) === 'function'){
                params.callback.call( me,panel ,win );
            }

        },me.$getConfig('_sub_win_defparams'));
    },

    __workplatform$edit : function( btna , params ){
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

    __workplatform$cancel : function(btna , params){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        var records = me.$getGridSelections();
        me.__sub_cexiao_product.call(me,records);
    },

    __workplatform$submit : function( btna , params ){
        var me = this;
        if(!btna.pmsCode){
            if($(btna).hasClass('grid-list-operation-btns-disable')) return;
        }
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        var records = me.$getGridSelections();
        me.__sub_submit_product.call(me,records);
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
                    backParams: {} ,
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

    __sub_submit_product : function(records){
        var me = this;
        if(records.length <= 0){
            Ext.Msg.show({
                title : '失败',
                msg  : '请选择产品！',
                icon: Ext.Msg.ERROR,
            });
            return;
        }else if(records.length > 1){
            Ext.Msg.show({
                title : '失败',
                msg  : '只能单个提交！',
                icon: Ext.Msg.ERROR,
            });
            return;
        }else if(records[0].data.status > 1){
            Ext.Msg.show({
                title : '失败',
                msg  : '记录已提交！',
                icon: Ext.Msg.ERROR,
            });
            return;
        }

        var params = {
            id : records[0].data.id
        }

        me.$askYestNo({
            msg : '确认提交产品吗?',
            yes : function(){
                me.$requestAjax({
                    url     :   me.$getUrlstrByUrlcode('get.submitproduct'),
                    method :	'POST',
                    params :	params,
                    scope  :	me,
                    backParams: { } ,
                    callback   :	function(response , backParams){
                        //console.log(response.responseText);
                        var param = Ext.decode(response.responseText);
                        if(param.status > 0){
                            Ext.MessageBox.alert('成功','提交成功！');
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
            'get.workplatform.edit',
            Ext.encode(postparams),
            null,
            function(params){
                if(typeof(infopanel.ownerCt) != 'undefined' && typeof(infopanel.ownerCt.close) === 'function'){
                    //infopanel.ownerCt.close();
                    Ext.MessageBox.alert("操作成功",params.msg);
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
        if(theform && !theform.getForm().isValid()) return;
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
            'get.workplatform.add',
            Ext.encode(params),
            null,
            function(params){
                if(typeof(infopanel.ownerCt) != 'undefined' && typeof(infopanel.ownerCt.close) === 'function'){
                    infopanel.ownerCt.close();
                    me.$reloadViewGrid();
                    me.__workplatform$edit(btn , { id : params.data.product_id } );
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
            //if(optype == 'edit' || optype == 'view') return;
            //fieldSub.setValue('');
            fieldSub.getStore().firstCategoryid = {'category_id' : field.getValue()};
            fieldSub.getStore().load();
        });

        var theFeildPanel = $findChldByFieldName(theform.items.items , {myStamp : "theFieldPanel"});
        if(!theFeildPanel){
            Ext.require([
                "ui.view.workplatform.Coms.extraFieldPanel"
            ],function(){
                theFeildPanel = Ext.create("ui.view.workplatform.Coms.extraFieldPanel");
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
                url     :   me.$getConfig('urls').get('get.getProductCategoryField').url,
                method :	'POST',
                params :	params,
                scope  :	me,
                backParams:	{},
                callback   :	function(response , backParams){
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
        var thePostData = thepanel.getMyDatas();

        if(Ext.Array.indexOf(['view','add','edit'],optype)>-1){
            var data = thepanel.$postValue;
            var baseinfo = data.baseInfo;
            var scoreInfo = data.scoreInfo;
            var scoreResult = data.scoreResult;
            var selfInfo = data.selfInfo;
            var attatch = data.attatch;
            var feeInfo = data.feeInfo;

            console.log(baseinfo.base['contacter']);
            if(typeof(baseinfo.base['contacter'])=='undefined') {
                var theform = thepanel.findTabPanel.call(thepanel,{ myStamp : 'theForm'});
                //field.disabled = true;
                theform.getForm().findField('contacter').disabled = true;
                theform.getForm().findField('contacter').setVisible(false);
            }
            if(typeof(baseinfo.base['contact_tel'])=='undefined') {
                var theform = thepanel.findTabPanel.call(thepanel,{ myStamp : 'theForm'});
                //field.disabled = true;
                theform.getForm().findField('contact_tel').disabled = true;
                theform.getForm().findField('contact_tel').setVisible(false);
            }

            me.$setDataToPanelForms.call(me, thepanel , baseinfo.base);

            var theFormlist = thepanel.getFormsList();
            var theform = thepanel.findTabPanel.call(thepanel,{ myStamp : 'theForm'});
            var theFeildPanel = $findChldByFieldName(theform.items.items , {myStamp : "theFieldPanel"});
            if(!theFeildPanel){
                Ext.require([
                    "ui.view.workplatform.Coms.extraFieldPanel"
                ],function(){
                    theFeildPanel = Ext.create("ui.view.workplatform.Coms.extraFieldPanel");
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
                //alert(thepinfenPanel);
                var thepinfenPanel = thepanel.findTabPanel.call(thepanel,{myStamp: 'thePingfen'});
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
            }else{
                var thepinfenPanel = thepanel.findTabPanel({myStamp: 'thePingfen'});
                if(optype == 'view') thepinfenPanel.destroy();
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
            }else{
                var thetabpanel = thepanel.tabpanel;
                var theselfPanel = thepanel.findTabPanel({ myStamp : 'selfField'});
                if(optype == "view")theselfPanel.destroy(); //hide();
            }


            if(isEditAdd && selfInfo){
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


            var len = 0;
            for(var i in scoreResult ){
                len++;
            };
            if(scoreResult && len>0){
                var panel = Ext.create("Ext.form.Panel",{
                        title: "评分结果",
                        height:100,
                        columnWidth :1,
                        padding:10,
                        layout : 'column',
                        autoScroll : true,
                        items : []
                });

                for(var i in scoreResult){
                    var fieldset = Ext.create("Ext.form.FieldSet", {
                        myStamp : "theFieldSet",
                        title: '【'+ scoreResult[i].department_name + '】评分结果',
                        columnWidth: 1,
                        layout: 'column',
                        autoHeight: true,
                        items : []
                    });

                    var filed = Ext.create("Ext.form.field.Text",{
                        fieldLabel : "评分类型",
                        labelWidth: 80,
                        margin: 6,
                        readOnly : true,
                        columnWidth :.5,
                        value : function(){
                            var status = scoreResult[i].result[0].status;
                            if(status == 1){
                                return "通过";
                            }else if(status == 2){
                                return "不通过";
                            }else if(status == 3){
                                return "暂观望";
                            }
                        }()
                    });
                    fieldset.add(filed);
                    for(var k in scoreResult[i].scoreList){
                        var filed = Ext.create("Ext.form.field.Text",{
                            fieldLabel : scoreResult[i].scoreList[k].group_name,
                            labelWidth: 80,
                            margin: 6,
                            readOnly : true,
                            columnWidth :.5,
                            value : scoreResult[i].scoreList[k].score
                        });
                        fieldset.add(filed);
                    }

                    var filed = Ext.create("Ext.form.field.TextArea",{
                        fieldLabel : "评分理由",
                        labelWidth: 80,
                        margin: 6,
                        height:80,
                        readOnly : true,
                        columnWidth :1,
                        value :  scoreResult[i].result[0].reason
                    });
                    fieldset.add(filed);
                    panel.add(fieldset);
                }
                thepanel.tabpanel.insert(3,panel);
            }


            if(isEditAdd){
                var thebigform = thepanel.findTabPanel({ myStamp : 'theFujianEdit'});
                var uploadPanel = Ext.create( "ui.extend.base.Form",{
                    columnWidth :1,
                    layout : 'column',
                    border :  0,
                    padding : 10,
                    items : [{
                        xtype: 'filefield',
                        buttonConfig : {
                            text : '选择附件'
                        },
                        labelCls : '',
                        name: 'file',
                        columnWidth:.8,
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
                            if(theform.isValid()){
                                thepanel.setLoading("上传中...");
                                theform.submit({
                                    url : me.$getConfig('urls').get('get.uploadproductatt').url,
                                    method : "POST",
                                    params: {
                                        product_id: thePostData.id
                                    },  // anchor width by percentage
                                    success : function(form, action){
                                        me.__add_uploadfile_to_yulan.call(me,thebigform,[action.result.data]);
                                        thepanel.setLoading(false);
                                        Ext.MessageBox.alert("上传成功",action.result.msg);
                                    },
                                    failure : function(form, action) {
                                        thepanel.setLoading(false);
                                        Ext.MessageBox.alert("上传失败",action.result.msg);
                                    }
                                });
                            }
                        }
                    }]
                });
                thebigform.add(uploadPanel);
            }

            if(attatch && (attatch.img || attatch.doc)){
                var theFormlist = thepanel.getFormsList();
                var thebigform = thepanel.findTabPanel({ myStamp : 'theFujianEdit'});
                if(attatch.img && attatch.img.length>0){
                    me.__add_uploadfile_to_yulan(thebigform , attatch.img ,'img' );
                }
                if(attatch.doc && attatch.doc.length>0){
                    me.__add_uploadfile_to_yulan(thebigform , attatch.doc ,"doc");
                }

            }else if(!attatch.img &&　!attatch.doc){
                var thebigform = thepanel.findTabPanel({ myStamp : 'theFujianEdit'});
                thebigform.destroy();
            }


            if(feeInfo && feeInfo.fee.length>0){
                me.__fee_views_list_panel_evt(thepanel , feeInfo);
                me.__fee_views_reason_panel_evt(thepanel , feeInfo.feeRemark);
            }
        }
    },

    __fee_views_list_panel_evt : function(thepanel , feeInfo){

        var me = this;
        var optype = thepanel.optype;
        var thePostData = thepanel.getMyDatas();
        var data = feeInfo;

        var theNewTabPanel = me.__create_tabpanel_for_fee(thepanel);

        var channel_fee_panel = $findByparam(theNewTabPanel ,{myStamp : "thefeechannl"} );
        channel_fee_panel = channel_fee_panel[0];
        if(!channel_fee_panel){
            Ext.MessageBox.alert("数据调入失败","未找到相应数据项");
            return;
        }

//============================================
        var inputfileds_panel = $findByparam(theNewTabPanel ,{myStamp : "theinputfileds"} );
        inputfileds_panel = inputfileds_panel[0];
        if(!inputfileds_panel){
            Ext.MessageBox.alert("数据调入失败","未找到相应数据项");
            return;
        }

        var outputfileds_panel = $findByparam(theNewTabPanel ,{myStamp : "theoutputfileds"} );
        outputfileds_panel = outputfileds_panel[0];
        if(!outputfileds_panel){
            Ext.MessageBox.alert("数据调入失败","未找到相应数据项");
            return;
        }

        var thechagefn = function(){
            var channelfileds = $findByparam(channel_fee_panel ,{myStamp : "theMainfield"} );
            channelfileds = channelfileds[0];
            var channelfileds_value = channelfileds.getValue();

            var inputfileds = $findByparam(inputfileds_panel ,{myStamp : "theinputfield"} );

            var outputfileds = $findByparam(outputfileds_panel ,{myStamp : "theoutputfield"} );

            var tipfileds = $findByparam(theNewTabPanel ,{myStamp : "thelabletip"} );
            tipfileds = tipfileds[0];

            if(!channelfileds_value || channelfileds_value < 0 ){
                tipfileds.setText("请填写渠道费率");
                return;
            }
            var sum = 0;
            for(var i in inputfileds){
                sum += parseFloat(inputfileds[i].getValue());
            }
            if(sum != 100){
                if(tipfileds){
                    tipfileds.setText("× 费率占比和值需为100%");
                    tipfileds.removeCls('font-blue-label-tip');
                    tipfileds.addCls('font-red-label-tip');
                }
                for(var k in outputfileds){
                    outputfileds[k].setText("");
                }
            }else{
                tipfileds.setText("√ 填写正确");
                tipfileds.removeCls('font-red-label-tip');
                tipfileds.addCls('font-blue-label-tip');

                for(var k in inputfileds){
                    var input = inputfileds[k].getValue();
                    var output = (input/100)*(channelfileds_value/100);
                    outputfileds[k].setText(String(parseInt(output*10000)/100)+"%");
                }

            }
        }
        var channel_fee = Ext.create("Ext.form.field.Number",{
            fieldLabel : "渠道费率%",
            columnWidth : .8,
            labelWidth: 120,
            readOnly : (optype==='edit')?false:true,
            myStamp : "theMainfield",
            minValue : 1,
            maxValue : 100,
            allowBlank :false,
            blankText:"请输入渠道费率",
            product_id : data.product_id,
            value : String(data.channel_fee?data.channel_fee.channel_fee:'').replace("%",""),
            listeners : {
                "change" : thechagefn
            }
        });
        channel_fee_panel.add(channel_fee);

        for(var i in data.fee){
            var field_lable = Ext.create("Ext.form.Label",{
                text : data.fee[i].field_name + "：",
                columnWidth : .5,
                labelWidth: 80,
                height: 40,
                baseCls : 'lablelablename'
            });

            var field_value = Ext.create("Ext.form.Label",{
                text : "",
                columnWidth :.5,
                labelWidth: 80,
                height: 40,
                myStamp : "theoutputfield",
                baseCls : 'labletextcenter'
            });

            var field = Ext.create("Ext.form.field.Number",{
                xtype : 'textfield',
                fieldLabel : data.fee[i].field_name + "占比%",
                columnWidth : 1,
                labelWidth: 150,
                readOnly : (optype==='edit')?false:true,
                height: 40,
                minValue : 0,
                maxValue : 100,
                product_id : data.fee[i].product_id,
                field_id : data.fee[i].field_id,
                value : String(data.fee[i].field_value).replace("%",""),
                allowBlank :false,
                myStamp : "theinputfield",
                baseCls : 'lineheight40',
                blankText:"请输入渠道费率",
                listeners : {
                    "change" : thechagefn
                }
            });

            outputfileds_panel.add(field_lable);
            outputfileds_panel.add(field_value);
            inputfileds_panel.add(field);
        }


        thechagefn();
    },

    __fee_views_reason_panel_evt : function(thepanel , feeRemark){
        if( typeof(feeRemark)==='undefined' || feeRemark.length<=0 ){
            return;
        }
        var me = this;
        var optype = thepanel.optype;
        var thePostData = thepanel.getMyDatas();
        var data = feeRemark;
        var feesPanel = $findByparam(thepanel,{ myStamp : 'theFeesviewForm'}); //thepanel.findTabPanel ,{myStamp : "theMainfield"} );

       if(!feesPanel || feesPanel.length<=0) return;

        feesPanel = feesPanel[0];

        var fieldset = Ext.create("Ext.form.FieldSet", {
            myStamp : "theReasonList",
            title: "费率通过原因",
            columnWidth: 1,
            padding : 10,
            layout: 'column',
            autoHeight: true,
            items : []
        });

        for(var i in feeRemark){
            var thefield = Ext.create("ui.extend.base.Panel",{
                border : 0 ,
                height : "auto",
                columnWidth :1,
                layout: 'column',
                items : [
                    {
                        xtype : 'panel',
                        columnWidth :.2 ,
                        items:[],
                        border : 0,
                        minHeight : 45 ,
                        html : "<font color='green'>" + feeRemark[i].user_department + "</font>："
                    },
                    {
                        xtype : 'panel',
                        columnWidth :.8 ,
                        items:[],
                        border : 0,
                        html : "<p><font color='#333'>" + feeRemark[i].reason + "</font></p>"
                    }

                ]
            });
            fieldset.add(thefield);
        }
        feesPanel.add(fieldset);
    },

    __create_tabpanel_for_fee : function(thepanel){

        var re_panel =  Ext.create("ui.extend.base.Form",{
                title : '费率查看',
                xtype : 'form',
                layout : 'column',
                padding : 10,
                autoScroll : true,
                myStamp : 'theFeesviewForm',
                items : [{
                    labelWidth: 80,
                    baseCls : '',
                    margin: 6,
                    layout : 'column',
                    columnWidth :1,
                    filedType : 'Panel',
                    myStamp : 'thefeechannl',
                    items : [
                    ]
                },{
                    columnWidth:1,
                    filedType : 'Panel',
                    height:50,
                    border : 0,
                    html : "&nbsp;",
                    myStamp : 'thelabelpanel',
                    items :[{
                        xtype : 'label',
                        text : "[请填写/修改以下费率占比]",
                        columnWidth : 1,
                        labelWidth: 180,
                        myStamp : "thelabletip",
                        height: 50,
                        baseCls : 'lablelablename'
                    }]
                },{
                    labelWidth: 80,
                    baseCls : '',
                    margin: 6,
                    layout : 'column',
                    columnWidth:.5,
                    filedType : 'Panel',
                    myStamp : 'theinputfileds',
                    items : [
                    ]
                },{
                    labelWidth: 80,
                    margin: 6,
                    sb: 'sssssssssssssssssssssssssssss',
                    layout : 'column',
                    columnWidth:.5,
                    filedType : 'Panel',
                    myStamp : 'theoutputfileds',
                    items : [
                    ]
                }]
         });


        var tabpanel = thepanel.tabpanel;
        var len = tabpanel.items.items.length;
        tabpanel.insert(len-1,re_panel);

        thepanel.doLayout();
        return re_panel;
    },

    __add_uploadfile_to_yulan : function( theform , dataArr , type){
        var me = this;

        if(!theform || !dataArr) return;

        if(type == "doc"){
            for(var i in dataArr){
                var thedocspanel = theform.queryBy(function(){
                    return (this.myStamp === 'theDocsHtList');
                });
                thedocspanel = thedocspanel[0];
                if(!thedocspanel){
                    thedocspanel = Ext.create( "ui.extend.base.Panel",{
                        title : '附件合同资料',
                        border : 0 ,
                        columnWidth :1 ,
                        myStamp : 'theDocsHtList',
                        layout : 'column',
                        items : []
                    });
                    theform.add(thedocspanel);
                }
                //console.log(thedocspanel);
                var tempp = me.__get_product_attrlist_panels(dataArr[i] , "docs");
                thedocspanel.add(tempp);
            }
            return ;
        }

        for(var i in dataArr){
            var extname = dataArr[i].attachment_name;
            extname = extname.split(".");
            extname = extname[extname.length-1];

            if($.inArray(extname , ["jpg","png","gif","jpeg","jpe","jfif"])>-1){
                var theimgpanel = theform.queryBy(function(){
                    return (this.myStamp === 'theImgsList');
                });
                theimgpanel = theimgpanel[0];
                if(!theimgpanel){
                    theimgpanel = Ext.create("ui.extend.base.Panel",{
                        title : '附件图片资料',
                        border : 0 ,
                        columnWidth :1 ,
                        myStamp : 'theImgsList',
                        layout : 'column',
                        items : []
                    });
                    theform.insert(0,theimgpanel);
                }
/*
                var temppanel = Ext.create("ui.extend.base.Panel",{
                    border : 0,
                    columnWidth :.25 ,
                    margin : 5,
                    items : [],
                    buttons : [{
                        text : '删除',
                        attid : dataArr[i].id,
                        handler : function(){
                            var btn = this;
                            me.$askYestNo({
                                msg: '确认删除吗?',
                                yes: function () {
                                    me.$requestAjax({
                                        url : me.$getConfig('urls').get('get.delProductAttachment').url,
                                        method : "POST",
                                        params : {id : btn.attid},
                                        scope  :	me,
                                        backParams: { } ,
                                        callback   :	function(response , backParams){
                                            //console.log(response.responseText);
                                            var param = Ext.decode(response.responseText);
                                            var father  = btn.ownerCt.ownerCt;
                                            father.hide(200,function(){
                                                father.destroy();
                                            });
                                            Ext.MessageBox.alert("删除成功",param.msg);
                                        }
                                    });
                                }
                            })
                        }
                    },{
                        text : '预览',
                        atturl : dataArr[i].attachment_url,
                        attname : dataArr[i].attachment_name,
                        handler : function(btn){
                            var winpar = me.$getConfig('initwindowparams');
                            Ext.apply(winpar , {
                                title : btn.attname + "-预览",
                                autoScroll : true,
                                items : [],
                                html : '<img src="'+ btn.atturl + '" style="width:100%;"/>'
                            });
                            var thewin = Ext.create("ui.extend.baseClass.baseWindow",winpar);

                            me.$addWinToDesktop(thewin);
                            if(startCommone) {
                                thewin.btnTo = startCommone.createBtn({
                                    winTo : thewin
                                });
                            }
                            thewin.setTitle( btn.attname + "-预览");
                            thewin.show();
                        }
                    }],
                    html : "<a href='javascript:;' class='theimga' style='position:relative;display:block;overflow:hidden;width:100%;height:160px;color:#777;'>" +
                                "<img style='width:100%;' src='"+dataArr[i].attachment_url+"'/>" +
                                "<font style='position:absolute;left:0px;bottom:0px;display:block;width:100%;text-align:center;'>"+
                                    dataArr[i].attachment_name +
                                "</font></a>"
                });
                */
                var temppanel = me._get_product_attrlist_img_panels(dataArr[i]);
                theimgpanel.add(temppanel);
            }else{
                var thedocpanel = theform.queryBy(function(){
                    return (this.myStamp == 'theDocsList');
                });
                thedocpanel = thedocpanel[0];
                if(!thedocpanel){
                    thedocpanel = Ext.create("ui.extend.base.Panel",{
                        title : '普通文档附件',
                        border : 0 ,
                        columnWidth :1 ,
                        myStamp : 'theDocsList',
                        layout : 'column',
                        items : []
                    });
                    theform.insert(0,thedocpanel);
                }

/*                var temppanel = Ext.create("ui.extend.base.Panel",{
                    border : 0,
                    columnWidth :1 ,
                    margin : 5,
                    layout : 'column',
                    items : [{
                        xtype : 'panel',
                        border : "0" ,
                        //baseCls : '',
                        columnWidth:.7 ,
                        items : [] ,
                        html :  "" +
                                "<div style='display:inline-block;font-size:18px;width:100%;height:40px;line-height:40px;padding-left:10px;'>"+ dataArr[i].attachment_name +"</div>"
                    },
                    {
                        xtype : 'button',
                        text : '下载',
                        columnWidth:.1 ,
                        margin : "0 5",
                        atturl : dataArr[i].attachment_url,
                        handler : function(){
                            window.open(this.atturl);
                        }
                    },
                    {
                        xtype : 'button',
                        text : '删除',
                        columnWidth:.1 ,
                        margin : "0 5",
                        attid : dataArr[i].id,
                        handler : function(){
                            var btn = this;
                            me.$askYestNo({
                                msg: '确认删除吗?',
                                yes: function () {
                                    me.$requestAjax({
                                        url : me.$getConfig('urls').get('get.delProductAttachment').url,
                                        method : "POST",
                                        params : {id : btn.attid},
                                        scope  :	me,
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
                    }]
                });
*/
                var temppanel = me.__get_product_attrlist_panels(dataArr[i]);
                thedocpanel.add(temppanel);
            }
        }

    },
/*SUBSUBSUBSUB*/
    __get_product_attrlist_panels : function(data , type){
        var me = this;
        if(!data) return;
        var temppanel = Ext.create("ui.extend.base.Panel",{
            border : 0,
            columnWidth :1 ,
            margin : 5,
            layout : 'column',
            items : [{
                xtype : 'panel',
                border : "0" ,
                //baseCls : '',
                columnWidth:.7 ,
                items : [] ,
                html :  "" +
                "<div style='display:inline-block;font-size:18px;width:100%;height:40px;line-height:40px;padding-left:10px;'>"+ data.attachment_name +"</div>"
            },
                {
                    xtype : 'button',
                    text : '下载',
                    columnWidth:.1 ,
                    margin : "0 5",
                    atturl : data.attachment_url,
                    handler : function(){
                        window.open(this.atturl);
                    }
                },
                {
                    xtype : 'button',
                    text : '删除',
                    columnWidth:.1 ,
                    hidden : me.$checkPms("attachments.delete")?false:true, //(type&&(type=='docs'))?true:false,
                    margin : "0 5",
                    attid : data.id,
                    handler : function(){
                        var btn = this;
                        me.$askYestNo({
                            msg: '确认删除吗?',
                            yes: function () {
                                me.$requestAjax({
                                    url : me.$getConfig('urls').get('get.delProductAttachment').url,
                                    method : "POST",
                                    params : {id : btn.attid},
                                    scope  :	me,
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
                }]
        });
        return temppanel;
    },

    _get_product_attrlist_img_panels : function(data){
        var me = this;
        if(!data) return;
        //alert(me.$checkPms("attachments.delete"));
        var temppanel = Ext.create("ui.extend.base.Panel",{
            border : 0,
            columnWidth :.25 ,
            margin : 5,
            items : [],
            buttons : [{
                text : '删除',
                attid : data.id,
                hidden : me.$checkPms("attachments.delete")?false:true,
                handler : function(){
                    var btn = this;
                    me.$askYestNo({
                        msg: '确认删除吗?',
                        yes: function () {
                            me.$requestAjax({
                                url : me.$getConfig('urls').get('get.delProductAttachment').url,
                                method : "POST",
                                params : {id : btn.attid},
                                scope  :	me,
                                backParams: { } ,
                                callback   :	function(response , backParams){
                                    //console.log(response.responseText);
                                    var param = Ext.decode(response.responseText);
                                    var father  = btn.ownerCt.ownerCt;
                                    father.hide(200,function(){
                                        father.destroy();
                                    });
                                    Ext.MessageBox.alert("删除成功",param.msg);
                                }
                            });
                        }
                    })
                }
            },{
                text : '预览',
                atturl : data.attachment_url,
                attname : data.attachment_name,
                handler : function(btn){
                    var winpar = me.$getConfig('initwindowparams');
                    Ext.apply(winpar , {
                        title : btn.attname + "-预览",
                        autoScroll : true,
                        items : [],
                        html : '<img src="'+ btn.atturl + '" style="width:100%;"/>'
                    });
                    var thewin = Ext.create("ui.extend.baseClass.baseWindow",winpar);

                    me.$addWinToDesktop(thewin);
                    if(startCommone) {
                        thewin.btnTo = startCommone.createBtn({
                            winTo : thewin
                        });
                    }
                    thewin.setTitle( btn.attname + "-预览");
                    thewin.show();
                }
            }],
            html : "<a href='javascript:;' class='theimga' style='position:relative;display:block;overflow:hidden;width:100%;height:160px;color:#777;'>" +
            "<img style='width:100%;' src='"+data.attachment_url+"'/>" +
            "<font style='position:absolute;left:0px;bottom:0px;display:block;width:100%;text-align:center;'>"+
            data.attachment_name +
            "</font></a>"
        });
        return temppanel;
    },

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
            'get.workplatform.view',
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
        //     'get.workplatform.view',
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
            'get.workplatform.view',
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

        if(field.name == "contacter" || field.name == "contact_tel"){
            me.$checkPms("product.content" ,function(flag){
                if(!flag){
                    if(field) me.$setFieldStyle(field , 'disabled');
                }
            });
        }
    },

    __check_list_btn_event : function(cfg ,record){
        if(cfg.pmsCode === 'workplatform.submit'){
            if(record.data.status >1 ) return false;
        }
        if(cfg.pmsCode === 'workplatform.edit'){
            if(record.data.status >1 ) return false;
        }
        if(cfg.pmsCode === 'workplatform.cancel'){
            if(record.data.status != 1 ) return false;
        }
        return true;
    }

});