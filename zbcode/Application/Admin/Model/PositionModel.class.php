<?php
namespace Admin\Model;
use Think\Log;
use Think\Model;

class PositionModel extends Model{
	protected $_validate=array(

		array('name','require','请填写职位名称'),
		array('department_id','require','请选择部门'),

	);
	protected $_auto=array(

	);

}