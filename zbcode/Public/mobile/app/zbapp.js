$(function(){
    //alert(transStr2Key("/Public/mobile/app/pages/apphome/Public/mobile/app/pages/apphome/Public/mobile/app/pages/apphome/view.html/Public/mobile/app/pages/apphome/view.html"));
    var zbapp = new $M.app({
        pages : [{
            loads : {
                postData : {},		//初始请求数据时的参数

                remoteData : null,	//获得的数据  ..可在此定义静态数据
                remotedataUrl : "/Admin/Access/getUserNodeList", //远程获取数据的url

                templateUrl : "/Public/mobile/app/pages/apphome/page1/view.html",	//模板地址
                template : "",		//模板代码

                ctrljsUrl : "/Public/mobile/app/pages/apphome/page1/ctrl.js", 	//js地址
                ctrljs : '',		//js代码

                csscodeUrl : '/Public/mobile/app/pages/apphome/page1/css.css', 	//css地址
                csscode : ''		//css代码
            },
            style : 'background: url("/Public/mobile/images/login_bg.png") center bottom repeat-x #066DBA',
            elclass : '',
            width : this.elWidth,
            height : this.elHeight
        }]
    });
    window.App = window.zbapp = zbapp;
    $M.app_history_obj.initpages();

})

TIMESTAMP = Date.parse(new Date());
THE_MOBILE_PATH = "/Public/mobile";

SCREENWIDTH = window.screen.width;
SCREENHEIGHT = window.screen.height;