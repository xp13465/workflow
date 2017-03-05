<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link href="/favicon.ico" rel="icon" type="image/x-icon" />
	<title><?php echo C('SYSTEM_NAME');?>-工作流</title>
	<script type="text/javascript" src="/Public/UI/bower_components/moment-with-locales.js" ></script>
	<!-- <script type="text/javascript" src="/Public/UI/bower_components/angular/angular.min.js"></script> -->
	
	<script src="/Public/UI/bower_components/angular/angular-1.2.27.min.js"></script>


	<!--
	<script type="text/javascript" src="/Public/UI/bower_components/underscore/underscore.js"></script>
	
	<script type="text/javascript" src="http://apps.bdimg.com/libs/angular.js/1.2.8/angular.min.js"></script>
  	<script type="text/javascript" src="/Public/UI/bower_components/angular-animate/angular-animate.min.js"></script>
  	<script type="text/javascript" src="/Public/UI/bower_components/angular-locale_zh-cn.js"></script>
  	<script type="text/javascript" src="/Public/UI/bower_components/angular-route/angular-route.min.js"></script>
  	<script type="text/javascript" src="/Public/UI/bower_components/ng-dialog/js/ngDialog.min.js" ></script>-->
  	<script type="text/javascript" src="/Public/UI/js/angular/jquery-1.8.1.min.js"></script>
  	<script type="text/javascript" src="/Public/UI/js/angular/webuploader.js"></script>
	<script type="text/javascript" src="/Public/UI/js/angular/verificationRule.js"></script>
	<script type="text/javascript" src="/Public/UI/js/angular/alert.js"></script>
	<script type="text/javascript" src="/Public/UI/js/angular/app.js"></script>

   <link href="/Public/UI/js/bootstrap/css/bootstrap_other.css" rel="stylesheet">
    <link href="/Public/UI/js/bootstrap/css/datetimepicker.css" rel="stylesheet">
	<link rel="stylesheet" href="/Public/UI/css/common.css">
	<link rel="stylesheet" href="/Public/UI/css/guest.css">
	  <script src="/Public/UI/js/bootstrap/js/bootstrap-datetimepicker.min.js"></script>
	  <script src="/Public/UI/js/bootstrap/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
	<script>
		var baseUrl = '/Public/UI/';
	</script>
</head>
<body ng-controller="mainCtrl">
	<div class="desktop clearfix">
		<!-- <img src="/Public/UI/images/desktop/desktop_01.png" alt="" ng-click="showUserAccount()">
		<img src="/Public/UI/images/desktop/desktop_02.png" alt="" ng-click="showUserLogin()">
		<img src="/Public/UI/images/desktop/desktop_03.png" alt="" ng-click="setUserInfolistFn()">
		<img src="/Public/UI/images/desktop/desktop_04.png" alt="" ng-click="showManageRightFn()">
		<img src="/Public/UI/images/desktop/desktop_05.png" alt="" ng-click="showManagePurchaseFn()">
		<img src="/Public/UI/images/desktop/desktop_06.png" alt="" ng-click="showSetMyselfFn()" ng-if="node_id_160">
		<img src="/Public/UI/images/desktop/desktop_07.png" alt="" ng-click="showSetPersonFn()" ng-if="node_id_161"> -->
		<dl>
			<dt class="clearfix">
				<img src="/Public/UI/images/desktop/desk_new_01.png" alt="" class="mar_r5" style="width: 240px;" ng-click="showUserAccount()">
				<img src="/Public/UI/images/desktop/desk_new_02.png" alt="" style="width: 228px;" ng-click="showUserLogin()">
			</dt>
			<dd class="clearfix">
				<img src="/Public/UI/images/desktop/desk_new_05.png" alt="" style="width: 473px;" class="mar_t5" ng-click="showManagePurchaseFn()">
				
			</dd>
		</dl>
		<dl>
			<dd class="mar_cen5 clearfix">
				<img src="/Public/UI/images/desktop/desk_new_03.png" alt="" style="width: 237px;" ng-click="setUserInfolistFn()">
			</dd>
		</dl>
		<dl>
			<dd class="clearfix">
				<img src="/Public/UI/images/desktop/desk_new_04.png" alt="" style="width: 238px;"  ng-click="showManageRightFn()">
			</dd>
			<dt class="clearfix">
				<img src="/Public/UI/images/desktop/desk_new_06.png" alt="" style="width: 238px;" class="mar_t5" ng-click="showSetPersonFn()" ng-if="node_id_161">
			</dt>
		</dl>


	</div>
	<div user-account ng-cloak></div>
	<div user-login ng-cloak></div>
	<div user-infolist ng-cloak></div>
	<div crm-info ng-cloak></div>
	<div product-list ng-cloak></div>
	<div manage-purchase ng-cloak></div>
	<div manage-right ng-cloak></div>
	<div product-box ng-cloak></div>
	<div product-purchase ng-cloak></div>
	<div product-doc ng-cloak></div>
	<div product-docreset ng-cloak></div>
	<div set-Person ng-cloak></div>
	<div set-Myself ng-cloak></div>
	<div show-img ng-cloak></div>
	<div invest-record ng-cloak></div>
	<div speed-right ng-cloak></div>
	<div product-select ng-cloak></div>
	<div prompt-book ng-cloak></div>
	<script type="text/javascript">
	  angular.bootstrap(document,['storeApp']);
	</script>

</body>
</html>