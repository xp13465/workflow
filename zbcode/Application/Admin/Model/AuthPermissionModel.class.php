<?php
namespace Admin\Model;
use Think\Log;
use Think\Model;

class AuthPermissionModel extends Model{
	protected $_validate=array(
		array('permission_code','require','请填写权限代码'),
		array('permission_name', 'require', '请填写权限名称'),
	);
	protected $_auto=array(
			array('update_time','date',3,'function','Y-m-d H:i:s'),
	);

}