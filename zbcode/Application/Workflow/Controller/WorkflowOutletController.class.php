<?php

namespace Workflow\Controller;

use Think\Controller;

class WorkflowOutletController extends WorkflowController{

    /*
     * 出口设置--R
     * */
    public function outSet(){
        $data['name'] = I('post.name');
        $data['beforenod'] = I('post.beforenod');
        $data['afternod'] = I('post.afternod');
        $data['type'] = I('post.type');
        $data['rule'] = I('post.rule');
        $data['createuser'] = $this->mid;
        $data['createtime'] = date('Y-m-d H:i:s');
        $res=M('workflow_outlet')->add($data);
        if($res){
            $this->setSuccess('出口设置成功');
        }else{
            $this->setError('出口设置失败');
        }
    }

    /**
     * 出口设置---操作条件 -R
     * @param workflowid;
     */
    public function operateCondition(){

        $workflowid = I('post.workflowid');
        //模拟数据
        $workflowid = 1;
        if(!$workflowid){
            $this->setError('工作流id必填');
        }

        // $nodeid = I('post.nodeid');
        $res=D('workflowNode')->SelectFields($workflowid);
        $this->printJson($res);
}

    /*
     * 出口设置-起始节点-到达节点 -R
     * @param $workflowid;
     * */
    public function nodeslist(){

        $workflowid = I('post.workflowid');
        //模拟数据
        // $workflowid = 1;

         if(!$workflowid){
            $this->setError('工作流id必填');
        }
        $node = D('workflowOutlet');
        $nodelist=$node->nodelist($workflowid);
        $this->printJson($nodelist);

    }

    /*
     * 出口列表
     * @param $workflowid -R
     * */

    public function outletList(){

        $workflowid = I('post.workflowid');
        //模拟数据
        $workflowid = 1;

        if(!$workflowid){
            $this->setError('工作流id必填');
        }

        $outlist = D('workflowOutlet')->outlist($workflowid);

        $this->printJson($outlist);

    }

    /*
     * 删除某个出口
     * @param outletid
     * */
    public function  delOutletList(){

        $outletid = I('post.outletid');

        //模拟数据
        // $outletid = 11;

        if(!$outletid){
            $this->setError('请至少选择一个出口');
        }

        $outletid = '('.$outletid.')';

        $ans = D('workflowOutlet')->delOutlist($outletid);
        if($ans){
            $this->setSuccess('删除出口成功');
        }else{
            $this->setError('删除出口失败');
        }

    }


    /**
     * 编辑某个出口展现
     * @param $outletid
     */

    public function viewThisOut(){

        $outletid = I('post.outletid');//

        if(!$outletid){
            $this->setError('outletid 必填');
        }

        $data = D('workflowOutlet')->viewThisOut($outletid);

        return $data;

    }

    /**
     * 编辑某个出口
     * @param $outletid
     */
    public function editOutlet(){

        // $outletid = I('post.outletid');//
        // if(!$outletid){
        //     $this->setError('outletid 必填');
        // }
        // $outletid = "(".$outletid.")";
        $data = I('post.');
        
        $ans = D("workflowOutlet")->editThisout($data);

        if($ans){
            $this->setSuccess('编辑成功');
            }else{
            $this->setError('编辑失败');
            }
    }

}