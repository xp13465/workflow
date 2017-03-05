<?php
namespace Workflow\Model;

use Think\Log;
use Think\Model;

class WorkflowRequestbaseModel extends Model
{
	
	/**
	*  获取流程节点表单的字段属性
	*/
	
	public function getNodeFormtableAttr($workflowid,$formtableid,$nodeid){
		
		
		$NodeFields=$this->getNodeFields($nodeid,$formtableid);
		$childformtables = M("formtable")->where(["parentid"=>$formtableid,"validflag"=>"1"])->field("formtableid")->select();
		
		foreach($childformtables as $childformtable){
			$tbname="workflow_formtable".$formtableid."dt".$childformtable['formtableid'];
			$NodeFields[$tbname]=$this->getNodeFields($nodeid,$childformtable['formtableid']);
		}
		
		return $NodeFields;
	}
	
	/**
	*  获取流程节点的字段属性
	*/
	
	public function getNodeFields($nodeid,$formtableid){
		$NodeFields= M("workflowNodeFields")->alias("a")
		->join("__FORMTABLE_FIELDS__ b on a.fieldid = b.fieldid",'inner')
		->where(["nodeid"=>$nodeid,"formtableid"=>$formtableid])
		->order(" a.order asc,a.id asc")
		->getField("a.fieldid,a.order,a.nodeid,b.formtableid,b.fieldname,b.fieldtitle,b.fieldtypechild,b.fieldtype,a.type,a.default,a.prompt,b.length");
		// ->field("a.nodeid,b.formtableid,b.fieldtype,a.fieldid,a.fieldid,a.type,a.default,a.prompt")
		// ->select();
		
		foreach($NodeFields as $key=>$field){
			if(in_array($field['fieldtype'],[9,10])){
				$NodeFields[$key]["select"]=M('formtable_fields_values')->where(['fieldid'=>$field['fieldid']])->getField("key,value,isdefault");
			}
		}
		return $NodeFields;
	}
	
	/**
	*  获取流程节点表单的可见内容
	* param int $nodeid 0默认当前节点内容   
	*/
	
	public function getDetail($requestid,$nodeid=0){
		$requestid=$requestid?$requestid:0;
		$requestdata= $this->field("formtableid,nodeid")->find($requestid);
		$formtableid=$requestdata["formtableid"];
		if($nodeid==0){
			$nodeid=$requestdata["nodeid"];
		}
		
		
		
		$fieldStr= M("workflowNodeFields")->alias("a")
		->join("__FORMTABLE_FIELDS__ b on a.fieldid = b.fieldid")
		->where(["nodeid"=>$nodeid,"formtableid"=>$formtableid])
		->field("group_concat(concat('b.`',b.fieldname,'` as ', 'field',b.fieldid)) as sqlfields")->find();
		$fieldStrSql=$fieldStr['sqlfields']?",".$fieldStr['sqlfields']:$fieldStr['sqlfields'];
		
		$map['a.requestid']=$requestid;
		$data = $this->alias("a")->field("a.*,b.id".$fieldStrSql)
					 ->join("__".strtoupper("workflow_formtable".$formtableid)."__ b on a.requestid = b.requestid") 
					 ->where($map)->find();
		
		$childformtables = M("formtable")->where(["parentid"=>$formtableid,"validflag"=>"1"])->field("formtableid")->select();
		foreach($childformtables as $childformtable){
			$tbname="workflow_formtable".$formtableid."dt".$childformtable['formtableid'];
			
			$childfieldStr= M("workflowNodeFields") 
							->alias("a")
							->join("__FORMTABLE_FIELDS__ b on a.fieldid = b.fieldid")
							->where(["nodeid"=>$nodeid,"formtableid"=>$childformtable["formtableid"]])
							->field("group_concat(concat('`',b.fieldname,'` as ','field',b.fieldid)) as sqlfields")->find();
							// echo M("workflowNodeFields") ->getLastSql();
			$childfieldStr=$childfieldStr['sqlfields']?",".$childfieldStr['sqlfields']:''; 
			
			$childformtabledata = M($tbname)->field("id,mainid".$childfieldStr)->where(["requestid"=>$requestid])->select();
			$data[$tbname]=$childformtabledata;
		}
		return $data;
	}
	
	/**
	*  保存流程节点内容
	*  param int requestid 流程ID 
	*  param array data 内容集
	*/
	
	public function saveform($requestid,$data,$uid){
		// dump($data);
		$workflowid=$data['workflowid'];
		$nodeid=$data['nodeid'];
		$Workflow = M("Workflow")->field('formtableid')->where(['workflowid'=>$workflowid])->find();
		$formtableid = $Workflow['formtableid'];
		$tablename='workflow_formtable'.$formtableid;
		
		$NodeFields=$this->getNodeFields($nodeid,$formtableid);
		$basedata = $formdata = $formdtdata = [];
		$formdtdeldata=$data['form_del'];
		$basedata['formtableid']=$formtableid; 
		if($data['requestname']){
			$basedata['requestname']=$data['requestname'];
		}
		
		// dump($data);exit;
		// dump($NodeFields);
		//将POST内容归类
		foreach($data as $key=>$val){
			if(strpos($key,"__field")>-1){//属于主表单
				$newKey = explode("__field",$key);
				//保证字段存在 并且字段名正确 并且属于可编辑或必填
				if(isset($NodeFields[$newKey[1]])&&$newKey[0]==$NodeFields[$newKey[1]]['fieldname']&&in_array($NodeFields[$newKey[1]]['type'],[1,2])){
					if($val){
						$formdata[$newKey[0]] = is_array($val)?join(",",$val):$val;
					}
				}
			}else if(strpos($key,"dt_")>-1){//属于明细表单
				$dtKey = explode("_",$key);
				$childFormtableid =$dtKey[1];
				$childdataid =$dtKey[2];
				$NodeChildFields=$this->getNodeFields($nodeid,$childFormtableid);
				foreach($val as $k=>$v){
					$newKey = explode("__field",$k);
					//保证字段存在 并且字段名正确 并且属于可编辑或必填
					$formdtdata[$tablename."dt".$childFormtableid][$childdataid]["requestid"]=$requestid;
					$formdtdata[$tablename."dt".$childFormtableid][$childdataid]["formtableid"]=$childFormtableid;
					if(isset($NodeChildFields[$newKey[1]])&&($newKey[0]==$NodeChildFields[$newKey[1]]['fieldname']&&in_array($NodeChildFields[$newKey[1]]['type'],[1,2]))){
						$formdtdata[$tablename."dt".$childFormtableid][$childdataid][$newKey[0]] = is_array($v)?join(",",$v):$v;
					}elseif($k=="id"&&$v>0){
						$formdtdata[$tablename."dt".$childFormtableid][$childdataid]['id'] = $v;
					}
					
					foreach($NodeChildFields as $k=>$v){
						if(in_array($v['type'],[1,2])){//in_array($v['fieldtypechild'],array("15","22"))&&
							if(!isset($formdtdata[$tablename."dt".$childFormtableid][$childdataid][$v['fieldname']])){
								$formdtdata[$tablename."dt".$childFormtableid][$childdataid][$v['fieldname']] = '';
							}
						}
					}
					
				}
				
			}
			// else{//属于流程主表
				// $basedata[$key]=$val;
			// }
		}
		// exit;
		$formdataRule=[];
		foreach($NodeFields as $k=>$v){
			if(in_array($v['type'],[1,2])){//in_array($v['fieldtypechild'],array("15","22"))&&
				if($v['type']==1){
					$formdataRule[]= array($v['fieldname'],'require',$v["fieldtitle"].'必填！');//默认情况下用正则进行验证
				}
				if(!isset($formdata[$v['fieldname']])){
					if($v['type']==2 && $v['fieldtypechild']==13){
						$formdata[$v['fieldname']] = "0000-00-00";
					}else if($v['type']==2 && $v['fieldtypechild']==14){
						$formdata[$v['fieldname']] = "0000-00-00 00:00:00";
					}else{
						$formdata[$v['fieldname']] = "";
					}
				}else{
					if(!$formdata[$v['fieldname']]){
						$formdata[$v['fieldname']] = $v['default'];
					}
				}
			}
		} 
		// var_dump($NodeFields);exit;
		$formModel=M($tablename);
		
		$return =[];
		$formdataid = 0;
		if($requestid>0){ //存在流程ID 执行更新
			$formDetail = $formModel->field("id")->where([$requestid=>$requestid])->find();
			if($formDetail){
				$formdataid = $formDetail['id'];
				$basedata['modifyuser']=$uid;
				$basedata['modifytime']=date("Y-m-d H:i:s");
				if (!$this->create($basedata)||!$formModel->validate($formdataRule)->create($formdata)) {
					$return[]=["status"=>0,'msg'=>$this->getError().$formModel->getError()];
				} else {
					
					$status1 = $this->where(["requestid"=>$requestid])->save();
					$status2 = $formModel->where(["requestid"=>$requestid])->save();
					
					if($status1>=0){
						$return[]=["status"=>1,'msg'=>'流程主信息保存成功!'];
					}else{
						$return[]=["status"=>0,'msg'=>'流程主信息保存失败!'];
					}
					if($status2>=0){
						$return[]=["status"=>1,'msg'=>'流程表单信息保存成功!'];
					}else{
						$return[]=["status"=>0,'msg'=>'流程主信息保存失败!'];
					}
				}
			}else{ 
				$return[]=["status"=>0,'msg'=>'流程请求不存在!'];
			}
			
		}else{ //不存在流程ID 执行新增
			unset($basedata['requestid']);
			$basedata['workflowid']=$workflowid;
			$basedata['nodeid']=$nodeid;
			$basedata['status']=1;
			$basedata['formtableid']=$formtableid;
			$basedata['createuser']=$uid;
			$basedata['createtime']=date("Y-m-d H:i:s");
			
			if (!$this->create($basedata)||!$formModel->validate($formdataRule)->create($formdata)) {
				$return[]=["status"=>0,'msg'=>$this->getError().$formModel->getError()];
			} else {
				$requestid = $this->add();
				$formModel->requestid=$requestid;
				$formdataid = $formModel->add();
				if($requestid>0){
					$return[]=["status"=>1,'msg'=>'流程主信息新增成功!'];
				}else{
					$return[]=["status"=>0,'msg'=>'流程主信息新增失败!'];
				}
				if($formdataid>0){
					$return[]=["status"=>1,'msg'=>'流程表单信息新增成功!'];
				}else{
					$return[]=["status"=>0,'msg'=>'流程主信息新增失败!'];
				}
			}  
		}
		//保存明细表
		if($formdataid>0&&$requestid>0){
			foreach($formdtdeldata as $dtid => $deldata){
				if(empty($deldata))continue;
					
				$delstatus= M("workflowFormtable{$formtableid}dt{$dtid}")->where(['requestid'=>$requestid,'mainid'=>$formdataid,"id"=>["in",$deldata]])->delete();
				if($delstatus>=0){
					$return[]=["status"=>1,'msg'=>'流程明细信息删除成功!'];
				}else{
					$return[]=["status"=>0,'msg'=>'流程明细信息删除失败!'];
				}
			}
			foreach($formdtdata as $dttablename=>$dtdata){//循环多个明细表
				$dtformModel=M($dttablename);
				foreach($dtdata as $data){//循环每个明细表值
					$data['mainid']=$formdataid;
					$data['workflowid']=$workflowid;
					$data['requestid']=$requestid;
					$dtid=$data['id'];
					if($dtid>0){
						if (!$dtformModel->create($data)) {
							$return[]=["status"=>0,'msg'=>$dtformModel->getError()];
						}else{
							$status3 = $dtformModel->where(["id"=>$dtid])->save();
							if($status3>=0){
								$return[]=["status"=>1,'msg'=>'流程明细信息保存成功!'];
							}else{
								$return[]=["status"=>0,'msg'=>'流程明细信息保存失败!'];
							}
						}
					}else{
						unset($data['id']);
						if (!$dtformModel->create($data)) {
							$return[]=["status"=>0,'msg'=>$dtformModel->getError()];
						}else{
							$dtid = $dtformModel->add();
							if($dtid>0){
								$return[]=["status"=>1,'msg'=>'流程明细信息新增成功!'];
							}else{
								$return[]=["status"=>0,'msg'=>'流程明细信息新增失败!'];
							}
						}
					}
				}
			}
		}
		
		return ['requestid'=>$requestid,"return"=>$return];
	}
	
	/**
	*  提交表单
	*/
	
	public function commitform($requestid,$data,$uid){
		
		$type = 1;
		$requestid=$requestid?$requestid:0;
		$requestdata= $this->field("workflowid,formtableid,nodeid")->find($requestid);
		$return =[];
		if($data['nodeid']!=$requestdata['nodeid']){
			$return[]=["status"=>"0","msg"=>"页面已过期；请刷新后重试！"];
			return ["status"=>0,"return"=>$return];
		}
		
		$isOut = false;  	
		$requestProcess=$this->getUserRequestWaitDo($requestid,$uid,$requestdata['nodeid'],1,'1'); 
		if($requestProcess['status']!=1&&$requestProcess['response']==1){
			$return[]=["status"=>"0","msg"=>"没有权限处理该流程！"];
			return ["status"=>0,"return"=>$return];
		}else{
			$this->startTrans();
			if($requestProcess['afternode']&&$requestProcess['response']==0){
				$savedata ['response']="1";
				$savedata ['status']="1";
				$savedata ['memo']=isset($data['requestmemo'])?$data['requestmemo']:'';
				$savedata ["modifyuser"]=$uid;
				$savedata ['modifytime']=date("Y-m-d H:i:s",time());
				$afteruser = $requestProcess['afteruser']?explode(",",$requestProcess['afteruser']):[];
				unset($afteruser[0]);
				if(count($afteruser)>0){
					$newData = $requestProcess;
					unset($newData['id']);
					unset($newData['modifytime']);
					unset($newData['modifyuser']);
					$newData['afteruser']=join(",",$afteruser);
					$newData['createtime']=date("Y-m-d H:i:s",time());
					$newData['createuser']=$uid;
					M('WorkflowRequestbaseProcesslog') ->add($newData);
				}
				M("WorkflowRequestbaseProcesslog")->where(["id"=>$requestProcess['id'] ])->save($savedata);
			}else{
				$newData = [];
				$newData['requestid']=$requestid;
				$newData['response']="1";
				$newData['beforenode']="0";
				$newData['beforeuser']="0";
				$newData['afternode']=$requestdata['nodeid'];
				$newData['afteruser']=$uid;
				$newData['type']="1";
				$newData['status']="1";
				$newData['memo']='创建流程！'; 
				$newData['createtime']=date("Y-m-d H:i:s",time());
				$newData['modifytime']=date("Y-m-d H:i:s",time());
				$newData['modifyuser']=$uid;
				$newData['createuser']=$uid;
				M('WorkflowRequestbaseProcesslog') ->add($newData);
			}
			// dump($uid);exit;
			$return = $this->ForwardTransfer($requestid,$uid,1,false);
			if($return['status']==1){
				$this->commit();
			}else{
				$this->rollback();
			}
			return $return;
			
		}
		
		  
	}
	/**
	*  流程请求处理
	*/
	
	private function requestProcess($process,$data){
		$outfirstuid='';
		$ok=false;
		
		switch($process['undersigntype']){
			case 1: //1一人签署，满足条件 匹配一人跳出
				foreach($process['ruleList'] as $rule){
					if(empty($rule['condition'])||true){
						if($ok==true&&in_array($data['type'],[1,2,3,5])){ //签署通知已满足的情况下 跳过其他
							continue;
						}
						$data['type'] = $rule['processmode'];
						foreach($rule['userList'] as $user){
							$data['afteruser'] .= empty($data['afteruser'])?$user['id']:",".$user['id'];
							break;
						} 
						$logid = M('WorkflowRequestbaseProcesslog')->add($data);
						if($logid>0){
							if(in_array($data['type'],[1,2,3,5])){ //判断输出点若是处理点  编辑 OR 审批 OR 转发  OR 归档
								$ok = true;
								$outfirstuid = $outfirstuid?$outfirstuid:$data['afteruser'];
							}
							$return[]=["status"=>"1","msg"=>"一人签署用户【{$data['type']}】通知成功！"];
						}else{
							$return[]=["status"=>"0","msg"=>"一人签署用户【{$data['type']}】通知失败！"];
						}
					}else{
						continue;
					}
					if($ok)break;
				}
			break;
			case 2: //2会签签署，满足条件 创建5条签署等待记录
				foreach($process['ruleList'] as $rule){
					if(empty($rule['condition'])||true){
						$data['type'] = $rule['processmode'];
						
						foreach($rule['userList'] as $user){ 
							$data['afteruser'] = $user['id'];
							$logid = M('WorkflowRequestbaseProcesslog') ->add($data);
							if($logid>0){
								if(in_array($data['type'],[1,2,3,5])){ //判断输出点若是处理点 编辑 OR 审批 OR 转发  OR 归档
									$ok = true;
									$outfirstuid = $outfirstuid?$outfirstuid:$data['afteruser'];
								}
								$return[]=["status"=>"1","msg"=>"会签签署用户【{$data['type']}】通知成功！"];
								$ok = true;
							}else{
								$return[]=["status"=>"0","msg"=>"会签签署用户【{$data['type']}】通知失败！ "];
							}
						}
					}else{
						continue;
					}
					// if($ok)break;
				}
			break;
			case 3: //3轮流签署，满足条件 创建一条多人排队记录
				foreach($process['ruleList'] as $rule){
					if(empty($rule['condition'])||true){ 
						$data['type'] = $rule['processmode'];
						foreach($rule['userList'] as $user){
							$data['afteruser'] .= empty($data['afteruser'])?$user['id']:",".$user['id'];
						}
						$logid = M('WorkflowRequestbaseProcesslog') ->add($data);
						if($logid>0){
							if(in_array($data['type'],[1,2,3,5])){ //判断输出点若是处理点  编辑 OR 审批 OR 转发  OR 归档
								$ok = true;
								$afteruserArr=explode(",",$data['afteruser']);
								$outfirstuid = $outfirstuid?$outfirstuid:$afteruserArr[0];
							}
							$return[]=["status"=>"1","msg"=>"轮流签署用户【{$data['type']}】通知成功！"];
						}else{
							$return[]=["status"=>"0","msg"=>"轮流签署用户【{$data['type']}】通知失败！"];
						}
					}else{
						continue;
					}
					// if($ok)break;
				}
			break;
		}
		return ["status"=>$ok,"outfirstuid"=>$outfirstuid,"return"=>$return];
	}
	
	/**
	*  通过评审
	*/
	
	public function auditright($requestid,$data,$uid){
		
		$requestid=$requestid?$requestid:0;
		$requestdata= $this->field("workflowid,formtableid,nodeid")->find($requestid);
		if($data['nodeid']!=$requestdata['nodeid']){
			$return[]=["status"=>"0","msg"=>"页面已过期；请刷新后重试！"];
			return ["status"=>0,"return"=>$return];
		}
		$return =[]; 
		$requestProcess=$this->getUserRequestWaitDo($requestid,$uid,$requestdata['nodeid'],2,"2,3"); 
		if(!$requestProcess){
			$return[]=["status"=>"0","msg"=>"错误！"];
			return ["status"=>0,"return"=>$return];
		}else if($requestProcess['status']!=1&&$requestProcess['response']==1){
			$return[]=["status"=>"0","msg"=>"没有权限处理该流程！"];
			return ["status"=>0,"return"=>$return];
		}else{ 
		//anan
			$this->startTrans();
			if($requestProcess['response']==0){
				$savedata ['response']="1";
				$savedata ['status']="1";
				$savedata ['memo']=isset($data['requestmemo'])?$data['requestmemo']:'';
				$savedata ["modifyuser"]=$uid;
				$savedata ['modifytime']=date("Y-m-d H:i:s",time());
				$afteruser = $requestProcess['afteruser']?explode(",",$requestProcess['afteruser']):[];
				unset($afteruser[0]); 
				if(count($afteruser)>0){
					$newData = $requestProcess;
					unset($newData['id']);
					unset($newData['modifytime']);
					unset($newData['modifyuser']);
					$newData['afteruser']=join(",",$afteruser);
					$newData['createtime']=date("Y-m-d H:i:s",time());
					$newData['createuser']=$uid;
					M('WorkflowRequestbaseProcesslog')->add($newData);
				}
				M("WorkflowRequestbaseProcesslog")->where(["id"=>$requestProcess['id'] ])->save($savedata);
			}
			$return = $this->ForwardTransfer($requestid,$uid,1,false);
			if($return['status']==1){
				$this->commit();
			}else{
				$this->rollback();
			}
			return $return;
		}
	}
	
	/**
	*  退回评审
	*/
	
	public function auditback($requestid,$data,$uid){
		$requestid=$requestid?$requestid:0;
		$requestdata= $this->field("workflowid,formtableid,nodeid")->find($requestid);
		if($data['nodeid']!=$requestdata['nodeid']){
			$return[]=["status"=>"0","msg"=>"页面已过期；请刷新后重试！"];
			return ["status"=>0,"return"=>$return];
		}
		$return =[]; 
		
		$requestProcess=$this->getUserRequestWaitDo($requestid,$uid,$requestdata['nodeid'],2,"2,3"); 
		// dump($this->getLastSql());
		// dump($requestProcess);
		if(!$requestProcess){
			$return[]=["status"=>"0","msg"=>"错误！"];
			return ["status"=>0,"return"=>$return];
		}else if($requestProcess['status']!=1&&$requestProcess['response']==1){
			$return[]=["status"=>"0","msg"=>"没有权限处理该流程！"];
			return ["status"=>0,"return"=>$return];
		}else{ 
		//anan
		
			$this->startTrans();
			if($requestProcess['response']==0){
				$savedata ['response']="1";
				$savedata ['status']="2";
				$savedata ['memo']=isset($data['requestmemo'])?$data['requestmemo']:'';
				$savedata ["modifyuser"]=$uid;
				$savedata ['modifytime']=date("Y-m-d H:i:s",time());
				//同一批次同一人发起的当前节点审批情况，有任何一个退回则全部退回
				$where = [
				"response"=>"0",
				"beforenode"=>$requestProcess['beforenode'],
				"afternode"=>$requestProcess['afternode'],
				"beforeuser"=>$requestProcess['beforeuser'],
				"createuser"=>$requestProcess['createuser'],
				"type"=>2,
				];
				M("WorkflowRequestbaseProcesslog")->where($where)->save($savedata);
			}
			
			$return = $this->ForwardTransfer($requestid,$uid,2,false);
			if($return['status']==1){
				$this->commit();
			}else{
				$this->rollback();
			}
			return $return;
		}
	}
	


	/**
	*  归档流程
	*/
	
	public function pigeonhole($requestid,$data,$uid){
		$requestid=$requestid?$requestid:0;
		$requestdata= $this->field("workflowid,formtableid,nodeid")->find($requestid);
		if($data['nodeid']!=$requestdata['nodeid']){
			$return[]=["status"=>"0","msg"=>"页面已过期；请刷新后重试！"];
			return ["status"=>0,"return"=>$return];
		}
		$return =[]; 
		$requestProcess=$this->getUserRequestWaitDo($requestid,$uid,$requestdata['nodeid'],2,"5"); 
		if(!$requestProcess){
			$return[]=["status"=>"0","msg"=>"错误！"];
			return ["status"=>0,"return"=>$return];
		}else if($requestProcess['status']!=1&&$requestProcess['response']==1){
			$return[]=["status"=>"0","msg"=>"没有权限处理该流程！"];
			return ["status"=>0,"return"=>$return];
		}else{ 
		//anan
		
		
			if($requestProcess['response']==0){
				$savedata ['response']="1";
				$savedata ['status']="1";
				$savedata ['memo']=isset($data['requestmemo'])?$data['requestmemo']:'';
				$savedata ["modifyuser"]=$uid;
				$savedata ['modifytime']=date("Y-m-d H:i:s",time());
				$afteruser = $requestProcess['afteruser']?explode(",",$requestProcess['afteruser']):[];
				unset($afteruser[0]); 
				if(count($afteruser)>0){
					$newData = $requestProcess;
					unset($newData['id']);
					unset($newData['modifytime']);
					unset($newData['modifyuser']);
					$newData['afteruser']=join(",",$afteruser);
					$newData['createtime']=date("Y-m-d H:i:s",time());
					$newData['createuser']=$uid;
					M('WorkflowRequestbaseProcesslog') ->add($newData);
				}
				M("WorkflowRequestbaseProcesslog")->where(["id"=>$requestProcess['id'] ])->save($savedata);
				$WaitDoUser = $this->getRequestWaitDoUser($requestid);
				if(count($afteruser)==0){
					//额外其他操作
					
					//关闭流程
					if(count($WaitDoUser)==0){
						M("WorkflowRequestbase")->where(["requestid"=>$requestid,"status"=>"2"])->save(['status'=>3]);
						$return[]=["status"=>"1","msg"=>"归档完成，流程关闭"];
					}
				}else{
					$return[]=["status"=>"1","msg"=>"归档完成"];
				}
				
			}
			
			// $return = $this->ForwardTransfer($requestid,$uid,1);
			
			return ["status"=>1,"return"=>$return];
		}
	}
	
	/**
	*  评审
	*/
	
	public function review($requestid,$data,$uid){
		$requestid=$requestid?$requestid:0;
		$requestdata= $this->field("workflowid,formtableid,nodeid")->find($requestid);
		if($data['nodeid']!=$requestdata['nodeid']){
			$return[]=["status"=>"0","msg"=>"页面已过期；请刷新后重试！"];
			return ["status"=>0,"return"=>$return];
		}
		$return =[]; 
		$requestProcess=$this->getUserRequestWaitDo($requestid,$uid,0,2,"4"); 
		if(!$requestProcess){
			$return[]=["status"=>"0","msg"=>"错误！"];
			return ["status"=>0,"return"=>$return];
		}else if($requestProcess['status']!=1&&$requestProcess['response']==1){
			$return[]=["status"=>"0","msg"=>"没有权限处理该流程！"];
			return ["status"=>0,"return"=>$return];
		}else{ 
		//anan
			if($requestProcess['response']==0){
				$savedata ['response']="1";
				$savedata ['status']="1";
				$savedata ['memo']=isset($data['requestmemo'])?$data['requestmemo']:'';
				$savedata ["modifyuser"]=$uid;
				$savedata ['modifytime']=date("Y-m-d H:i:s",time());
				$afteruser = $requestProcess['afteruser']?explode(",",$requestProcess['afteruser']):[];
				unset($afteruser[0]);  
				M("WorkflowRequestbaseProcesslog")->where(["id"=>$requestProcess['id'] ])->save($savedata);
			} 
			// $return = $this->ForwardTransfer($requestid,$uid,1);
			$return[]=["status"=>"1","msg"=>"评审成功"];
			return ["status"=>1,"return"=>$return];
		}
	}
	
	
	/**
	*  输出表单
	*/
    public function showform($workflowid,$nodeid,$NodeAttr,$isread = false){
		
		$url ="/Workflow/Request/formSubmit";
		$formHtml="";
		$formHtml.= "<h1>".$url."</h1>";
        $formHtml.= '<form method="post" enctype="multipart/form-data" class="form" method="post" enctype="multipart/form-data" action="'.$url.'">';
		$formHtml.= "<table class='formtable' id='formtable{$workflowid}' width='100%' border='1' cellpadding='2' cellspacing ='0' >";
		$formHtml.=$this->showbasetr($workflowid,$nodeid,$NodeAttr['NodeDetail'],$isread);
		// dump($NodeAttr['NodeFields']);
		foreach($NodeAttr['NodeFields'] as $fieldid=>$fieldAttr){
			
			if(stripos($fieldid,"workflow_formtable")>-1){//子明细表单
				if($fieldAttr){
					$formHtml.= "<tr>";
					$childForm=$fieldAttr;
					$childFormValues=isset($NodeAttr['NodeDetail'][$fieldid])?$NodeAttr['NodeDetail'][$fieldid]:array();
					$childformArr = explode("dt",$fieldid);
					$childformid = $childformArr[1]; 
					$formHtml.="<td colspan ='2' >";
					if($isread==false){
						$formHtml.="<script> var formtable_dt{$childformid}_trhtml = \"".$this->showdtnewtr($childformid,$childForm)."\";</script>";
						$formHtml.="<input id = 'form{$childformid}_del' name='form_del[{$childformid}]' value=''>";
						$formHtml.="<div class='dttable_btn' style='text-align:right'><input class='btn btn_add' attr='{$childformid}' type='button' value='添加'/><input class='btn btn_del'  attr='{$childformid}' type='button' value='删除'/></div>";
					}else{
						$formHtml.="<br/>";
					}
					$formHtml.=$this->showdtform($childformid,$childForm,$childFormValues,$isread);
					$formHtml.="</td>";
					$formHtml.=  "</tr>";
				}
			}else if(is_numeric($fieldid)){
				$formHtml.= "<tr>";
				$val= isset($NodeAttr['NodeDetail']["field".$fieldid])?$NodeAttr['NodeDetail']["field".$fieldid]:"";
				$isnew= isset($NodeAttr['NodeDetail']["field".$fieldid])?false:true;
				$formHtml.= $this->showformtd($fieldAttr,$val,1,$isread,0,$isnew);
				$formHtml.=  "</tr>";
			}
			// }else{
				// $formHtml.=  "<td>{$key}</td>";
				// $formHtml.=  "<td>{$val}</td>";
			// }
			
		} 
		$formHtml.=  "</table>";
        $formHtml.=  "</form>";
		return $formHtml;
    }
	
	/**
	*  明细表 新增格式
	* param showtype int 1 默认所有  2只有标题  3只有值
	*/
	public function showdtnewtr($childformid,$childForm){
		$formHtml='';
		//输出标题
		$tempid="{temptrid}";
		$formHtml.= "<tr>"; 
		$formHtml.= "<td><input type='checkbox' name='formtabledt{$childformid}[]' value='{$tempid}' />"; 
		$formHtml.= "<input type='hidden' name='dt_{$childformid}_{$tempid}[id]' value='' /></td>"; 
		// dump($childForm);
		foreach($childForm as $childfieldid=>$childfieldAttr){  
			$formHtml.= $this->showformtd($childfieldAttr,'',3,false,$childformid.'_'.$tempid,true);
		}
		$formHtml.= "</tr>";
			
		
		return $formHtml;
    }
	
	/**
	*  明细表 表单列表
	* param showtype int 1 默认所有  2只有标题  3只有值
	*/
	public function showdtform($childformid,$childForm,$childFormValues,$isread=false,$isnew=false){
		$formHtml='';
		$readStr=$isread?"disabled":"";
		$formHtml.="<table width='100%' class='formtable_dt' id='formtable_dt{$childformid}' border='1' cellpadding='2' cellspacing ='0'>";
			//输出标题
			$formHtml.= "<tr>"; 
			$formHtml.= "<td><input type='checkbox' {$readStr} class='checkall' value='{$childformid}' /></td>"; 
			foreach($childForm as $childfieldid=>$childfieldAttr){
				$formHtml.= $this->showformtd($childfieldAttr,'',2);
			}
			$formHtml.= "</tr>"; 
			foreach($childFormValues as $key=>$childFormValue){
				$formHtml.= "<tr>"; 
				$formHtml.= "<td><input type='checkbox' {$readStr}  name='formtabledt{$childformid}[]' value='".($key+1)."' />"; 
				$formHtml.= "<input type='hidden' name='dt_{$childformid}_{$childFormValue['id']}[id]' value='{$childFormValue['id']}' /></td>"; 
				foreach($childForm as $childfieldid=>$childfieldAttr){ 
					$val=$childFormValue['field'.$childfieldid];
					$formHtml.= $this->showformtd($childfieldAttr,$val,3,$isread,$childformid.'_'.$childFormValue['id'],$isnew);
				}
				$formHtml.= "</tr>";
			} 
		$formHtml.="</table>";
		return $formHtml;
    }
	/**
	*  流程核心字段行
	* param showtype int 1 默认所有  2只有标题  3只有值
	*/
	private function showbasetr($workflowid,$nodeid,$values=array(),$isread=false){
		$nodetype = M("WorkflowNode")->where(["nodeid"=>$nodeid])->getField("nodetype");
		$formHtml='<tr><th>流程名</th><td>';
		if($nodetype!="1"||$isread){
			$formHtml.=(isset($values['requestname'])?$values['requestname']:'');
		}else{
			$formHtml.="<input   name='requestname'  value='".(isset($values['requestname'])?$values['requestname']:'')."'/>";
		}
		
		$formHtml.="<input type='hidden'  name='workflowid'  value='{$workflowid}'/><input type='hidden'  name='nodeid'  value='{$nodeid}'/>";
		$formHtml.="<input  type='hidden' name='requestid'  value='".($values['requestid']?$values['requestid']:'-1')."'/></td></tr>";
		return $formHtml;
	}
	/**
	*  表单单元格
	*  param showtype int 1 默认所有  2只有标题  3只有值
	*/
	private function showformtd($fieldAttr,$val='',$showtype="1",$isread=false,$dtitemid=0,$isnew = false){
		$formHtml='';
		// $fieldArr = explode("__field",$fieldid);
		// $fieldAttr = isset($NodeAttr['NodeFields'][$fieldArr[1]])?$NodeAttr['NodeFields'][$fieldArr[1]]:array();
		if(in_array($showtype,[1,2])){
			$formHtml.=  "<th>{$fieldAttr['fieldtitle']}</th>";
		}
		if(in_array($showtype,[1,3])){ 
			$formHtml.=  "<td>";
			switch($fieldAttr['fieldtype']){
				case 1:
					$formHtml.= $this->inputbox($fieldAttr,$val,$isread,$dtitemid,$isnew);
					break;
				case 2:
					$formHtml.= $this->textbox($fieldAttr,$val,$isread,$dtitemid,$isnew);
					break;
				case 4:
					$formHtml.= $this->datebox($fieldAttr,$val,$isread,$dtitemid,$isnew);
					break;
				case 5:
					$formHtml.= $this->datetimebox($fieldAttr,$val,$isread,$dtitemid,$isnew);
					break;
				case 7:
					$formHtml.= $this->filebox($fieldAttr,$val,$isread,$dtitemid,$isnew);
					break;
				case 8:
					$formHtml.= $this->browsebox($fieldAttr,$val,$isread,$dtitemid,$isnew);
					break;
				case 9:
					$formHtml.= $this->checkbox($fieldAttr,$val,$isread,$dtitemid,$isnew);
					break;
				case 10:
					$formHtml.= $this->selectbox($fieldAttr,$val,$isread,$dtitemid,$isnew);
					break;
			}
		}
		return $formHtml;
	}
	/**
	* input框
	*/
	private function inputbox($fieldAttr,$value='',$isread=false,$dtitemid=0){
		$returnStr="";
		if($isread){
			$returnStr.=$value;
		}else{
			$filetypeStr='';
			$maxlengthStr = $fieldAttr['length']?" maxlength ='{$fieldAttr['length']}' ":"";
			switch($fieldAttr['type']){
				case 1://可编辑
					// $filetypeStr="readonly = 'readonly'";
					break;
				case 2://必填
					// $filetypeStr="readonly = 'readonly'";
					break;
				case 3://只读
					$filetypeStr="readonly = 'readonly'";
					break;
			}
			$name="{$fieldAttr['fieldname']}__field{$fieldAttr['fieldid']}";
			if($dtitemid){
				$name="dt_{$dtitemid}[{$name}]";
			}
			if($filetypeStr=="readonly = 'readonly'"){
				$returnStr.=$value;
			}else{
				$returnStr.="<input {$maxlengthStr} id='{$name}' class='tableinput' name='{$name}'   {$filetypeStr} value='{$value}'/>";
			}
			
		}
		return $returnStr;
	}
	
	/**
	* text框
	*/
	private function textbox($fieldAttr,$value='',$isread=false,$dtitemid=0){
		$returnStr="";
		if($isread){
			$returnStr.=nl2br($value);
		}else{
			$filetypeStr='';
			$maxlengthStr = $fieldAttr['length']?" maxlength ='{$fieldAttr['length']}' ":"";
			switch($fieldAttr['type']){
				case 1://可编辑
					// $filetypeStr="readonly = 'readonly'";
					break;
				case 2://必填
					// $filetypeStr="readonly = 'readonly'";
					break;
				case 3://只读
					$filetypeStr="readonly = 'readonly'";
					break;
			}
			$name="{$fieldAttr['fieldname']}__field{$fieldAttr['fieldid']}";
			if($dtitemid){
				$name="dt_{$dtitemid}[{$name}]";
			}
			if($filetypeStr=="readonly = 'readonly'"){
				$returnStr.=nl2br($value);
			}else{
				$returnStr.="<textarea style='height:100px;width:80%;resize: none;' {$maxlengthStr} class='tabletext' id='{$name}' name='{$name}'  {$filetypeStr}/>{$value}</textarea>";
			}
			
		}
		return $returnStr;
	}
	
	/**
	* 日期框
	*/
	private function datebox($fieldAttr,$value='',$isread=false,$dtitemid=0){
		$returnStr="";
		if($isread){
			$returnStr.=$value;
		}else{
			$filetypeStr='';
			switch($fieldAttr['type']){
				case 1://可编辑
					// $filetypeStr="readonly = 'readonly'";
					break;
				case 2://必填
					// $filetypeStr="readonly = 'readonly'";
					break;
				case 3://只读
					$filetypeStr="readonly = 'readonly'";
					break;
			}
			$name="{$fieldAttr['fieldname']}__field{$fieldAttr['fieldid']}";
			if($dtitemid){
				$name="dt_{$dtitemid}[{$name}]";
			}
			if($filetypeStr=="readonly = 'readonly'"){
				$returnStr.=($value);
			}else{
				$returnStr.="<input class='tabledate' id='{$name}' name='{$name}'  {$filetypeStr} value='{$value}'/>";
			}
			
		}
		return $returnStr;
	}
	
	/**
	* 时间框
	*/
	private function datetimebox($fieldAttr,$value='',$isread=false,$dtitemid=0){
		$returnStr="";
		if($isread){
			$returnStr.=$value;
		}else{
			$filetypeStr='';
			switch($fieldAttr['type']){
				case 1://可编辑
					// $filetypeStr="readonly = 'readonly'";
					break;
				case 2://必填
					// $filetypeStr="readonly = 'readonly'";
					break;
				case 3://只读
					$filetypeStr="readonly = 'readonly'";
					break;
			}
			$name="{$fieldAttr['fieldname']}__field{$fieldAttr['fieldid']}";
			if($dtitemid){
				$name="dt_{$dtitemid}[{$name}]";
			}
			if($filetypeStr=="readonly = 'readonly'"){
				$returnStr.=($value);
			}else{
				$returnStr.="<input class='tabledatetime' id='{$name}' name='{$name}'  {$filetypeStr} value='{$value}'/>";
			}
			
		}
		return $returnStr;
	}
	
	/**
	* 选择框
	*/
	private function checkbox($fieldAttr,$value='',$isread=false,$dtitemid=0,$isnew=false){
		$value = explode(",",$value);
		$returnStr="";
		// dump($fieldAttr['fieldtypechild']);
		if($isread){
			$returnStr.=$fieldAttr['select'][$value]['value'];
		}else{
			$filetypeStr='';
			// $fieldAttr['type']=3;
			switch($fieldAttr['type']){
				case 1://可编辑
					// $filetypeStr="readonly = 'readonly'";
					break;
				case 2://必填
					// $filetypeStr="readonly = 'readonly'";
					break;
				case 3://只读
					$filetypeStr="disabled = 'disabled'";
					break;
			}
			$inputtype=$fieldAttr['fieldtypechild']=="15"?"radio":"checkbox";
			foreach($fieldAttr['select'] as $k=>$v){
				$filedCheckStr='';
				if($value){
					if(in_array($k,$value)){
						$filedCheckStr.=" checked " ;
					}
				}else if($fieldAttr['type']!=3&&$isnew==true){
					if($v['isdefault']==1){
						$filedCheckStr.=" checked " ;
					}
				}
				$name="{$fieldAttr['fieldname']}__field{$fieldAttr['fieldid']}";
				if($dtitemid){
					$name="dt_{$dtitemid}[{$name}][]";
				}
				$returnStr.="<label class='table{$inputtype}_label' >";
				$returnStr.="<input class='table{$inputtype}' id='{$name}' type='{$inputtype}' name='{$name}' {$filedCheckStr}  {$filetypeStr} value='{$k}'/>{$v['value']}";
				$returnStr.="</label>"; 
			}
		
		}
		return $returnStr;
	}
	
	/**
	* 下拉框
	*/
	private function selectbox($fieldAttr,$value='',$isread=false,$dtitemid=0,$isnew=false){
		$returnStr="";
		// dump($fieldAttr['select']);
		if($isread){
			$returnStr.=$fieldAttr['select'][$value]['value'];
		}else{
			$filetypeStr='';
			switch($fieldAttr['type']){
				case 1://可编辑
					// $filetypeStr="readonly = 'readonly'";
					break;
				case 2://必填
					// $filetypeStr="readonly = 'readonly'";
					break;
				case 3://只读
					$filetypeStr="disabled = 'disabled'";
					break;
			}
			$name="{$fieldAttr['fieldname']}__field{$fieldAttr['fieldid']}";
			if($dtitemid){
				$name="dt_{$dtitemid}[{$name}]";
			}
			$returnStr.="<select class='tableselect' id='{$name}'  name='{$name}'  {$filetypeStr}>";
			$returnStr.="<option  value='' >请选择</option>";
			foreach($fieldAttr['select'] as $k=>$v){
				$filedCheckStr='';
				if($value){
					if($value==$k){
						$filedCheckStr.=" selected " ;
					}
				}else if($fieldAttr['type']!=3&&$isnew==true){
					if($v['isdefault']==1){
						$filedCheckStr.=" selected " ;
					}
				}
				$returnStr.="<option value='{$k}' {$filedCheckStr} >{$v['value']}</option>";
			}
			$returnStr.="</select>";
		}
		return $returnStr;
	}
	/**
	* 附件框
	*/
	private function filebox($fieldAttr,$value='',$isread=false,$dtitemid=0){
		$returnStr="";
		if($isread){
			$returnStr.=$value;
		}else{
			$filetypeStr='';
			switch($fieldAttr['type']){
				case 1://可编辑
					// $filetypeStr="readonly = 'readonly'";
					break;
				case 2://必填
					// $filetypeStr="readonly = 'readonly'";
					break;
				case 3://只读
					$filetypeStr="disabled = 'disabled'";
					break;
			}
			$name="{$fieldAttr['fieldname']}__field{$fieldAttr['fieldid']}";
			if($dtitemid){
				$name="dt_{$dtitemid}[{$name}]";
			}
			$returnStr.="<input  class='tablefile' id='{$name}' type='file' name='{$name}'  {$filetypeStr} value='{$value}'/>";
		}
		return $returnStr;
	}
	/**
	* 浏览框
	*/
	private function browsebox($fieldAttr,$value='',$isread=false,$dtitemid=0){
		$returnStr="";
		if($isread){
			$returnStr.=$value;
		}else{
			$filetypeStr='';
			switch($fieldAttr['type']){
				case 1://可编辑
					// $filetypeStr="readonly = 'readonly'";
					break;
				case 2://必填
					// $filetypeStr="readonly = 'readonly'";
					break;
				case 3://只读
					$filetypeStr="readonly = 'readonly'";
					break;
			}
			$name="{$fieldAttr['fieldname']}__field{$fieldAttr['fieldid']}";
			if($dtitemid){
				$name="dt_{$dtitemid}[{$name}]";
			}
			if($filetypeStr="readonly == 'readonly'"){
				$returnStr.=$value;
			}else{
				
				$windowStr='"newwindow","height=400,width=600,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no"';
				$returnStr.="<a href='javascrit:void(0)' onclick='window.open(\"http://www.baidu.com\",{$windowStr})'>按</a>";
				$returnStr.="<input  class='tablebrowse' id='{$name}' type='hidden'  name='{$name}'   {$filetypeStr}  value='{$value}'/>";
			}
			
		}
		return $returnStr;
	}
	
	/**
	*  获取流程待办人
	*/
	public function getRequestWaitDoUser($requestid){
		$Processlogs = $this->alias("a")
							->field("group_concat(b.afteruser) as uids")
							->where(["a.requestid"=>$requestid,"b.response"=>0,"b.type"=>["in","1,2,3,5"]])
							->join("__WORKFLOW_NODE__ c on a.nodeid = c.nodeid",'inner')
							->join("__WORKFLOW_REQUESTBASE_PROCESSLOG__ b on a.requestid = b.requestid and a.nodeid = b.afternode",'inner')
							->find();
	
		return $Processlogs&&!empty($Processlogs['uids'])?explode(",",$Processlogs['uids']):[];
		// dump($Processlogs);
	}
	
	/**
	*  获取流程待办人
	*  param int type 1默认 若没有待办人 判断是否新建  2 必须包含待办人
	*/
	public function getUserRequestWaitDo($requestid,$uid,$nodeid,$type=1,$typeStr="1,2,3,5"){
		 
			$where =  ["a.requestid"=>$requestid,"b.response"=>0,"b.afternode"=>$nodeid,"b.type"=>["in",$typeStr],"_string"=>"b.afteruser = '{$uid}' or b.afteruser like '{$uid},%'"];
			if($nodeid==0){
				unset($where['b.afternode']);
				$joinstr="";
			}else{
				$joinstr="and a.nodeid = b.afternode";
			}
			$Processlogs = $this->alias("a")
							->field("b.*,a.*,b.status as bstatus,c.nodetype")
							->where($where)
							->join("__WORKFLOW_NODE__ c on a.nodeid = c.nodeid",'inner')
							->join("__WORKFLOW_REQUESTBASE_PROCESSLOG__ b on a.requestid = b.requestid {$joinstr}",'left')
							->find();
							// echo $this->getLastSql();
			if(!$Processlogs&&$type==1){
				$Processlogs = $this->alias("a")
								->field("b.*,a.*,b.status as bstatus,c.nodetype")
								->where(["a.requestid"=>$requestid,"b.response"=>["exp","is null"]])
								->join("__WORKFLOW_NODE__ c on a.nodeid = c.nodeid",'inner')
								->join("__WORKFLOW_REQUESTBASE_PROCESSLOG__ b on a.requestid = b.requestid and a.nodeid = b.afternode",'left')
								->find();
			} 
		// echo $this->getLastSql();
		return $Processlogs;
	}
	
	/**
	*  流程 流转
	*  param int type  1通过流转  2退回流转
	*/
	private function ForwardTransfer($requestid,$uid,$type =1,$startTrans=true){
		$requestid=$requestid?$requestid:0;
		$requestdata= $this->field("workflowid,formtableid,nodeid")->find($requestid);
		$isOut = false; 
		$return = [];
		$WaitDoUser = $this->getRequestWaitDoUser($requestid);
		// dump($WaitDoUser);
		if(count($WaitDoUser)==0){//没有其他待办人
			$outnode = "";
			$outfirstuid = "";
			if($startTrans)$this->startTrans();
			if($requestdata){ 
				//节点后附带动作
				//$requestdata['nodeid']
				$NodeOutlets = D("WorkflowOutlet")->getNodeOutlets($requestdata['workflowid'],$type,$requestdata['nodeid']); 
				if($NodeOutlets){ 
					foreach($NodeOutlets as $Outlet){ 
						$processList = D("WorkflowNodeProcess")->getNodeProcess($requestdata['workflowid'],$Outlet['afternode'],$requestid); 
						// dump(D("WorkflowNodeProcess")->getLastSql());
						// echo "<pre>";
						// print_r($processList);
						// exit;
						if(!empty($Outlet["conditionsql"])){
							$num = M("workflow_formtable".$requestdata['formtableid'])->where("requestid = '{$requestid}' and ".$Outlet['conditionsql'])->count();
							if(!$num){//设置了出口逻辑的条件的 查询后无匹配则跳过
								continue;
							}
						}
						
						$ProcesslogData['requestid'] = $requestid;
						$ProcesslogData['beforeuser'] = $uid;
						$ProcesslogData['beforenode'] = $Outlet['beforenode'];
						$ProcesslogData['afternode'] = $Outlet['afternode'];
						$ProcesslogData['response'] = '0';
						$ProcesslogData['afteruser'] ='';
						$ProcesslogData ["createuser"]=$uid;
						$ProcesslogData ['createtime']=date("Y-m-d H:i:s",time());
						foreach($processList as $process ){
							$processreturn = $this->requestProcess($process,$ProcesslogData);
							$outfirstuid = $outfirstuid?$outfirstuid:$processreturn['outfirstuid'];
							$return = array_merge($return,$processreturn['return']);
						}
						$isOut = true;
						 
						
						if($isOut){
							$outnode = $Outlet['afternode'];
								//出口后附带动作
								//$Outlet['affixationsql']
						
						
						
							break;
						}
					}
				}else{
					$return[]=["status"=>"0","msg"=>"没有相应的出口"];
				}
			}else{
				$return[]=["status"=>"0","msg"=>"请求不存在！"];
			}
			
			if($isOut){
				foreach($return as $r){
					if($r['status']==1){
						if($startTrans)$this->commit();
					
						$commitdata["nodeid"] =$outnode;
						$commitdata["status"] =2;
						$commitdata["cur_process"] =$outfirstuid;
						$this->where(["requestid"=>$requestid])->save($commitdata);
						return ["status"=>1,"return"=>$return];
						break;
					}
				}
				if($startTrans)$this->rollback();
				return ["status"=>0,"return"=>$return];
			}else{
				if($startTrans)$this->rollback();
				return ["status"=>0,"return"=>$return];
			}
		}else{
			$return[]=["status"=>"1","msg"=>"等待该节点其他处理人"];
			return ["status"=>1,"return"=>$return];
		}
		
	}
	
	
	
	/**
	*  待办 
	*/
	public function getTodo($map,$uid,$page=1,$limit=20){
		$where =  ["a.status"=>2,"b.response"=>0,"b.type"=>["in",'1,2,3,5'],"_string"=>"b.afteruser = '{$uid}' or b.afteruser like '{$uid},%'"];
		if($map)$where=array_merge($where,$map);
		$list = $this->alias("a")->field("b.*,a.*,b.status as bstatus")
				->where($where)
				->join("__WORKFLOW_REQUESTBASE_PROCESSLOG__ b on a.requestid = b.requestid and a.nodeid = b.afternode",'left')
				->group("a.requestid")->order("a.modifytime asc ")->page($page)->limit($limit)->select();
		$countQuery = $this->alias("a")->field("a.*")
				->where($where)
				->join("__WORKFLOW_REQUESTBASE_PROCESSLOG__ b on a.requestid = b.requestid and a.nodeid = b.afternode",'left')
				->group("a.requestid")->order("a.modifytime asc ")->select(false);
		$count = $this->table("(" . $countQuery.' ) as temp')->count();
        $data['total'] = $count;
        $data['items'] = $list;
		return $data;
	}
	/**
	*  跟踪
	*/
	public function getTrack($map,$uid,$page=1,$limit=20){
		$where =  ["a.status"=>2,"b.response"=>1,"b.type"=>["in",'1,2,3,5'],"_string"=>"b.modifyuser = '{$uid}'"];
		if($map)$where=array_merge($where,$map);
		$list = $this->alias("a")->field("b.*,a.*,b.status as bstatus")
				->where($where)
				->join("__WORKFLOW_REQUESTBASE_PROCESSLOG__ b on a.requestid = b.requestid and a.nodeid = b.afternode",'left')
				->group("a.requestid")->order("a.modifytime desc ")->page($page)->limit($limit)->select();
		$countQuery = $this->alias("a")->field("a.*")
				->where($where)
				->join("__WORKFLOW_REQUESTBASE_PROCESSLOG__ b on a.requestid = b.requestid and a.nodeid = b.afternode",'left')
				->group("a.requestid")->order("a.modifytime desc ")->select(false);
		$count = $this->table("(" . $countQuery.' ) as temp')->count();
        $data['total'] = $count;
        $data['items'] = $list;
		return $data;
	}
	/**
	*  已完成 
	*/
	public function getComplete($map,$uid,$page=1,$limit=20){
		$where =  ["a.status"=>3,"_string"=>"find_in_set('{$uid}',afteruser)"];
		if($map)$where=array_merge($where,$map);
		$list = $this->alias("a")->field("b.*,a.*,b.status as bstatus")
				->where($where)
				->join("__WORKFLOW_REQUESTBASE_PROCESSLOG__ b on a.requestid = b.requestid and a.nodeid = b.afternode",'left')
				->group("a.requestid")->order("a.modifytime desc ")->page($page)->limit($limit)->select();
		$countQuery = $this->alias("a")->field("a.*")
				->where($where)
				->join("__WORKFLOW_REQUESTBASE_PROCESSLOG__ b on a.requestid = b.requestid and a.nodeid = b.afternode",'left')
				->group("a.requestid")->order("a.modifytime desc ")->select(false);
		$count = $this->table("(" . $countQuery.' ) as temp')->count();
        $data['total'] = $count;
        $data['items'] = $list;
		return $data;
	}
	/**
	*  抄送
	*/
	public function getCc($map,$uid,$page=1,$limit=20){
		$where =  ["b.type"=>["in",'4'],"_string"=>"find_in_set('{$uid}',afteruser)"];
		if($map)$where=array_merge($where,$map);
		$list = $this->alias("a")->field("b.*,a.*,b.status as bstatus")
				->where($where)
				->join("__WORKFLOW_REQUESTBASE_PROCESSLOG__ b on a.requestid = b.requestid and a.nodeid = b.afternode",'left')
				->group("a.requestid")->order("a.modifytime desc ")->page($page)->limit($limit)->select();
		$countQuery = $this->alias("a")->field("a.*")
				->where($where)
				->join("__WORKFLOW_REQUESTBASE_PROCESSLOG__ b on a.requestid = b.requestid and a.nodeid = b.afternode",'left')
				->group("a.requestid")->order("a.modifytime desc ")->select(false);
		$count = $this->table("(" . $countQuery.' ) as temp')->count();
        $data['total'] = $count;
        $data['items'] = $list;
		return $data;
	}
}