<?php
namespace Admin\Model;
use Think\Log;
use Think\Model;

class PublicMessageModel extends Model{
	protected $_validate=array(
		array('title','require','请填写消息标题'),
		array('content', 'require', '请填写消息内容'),
	);
	protected $_auto=array(
			array('add_time','date',3,'function','Y-m-d H:i:s'),
	);

}