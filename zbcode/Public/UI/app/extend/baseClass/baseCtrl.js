/**
 * 所有子模块的控制器基类
 */
Ext.define('ui.extend.baseClass.baseCtrl', {
    extend: 'Ext.app.Controller',
    requires : [
        'ui.extend.base.Ajax'
    ],
    modelConf : {},
    constructor : function (cfg){
        //alert('father');
        var me = this;
        this.$checkPermissionsByConfig(function(){
            //console.log($ctrlPremission);
        },me);
        var params = cfg || {};
        Ext.apply(this,params);
        this.callParent(arguments);

        this.buttonsArray = []; //生成后的操作按钮数组
        this.fieldsArray = [];  //生成后的查询条件字段数组
        this.listBtnsArray = []; //生成后的条目操作按钮

    },

    init : function(){

    },

    $getButtonslist : Ext.emptyFn,  //获取操作按钮列表

    __mainview_render : Ext.emptyFn,  //主view的render事件处理

    __all_button_Event : Ext.emptyFn,  //所有按钮（ops ， listbtns）共同处理事件

    initLeftMenuPanle : Ext.emptyFn,//summary类型容器初始化左菜单
    initRightPanle : Ext.emptyFn,   //summary类型容器初始化右菜单

    $checkPermissionsByConfig : function(callback , scope){
        scope = scope?scope:this;
        var checkparams = [];
        var permissionCheckList = scope.$getConfig("permissionCheckList");
        var operationButtons = scope.$getConfig("operationButtons");
        var searchFileds = scope.$getConfig("searchFileds");
        var listOperationButtons = scope.$getConfig("listOperationButtons");
        var infoPanelButtons = scope.$getConfig("infoPanelButtons");
        var publicInfo = scope.$getConfig("_publicInfo");

        for(var i in permissionCheckList){
            if(isCheckPermissionCode(permissionCheckList[i])){
                checkparams.push(permissionCheckList[i].permissionCode);
            }
        }

        for(var i in operationButtons){
            if(isCheckPermissionCode(operationButtons[i])){
                checkparams.push(operationButtons[i].permissionCode);
            }
        }
        for(var i in searchFileds){
            if(isCheckPermissionCode(searchFileds[i])){
                checkparams.push(searchFileds[i].permissionCode);
            }
        }
        //console.log(listOperationButtons);
        for(var i in listOperationButtons){
            if(isCheckPermissionCode(listOperationButtons[i])){
                checkparams.push(listOperationButtons[i].permissionCode);
            }
        }
        for(var i in infoPanelButtons){
            if(isCheckPermissionCode(infoPanelButtons[i])){
                checkparams.push(infoPanelButtons[i].permissionCode);
            }
        }
        for(var i in publicInfo){
            if(isCheckPermissionCode(publicInfo[i])){
                checkparams.push(infoPanelButtons[i].permissionCode);
            }
        }
        for(var i in publicInfo.items){
            if(isCheckPermissionCode(publicInfo.items[i])){
                checkparams.push(publicInfo.items[i].permissionCode);
            }
        }
        if(checkparams.length<=0) return;

        scope.$requestAjax({
            url     :   "/Admin/Access/getUserPermission",
            method :	'POST',
            params :	Ext.encode(checkparams),
            backParams: {} ,
            callback   :	function(response , backParams){
                //console.log(response.responseText);
                var param = Ext.decode(response.responseText);
                if(!isDefined(param.status)){
                    if(typeof($ctrlPremission)==='undefined'){
                        $ctrlPremission = {}
                    }
                    for(var i in param){
                        var v = {};
                        v[checkparams[i]] =  param[i];
                        Ext.apply($ctrlPremission , v);
                    }
                }

                if(typeof(callback) === 'function'){
                    callback.call(scope);
                }
            }
        });

    },

//触发一个本对象方法，模拟事件触发
    $fireEvent : function(){
        var params = arguments[0];
        var paramsP = arguments[1];
        //事件值对象
        /*{ eventName : 事件名
        *   params : 参数,类型为 JSON{}
        *   callback :　fn 回调函数
        *  }
        * 1 : 事件名
        * 2 : 传递的参数
         */
        var getparams = null;
        if(typeof( params.eventName )!== 'undefined' && typeof(eval("this." + params.eventName )) === 'function'){

            if(typeof(eval("this."+ params.eventName )) !== 'undefined'){
                getparams =this[params.eventName].call(this,params.params , params.params);// eval(("this."+ params.eventName + "(params.params)"));
            }else if(this.ctrl){
                this.ctrl.$fireEvent(arguments);
            }else{
                Ext.MessageBox.alert('事件调入失败' , "找不到相应的事件配置！");
                return;
            }

            if(typeof(params.callback) == 'function'){
                Ext.apply( params ,{ retobj : getparams} ); //默认返回给回调函数 方法的返回数据（放在retobj里）
                params.callback(params);
            }
        }
    },

    $test : function(s){
        alert(s);
    },

    $ctrlPremission : {},  //权限控制表
    //获取config的配置项
    $getConfig : function(str){
        var obj = this.$getConfigObj();
        if(typeof(str) == 'undefined'){
            return obj?obj:{};
        }else if(typeof(str) == 'string'){
            return typeof(obj[str])==='undefined'?{}:obj[str];
        }else {
            return {};
        }
    },
    //获取config 对象
    $getConfigObj : function(){
        return this.modelConf?this.modelConf:null;
    },

    $getComsByAlias : function(alias){
        if(typeof(alias) == 'undefined' || alias == '') return null;

    },

    $askYestNo : function(params){
        var theparams = {
            title: '询问',
            msg: '确定删除吗？',
            fn: function(btn){
                if(btn == 'yes' && typeof(params['yes']) === 'function'){
                    params['yes']();
                }else if(btn == 'no' && typeof(params['no']) === 'function'){
                    params['no']();
                }
            },
            icon: Ext.Msg.QUESTION,
            buttons: Ext.Msg.YESNO
        };
        Ext.apply(theparams , params);

        Ext.Msg.show(theparams);
    },
    //通过权限代码检测用户权限
    $checkPms  : function(premissioncode , callback){
        var me = this;
        if(typeof($ctrlPremission)==='undefined'){
            $ctrlPremission = {};
        }
        //console.log(premissioncode + ":" + $ctrlPremission[String(premissioncode)]);
        if(!premissioncode) return true;
        var value = $ctrlPremission[String(premissioncode)];
        return typeof(value)==='undefined'?true:value;

        /*
        var perms = this.$ctrlPremission[String(premissioncode)];
        if(typeof(perms) === "undefined"){
            me.$requestAjax({
                url : "/Admin/Access/checkPermission",
                params : {"permission_code": premissioncode},
                method : "POST",
                callback  : function(response , backParams){
                    var param = Ext.decode(response.responseText);
                    var flag = false;
                    if(param.access_status == 1 ) flag = true;
                    me.$ctrlPremission[String(premissioncode)] = flag;
                }
            });
            //this.$ctrlPremission[String(premissioncode)] = true;
        }
        if(typeof(callback) === 'function'){
            callback.call(me,this.$ctrlPremission[premissioncode])
        }
        return this.$ctrlPremission[premissioncode];
        */
    },
    //返回生成好的按钮列表
    $getButtonListArray : function (){
        return this.buttonsArray?this.buttonsArray:[];
    },
    //返回生成好的按钮列表
    $getFeildListArray : function (){
        return this.fieldsArray?this.fieldsArray:[];
    },
    //所有模块调入默认方法
    openManager : function(params){
        //alert(Ext.encode(this.confs.initwindowparams));
        //var params = arguments[0];
        var me = this;
        var winparams = this.$getConfig('initwindowparams');
        var smallIcon = params.node.data.iconcls + "-win";
        Ext.apply(winparams,{
            title : params.node.data.name ,
            iconCls : smallIcon ,
            node : params.node,
            header : false
        });
        var groupstr = params.node.data.group?params.node.data.group+".":"";

        var viewpanel = Ext.create('ui.view.'+ groupstr + params.node.data.module+'.'+params.node.data.module+'View', { ctrl : this , node : params.node});
        if(typeof(me.__mainview_render) === 'function'){
            viewpanel.on('render',function(view){
                me.__mainview_render.call(me,view);
            });
        }
        me.$addEventFromViewsGrid(viewpanel);

        this.$view = viewpanel;//指向view
        return viewpanel;

    },
    //为view的默认grid添加一些必要事件  右键及双击
    $addEventFromViewsGrid : function(viewpanel){
        var me = this;
        if(typeof(viewpanel.getGridPanel) === 'function'){
            var grid = viewpanel.getGridPanel();
            if(grid){
                grid.on({
                    rowcontextmenu: function(grid,record, htm , rowIndex ,e){
                        e.stopEvent();
                        //alert('ddd');
                        e.preventDefault(); //覆盖默认右键
                        this.$gridRightMenuInit.call(me,grid,record,e);
                    },
                    rowdblclick : function(grid, record, htm , rowIndex , e){
                        e.stopEvent();
                        e.preventDefault(); //覆盖默认
                        var modelCode = this.$getConfig('modelCode');
                        var postParam = this.$getConfig('listOperationButtons');
                        var obj = this.$findArrayObjectParams(postParam , 'pmsCode' , modelCode + ".view");
                        if(obj){
                            var params = this.$getRecKeyToParams(obj.recKey , record.data);
                            if(typeof(this["__"+modelCode + "$view"]) === 'function'){
                                this["__"+modelCode + "$view"].call(this,{pmsCode : modelCode + ".view" } ,params );
                            }
                        }
                    },
                    scope: me // Important. Ensure "this" is correct during handler execution
                });
            }
        }
    },
    //从recKey 列表，提取record中的数据，以供提交
    $getRecKeyToParams : function(recKeyList , record){
        var params = {};
        if(recKeyList instanceof Array){
            for(var i=0; i< recKeyList.length ; i++){
                params[recKeyList[i]] = record[recKeyList[i]];
            }
        }
        return params;
    },
    //从一个对象数组中，查找某域的值，返回第一个契合对象
    $findArrayObjectParams : function( list ,key , value){
        if(list instanceof Array){
            for(var i=0 ; i<list.length ; i++){
                if(list[i][key] === value){
                    return list[i];
                }
            }
        }
        return false;
    },
    //将window加入桌面环境
    $addWinToDesktop : function(win){
        if(win){
            var deskcenter = Ext.getCmp("mainDeskCenter");
            deskcenter.add(win);
        }
        return win;
    },
    //code : 权限代码
    //panel ： 需要再入的panel
    // params : 窗口参数
    $getNewInfoWindow : function(params){
        var winparams = {
            title : '',
            minHeight : 300,
            minWidth : 300,
            resize : true,
            constrain :false,
            maximizable : true,
            minimizable : true,
            width: ( window.screen.availWidth-400),
            height : (window.screen.availHeight-200),
            iconCls: 'accordion',
            animCollapse: false,
            bodyBorder: Ext.themeName !== 'neptune'};
        Ext.apply(winparams , params);
        Ext.apply(winparams , {
            iconCls : this.$getSubWindowIconCls('view'),
            minimizable : false
        });
        var win = Ext.create('ui.extend.baseClass.baseWindow',winparams);
        return win;
    },
    //处理查询字段数据,  在子类中实现
    $chuliSearchParams : function(params){
        return params;
    },
    //数据
    $getView : function(){
        return this.$view;
    },

    $searchDataList : function(btn,me){
        var clickstr = btn.clickFn;
        if(clickstr && typeof(eval("(me."+ clickstr +")"))== 'function'){
            eval("(me."+ clickstr +"(btn,me))");
        }else{
            me.$defaultSearchFn(btn,me);
        }
    },
    //默认条件查询方法
    $defaultSearchFn : function(btn,me){
        var form = me.$getView().getFormPanel(); //Ext.getCmp(params.formid);
        var grid = me.$getView().getGridPanel();

        if(!form || !grid){
            Ext.MessageBox.alert('查询失败','找不到必要组件信息！');
            return false;
        }

        var data = form.getForm().getFieldValues();
        data = me.$chuliSearchParams(data);

        grid.getStore().load({params : data});  //待实现传参load
    },
    //初始化操作按钮 放入 this.buttonsArray

    delete$initButtons : function (){
        var me  = this;
        var buttonslist = this.$getConfig('operationButtons');
        var buttonArray = [];
        for(var i=0 ; i < buttonslist.length ; i++){
            if(!isCheckPermissionCode(buttonslist[i]) || (isCheckPermissionCode(buttonslist[i]) && me.$checkPms(buttonslist[i].permissionCode))){
                var btncfg = buttonslist[i];
                if(i>0 && !btncfg.margin){
                    Ext.apply(btncfg,{margin : '0 0 0 15'});
                }
                var btn = Ext.create('Ext.Button',btncfg);
                buttonArray.push(btn);
            }
        }
        me.$buttonsAddEvents(buttonArray);
    },
    delete$initFieldList : function (){
        var me  = this;
        var fieldlist = this.$getConfig('searchFileds');

        for(var i=0 ; i < fieldlist.length ; i++){
            if(fieldlist[i].pmsCode !== '' && fieldlist[i].checkpms==1 ){
                if(!this.$checkPms.call(
                        me,
                        fieldlist[i].checkPms?fieldlist[i].checkPms:fieldlist[i].pmsCode
                    )) continue; //如果无权限，则跳过
            }

            var fieldcfg = fieldlist[i];

            if(i>0 && !fieldcfg.margin){
                Ext.apply(fieldcfg,{margin : '0 0 0 10'});
            }

            Ext.apply(fieldcfg,{ labelAlign : 'right'}); //所有字段默认配置加入
            if(fieldcfg.submitBtn){
                Ext.apply( fieldcfg, {  handler : function(b){
                    me.$searchDataList(b ,me);
                    }
                });
            }

            var field  = Ext.create( fieldcfg.fieldtype ,fieldcfg);

            this.fieldsArray.push(field);
        }
    },
    delete$buttonsAddEvents :function(buttonArray){ //在此处定义按钮的 事件
        var me = this;
        var btnlist  = buttonArray?buttonArray:this.buttonsArray;
        //alert(btnlist.length);
        if(btnlist.length<=0) {
            me.$getView();
        }
        $MY.forEach( btnlist , function(btn){
            var pmscode = btn.pmsCode;
            pmscode = pmscode.replace(/\./, "$");

            if(typeof(me['__all_button_Event']) === 'function'){
                btn.on('click',function(){
                    me['__all_button_Event'].call(me,btn,btn.pmsCode);
                })
            };
            if(typeof(eval("(me.__"+pmscode+")")) === 'function'){
                btn.on('click',function(){
                    eval("(me.__"+ pmscode +".call(me,btn,btn.pmsCode))");
                })
            }else{
                btn.on('click',me.__);
            }
        } );
/*        btnlist.forEach(function(btn){
            var pmscode = btn.pmsCode;
            pmscode = pmscode.replace(/\./, "$");

            if(typeof(me['__all_button_Event']) === 'function'){
                btn.on('click',function(){
                    me['__all_button_Event'].call(me,btn,btn.pmsCode);
                })
            };
            if(typeof(eval("(me.__"+pmscode+")")) === 'function'){
                btn.on('click',function(){
                    eval("(me.__"+ pmscode +".call(me,btn,btn.pmsCode))");
                })
            }else{
                btn.on('click',me.__);
            }
        })*/
    },

    $initListBtnEvents : function( store , thispanel , ctrl ){
        var me = ctrl;
        var paneldom = $("#"+$(Ext.getDom(thispanel)).attr('id')+'-body');
        //alert($(paneldom).find('a.grid-list-operation-btns').length);return;
        $(paneldom).find('a.grid-list-operation-btns').unbind('click').click(function(){
            if($(this).hasClass("grid-list-operation-btns-disable")){
                return;
            }
            var pmsCode = $(this).attr('pmscode');
            var params = $(this).attr('params');
            //params = Ext.decode(params);
            pmsCode = pmsCode.replace(/\./, "$");

            if(typeof(me['__all_button_Event']) === 'function'){
                me['__all_button_Event'].call(me,this,eval("("+params+")"));
            };
            if(typeof(eval("(me.__"+ pmsCode +")")) === 'function'){
                eval("(me.__"+ pmsCode +".call(me,this,"+params+"))");
            }else{
                Ext.MessageBox.alert('调入失败',"未能找到事件配置！");
            }
        });
           // }
    },

    $fireGridLoadList : function(){
        for(var i in this.fieldsArray){
            if(this.fieldsArray[i].submitBtn){
                this.fieldsArray[i].fireEvent('click');
            }
        }
    },

    $getListOperationBtns : function(v,p,record , me){
        var listButtons = this.$getConfig('listOperationButtons');
        var str = "";
        $MY.forEach(listButtons , function(cfg){
            if(!isCheckPermissionCode( cfg ) || (isCheckPermissionCode( cfg ) && me.$checkPms( cfg.permissionCode ))){
                var recKeys = cfg.recKey;
                var params = {};
                var disable = "";
                if(typeof(me['__check_list_btn_event']) === 'function'){
                    if( !me['__check_list_btn_event'].call(me,cfg ,record)){
                        disable = "grid-list-operation-btns-disable";
                    }
                }
                for(var i=0 ; i<recKeys.length ; i++ ){
                    params[recKeys[i]] = record.data[recKeys[i]];
                }
                str +=  "<a href='javascript:;' pmscode='"+  cfg.pmsCode  +"'  params='"+  Ext.encode(params) +"' class='grid-list-operation-btns "+disable+"'>"+cfg.text+"</a>";
            }
        });
/*        listButtons.forEach(function(cfg){
            if(!isCheckPermissionCode( cfg ) || (isCheckPermissionCode( cfg ) && me.$checkPms( cfg.permissionCode ))){
                var recKeys = cfg.recKey;
                var params = {};
                var disable = "";
                if(typeof(me['__check_list_btn_event']) === 'function'){
                    if( !me['__check_list_btn_event'].call(me,cfg ,record)){
                        disable = "grid-list-operation-btns-disable";
                    }
                }
                for(var i=0 ; i<recKeys.length ; i++ ){
                    params[recKeys[i]] = record.data[recKeys[i]];
                }
                str +=  "<a href='javascript:;' pmscode='"+  cfg.pmsCode  +"'  params='"+  Ext.encode(params) +"' class='grid-list-operation-btns "+disable+"'>"+cfg.text+"</a>";
            }
        });*/
        return str;
    },

    $gridRightMenuInit : function(grid,record,e){
        var me = this;
        var gridMenuList = [];
        gridMenuList = gridMenuList.concat(this.$getConfig('gridRightMenuConf'));

        gridMenuList.push('-');
        gridMenuList = gridMenuList.concat(this.$getConfig('listOperationButtons'));

        var theLastList = [];
        $MY.forEach( gridMenuList , function(re){
            //alert(typeof(me.__check_list_btn_event));
            if(typeof(me.__check_list_btn_event) === 'function' ){
                if(me.__check_list_btn_event.call(me,re ,record)){
                    theLastList.push(re);
                }
            }else{
                theLastList.push(re);
            }
        });
/*        gridMenuList.forEach(function(re){
            //alert(typeof(me.__check_list_btn_event));
            if(typeof(me.__check_list_btn_event) === 'function' ){
                if(me.__check_list_btn_event.call(me,re ,record)){
                    theLastList.push(re);
                }
            }else{
                theLastList.push(re);
            }
        });*/
        if (theLastList.length>0){
            if(grid.menu){
                grid.menu = null;
            }
            var thegridmenulist = [];
            for(var i in theLastList){
                if(!isCheckPermissionCode( theLastList[i] ) || (isCheckPermissionCode( theLastList[i] ) && me.$checkPms( theLastList[i].permissionCode ))){
                    thegridmenulist.push(theLastList[i]);
                }
            }
            //console.log(thegridmenulist);
            grid.menu = new Ext.menu.Menu({
                items : thegridmenulist,
                listeners : {
                    'click' : function(e , item , c , d){
                        if(!item.pmsCode) return;
                        var pmsCode  = item.pmsCode;
                        var paramsKeys  = item.recKey;
                        pmsCode = pmsCode.replace(/\./, "$");

                        if(pmsCode === 'refresh'){
                            me.$reloadGrid(grid);
                        }else {
                            //console.log(grid.getSelectionModel());
                            var clickrecord = grid.getSelectionModel().getSelection();
                            var paramsArr = [];
                            for(var k=0 ; k<clickrecord.length; k++){
                                var params = {};
                                for(var i=0 ; i<paramsKeys.length; i++){
                                    params[paramsKeys[i]] = clickrecord[0].data[paramsKeys[i]];
                                }
                                paramsArr.push(params);
                            }

                            var toparam = paramsArr.length===1?paramsArr[0]:paramsArr;
                            if(typeof(me['__all_button_Event']) === 'function'){
                                me['__all_button_Event'].call(me,item,toparam);
                            };

                            if(typeof(eval("(me.__"+ pmsCode +")")) === 'function'){
                                eval("(me.__"+ pmsCode +".call(me,item,"+ Ext.encode(toparam)+"))");
                            }else{
                                Ext.MessageBox.alert('调入失败',"未能找到事件配置！");
                            }
                        }
                    }
                }
            });
        };
        grid.menu.showAt(e.getXY());
    },

    $reloadGrid : function(grid){
        var store = grid.getStore();
        if(store) store.reload();
    },
    /**
     * 获取一个表单的数据列表
     * 传参为自定义封装好的form*/
    $getFormsParams : function(theform){
        var params = {};
        if(typeof(theform.getParams) === 'function'){
            params = theform.getParams();
        }else{
            var formlist = theform.getFormsList();
            var tmp = null;
            for(var i=0 ; i<formlist.length; i++){
                if(typeof(formlist[i].getForm) === 'function') {
                    tmp = formlist[i].getForm().getFieldValues();
                    Ext.apply(params,tmp);
                }
            }
        }
        return params;
    },
    //获取子窗体的icon定义
    $getSubWindowIconCls : function(){
        return this.$getConfig('infoIconCls').view?this.$getConfig('infoIconCls').view:this.$getConfig('infoIconCls');
    },
//配置功能按钮功能  对应Conf类中定义的operationButtons > pmsCode { text : '新增角色+' , pmsCode : 'role.add' }
//‘.’替换为 $  , 方法名前 加 '__'
    __ : function(btn){
        Ext.MessageBox.alert('运行错误',"未找到'"+btn.pmsCode+"'相应的功能配置")
    },

    $checkNode : function(nodeModule){  //检查node是否属于当前用户
        return true;  //未实现
    },

    $summaryNodesList : [],
    //$summaryNodesPanels : [], //生成后的panel对象
    //以下，summary类型容器的菜单项 返回html
    $getSummaryMenusHtml : function( summarypanel){
        var me = this;
        var modelsList = this.$getConfigObj().$getModelsListArr();
        me.$summaryNodesList = [];
        var nodeData = summarypanel.node.data;
        var nodelist = me.$getSummaryNodesListById(nodeData.node_id);

        var modelsList = nodelist?nodelist:[] ;
        var htmlstr = "<div class='summary-left-menu-bg'>";
        var tmpstr = "";
        $MY.forEach(modelsList ,function(node){
            if(me.$checkNode(node.module)){
                me.$summaryNodesList.push(node);
                tmpstr += [
                    "<a href='javascript:;' group='" + node.group + "'  module='" + node.module + "' class='left-menu-div'>",
                    "<span class='", node.iconcls ,"-win left-menu-icon'>",
                    "</span>",
                    "<span>",
                    node.name,
                    "</span>",
                    "</a>"
                ].join("");
            }
        });
/*        modelsList.forEach(function(node){
            if(me.$checkNode(node.module)){
                me.$summaryNodesList.push(node);
                tmpstr += [
                    "<a href='javascript:;' group='" + node.group + "'  module='" + node.module + "' class='left-menu-div'>",
                    "<span class='", node.iconcls ,"-win left-menu-icon'>",
                    "</span>",
                    "<span>",
                    node.name,
                    "</span>",
                    "</a>"
                ].join("");
            }
        });*/
        htmlstr += tmpstr;
        htmlstr += "</div>";
        return htmlstr;
    },

    $getSummaryNodesListById : function(nodeid){
        var me = this;
        if(!nodeid) return;

        var recordes = [];
        for(var i in $TheUserNodeListRecord){
            if($TheUserNodeListRecord[i].data.node_id == nodeid){
                // console.log($TheUserNodeListRecord[i].data.child);
                return $TheUserNodeListRecord[i].data.child ;
            }
        }
        return recordes;
/*
        me.$requestAjax({
            url : "/Admin/Access/getUserDownNodeList",
            method :	'POST',
            params :	{ node_id : nodeid },
            scope  :	me,
            backParams:	{},
            callback   :	function(response , backParams){
                //console.log(response.responseText);
                var param = Ext.decode(response.responseText);
                if(typeof(callback) === 'function'){
                    callback.call(me , param);
                }
            }
        });
*/
    },

    $getModuleByNode : function(node,callback){
        var me = this;
        var groupstr = node.group?node.group+".":"";  //指定模块目录
        var clsname = "ui.ctrl." + groupstr + node.module + "." + node.module +"Ctrl";

        var Panel;
        Ext.Loader.require([
            clsname
        ],function(d){
            var modelX = Ext.create(clsname , {ctrl : me});
            //此处调用模块的相应事件方法
            modelX.$fireEvent({
                eventName :  'openManager',
                params :　{node : {data:node} },
                callback : function(p){
                    var Panel = p.retobj;
                    if(typeof(callback) == 'function'){
                        callback(Panel);
                    }
                }
            });
        },this);
        return Panel;
    },

//summary类型容器，初始化左边菜单项
    $initLeftMenuPanle : function(e){
        var me = this;
        //获取到panel内的html 元素  $("#"+$(Ext.getDom(e)).attr('id')+'-innerCt') : 容器本身
        var modelsList = me.$summaryNodesList;

        var rongqi = $("#"+$(Ext.getDom(e)).attr('id')+'-innerCt');
        $(rongqi).find('.summary-left-menu-bg .left-menu-div').click(function(){  //jquery
            var thea = this;
            if($(thea).hasClass('menu-checked')) return;
            var group = $(this).attr('group');
            var module = $(this).attr('module');
            var Panel = null; var i=0, flag = false;
            $MY.forEach(me.$summaryNodesList , function(node){
                if(flag) return;
                if(group == node.group && module == node.module){
                    /*                  me.$getModuleByNode(node,function(panel){
                     if(me.$view) {
                     me.$view.rightpanel.removeAll();
                     me.$view.rightpanel.add(panel);
                     me.$view.rightpanel.doLayout();
                     $(thea).addClass('menu-checked').siblings().removeClass('menu-checked');
                     }
                     });*/
                    flag = true;
                    me.$summaryLoadModule(i,me);
                }
                i++;
            })
            /*
            me.$summaryNodesList.forEach(function(node){
                if(flag) return;
                if(group == node.group && module == node.module){
/-*                  me.$getModuleByNode(node,function(panel){
                        if(me.$view) {
                            me.$view.rightpanel.removeAll();
                            me.$view.rightpanel.add(panel);
                            me.$view.rightpanel.doLayout();
                            $(thea).addClass('menu-checked').siblings().removeClass('menu-checked');
                        }
                    });*-/
                    flag = true;
                    me.$summaryLoadModule(i,me);
                }
                i++;
            }) */
        });
    },

    $initRightPanle : function(e){

    },
    //调入对应index模块
    $summaryLoadModule : function(){
        var param = arguments[0];
        var mectrl = arguments[1];
        var me = mectrl;
        var nodes = me.$summaryNodesList;
        var node = null, index=0;
        if(typeof(param) == 'undefined'){
            return false;
        }else if(typeof(param) == 'string'){
            $MY.forEach(nodes , function(N){
                if (node) return;
                index++;
                if(N.module == str){
                    node = N;
                }
            } )
           /* nodes.forEach(function(N){
                if (node) return;
                index++;
                if(N.module == str){
                    node = N;
                }
            });*/
        }else if(typeof(param) ==  "number"){
            node = nodes[parseInt(param)];
            index = parseInt(param);
        }

        var leftpanel = me.$view.leftPanel;
        var rongqi = $("#"+$(Ext.getDom(leftpanel)).attr('id')+'-innerCt');
        var thea = $(rongqi).find('.summary-left-menu-bg .left-menu-div').eq(index);
        //alert($(rongqi).attr('id'));
        if(node){
            me.$getModuleByNode(node , function(panel){
                if(me.$getView()){
                    me.$getView().rightpanel.removeAll();
                    me.$getView().rightpanel.add(panel);
                    me.$getView().rightpanel.doLayout();
                    if(me.$getView().ownerCt) me.$getView().ownerCt.setTitle(node.name);
                    $(thea).addClass('menu-checked').siblings().removeClass('menu-checked');
                }
            });
        }
    },

    //根据请求类型，从config中获取字段定义，并生成组件及界面
    $getInfoForms : function(type){
        var me  = this;
        var config = this.$getConfigObj();
        var formConfig = [];
        if(typeof(config['_'+type + 'Info']) !== 'undefined'){
            formConfig = formConfig.concat(config['_'+type + 'Info']);
        }
        if(typeof(config['_publicInfo']) !== 'undefined'){
            for(var k in config['_publicInfo']){
                if(!isCheckPermissionCode(config['_publicInfo'][k]) || (isCheckPermissionCode(config['_publicInfo'][k]) && me.$checkPms(config['_publicInfo'][k].permissionCode))){
                    var flag = true;
                }else{
                    var flag = false;
                }
                if(!flag) continue;//如果检测权限不通过

                if( typeof(config['_publicInfo'][k]['typeMode']) === 'undefined' ){
                    formConfig = formConfig.concat(config['_publicInfo'][k]);
                }else{
                    var flags = false;
                    for(var i in config['_publicInfo'][k]['typeMode']){
                        if(type === config['_publicInfo'][k]['typeMode'][i]) flags = true;
                    }
                    if(flags) formConfig = formConfig.concat(config['_publicInfo'][k]);
                }
            }
        }
        var theForms = [];
        for(var i=0 ; i < formConfig.length ; i++){
            var fc = {};
            Ext.apply(fc, formConfig[i]);
            fc.items = [];
            var theform = me.$createTabFormPanelByConfig(fc , type , function(){

            });
            if(!theform) continue;
            var filedList = [];
            for(var j=0 ; j<formConfig[i].items.length ; j++){
                //alert(formConfig[i].items[j]);
                if(!isCheckPermissionCode(formConfig[i].items[j]) || (isCheckPermissionCode(formConfig[i].items[j]) && me.$checkPms(formConfig[i].items[j].permissionCode))){
                    var flag = true;
                }else{
                    var flag = false;
                }
                if(!flag) continue;

                me.$createFiledByConfig(formConfig[i].items[j] , type , function(filed){
                    //console.log(filed);
                    if(filed){
                        filedList.push(filed);
                        theform.add(filed);
                        theform.doLayout();
                    }
                },theform);
            }
            theform.fieldList = filedList; //将form中所有字段组合成arr，并引用
            if(typeof(eval("(me.__"+type+"_render)")) === 'function'){
                eval("(theform.on('render' , me.__"+type+"_sub_render))");
            }
            theForms.push(theform);
        }

        return theForms;
    },

    $checkValid : function(thepanel){
        var flag = true;
        if(thepanel.formsList && thepanel.formsList.length){
            for(var i=0 ; i < thepanel.formsList.length ; i++){
                if(!thepanel.formsList[i].getForm) continue;
                if(thepanel.isVisible()){
                    if(!thepanel.formsList[i].getForm().isValid()) flag = false;
                }
            }
        }
        return flag;
    },

    $createTabFormPanelByConfig : function(params , type ,callback ,theform){
        var me = this;
        var configObj = me.$getConfigObj();
        if(!isCheckPermissionCode( params ) || (isCheckPermissionCode( params ) && me.$checkPms( params.permissionCode ))){
            for(var key in params){
                if(typeof(params[key]) === 'string'){
                    str = params[key];
                    resout = str.match("\{\{(.*)\}\}");
                    if(resout && resout.length>0){
                        //alert(resout);
                        if(typeof(configObj[resout[1]]) === 'function'){
                            params[key] =  configObj[resout[1]].call(configObj , key , params , type);
                        }
                    }
                }
            }
            return Ext.create('ui.extend.base.Form',params);
        }
        return null;
    },
    $createFiledByConfig : function(params , type ,callback ,theform){
        //判断字段权限
        var me = this;
        if(typeof(params) === 'string'){
            var theconf = me.$getConfigObj();
            if(typeof(theconf[params]) === 'function'){
                params = theconf[params].call(theconf);
            }else{
                return false;
            }
        }
        if(!isCheckPermissionCode( params ) || (isCheckPermissionCode( params ) && me.$checkPms( params.permissionCode ))){
            var filedType = params.filedType;
            var fieldClassNameArr = this.$getConfig('fieldClassNameArr');

            me.$updataTempletByParams(params , theform);
//console.log(params);
            var classstr = fieldClassNameArr[filedType];
            if(typeof(classstr) === 'undefined'){
                classstr = params.comsType;
            }
            if(typeof(classstr)==='undefined') return;
            Ext.apply(params,{ctrl : me , optype : type });
            //Ext.apply(params,{optype : type});

            Ext.require([
                classstr
            ],function(){
                var theconfig = me.$getConfigObj();
                var field = Ext.create(classstr, params);
                //如果对象创建后有处理方法定义，则执行
                if(typeof(params['alreadyCreate'])!== 'undefined' && typeof(theconfig[params['alreadyCreate']])==='function'){
                    theconfig[params['alreadyCreate']].call(theconfig , field);
                }
                if(me["__all_fieldinit"] === 'function'){
                    me["__all_fieldinit"].call(me,field , type  ,theform ,params);
                }
                if(typeof(eval("(me.__"+ type +"_fieldinit)")) === 'function'){
                    eval("(me.__"+ type +"_fieldinit(field , type , theform ,params))");
                }
                if(typeof(callback === 'function')){
                    callback(field);
                }
            });
        }
/*
        if(typeof(params.pmsCode)!='undefined' &&  params.pmsCode!= ''){
            if(!this.$checkPms(params.checkPms?params.checkPms:params.pmsCode)) return;
        }*/
        //根据字段配置类型生成组件

    },

    $addWindowToFather : function(win){
        var me = this;
        if(me.$view && this.$view.ownerCt){
            me.$view.ownerCt.add(win);
        }else{
            me.$addWinToDesktop(win);
        }
    },

    //通过类型获取optionpanle
    /*ptype 子窗操作类型
    * params 请求数据所需要的参数
    * callback 子窗开启后回调处理
    * winparams 子窗参数配置
    */
    $showOptionsPanel : function(optype , params , callback , winparams){
        var me = this;
        params = params || {};
        var pmsCode = params['pmsCode'];
        if(typeof(optype) === 'undefined') return null;

        var modelCode = this.$getConfig('modelCode');
        var groupCode = this.$getConfig('groupCode');
        groupCode = groupCode?groupCode+'.':"";
        var classstr = 'ui.view.'+ groupCode + modelCode + ".Coms."  + optype +"Panel";
        Ext.require([
            classstr
        ],function(){
            var panel = Ext.create(classstr,{
                region:'center',
                ctrl : me,
                optype : optype, //信息窗类型
                myData : params
            });

            if( typeof(me["__all_main_render"]) === 'function' ){
                panel.on('render' , function(){
                    var fn = me["__all_main_render"];
                    fn.call(me , this);
                });
            }
            if( typeof(me["__all_before_main_render"]) === 'function' ){
                panel.on('render' , function(){
                    var fn = me["__all_before_main_render"];
                    fn.call(me , this);
                });
            }
            //alert(typeof(me.ctrl["__" + (this.opType) + "_main_render"]));
            if( typeof(me["__" + (optype) + "_main_render"]) === 'function' ){
                panel.on('render' , function(){
                    var fn = me["__" + (optype) + "_main_render"];
                    fn.call(me , this);
                });
            }

            if( typeof(me["__all_after_main_render"]) === 'function' ){
                panel.on('render' , function(){
                    var fn = me["__all_after_main_render"];
                    fn.call(me , this);
                });
            }

            var topicname = me.$getConfig('topicalName');
            var prm = { width : 400,height: 450};
            var winparam = {};
            Ext.apply(winparam , me.$getConfig('_sub_win_defparams') || {} );
            Ext.apply(winparam , winparams?winparams:{});
            Ext.apply(prm ,winparam);
            Ext.apply(prm , {
                //header : false ,
                title : topicname + panel.opTitle,
                iconCls : me.$getConfig('infoIconCls')[optype]?me.$getConfig('infoIconCls')[optype]:'',
                pmsCode : pmsCode,
                items: [panel]
            });
            var win = me.$getNewInfoWindow(prm);
            me.$addWindowToFather(win);
            //me.$addWinToDesktop(win);
            win.show();

            if(typeof(callback) === 'function'){
                callback(panel , win);
            }
        });
    },

    //将optype 类型的panel进行配置组装
    /*
    * 功能： 生成config配置的按钮，添加到面板， 并赋值click事件
    * */
    $assembleInfoPanel : function(thePanel , optype){
        var me = this;
        thePanel.buttons = thePanel.buttons || [];
        thePanel.formsList = this.$getInfoForms(optype);
        thePanel.items = thePanel.formsList;

        var buttons = me.$getConfig('infoPanelButtons')[optype];
        if(!buttons) return;
//闭包问题superone
        for(var i=0 ; i<buttons.length ; i++){
            var btn = Ext.create('ui.extend.base.Button' , buttons[i]);
            var fnName = buttons[i]['fnName'];
            if(typeof(me['__'+optype+"Panel$"+fnName]) === 'function'){
                btn.on('click',function(btn){
                    var fnname = btn['fnName'];
                    var theFnName = '__'+optype+"Panel$"+fnname;
                    me[theFnName].call(me,btn,thePanel);
                });
            }else{
                btn.setText(btn.text+"[待实现]");
            }
            thePanel.buttons.splice(0,0,btn);
        }
        thePanel.on('render',function(){this.doLayout();});
    },

    /*从新调入grid的数据
    * */
    $reloadViewGrid : function(){
        var view = this.$getView();
        if(view && view.getGridPanel) view.getGridPanel().getStore().reload();
    },

    /*基础ajax请求方法;
     *
     * 通过配置项，请求url，并将数据传回回调函数
    * */
    $requestAjax : function(config){  //(url,params,method,scope,cbfn){		//同步ajax请求函数，config为空返回false，反之返回服务器返回的json对象
        var me = this;
        if (!config||!config.url||!config.method){
            Ext.MessageBox.alert("程序错误！","错误的参数传递！")
            return;
        }
        try{
            //alert(config.url);
            Ext.Ajax.request({
                url: config.url,
                params: config.params,
                method: config.method,
                scope : config.scope,
                timeout: 60000,
                callback: function(options, success, response){
                    if (success){
                        try{
                            var result = Ext.decode(response.responseText);
                        }catch(e){
                            Ext.MessageBox.alert("系统错误!","服务器忙或网络错误,请联系系统管理员！");
                            return;
                        }
                        if( result.status === 0 ){
                            Ext.MessageBox.alert("系统错误!", result.msg);
                        }else if( typeof(config.callback) === 'function'){
                            config.callback.call((config.scope?config.scope:me) , response ,  config.backParams);
                        }else if(config.callback==='getresponse'){
                            return response
                        }
                    }else{
                        Ext.MessageBox.alert("操作失败!","服务器忙或网络错误,请联系系统管理员！")		//错误处理
                    }
                }
            });
        }catch(e){
            Ext.MessageBox.alert("系统错误!","服务器忙或网络错误,请联系系统管理员！")
        }

    },
    /*
     *  ajax请求方法。
     *  将请求的数据 调入给定的form列表
     */
    $getUrlstrByUrlcode : function(urlCode){
        var me = this;
        var url = me.$getConfig('urls').get(urlCode);
        if(typeof(url) === 'undefined' || typeof(url.url) === 'undefined' ) return '';
        return  url.url;
    },

    $requestFromDataAjax : function(urlCode , params , thepanel , callback){
        var me = this;
        var url = me.$getConfig('urls').get(urlCode);
        if(typeof(url) === 'undefined' || typeof(url.url) === 'undefined' ) return;
        var urlstr = url.url;

        if(thepanel) thepanel.setLoading("调入数据中...");

        if( typeof(me["__all_post_before_main_event"]) === 'function' && thepanel){
            me["__all_post_before_main_event"].call(me,thepanel);
        }
        me.$requestAjax({
            url     :   urlstr,
            method :	'POST',
            params :	params,
            scope  :	me,
            backParams:	{},
            callback   :	function(response , backParams){
                //console.log(response.responseText);
                var param = Ext.decode(response.responseText);
                if(!thepanel && param.status !== 1){
                    Ext.MessageBox.alert('操作错误', param.msg);
                    return;
                }
                if(thepanel) thepanel.$postValue = param;

                me.$setDataToPanelForms.call(me, thepanel , param);

                if( typeof(me["__all_post_after_main_event"]) === 'function'  && thepanel){
                    me["__all_post_after_main_event"].call(me,thepanel);
                }


                if(typeof(callback) === 'function'){
                    callback.call(me,param);
                }
                if(thepanel) thepanel.setLoading(false);
            }
        });
    },

    //对信息面板逐个调入数据
    $setDataToPanelForms : function( thepanel , param){
        var me = this;
        if(thepanel && thepanel.isVisible && thepanel.isVisible()){
            if(thepanel.formsList && thepanel.formsList.length){
                for(var i=0 ; i < thepanel.formsList.length ; i++){
                    if(!thepanel.formsList[i].getForm) continue;
                    if(thepanel.isVisible()){
                        me.$setDataToForm.call(me,thepanel.formsList[i] , param );
                    }
                }
            }
        }
    },

    $setDataToForm : function( theform , param){

        var record = function(data){
            var m = this;
            this.data = data;
            this.getData = function(){
                return m.data;
            }
        }
        if(theform && theform.getForm){
            theform.getForm().loadRecord(new record(param));
        }
    },

    /*查找父类为 k - v 相符的容器*/
    $findFatherByFieldName : function(theone,option){
        if(!option) return null;
        var father = theone.ownerCt;
        var key ='', value = null;
        var tmparr = [];var flag = true;
        while(father){
            tmparr = [];
            for(var k in option){
                tmparr.push((father[k] === option[k]));
            }
            flag = true;
            for(k in tmparr){
                flag = (flag && tmparr[k]);
            }
            if(flag) {
                return father;
            }else{
                father = father.ownerCt;
            }
        }
        return null;
    },

    //获取数组中第一个元素，如果为对象则直接返回
    $getArrayOne : function(arr){
        if(arr instanceof Array){
            return arr[0];
        }else{
            return arr;
        }
    },

    $setFieldStyle : function(field , style){
        if(!field) return;
        var dom =Ext.getDom(field);
        var domid = $(dom).attr('id');
        if(style === 'readonly'){
            field.readOnly = true;
            field.on('render', function(f){
                //$("#"+ domid + "-inputEl").addClass('readonly-text-color');
                //f.addCls('readonly-text-color');
            })
        }else if(style === 'hidden'){
            field.hidden = true;
        }else if(style === 'disabled'){
            field.disabled = true;
            field.hidden = true;
        }else if(style === 'mustinput'){

        }
    },
    /*
    *  __xxx_fieldinit   field生成后进行初始化处理
    *  __xxx_render  form的render事件
    *
    * */

    $getGridSelections : function(){
        var me  = this;
        if(!me.$getView()) return [];
        if(!me.$getView().getGridPanel) return [];
        var grid = me.$getView().getGridPanel();
        var records = grid.getSelectionModel().getSelection();
        return records;
    },

    $updataTempletByParams : function(params , theform){
        //var re = new RegExp("/\{\{(*.)\}\}/");
        var me = this;
        var str = "", resout = null;
        for(var key in params){
            if(typeof(params[key]) === 'string'){
                str = params[key];
                resout = str.match("\{\{(.*)\}\}");
                if(resout && resout.length>0){
                    //alert(resout);
                    var configObj = me.$getConfigObj();
                    if(typeof(configObj[resout[1]]) === 'function'){
                        params[key] =  configObj[resout[1]].call(configObj , key , params , theform);
                    }
                }
            }
        }
    },

    //根据请求字段信息，动态生成字段信息
    $createFieldTrend : function(paramsArr , optype){
        if(!paramsArr) return;
        var filedArr = [];
        for(var i in paramsArr){
            if(!paramsArr[i].field_id && !parseInt(paramsArr[i].id) ) continue;
            var params = this.$getFieldBaseClassNameByType(paramsArr[i]);
            Ext.apply(params , {
                fieldLabel :paramsArr[i].field_name,
                field_id : paramsArr[i].field_id?paramsArr[i].field_id:paramsArr[i].id,
                field_name :paramsArr[i].field_name,
                labelWidth: 80,
                margin: 6 ,
                name : 'name' + paramsArr[i].id
            });
            if(paramsArr[i]['field_value']){
                Ext.apply(params ,{
                    value : paramsArr[i]['field_value']
                });
            }
            if(paramsArr[i]['product_id']){
                Ext.apply(params ,{
                    product_id : paramsArr[i]['product_id']
                });
            }

            if(optype){
                Ext.apply( params ,{
                    optype : optype
                });
            }

            var field = Ext.create(params['classNames'] , params);
            if(field) filedArr.push(field);
        }

        return filedArr;
    },
//从传参生成字段创建参数
    $getFieldBaseClassNameByType : function(pam){
        var me = this;
        var tpobj = { type : 'Text',columnWidth:1  };
        if(pam.field_type == 1){
            var tpobj = { type : 'Text' , columnWidth:.5};
        }else if(pam.field_type == 2){
            var tpobj = { type : 'TextArea' , columnWidth:1 ,height:80 ,border:1};
        }else if(pam.field_type == 3){
            var tpobj = { type : 'Radio' , columnWidth:1};
        }else if(pam.field_type == 4){
            var tpobj = { type : 'Checkbox' , columnWidth:1 };
        }else if(pam.field_type == 5){

            var field_optionArray= pam.field_option.split(',');
            var fieldStore=[];
            for(var j=0;j<field_optionArray.length;j++){
                fieldStore.push([field_optionArray[j]]);
            }
            var tpobj = {   type : 'ComboBox' ,
                            columnWidth :.5 ,
                            editable:false,
                            displayField:'field_option',
                            valueField:'field_option',
                            store : new Ext.data.ArrayStore({
                                fields  :   ['field_option'],
                                data  : fieldStore
                            })
            };
        }else{
            var tpobj = { type : 'Text' , columnWidth:.5};
        }
        var fieldClassNameArr = this.$getConfig('fieldClassNameArr');
        var param = Ext.apply(tpobj , {
            classNames : fieldClassNameArr[tpobj['type']]
        });

        return param;
    },
//动态生成的字段进行初始化处理
    $checkFieldInitfn : function(optype , filed){
        var me = this;
        if(typeof(me["__all_fieldinit"]) === 'function'){
            me["__all_fieldinit"].call(me,filed , optype );
        }
        if(typeof(me["__"+optype+"_fieldinit"]) === 'function'){
            me["__"+optype+"_fieldinit"].call(me,filed , optype );
        }
    },

    $getCtrlByModuleCode : function(module){
        if(!module) return null;
        if(typeof($$theCtrlList) === 'undefined') return null;

        var re = null;
        for(var i in $$theCtrlList){
            if($$theCtrlList[i].$getConfig('modelCode') === module){
                return $$theCtrlList[i];
            }
        }
        return re;
    },

    $createCtrlByClassName : function(classname , module){
        return Ext.create(classname , {ctrl : this});
        var thectrl = this.$getCtrlByModuleCode(module);
        if(!thectrl){
            thectrl = Ext.create(classname , {ctrl : this});
            if(typeof($$theCtrlList) === 'undefined'){
                $$theCtrlList = [thectrl];
            }else{
                $$theCtrlList.push(thectrl);
            }
        }

        return thectrl;
    },

    $fireModuleEvents : function(module , event , params){
        var me = this;
        var groupstr = "";  //指定模块目录
        var clsname = "ui.ctrl." + groupstr + module + "." + module +"Ctrl";
        var module = module;

        Ext.Loader.require([
            clsname
        ],function(d){
            var modelX = me.$createCtrlByClassName(clsname , module);
            if(!modelX) return;
            var themodule = modelX.$getConfig('modelCode');
            modelX.$fireEvent({
                eventName :  "__"+ themodule +'$'+event,
                params :　params ,
                callback : function(p){
                    //console.log(p);
                }
            });
        },this);
    }
});