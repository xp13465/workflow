<?php
namespace Workflow\Controller;
use Think\Controller;
class  WorkFlowManagerController extends  WorkflowController
{
    //新建工作流模块
    public function addModule()
    {
        if (I('post.')) {
            $workflow_category = D('workflow_category');
            $data = I('post.');
            $data['createuser'] = $data['modifyuser'] = $this->uid;
            $data['createtime'] = $data['modifytime'] = date('Y-m-d H:i:s');
            if ($workflow_category->create($data)) {
                $workflow_category->add($data) ? $this->setSuccess('流程模块新增成功') : $this->setError('流程模块新增失败');
            } else {
                $this->setError($workflow_category->getError());
            }
        } else {
            $this->setError('非post提交或参数错误!');
        }
    }
    //获取所有工作流模块
    public function getAllModel()
    {
        if ($_SERVER ['REQUEST_METHOD'] == 'POST' || $_SERVER ['REQUEST_METHOD'] == 'GET') {
            $workflow_category = D('workflow_category');
            $where['validflag'] = '1';
            //分页
            $page_size = I('post.limit') ? I('post.limit') : 20;
            $page_size = is_numeric($page_size) ? $page_size : 20;
            $limit_1 = I('post.start');
            $total = $workflow_category->where($where)->field('id')->count();
            $data = $workflow_category->where($where)->field('categoryid,categoryname,createtime')->limit("$limit_1,$page_size")->order('createtime desc')->select();
            $return_data = array(
                'success' => 1,
                'msg' => '成功',
                'total' => $total,
                'items' => $data,
            );
        } else {
            $return_data = array(
                'success' => 0,
                'msg' => '异常请求',
                'items' => array(),
            );
        }
        $this->printJson($return_data);
    }
    //新建流程(必须选择表单)
    public function  addWorkflow(){
        if (I('post.')) {
            $workflow = D('workflow');
            $data = I('post.');
            $data['createuser'] = $data['modifyuser'] = $this->uid;
            $data['createtime'] = $data['modifytime'] = date('Y-m-d H:i:s');
            if ($workflow->create($data)) {
                $workflow->add($data) ? $this->setSuccess('流程新增成功') : $this->setError('流程新增失败');
            } else {
                $this->setError($workflow->getError());
            }
        } else {
            $this->setError('非post提交或参数错误!');
        }
    }
    //新建表单
    public function  addFormtable(){
          if (I('get.')) {
                    $formtable = D('formtable');
                    $data = I('get.');
                    $data['createuser'] = $data['modifyuser'] = $this->uid;
                    $data['createtime'] = $data['modifytime'] = date('Y-m-d H:i:s');
                      //验证
                    if ($formtable->create($data)) {
                             //新增成功
                            if($formtable->add($data)){
                                 //新建主表
                                 $id=$formtable->getLastInsID();
                                 $tablename='workflow_formtable'.$id;
                                if(!empty($data['parentid'])) {
                                    $tablename = $tablename . 'dt' . $data['parentid'];
                                    $sql = "CREATE TABLE $tablename (
                                      `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
                                      `mainid` int(11) NOT NULL DEFAULT '0' COMMENT '请求ID',
                                      `requestid` int(11) NOT NULL DEFAULT '0' COMMENT '请求ID',
                                      `workflowid` int(11) NOT NULL DEFAULT '0' COMMENT '工作流ID',
                                      `formtableid` int(11) NOT NULL DEFAULT '0' COMMENT '表单ID',
                                      PRIMARY KEY (`id`),
                                      KEY `workflowid` (`workflowid`) USING BTREE,
                                      KEY `requestid` (`requestid`) USING BTREE,
                                      KEY `formtableid` (`formtableid`) USING BTREE
                                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流程自定义表单'";

                                }else {
                                    $sql = "CREATE TABLE $tablename (
                                      `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
                                      `requestid` int(11) NOT NULL DEFAULT '0' COMMENT '请求ID',
                                      `workflowid` int(11) NOT NULL DEFAULT '0' COMMENT '工作流ID',
                                      `formtableid` int(11) NOT NULL DEFAULT '0' COMMENT '表单ID',
                                      PRIMARY KEY (`id`),
                                      KEY `workflowid` (`workflowid`) USING BTREE,
                                      KEY `requestid` (`requestid`) USING BTREE,
                                      KEY `formtableid` (`formtableid`) USING BTREE
                                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流程自定义表单'";
                                }
                                      $flag=M()->execute($sql,true);
                                      if($flag===false){
                                          //回滚－删除表单
                                          $formtable->where(['formtableid'=>$id])->delete();
                                          $this->setError('表单新增失败');
                                      }else {
                                          $this->setSuccess('表单新增成功');
                                      }
                            }else{
                                     $this->setError('表单新增失败');
                            }
                    } else {
                        $this->setError($formtable->getError());
                    }
          } else {
                   $this->setError('非post提交或参数错误!');
          }
    }
    //新建明细表







    //获取所有流程
    public function getAllWorkFlow(){
        if ($_SERVER ['REQUEST_METHOD'] == 'POST' || $_SERVER ['REQUEST_METHOD'] == 'GET') {
            $workflow = M('workflow');
            $where['validflag'] = '1';
            if(I('post.keyword')){
                $keyword=I('post.keyword');
                $where['name'] = array('LIKE',"%".$keyword."%");
            }
            //分页
            $page_size = I('post.limit') ? I('post.limit') : 20;
            $page_size = is_numeric($page_size) ? $page_size : 20;
            $limit_1 = I('post.start');
            $total = $workflow->where($where)->field('id')->count();
            $data = $workflow->where($where)->field('workflowid,workflowname,categoryid,createtime')->limit("$limit_1,$page_size")->order('createtime desc')->select();
            $workflow_category=M('workflow_category');
            //获取所属模块
            foreach($data as $k=>$v){
                $cache=$workflow_category->where(['categoryid'=>$v['categoryid']])->getField('categoryname');
                $data[$k]['categoryname']=$cache;
            }
            $return_data = array(
                'success' => 1,
                'msg' => '成功',
                'total' => $total,
                'items' => $data,
            );
        } else {
            $return_data = array(
                'success' => 0,
                'msg' => '异常请求',
                'items' => array(),
            );
        }
        $this->printJson($return_data);
    }
    //批量修改流程(只能修改流程名称，所属模块)
    public  function  editAllWorkFlow(){
        if (I('post.')) {
            $workflow = D('workflow');
            $editdata = I('post.');
            //先批量验证
            foreach ($editdata as $k => $v) {
                if (empty($v['categoryid']) || empty($v['workflowname'])) $this->setError('流程名称或所属模块不能为空!');
            }
            //再批量更新
            $data['modifyuser'] = $this->uid;
            $data['modifytime'] = date('Y-m-d H:i:s');
            $flag=1;
            $workflow->startTrans();
            foreach ($editdata as $key => $value) {
                  $data['categoryid'] = $value['categoryid'];
                  $data['workflowname'] = $value['workflowname'];
                  if(!$workflow->where(['workflowid'=>$editdata['workflowid']])->save($data))$flag=0;
            }
            if($flag){
                $workflow->commit();
                $this->setSuccess('批量更新成功!');
            }else{
                $workflow->rollback();
                $this->setError("操作失败!");
            }
        }

    }
    //批量修改模块(只能修改模块名称)
   public function editAllModule(){
       if (I('post.')) {
           $workflow_category = D('workflow_category');
           $editdata = I('post.');
           //先批量验证
           foreach ($editdata as $k => $v) {
               if (empty($v['categoryname'])) $this->setError('模块名称不能为空!');
           }
           //再批量更新
           $data['modifyuser'] = $this->uid;
           $data['modifytime'] = date('Y-m-d H:i:s');
           $flag=1;
           $workflow_category->startTrans();
           foreach ($editdata as $key => $value) {
               $data['categoryname'] = $value['categoryname'];
               if(!$workflow_category->where(['categoryid'=>$editdata['categoryid']])->save($data))$flag=0;
           }
           if($flag){
               $workflow_category->commit();
               $this->setSuccess('批量更新成功!');
           }else{
               $workflow_category>rollback();
               $this->setError("操作失败!");
           }
       }
   }
   //返回所有模块下关联的所有流程
  public function AllModuleWorkFlow(){
      if ($_SERVER ['REQUEST_METHOD'] == 'POST' || $_SERVER ['REQUEST_METHOD'] == 'GET') {
             $workflow_category=M('workflow_category');
             $where['a.validflag']= 1;
             $where['b.validflag']=1;
              if(I('post.keyword')){
                  $keyword=I('post.keyword');
                  $where['a.workflowname'] = array('LIKE',"%".$keyword."%");
              }
             $return_data=$workflow_category->alias('a')->field('a.categoryname,b.workflowid,b.workflowname')->join('LEFT JOIN workflow b ON a.categoryid=b.categoryid')->where($where)->select();
       } else {
              $return_data = array(
                  'success' => 0,
                  'msg' => '异常请求',
                  'items' => array(),
              );
      }
     $this->printJson($return_data);
  }
    //流程信息查看
    public  function  viewWorkFlow(){
        if (I('post.workflowid')&&is_numeric(I('post.workflowid'))) {
             $workflow=M('workflow');
             $return_data=$workflow->field('customizenumber,mailmessage,filepath')->where(['workflowid'=>I('post.workflowid')])->select();
        }else{
             $return_data=$this->returnFasle();
        }
             $this->printJson($return_data);
    }
    //流程信息修改
    public  function editWorkFlow(){
        if (I('post.workflowid')&&is_numeric(I('post.workflowid'))) {
            $workflow=D('workflow');
            $data['mailmessage'] = I('post.mailmessage');
            $data['customizenumber']=I('post.customizenumber');
            $data['filepath']=I('post.filepath');
            $data['modifyuser'] = $this->uid;
            $data['modifytime'] = date('Y-m-d H:i:s');
            if ($workflow->create($data)) {
                $workflow->where(['workflowid'=>I('post.workflowid')])->add($data) ? $this->setSuccess('流程更新成功') : $this->setError('流程更新失败');
            } else {
                $this->setError($workflow->getError());
            }
        }else{
           $this->returnFalse();
        }
    }
   public function returnFalse(){
        $return_data = array(
           'success' => 0,
           'msg' => '非post提交或参数错误!',
           'items' => array(),
       );
       $this->printJson($return_data);
   }

}