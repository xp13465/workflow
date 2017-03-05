<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<link>
	<meta charset="UTF-8">
	<title>登陆-<?php echo ($system_name); ?></title>
	<link rel="stylesheet" href="/Public/UI/bootstarp/css/bootstrap.min.css">
	<script src="/Public/UI/bootstarp/js/jquery.min.js"></script>
	<script src="/Public/UI/bootstarp/js/bootstrap.min.js"></script>
	<script src="/Public/UI/js/layer/layer.js"></script>
	<script src="/Public/UI/js/jquery.form.js"></script>
	<link href="/Public/UI/css/zb.css">
<style type="text/css">
	html,body {
		height: 100%;
		padding: 0;
		margin: 0;
		background:url(/Public/UI/images/login_bg1.png);
		filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
		-moz-background-size:100% 100%;
		background-size:100% 100%;
	}
	.box {
		#filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#6699FF', endColorstr='#6699FF'); /*  IE */
		#background-image:linear-gradient(bottom, #6699FF 0%, #6699FF 100%);
		#background-image:-o-linear-gradient(bottom, #6699FF 0%, #6699FF 100%);
		#background-image:-moz-linear-gradient(bottom, #6699FF 0%, #6699FF 100%);
		#background-image:-webkit-linear-gradient(bottom, #6699FF 0%, #6699FF 100%);
		#background-image:-ms-linear-gradient(bottom, #6699FF 0%, #6699FF 100%);
		#background-image: url("/Public/UI/images/backbround_2.png");
		-moz-background-size:100%;
		-webkit-background-size:100%;
		-o-background-size:100%;
		background-size:100%;
		margin: 0 auto;
		position: relative;
		width: 100%;
		height: 100%;
	}
	.login-box {
		width: 100%;
		max-width:400px;
		height: 400px;
		position: absolute;
		top: 35%;
		margin-top: -200px;

		left: 50%;
		/*设置负值，为要定位子盒子的一半宽度*/
		margin-left: -200px;
		/*设置负值，为要定位子盒子的一半高度*/

	}
	@media screen and (min-width:400px){
		.login-box {
			left: 50%;
			/*设置负值，为要定位子盒子的一半宽度*/
			margin-left: -200px;
		}
	}

	.form {
		width: 100%;
		max-width:500px;
		height: 275px;
		margin: 10px auto 0px auto;
		padding-top: 5px;
	}
	.login-content {
		height: 300px;
		width: 100%;
		max-width:400px;
		#background-color: rgba(255, 250, 2550, .5);
		float: left;
	}


	.input-group {
		margin: 0px 0px 20px 0px !important;
		display:block;
	}
	.form-control,
	.input-group {
		height: 50px;
		border-radius: 6px;
	}

	.form-group {
		margin-bottom: 0px !important;
	}
	.login-title {
		padding: 20px 10px;
		#background-color: rgba(0, 0, 0, .6);
	}
	.login-title h1 {
		margin-top: 10px !important;
	}
	.login-title small {
		color: #fff;
	}

	.link p {
		color: #fff;
		line-height: 20px;
		margin-top: 30px;
	}
	.btn-sm {
		padding: 8px 24px !important;
		font-size: 16px !important;
		background-color: rgba(64, 122, 206, .4);
		-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=40)";
		filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=40);
		#background-color: #5bc0de;
		border-color: #5E9EE1;
		font-weight:bolder;

	}
	.btn-info:hover {
		color: #fff;
		background-color: #31b0d5;
		border-color: #269abc;

		background-color: rgba(64, 122, 206, .8);

	}
	#username{
		background: url(/Public/UI/images/icon-u.png) no-repeat;
		padding-left: 40px;
		background-color: #FFFFFF;
		background-position: 1px -3px;
	}
	#password{
		background: url(/Public/UI/images/icon-p.png) no-repeat;
		background-color: #FFFFFF;
		background-position: 1px -3px;
		padding-left: 40px;
	}
	.col-xs-6 a:hover{
		text-decoration: none;
	}
</style>

</head>

<body>
<div class="box">
	<div class="login-box">
		<div class="text-center">
			<h1><small><img src="/Public/UI/images/logo_1.png"/> </small></h1>
		</div>
		<div class="login-content ">
			<div class="form">
				<form action="/common/login.html" method="post" autocomplete="off">
					<div class="form-group">
						<div class="col-xs-12">
							<div class="input-group">
								<!--<span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>-->
								<input type="text" id="username" name="email" class="form-control input-text" style="border-radius: 5px;" placeholder="邮箱">
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="col-xs-12">
							<div class="input-group">

								<input type="password" id="password" name="password" class="form-control" style="border-radius: 5px;" placeholder="密码">
							</div>
						</div>
					</div>

					<div class="form-group form-actions">
						<div class="col-xs-12">
							<button type="button" id="sub-btn" class="btn btn-sm btn-info col-xs-12"><span class="glyphicon" style="font-size: 18px;"> 登 录</span></button>
						</div>
					</div>
					<div class="link">
						<!--<span class="col-xs-6" style="color: #FFFFFF; height: 20px; line-height: 20px; padding-top: 5px;"><input type="checkbox" id="remandme" style="padding-top: -10px;"> <small>五天内自动登陆</small></span>-->
						<span class="col-xs-6" style="color: #FFFFFF; height: 20px; line-height: 20px;"><a href="<?php echo U('common/findpassword');?>" style="float: left; color: #FFFFFF; padding-top: 10px; border-bottom: 1px #FFFFFF solid; "><small>忘记密码？</small></a> </span>

						<span class="col-xs-6" style="color: #FFFFFF; height: 20px; line-height: 20px;"><a href="<?php echo U('common/register');?>" style="float: right; color: #FFFFFF;padding-top: 10px; border-bottom: 1px #FFFFFF solid; "><small>注册申请</small></a> </span>
					</div>

					<!--<div class="form-group">-->
						<!--<div class="col-xs-6 link">-->
							<!--<p class="text-center remove-margin"><small>忘记密码？</small> <a href="javascript:void(0)" ><small>找回</small></a>-->
							<!--</p>-->
						<!--</div>-->
						<!--<div class="col-xs-6 link">-->
							<!--<p class="text-center remove-margin"><small>还没注册?</small> <a href="javascript:void(0)" ><small>注册</small></a>-->
							<!--</p>-->
						<!--</div>-->
					<!--</div>-->
				</form>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	~(function($){  
	    initPlaceHolder=function(){

	    	jQuery(':input[placeholder]').each(function(index, element) {
	    		
	            var self = $(this), txt = self.attr('placeholder');
	            // console.log(self.position());
	            // self.wrap($('<div></div>').css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
	            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
	            var holder = $('<span></span>').text(txt)
	            .css({position:'absolute', left:pos.left, top:pos.top,paddingLeft:paddingleft,height:h,'z-index':'10',color:'#aaaa','line-height':h+'px'})
	            // .css({position:'absolute', left:pos.left, top:pos.top, height:h, lineHeight:h, paddingLeft:paddingleft, color:'#ffffff'})
	            .appendTo(self.parent());
	            self.focusin(function(e) {
	                holder.hide();
	            }).focusout(function(e) {
	                if(!self.val()){
	                    holder.show();
	                }
	            });
	            holder.click(function(e) {
	                holder.hide();
	                self.focus();
	            });
	        });
	    };
	    // console.log(navigator);
	    if ((navigator.userAgent.indexOf('MSIE')) >= 0){
	    	
	    	if(navigator.appVersion.match(/8./i)=="8." || navigator.appVersion.match(/9./i)=="9."){
	    			initPlaceHolder();
	    	}
	    }
	  	
	})(jQuery);
	var bgArr = ['/Public/UI/images/login_bg1.png', '/Public/UI/images/login_bg2.png','/Public/UI/images/login_bg3.png'];
	setInterval(function(){
		//console.log(fRandomBy(0,2));
		$('body').css('background','url('+bgArr[fRandomBy(0,2)]+')').css({filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')",'-moz-background-size':'100% 100%','background-size':'100% 100%'});

	}, 100000);

	//设定随机数的范围
	function fRandomBy(under, over){
		switch(arguments.length){
			case 1: return parseInt(Math.random()*under+1);
			case 2: return parseInt(Math.random()*(over-under+1) + under);
			default: return 0;
		}
	}
	function showMsg(msg, id){
		layer.tips(msg, '#'+id);
	}
	function CheckMail(mail) {
		var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		mail = $.trim(mail);
		if (filter.test(mail)) {
			return true;
		}
		else {
			return false;
		}
	}
	$(function(){
		$('#sub-btn').click(function(){
			var _email = $('#username').val();
			var _password = $('#password').val();
			if(!CheckMail(_email)){
				showMsg('请输入正确的邮箱帐号','username');
				return false;
			}
			if(_password.length < 6 || _password.length > 12){
				showMsg('请输入6-12位的密码', 'password');
				return false;
			}
			//$('form').submit();
			layer.msg('正在登录中...');
			$('form').ajaxSubmit({
				type : 'post',
				dataType : 'json',
				success: function(_data){
					//var _data = $.parseJSON(_data);
					if(_data.status == 0){
						showMsg(_data.msg, 'username');
						return false;
					}else if(_data.status == 1){
						window.location.href = "<?php echo U('index/index');?>";
					}
				}
			});
		});
		$('body').bind('keypress',function(event){
			if(event.keyCode == "13")
			{
				$('#sub-btn').click();
			}
		});
	});

</script>
</body>

</html>