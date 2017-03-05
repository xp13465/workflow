<?php
namespace Admin\Model;
use Think\Log;
use Think\Model;

class AuthRoleModel extends Model{
	protected $_validate=array(
		array('title','require','请填写角色名称'),

	);
	protected $_auto=array(
			array('update_time','date',3,'function','Y-m-d H:i:s'),
	);

}