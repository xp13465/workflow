<?php
namespace Workflow\Model;

use Think\Log;
use Think\Model;

class WorkflowRequestbaseProcesslogModel extends Model
{
	/**
	*  获取流程节点表单的字段属性
	*/
	public function getAllProcesslog($requestid){
		$map["requestid"]=$requestid;
		$Processlog = $this->alias("a")->field("a.*,e.nodename as beforenodename,f.nodename as afternodename,b.realname as brforeusername,d.realname as modifyusername,group_concat(c.id) as afteruserids,group_concat(c.realname) as afterusernames")
		->join(C("DB_NAME2").".".C("DB_PREFIX2")."admin b on b.id = a.createuser","left") //发起操作人
		->join(C("DB_NAME2").".".C("DB_PREFIX2")."admin c on find_in_set(c.id,a.afteruser)","left") //待操作人
		->join(C("DB_NAME2").".".C("DB_PREFIX2")."admin d on  d.id = a.modifyuser","left") //处理操作人
		->join("__WORKFLOW_NODE__ e on  e.nodeid = a.beforenode","left") //发起节点
		->join("__WORKFLOW_NODE__ f on  f.nodeid = a.afternode","left") //发起节点
		->group("a.id")
		->where($map)->select();
		return $Processlog;
	}
	//获取流程节点的字段属性
	
}