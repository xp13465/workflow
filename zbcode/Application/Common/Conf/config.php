<?php
return array(
    //'配置项'=>'配置值' 
    'DOMAIN_HOST' => 'http://139.196.190.93',
    'MODULE_ALLOW_LIST' => array('Home', 'Admin', 'Workflow'),
    'DEFAULT_MODULE' => 'Admin',
    /* 数据库设置 */
    'DB_TYPE' => 'mysql',     // 数据库类型
    'DB_HOST' => '192.168.20.149', // 服务器地址
    'DB_NAME' => 'zibang',          // 数据库名
    'DB_USER' => 'honghanzheng',      // 用户名
    'DB_PWD' => '123456',          // 密码
    /*    'DB_HOST' => 'localhost', // 服务器地址
        'DB_NAME' => 'zibang',          // 数据库名
        'DB_USER' => 'root',      // 用户名
        'DB_PWD' => 'root',          // 密码
    */
        'DB_PORT' => '3306',        // 端口
        'DB_PREFIX' => 'zb_',    // 数据库表前缀
        'DB_PARAMS' => array(), // 数据库连接参数
        'DB_DEBUG' => TRUE, // 数据库调试模式 开启后可以记录SQL日志
        'DB_FIELDS_CACHE' => true,        // 启用字段缓存
        'DB_CHARSET' => 'utf8',      // 数据库编码默认采用utf8
        'DB_DEPLOY_TYPE' => 0, // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
        'DB_RW_SEPARATE' => false,       // 数据库读写是否分离 主从式有效
        'DB_MASTER_NUM' => 1, // 读写分离后 主服务器数量
        'DB_SLAVE_NO' => '', // 指定从服务器序号
        /* URL设置 */
    'URL_CASE_INSENSITIVE' => true,   // 默认false 表示URL区分大小写 true则表示不区分大小写
    'URL_MODEL' => 2,       // URL访问模式,可选参数0、1、2、3,代表以下四种模式：
    // 0 (普通模式); 1 (PATHINFO 模式); 2 (REWRITE  模式); 3 (兼容模式)  默认为PATHINFO 模式
    'URL_PATHINFO_DEPR' => '/',    // PATHINFO模式下，各参数之间的分割符号

    'URL_HTML_SUFFIX' => 'html',  // URL伪静态后缀设置
    'PRINT_JSON' => 'json',    //输入json 数据的格式 json 直接json,json_base64 加密后的json
    'SYSTEM_NAME' => '资邦投资管理系统',
    'CRYPT_KEY' => 'zb.com', //加密 KEY
    'INIT_PASSWORD' => '123456',
    //邮件服务器
    'EMAIL_SERVER' => array(
        'smtp_host' => 'smtp.exmail.qq.com',  //smtp主机
        'smtp_port' => 465,          //端口号
        'smtp_ssl' => true,          //安全链接
        'smtp_username' => 'zbtzgl@zillionfortune.com',//'xiaowen@zillionfortune.com',             //邮箱帐号
        'smtp_password' => 'Zibang@12',             //邮箱密码
        'smtp_from_to' => 'zbtzgl@zillionfortune.com',//'xiaowen@zillionfortune.com',             //发件人邮箱
        'smtp_from_name' => '资邦投资管理系统',       //发件人
    ),
    //七牛云文件服务器
    'UPLOAD_SITEIMG_QINIU' => array(
        'maxSize' => 5 * 1024 * 1024,//文件大小
        'rootPath' => './',
        'saveName' => '',//array('uniqid', ''),
        'driver' => 'Qiniu',
        'driverConfig' => array(
            'secretKey' => 'N-qBkLPAJDhVkqG5ZqndLYTELHSvQrKjn_Ig2S66',
            'accessKey' => 'emEf3tZGdbWUGbfToVdM2cqiGdYOEaDs9qdzp2kT',
            'domain' => '7xjhy8.com1.z0.glb.clouddn.com',
            'bucket' => 'even',
        )
    ),
    //提示消息类型
    'MESSAGE_TYPE' => array(
        1 => '操作成功',
        2 => '操作失败',
        3 => '参数错误',
        4 => '数据创建失败，请系统技术人员',
        5 => '系统错误',
    ),
    'SHOW_ERROR_MSG' => true,
    'TMPL_EXCEPTION_FILE' => COMMON_PATH . 'Tpl/think_exception.tpl',// 异常页面的模板文件
    //需要发送合同等附件的邮箱列表
    'SEND_MSG_MAIL_LIST' => array(
        0 => array('email' => 'wangli@zillionfortune.com',
            'name' => '财务',
        ),
        1 => array('email' => 'yulihua@zillionfortune.com',
            'name' => '董办',
        ),
    ),
    'SCORE_POSITION' => array(43, 45, 48), //参与评分的各部门总监职位ID
    'PASS_SCORE_NUM' => 3, //产品评分最终完成的参与评分人数
    'DEFAULT_ORGANIZATION' => 109, //默认机构ID 资邦投资
    'REDIS' => array(
        'host' => '127.0.0.1',//'139.196.190.93',
        'port' => 6379,
    ),
    //'ERROR_PAGE' => ROOT_PATH . 'Public/think_exception.tpl',
);