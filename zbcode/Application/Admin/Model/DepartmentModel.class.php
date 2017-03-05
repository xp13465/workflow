<?php
namespace Admin\Model;
use Think\Log;
use Think\Model;

class DepartmentModel extends Model{
	protected $_validate=array(

		array('name','require','请填写部门名称'),
		array('description','require','请填写描述'),

	);
	protected $_auto=array(

	);

}