<?php
return array(
	//'配置项'=>'配置值'
	'SHOW_PAGE_TRACE' => false,	//true 凋试
	
	 //后台缓存文件目录
    'ADMIN_CACHE_PATH' =>  COMMON_PATH . 'Cache/admin/',
    'URL_ROUTER_ON' => true,
    'URL_CASE_INSENSITIVE' => true,
    'URL_ROUTE_RULES' => array(
        'login' => 'common/login',
        'register' => 'common/register',
        'loginOut' => 'common/loginOut',
    ),
	// 'DEFAULT_FILTER'        =>  '',
	'DB_HOST' => '192.168.20.149', // 服务器地址
    'DB_NAME' => 'workflow',          // 数据库名
    'DB_USER' => 'honghanzheng',      // 用户名
    'DB_PWD' => '123456',          // 密码
    'DB_PORT' => '3306',        // 端口
    'DB_PREFIX' => '',    // 数据库表前缀
    'DB_NAME2' => 'manage',      // 数据库名
    'DB_PREFIX2' => 'm_',      // 数据库表前缀
);