<?php
namespace Workflow\Controller;

use Think\Controller;

class RequestController extends WorkflowController 
{
	
	/**
	*	可发起列表
	*/
	public function intiateList(){ 
	
		$get = I('param.');
        $data = M("Workflow")->alias("a")
		->field("a.workflowid,a.categoryid,a.formtableid,a.workflowname,b.nodeid,b.nodename,b.nodetype")
		->join("__WORKFLOW_NODE__ b on a.workflowid = b.workflowid and b.nodetype = 1") //关联创建节点
		->group("a.workflowid")//保证流程不重复
		->select();
		dump($data);
		$this->echoJson($data); 
    }
	
	/**
	*	待办列表
	*/
	public function todoList(){ 
		$get = I('param.');
        $page = $get['page'] ? $get['page'] : 1;
        $limit = $get['limit'] ? $get['limit'] : 20;
		$where = [] ;
		if(!empty($get['request_number'])){
			$where['a.request_number'] = $get['request_number'];
		}
		$data = D("WorkflowRequestbase")->getTodo($where,$this->uid,$page,$limit);
		$this->echoJson($data); 
    }
	/**
	*	跟踪列表
	*/
	public function trackList(){
        $get = I('param.');
        $page = $get['page'] ? $get['page'] : 1;
        $limit = $get['limit'] ? $get['limit'] : 20;
		$where = [] ;
		
		$data = D("WorkflowRequestbase")->getTrack($where,$this->uid,$page,$limit);
		$this->echoJson($data);
    }
	/**
	*	已完成列表
	*/
	public function completeList(){
		$get = I('param.');
        $page = $get['page'] ? $get['page'] : 1;
        $limit = $get['limit'] ? $get['limit'] : 20;
		$where = [] ;
		
		$data = D("WorkflowRequestbase")->getComplete($where,$this->uid,$page,$limit);
		$this->echoJson($data);
    }
	/**
	*	抄送列表
	*/
	public function ccList(){
        $get = I('param.');
        $page = $get['page'] ? $get['page'] : 1;
        $limit = $get['limit'] ? $get['limit'] : 20;
		$where = [] ;
		
		$data = D("WorkflowRequestbase")->getCc($where,$this->uid,$page,$limit);
		$this->echoJson($data);
    }
	
	/**
	*	流程查看
	*/
	public function view($showtype=1){
        $requestid=I("get.requestid",-1);
		$requestdata= D("WorkflowRequestbase")->where(["requestid"=>$requestid])->field("workflowid,formtableid,nodeid,status,createuser")->find();
		if($requestdata&&$requestdata['status']!=1){
			$workflowid = $requestdata['workflowid'];
			$formtableid = $requestdata['formtableid'];
			$curnodeid = $requestdata['nodeid'];
		}else{ 
			$this->setError("请求不存在！");
		}
		$WorkflowRequestbaseModel=D("WorkflowRequestbase"); 
		
		//用户是否属于当前处理人 //1编辑  2审批  5归档
		// $requestProcess=$WorkflowRequestbaseModel->getUserRequestWaitDo($requestid,$this->uid,$curnodeid,1,"1,2,3,5");
		// if(!$requestProcess){
			//用户是否属于当前处理人 //3转发  4抄送
			$requestProcess=$WorkflowRequestbaseModel->getUserRequestWaitDo($requestid,$this->uid,0,1,"4");
		// }
		 
		//用户参与的最后一条记录
		$lastProcessLog=$WorkflowRequestbaseModel->alias("a")->field("b.afternode")
							->where(["a.requestid"=>$requestid,"_string"=>"FIND_IN_SET('{$this->uid}', b.afteruser)"])
							->join("__WORKFLOW_REQUESTBASE_PROCESSLOG__ b on a.requestid = b.requestid",'inner')
							->order("b.createtime desc")
							->find();  
		$isread=true;
		$isauth = false;
		if($requestdata['status']!=1&&$requestProcess){ //流转中的流程并且属于当前待操作人  以流程当前节点展示
			$isread=false;
			$nodeid = $curnodeid;
		}else if($requestdata['createuser']==$this->uid){ //属于创建人  以发起节点字段展示
			$isread=false;
			$WorkflowNode = M("WorkflowNode")->field('nodeid')->where(['workflowid'=>$workflowid,'nodetype'=>"1"])->find();
			$nodeid = $WorkflowNode['nodeid']; 
		}else if($isauth){ //属于特殊权限人
			$isread=true;
		}else if($lastProcessLog){ //属于参与者 
			$isread=true;
			$nodeid = $lastProcessLog['afternode']; 
		}else{
			$this->setError("无权限查看该流程！");
		} 
		$this->requestShow($requestid,$requestdata,$requestProcess,$workflowid,$formtableid,$nodeid,$isread,$showtype);
		exit;
    }
	
	/**
	*	流程表单 
	*  param int showtype  1默认   2只显示信息格式  
	*/
	public function form($showtype=1){
		
		$requestid=I("get.requestid",-1);
		$requestdata= D("WorkflowRequestbase")->where(["requestid"=>$requestid])->field("workflowid,formtableid,nodeid,status,createuser")->find();
		if($requestdata){
			$workflowid = $requestdata['workflowid'];
			$formtableid = $requestdata['formtableid'];
			$curnodeid = $requestdata['nodeid'];
		}else{ 
			$workflowid = I("get.workflowid",1); 
			$Workflow = M("Workflow")->field('formtableid')->where(['workflowid'=>$workflowid])->find();
			$formtableid = $Workflow['formtableid'];
			$WorkflowNode = M("WorkflowNode")->field('nodeid')->where(['workflowid'=>$workflowid,'nodetype'=>"1"])->find();
			$curnodeid = $WorkflowNode['nodeid'];
		}
		$WorkflowRequestbaseModel=D("WorkflowRequestbase"); 
		
		//用户是否属于当前处理人 //1编辑  2审批 3转发 5归档
		$requestProcess=$WorkflowRequestbaseModel->getUserRequestWaitDo($requestid,$this->uid,$curnodeid,1,"1,2,3,5");
		dump($curnodeid);
		dump($this->uid);
		dump($requestProcess);
		if(!$requestProcess){
			//用户是否属于当前处理人 //  4抄送
			$requestProcess=$WorkflowRequestbaseModel->getUserRequestWaitDo($requestid,$this->uid,0,1,"4");
		}
		 
		//用户参与的最后一条记录
		$lastProcessLog=$WorkflowRequestbaseModel->alias("a")->field("b.afternode")
							->where(["a.requestid"=>$requestid,"_string"=>"FIND_IN_SET('{$this->uid}', b.afteruser)"])
							->join("__WORKFLOW_REQUESTBASE_PROCESSLOG__ b on a.requestid = b.requestid",'inner')
							->order("b.createtime desc")
							->find();  
		
		$isauth = false;
		if(!$requestdata||$requestdata['status']==1){ //新建或暂存状态  //以当前节点(新建时第一节点)
			$nodeid = $curnodeid;
			$isread = false;
		}else if($requestdata['status']!=1&&$requestProcess){ //流转中的流程并且属于当前待操作人  以流程当前节点展示
			$nodeid = $curnodeid;
			$isread = false;
		}else if($requestdata['createuser']==$this->uid){ //属于创建人  以发起节点字段展示
			$isread = true;
			$WorkflowNode = M("WorkflowNode")->field('nodeid')->where(['workflowid'=>$workflowid,'nodetype'=>"1"])->find();
			$nodeid = $WorkflowNode['nodeid']; 
		}else if($isauth){ //属于特殊权限人
			$isread = true;
		}else if($lastProcessLog){ //属于参与者 
			$isread = true;
			$nodeid = $lastProcessLog['afternode']; 
		}else{
			$this->setError("无权限查看该流程！");
		}
		
		if(in_array($requestdata['status'],[3,4])){ //已完成流程和已关闭流程强行只读
			$isread=true;
		}
		
		
		$this->requestShow($requestid,$requestdata,$requestProcess,$workflowid,$formtableid,$nodeid,$isread,$showtype);
		// exit;
    }
	
	private function requestShow($requestid,$requestdata,$requestProcess,$workflowid,$formtableid,$nodeid,$isread=true,$showtype=1){
		$WorkflowRequestbaseModel=D("WorkflowRequestbase"); 
		$NodeFields=$WorkflowRequestbaseModel->getNodeFormtableAttr($workflowid,$formtableid,$nodeid);
        $NodeDetail=$WorkflowRequestbaseModel->getDetail($requestid,$nodeid);
		 // var_dump($NodeDetail);
		$AllProcesslog=D("WorkflowRequestbaseProcesslog")->getAllProcesslog($requestid);
		
		// var_dump($nodeid);
		//执行节点前额外操作
		if($isread == false){ 
			$beforesql= M("WorkflowNode")->where(["nodeid"=>$nodeid])->getField("beforesql");
			// echo $beforesql;
			$pattern ="/`(.*?)`.*?[=].*?'(.*?)'/i";
			preg_match_all($pattern, $beforesql, $matches);
			// dump($matches);
			$beforeDetail = explode("and",$beforesql);
			foreach($matches[1] as $k=>$field){
				$value=$matches[2][$k];
				$NodeDetail[$field]=$value;
			}
			// dump($NodeDetail);
			// dump($beforesql);
		}
		$NodeAttr['NodeFields']=$NodeFields;
		$NodeAttr['NodeDetail']=$NodeDetail;
		// var_dump($NodeDetail);exit;
		if($showtype==2){
			$this->echoJson($NodeAttr);
			exit;
		}else{
			$formHtml = D("WorkflowRequestbase")->showform($workflowid,$nodeid,$NodeAttr,$isread);
			$this->assign("formHtml",$formHtml);
			$this->assign("requestProcess",$requestProcess);
			$this->assign("requestdata",$requestdata);
			$this->assign("AllProcesslog",$AllProcesslog);
			$this->assign("isread",$isread);
			$this->display("form");
		}
		
		// exit;
		
	}
	
	/**
	*	流程表单
	*/
	public function formSubmit($type=1)
	{ 
		// echo "<pre>";
		// print_r($_POST);
		// exit;
		$requestid = I("post.requestid",-1);
		$WorkflowRequestbaseModel =D("WorkflowRequestbase");
		$data=I("post.");
		$returnArr=[];
		$returntitle = $truemsg = "";
		$requestdata= $WorkflowRequestbaseModel->alias("a")
							->field("b.nodetype,a.nodeid")
							->join("__WORKFLOW_NODE__ b on a.nodeid = b.nodeid")
							->find($requestid);
		
		// dump($requestdata);exit;
		// dump($requestdata);
		if($requestdata&&$data['nodeid']!=$requestdata['nodeid']){
			$returnArr[]=["status"=>"0","msg"=>"页面已过期；请刷新后重试！"];  
		}else{
		// exit;
			switch($type){
				case 1: //保存表单
					$returntitle="保存";
					$savereturn = $WorkflowRequestbaseModel->saveform($requestid,$data,$this->uid);
					$requestid = $savereturn['requestid'];
					$returnArr = array_merge($returnArr,$savereturn['return']);
					break;
				case 2: //提交表单
					if($requestdata&&!in_array($requestdata['nodetype'],[1])){
						$returnArr[]=["status"=>"0","msg"=>"错误的操作行为！"];
						break;
					}
					$returntitle="提交";
					$savereturn = $WorkflowRequestbaseModel->saveform($requestid,$data,$this->uid);
					$requestid = $savereturn['requestid'];
					$returnArr = array_merge($returnArr,$savereturn['return']);
					$hasError = false;
					foreach($returnArr as $return){
						if($return['status']==0){
							$hasError=true;
							break;
						}
					}
					if($hasError)break;
					$commitreturn = $WorkflowRequestbaseModel->commitform($savereturn['requestid'],$data,$this->uid);
					$returnArr = array_merge($returnArr,$commitreturn['return']);
					
					if($commitreturn['status']==1){
						
					}else{
						$errormsg .= "没有匹配的出口节点";
					}
					break;
				case 3: //通过评审
					if(!in_array($requestdata['nodetype'],[2,3])){
						$returnArr[]=["status"=>"0","msg"=>"错误的操作行为！"];
						break;
					}
					$returntitle="通过";
					$savereturn = $WorkflowRequestbaseModel->saveform($requestid,$data,$this->uid);
					$returnArr = array_merge($returnArr,$savereturn['return']);
					$rightreturn =$WorkflowRequestbaseModel->auditright($savereturn['requestid'],$data,$this->uid);
					$returnArr = array_merge($returnArr,$rightreturn['return']);
					break;
				case 4: //退回评审
					if(!in_array($requestdata['nodetype'],[2])){
						$returnArr[]=["status"=>"0","msg"=>"错误的操作行为！"];
						break;
					}
					$returntitle="退回";
					$savereturn = $WorkflowRequestbaseModel->saveform($requestid,$data,$this->uid);
					$returnArr = array_merge($returnArr,$savereturn['return']);
					$backreturn =$WorkflowRequestbaseModel->auditback($savereturn['requestid'],$data,$this->uid);
					$returnArr = array_merge($returnArr,$backreturn['return']);
					break;
				case 5: //评审
					$returntitle="评审";
					$reviewreturn = $WorkflowRequestbaseModel->review($requestid,$data,$this->uid);
					$returnArr = array_merge($returnArr,$reviewreturn['return']);
					break;
				case 6: //归档流程
					if(!in_array($requestdata['nodetype'],[4])){
						$returnArr[]=["status"=>"0","msg"=>"错误的操作行为！"];
						break;
					}
					$returntitle="归档";
					$pigeonholereturn = $WorkflowRequestbaseModel->pigeonhole($requestid,$data,$this->uid);
					$returnArr = array_merge($returnArr,$pigeonholereturn['return']);
					break;	
				default:
					$errormsg .= "异常";
					break;
			}
		}
		
        foreach($returnArr as $return){
			if($return['status']==0){
				$errormsg.=$return['msg'];
			}
		}
	
		
		
		if(empty($errormsg)){
			$this->echoJson(["status"=>"1","requestid"=>$requestid,"msg"=>$returntitle."成功！"]);
		}else{
			$this->setError($returntitle."失败！(".$errormsg.")");
		}
		
		
    }
	
}