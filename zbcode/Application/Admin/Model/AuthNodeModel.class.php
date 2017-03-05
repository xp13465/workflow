<?php
namespace Admin\Model;

use Think\Log;
use Think\Model;

class AuthNodeModel extends Model
{
    protected $_validate = array(
        array('name', 'require', '请填写节点名称'),
        array('module', 'require', '请填写节点编号'),
    );
    protected $_auto = array(
        array('update_time', 'date', 3, 'function', 'Y-m-d H:i:s'),
    );

}