<?php
namespace Workflow\Model;

use Think\Log;
use Think\Model;

class WorkflowNodeProcessModel extends Model
{
	/**
	*  获取节点的操作用户
	*/
	public function getNodeProcess($workflowid,$nodeid,$requestid){
		
		$requestDetail=D("WorkflowRequestbase")->getDetail($requestid);
		
		// dump($requestDetail);
		$processList = M("WorkflowNodeProcess")
				->where(["workflowid"=>$workflowid,"nodeid"=>$nodeid])->select();
				
		if($processList){
			foreach($processList as $item=>$process){
				$process_rule_Array = M("workflowNodeProcessRule")->alias("a") 
				->where(["processid"=>$process['processid']])->order("`order` asc")->select();
				foreach($process_rule_Array as $key=>$rule){
					if(!empty($rule['conditionsql'])){ 
						$num = M("workflow_formtable".$requestDetail['formtableid'])->where("requestid = '{$requestid}' and ".$rule['conditionsql'])->count();
						if(!$num){//设置了操作逻辑的条件的 查询后无匹配则跳过
							continue;
						}
					}
					switch($rule['type']){
						case 1: //创建人
						$source = $requestDetail['createuser'];
						break;
						case 2: //自定义人
						$source = $rule['userid'];
						break;
						case 3: //表单中字段
						$source = $requestDetail['field'.$rule['fieldid']];
						break;
						case 4: //某角色OR某机构角色
						$source = $rule['roleid'];
						$organization = $rule['organizationid'];
						break;
						default:
						$source = 0;
						break;
					}
					
					switch($rule['relation']){
						case 1://本人
						$userList = D("User")->field("id,realname,email")->where(["id"=>["in",$source]])->select();
						// echo D("User")->getLastSql();
						break;
						case 2://上级领导
						$userList = D("User")->alias("a")->field("b.id,b.realname,b.email")
						->join(C("DB_NAME2").".".C("DB_PREFIX2")."user b on a.leader_id = b.position_id")
						->where(['a.id'=>["in",$source]])->select();//position_id
						break;
						case 3://某机构角色人员
						$userList = D("User")->alias("a")->field("a.id,a.realname,a.email")
						->join(C("DB_NAME2").".".C("DB_PREFIX2")."auth_access b on a.id = b.uid")
						->where(['a.organization_id'=>$organization,'b.role_id'=>["in",$source]])->select();
						break;
						case 4://某角色人员
						$userList = D("User")->alias("a")->field("a.id,a.realname,a.email")
						->join(C("DB_NAME2").".".C("DB_PREFIX2")."auth_access b on a.id = b.uid")
						->where(['b.role_id'=>["in",$source]])->select();//position_id
						break;
						default:
						$userList = [];
						break;
					}
					$rule['userList'] = $userList;
					$processList[$item]["ruleList"][] = $rule;
				}
				
			}
			
			
		} 
		
		// echo "<pre>";
		// print_r($processList);exit;
		return $processList;//["userList"=>$userList];
		// return $process_rule_Array;
	}
	
}