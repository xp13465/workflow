(function($){
    var ctrl = $M.ctrl.extend({
        init : function(){
            this._super.prototype.constructor.call(this,arguments);
            this._pagegation = 1;
        },
        __show_history__:function(el){
            var that = this;
            var h = $(window).height() - $('.Mheader').height();
            $('#search_result').height(h);
            // $('#search_result').html('');
            
            
        },
        __click__ : function(li){
            var parsm = this.__getParams(li);
            console.log(parsm);
            App.linkPage({
                loads : {
                    remotedataUrl : "/product/getProductInfo", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_platform/product_detail/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_platform/product_detail/ctrl.js",   //js地址
                    ctrls : ""
                },
                postData : {id : parsm.id}
            });
        },
        __click_search__ : function(b){
            this._pagegation = 1;
            $('#history_info').hide();
            $('#search_result').html('');
            var storage = window.localStorage;
            var arr = storage.getItem('zbsearch')?storage.getItem('zbsearch').split(','):[];
            var hasAttr = true;
            var flag = $('#search_text').val();
            if(!flag){
                $M.Message.alert('','输入框不能为空')
                return;
            }
            for(var i=0;i<arr.length;i++){
                if(arr[i] == flag){
                   hasAttr = false;
                }
            }
            if(hasAttr){
                arr.unshift(flag);
            }
            if(arr.length >= 5){
                arr = arr.slice(0,5);
            }
            storage.setItem('zbsearch',arr.join(","));
            this.__ajax_ele__(flag);
            
        },
        __focus__ :function(b){
            var that = this;
             $(b).val('');
             $('#history_info').show();
             $('#search_result').html('');
             var storage = window.localStorage;
             var arr = storage.getItem('zbsearch')?storage.getItem('zbsearch').split(','):[];
            if(arr.length == 0){
                 $('#history_info').hide();
            }else{
               var htmls =' <ul><div class="tit">历史记录</div>';
                for(var i=0;i<arr.length;i++){
                    htmls += "<li>" + arr[i] + "</li>"
                }
                htmls += '<div class="cen"><button class="clear_btn" id="clear_btn">清除浏览记录</button></div></ul>'
                $('#history_info').html(htmls);


                $('#clear_btn').click(function(){
                    storage.removeItem('zbsearch');
                    $('#history_info').hide();
                })
                $('#history_info').find('li').click(function(){
                    var text = $(this).text();
                    $('#history_info').hide();
                    $('#search_text').val(text);
                    that.__ajax_ele__(text);
                })
            }
        },
        __ajax_ele__:function(flag,page){
            $('#more').remove();
            var that = this;
            $M.Ajaxs({
                url:'/Admin/product/productQuickList',
                data:{
                    'keyword':flag,
                    'page':page||1,
                    'limit':10
                }
            },function(data){

                var items = data.items;
                var page = data.page;
                var total = Math.ceil(data.total/10);
                var html ='<ul>';
                var numbers = 0;
                for(var i=0;i<items.length;i++){
                    html += ' <li tap-event="click" params="{id:' + items[i].id + '}" ><dl>';
                    numbers = (page-1)*10+i+1
                    if(numbers == 1){
                        html += '   <dt class="number"><i class="i_one">'+((page-1)*10+i+1)+'</i></dt>';
                    }else if(numbers == 2){
                        html += '   <dt class="number"><i class="i_two">'+((page-1)*10+i+1)+'</i></dt>';
                    }else if(numbers == 3){
                        html += '   <dt class="number"><i class="i_three">'+((page-1)*10+i+1)+'</i></dt>';
                    }else{
                        html += '   <dt class="number"><i class="">'+((page-1)*10+i+1)+'</i></dt>';
                    }
                    html += '   <dt class="product">';
                    html += '       <p class="p1">'+items[i]['full_name']+'</p>';
                    html += '       <p class="p2">'+items[i]['add_time']+'</p>';
                    html += ' </dt></dl></li>'
                }
                    html +='</ul><div class="more" id="more"><button>点击加载更多</button></div>';
                $('#search_result').append(html);

                that.renderHtml($('#search_result'));

                if(that._pagegation >= total){
                    $('#more button').addClass('dis').text('已经全部加载')
                }
                $('#more').click(function(){
                    var hasClass = $(this).find('button').hasClass('dis');
                    if(hasClass){
                        return;
                    }
                    that._pagegation++;
                    that.__ajax_ele__(flag,that._pagegation);
                })
            })
        }
    });
    return new ctrl();
})($);