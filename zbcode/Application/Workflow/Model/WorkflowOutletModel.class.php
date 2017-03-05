<?php
namespace Workflow\Model;

use Think\Log;
use Think\Model;

class WorkflowOutletModel extends Model
{
	/**
	*  获取节点出口
	*/
	public function getNodeOutlets($workflowid,$type,$nodeid){
		
		$NodeOutlets = $this->field("afternode,beforenode,conditiondesc,conditionsql")
			->where(["workflowid"=>$workflowid,"type"=>$type,"beforenode"=>$nodeid])
			->order("`order` asc")->select();
		return $NodeOutlets;
	}
	

	/*
		此工作流的节点列表
		@param
		nodelist
	*/

	public function nodelist($workflowid){

				$list = M('Workflow_node')->where('workflowid='.$workflowid)->select();
				return $list;
		}



	/**
	 * 出口列表
	 * param $workflowid
	 */
	public function outlist($workflowid){

		$list = $this->where('workflowid='.$workflowid)->select();
		return $list;

	}

	/**
	 * 删除出口
	 * @param outletid
	 */

	public function delOutlist($outletid){

		$res = $this->where('outletid  in '.$outletid)->delete();

		if($res!==false){
			return true;
		}else{
			return false;
		}

	}


	/**
	 * 查看出口-viewThisOut
	 * $outletid
	 */
	public function viewThisOut($outletid){

			$list = $this->where('outletid='.$outletid)->find();
			return $list;
	}


	/**
	 * delOutlist
	 * 删除出口
	 * $outletid
	 *//*
	public function delOutlist($outletid){

		$res = $this->where('outletid in '.$outletid)->delete();
		if($res!==false){

			return true;
		}else{
			return false;
		}

	}*/


	/**
	 *编辑这个出口
	 *$outletid
	 */


	public function editThisout($data){

			$res = $this->where('outletid='.$data['outletid'])->save($data);

			if($res!==false){
				return true;
			}else{
				return false;
			}
	}
}