<?php
return array(
	//'配置项'=>'配置值'

    //后台缓存文件目录
    'ADMIN_CACHE_PATH' =>  COMMON_PATH . 'Cache/admin/',
    'URL_ROUTER_ON' => true,

    'URL_ROUTE_RULES' => array(
        'login' => 'common/login',
        'register' => 'common/register',
        'loginOut' => 'common/loginOut',
    ),

);
