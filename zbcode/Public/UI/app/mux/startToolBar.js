/**
 * Created by Administrator on 2016/1/4.
 */
// ;(function($, window, document,undefined) {
//     //定义构造函数
//     var StartToolBar = function(ele, opt) {
//         this.$element = ele,
//         this.defaults = {
//             'color': 'black',
//             'fontSize': '12px',
//             'textDecoration': 'none'
//         },
//         this.template="<div class='x-toolbar'><ul id='x-toolbar-ul'><li><div class='ux-start-button'>开始</div></li></ul></div>";
//         this.items=[];
//         this.options = $.extend({}, this.defaults, opt);
//     }
//     //定义方法
//     StartToolBar.prototype = {
//         createStartToolBar: function() {
        	
//             this.$element.append(this.template)
//         },
//         addToolBarItem:function(name,targetElement){
// 			this.itemTemplate="<li><div class='x-toolbar-item'>"+name+"</div></li>";

			
// 			$("#x-toolbar-ul").append(this.itemTemplate);
//         }
//     }
//     //在插件中使用对象
//     $.fn.startBarPlugin = function(options) {
//         //创建的实体
//         var startBar = new StartToolBar(this, options);
//         //调用其方法
//         return startBar;
//     }
// })(jQuery, window, document);

;(function(){
    var startToolBar = function(renderTo,opt){
        var selector="#"+renderTo;
        this.$element = $(selector);
        this.defaults = {
            'color': 'black',
            'fontSize': '12px',
            'textDecoration': 'none'
        };
        this.template="<div class='x-toolbar'><ul id='x-toolbar-ul'><li><div class='ux-start-button'>开始</div></li></ul></div>";
        this.items=[];
        this.options = $.extend({}, this.defaults, opt);
    }   
    startToolBar.prototype={
        createStartToolBar: function() {
            
            this.$element.append(this.template)
        },
        addToolBarItem:function(name,targetElement){
            this.itemTemplate="<li><div class='x-toolbar-item'>"+name+"</div></li>";

            
            $("#x-toolbar-ul").append(this.itemTemplate);
        }
    };
    window.startToolBar=startToolBar;
}());
