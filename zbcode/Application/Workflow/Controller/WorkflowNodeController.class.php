<?php
namespace Workflow\Controller;

use Think\Controller;

class WorkflowNodeController extends  WorkflowController
{

    public $mid = 0;
    /**
     * 输出数据列表及总条数
     * @param $items
     * @param $total
     */
    protected function printJson($items, $total = '')
    {
        $json = array();
        if ($items && $total != '') {
            $json = array(
                'total' => $total,
                'items' => $items,
            );
        } else if (isset($items['total']) && isset($items['items'])) {
            $json = &$items;
        } else if (is_array($items)) {
            $json = &$items;
        }
        $this->echoJson($json);
    }


    /**
    * 获取-节点类型-2016-04-07 author lj R
    */

    public function getNodetype(){

         $nodetype = D('workflowNode')->getNodetype();
         $this->printJson($nodetype);
    }

    /**
     * 获取-基本规则-2016-04-07 author lj R
     */

    public function getBaseRule(){

        $baseRule = D('workflowNode')->getBaseRule();
        $this->printJson($baseRule);
    }

    /**
     * 获取-操作模式 R
     */
    public function getProcessMode(){

        $processmode = D('workflowNode')->getProcessMode();
        $this->printJson($processmode);

    }
    /**
     * 获取-筛选条件 2016-04-07 author lj
     */
    public function getCondition(){

        $condition = D('workflowNode')->getCondition();
        $this->printJson($condition);
    }

    /**
     * 统一的json输出方法
     * @param $data
     */
    protected function echoJson($data)
    {
        //header('Content-type:text/html; charset=utf-8');
        $type = C('PRINT_JSON');
        if ($type == 'json') {
            echo json_encode($data);
        } else if ($type == 'json_base64') {
            echo base64_encode(json_encode($data));
        } else {
            echo $this->setError('未知的数据格式');
        }
        exit;
    }


    /*
    *批量编辑-添加节点-2016-04-06 -t
    @param workflowid int
    @如果编辑的时候有新添加的节点
    @param nodeid;ex:1,2,3
    */
    public function addwfNode(){

        $workflowid =  I('param.workflowid');
        $nodeid = "(".I('param.nodeid').")";
        $data = array();
        $data['workflowid'] = $workflowid;
        foreach (I('param.') as $key => $value) {
            $data['nodeid'] = $value['nodeid'];
            $data['nodename']  = $value['nodename'];//节点名称
            $data['nodetype'] = $value['nodetype'];
            $data['order'] = $value['order'];
            $data['createtime'] = date('Y-m-d H:i:s');
            $data['creator'] = $this->mid;
            if($data['nodeid']){
                 $res = D('workflowNode')->where('nodeid='.$data['nodeid'])->save($data);
            }else{
                 $res = D('workflowNode')->add($data);
                 //再添加节点的同时添加一个节点操作
                if($res){
                    $wdata = array();
                    $wdata['workflowid'] =  $workflowid;
                    $wdata['nodeid'] = $res;
                    $wdata['createtime'] = date('Y-m-d H:i:s');
                    $wdata['createuser'] = $this->mid;
                    $re = M('workflownodeprocess')->add($wdata);
                    if(!$re){
                        M('workflownodeprocess')->rollback();
                    }
                }
            }
        }
        
        if($res){
             $this->setSuccess('操作成功');
            }else{
             $this->setError('节点添加失败');
            }


    }


/*
    批量修改的节点列表 -R
    @param nodeid 
*/

public function Selectedlist(){
     $nodeid = I('param.nodeid');
     //测试数据
     $nodeid = 1;
     if(!$nodeid){
        $this->echoJson('nodeid必填');
     }
     $nodeid = "(".$nodeid.")";
     $curpage = I('param.curpage',1);//当前页(默认为1)
     $limit = I('param.limit',10);//一页显示多少条
     $data = array();
     $data = D('workflowNode')->Selectedlist($nodeid,$curpage,$limit);
     $this->printJson($data);

}



//为某个流程配置节点 -R
    public function setWfNode(){
        $nodeid = I('param.nodeid');
        //测试数据 $nodeid
        $nodeid=5;
        if(!$nodeid){
            $this->echoJson('nodeid 必填');
        }
        $data=array();
      
        // $data['workflowid']=I('param.workflowid');
        $data['nodename'] = I('param.nodename');
        $data['nodetype'] = I('param.nodetype');
        $data['order'] = I('param.order');
        $data['designrow'] = I('param.designrow');
        $data['designdesc'] = I('param.designdesc');
        $data['createtime'] = date('Y-m-d H:i:s');
        $data['creator'] = $this->mid;

        $res1=M('workflow_node')->where('nodeid='.$nodeid)->save($data);
      
       if($res1!==false){
            $this->setSuccess('节点配置成功');
        }else{
            $this->setError('节点配置失败,请联系开发人员');
        }
    }

    /*
     * 节点管理-批量编辑 -R
     * @param $id=1,23,2
     * */
    public function DelNodes(){
        $nodeid = I('post.nodeid');
        //测试数据
        $nodeid = 5;
        if(!$nodeid){
            $this->echoJson('节点id必填');
        }
        $nodeid = "(".$nodeid.")";

        $res = D('workflowNode')->DelNodelist($nodeid);

        if(!$res){
                $this->setError('删除失败');
            }else{
                $this->setSuccess('操作成功');
            }

    }




//操作节点
    // public function operateWfNode(){
    //     $data = array();
    //     $data['workflowid'] = I('param.workflowid');//工作流id
    //     $data['nodeid'] = I('param.nodeid');//节点id
    //     $data['processname'] = I('param.processname');
    //     $data['undersigntype'] = I('param.undersigntype');
    //     $data['creatuser'] = $this->mid;//$this->mid;
    //     $data['createtime'] = date('Y-m-d H:i:s');

    //     $res = M('workflow_node_process')->add($data);

    //     if($res){
    //         $this->printjson('节点操作成功');
    //     }else{
    //         $this->printjson('节点操作失败,请联系开发人员');
    //     }
    // }

    //操作节点规则 -R
    public function operateNodeRules(){

        $data = [];
        $data['processid'] = I('param.processid');
        $data['type'] = I('param.type');
        $data['relation'] = I('param.relation');
        $data['fieldid'] = I('param.fieldid');
        $data['userid'] = I('param.userid');
        $data['roleid'] = I('param.roleid');
        $data['organizationid'] = I('param.organizationid');
        $data['departmentid'] = I('param.departmentid');
        $data['condition'] = I('param.condition');
        $data['processmode'] = I('param.processmode');
        $data['param.order'] = I('param.order');
        $data['creatuser'] = $this->mid;
        $data['creattime'] = date('Y-m-d H:i:s');

        $res = M('workflow_node_process_rule')->add($data);

        if($res){
            $this->setSuccess('节点规则操作成功');
        }else{
            $this->setError('节点规则操作失败,请联系开发人员');
        }

    }

    //工作流节点字段属性 R

    public function wfNodeAttr(){
        $data = array();
        $data['fieldid'] = I('param.fieldid');
        $data['nodeid'] = I('param.nodeid');
        $data['type'] = I('param.type');
        $data['default'] = I('param.default');
        $data['prompt'] = I('param.prompt');
        $data['creatuser'] = $this->mid;
        $data['creattime'] = date('Y-m-d H:i:s');
        $res=M('workflow_node_fields')->add($data);
        if($res){
            $this->setSuccess('字段属性操作成功');
        }else{
            $this->setError('字段属性操作失败,请联系开发人员');
        }
    }

    //工作流节点出口 R

    public function wfOutlet(){

        $data = array();
        $data['workflowid'] = I('param.workflowid');//工作流id
        $data['name'] = I('param.name');
        $data['beforenode'] = I('param.beforenode');
        $data['type'] = I('param.type');
        $data['afternode'] = I('param.afternode');
        $data['rule'] = I('param.rule');
        $data['conditiondesc'] = I('param.conditiondesc');
        $data['conditionsql'] = I('param.conditionsql');
        $data['creatuser'] = $this->mid;
        $data['creattime'] = date('Y-m-d H:i:s');
        $res=M('workflow_outlet')->add($data);
        if($res){
            $this->setSuccess('节点出口配置成功');
        }else{
            $this->setError('节点出口配置失败,请联系开发人员');
        }

    }
    //查询一套流程的字段

   //  public function selectThisWorkflow(){

   //      $sql="SELECT
			// 	a.*, b.processname,c.fieldid,d.type,e.name
			// FROM
			// 	`workflow_node` AS a
			// LEFT JOIN workflow_node_process AS b ON a.nodeid = b.nodeid
			// left join workflow_node_process_rule as c on c.processid=b.processid
			// left join workflow_node_fields as d on d.nodeid=a.nodeid
			// left join workflow_outlet as e on e.workflowid=a.workflowid";

   //      $data = M('')->query($sql);

   //      return $data;

   //  }

    /*
     * @param workflowid;R
     * @param
     * */
    public function viewThisNode(){
        $workflowid = I('post.param');//工作流id
        $where = '';
        //测试数据
        $workflowid = 1;
        if(!$workflowid){
            $this->setError('工作流id必填');
        }else{
          $where .= "workflowid={$workflowid}";
        }
         $page = I('post.page',1);
         $limit = I('post.limit',10);
         $node = D('workflowNode');
         $res=$node->SomeNodes($where,$page,$limit);
        return $this->printJson($res);
    }

    /*
     * 节点- 基本设置 -R
     * @param $nodeid
     * */
    public function SetThisNode(){
        $nodeid = I('post.nodeid');
        //测试数据
        $nodeid = 1;
        $where = '';
        if(!$nodeid){
            $this->setError('节点id必填');
        }else{
            $where .= "nodeid={$nodeid}";
        }
        $nodeset = D('workflowNode');

        $res=$nodeset -> ViewNodeSet($where);
        return $this->printJson($res);
    }

    /*
     * 基本设置-提交保存 -R
     * $id
     * */
    public function SetCommit(){

        $nodeid = I('post.nodeid');//节点id

        //测试数据
        $nodeid = 5;
        if(!$nodeid){
            $this->setError('节点id必填');
        }
        
        $data['nodename'] = I('post.nodename');
        $data['nodetype'] = I('post.nodetype');
        $data['order'] = I('post.sort');
        $res=D('workflowNode')->where("nodeid={$nodeid}")->save($data);
        if($res!==false){
            $this->setSuccess('保存成功');
        }else{
            $this->setError('保存失败');
        }

    }


    /*
     * 字段设置 -R
     * $param nodeid 节点id $workflowid
     * */
    public function SelectFields(){
        $nodeid = I('post.nodeid');
        $workflowid = I('post.workflowid');
        //测试数据
        $workflowid = 1;
        $res=D('workflowNode')->SelectFields($workflowid);
        return $this->printJson($res);
    }


    /*
     * 字段编辑-只读 可编辑 必填 -R
    */

    public function getFieldType(){

        $list = D('workflowNode')->getFieldType();
        $this->printJson($list);


    }


    /*
     * 字段设置-提交保存 -R
     * @param
     * */
    public function setFieldsCommit(){
        $fields = I('post.');
        //测试数据
        // $fields[0]['nodeid'] = 5;
        // $fields[0]['fieldid'] = 5;
        // $fields[0]['fieldtype'] = 5;

        foreach ($fields as $key => $value) {

            $data['nodeid'] =$value['nodeid'];
            $data['fieldid'] =$value['fieldid'];
            $data['type'] = $value['fieldtype'];
            $data['createtime'] = date('Y-m-d H:i:s');
            $data['createuser'] = $this->mid;
            $res=M('workflow_node_fields')->add($data);
        }
        if($res){
                $this->setSuccess('保存成功');
               }else{
                $this->setError('保存失败');
                 }
    }

    /**
    * 规则设置-操作条件-编辑 2016-04-07 author lj -R
    * @param nodeid
    */

    public function conditionMatch(){

         $nodeid = I('param.nodeid');
         //测试数据
         $nodeid = 1;
         if(!$nodeid){
             $this->echoJson('节点id必填');
         }
         $list = D('workflowNode')->conditionMatch($nodeid);

         $this->printJson($list);

    }


    /*
     *规则设置-基本规则-R
     * */

    public function baseRule(){
        $data=D('workflowNode')->getBaseRule();
        $this->printJson($data);
    }


        /*
     * 规则设置-增加 2016-04-07 author lj
     * @param $nodeid
     * @param $workflowid
     * */

    public function addRule(){

        $processid = I('post.processid');
        
        if(!$processid){
            $this->echoJson('主键节点操作id必填');
        }

        $data = array();
        $data['processid'] = $processid;
        $data['undersigntype'] = I('param.undersigntype');
        $data['processname'] = I('param.processname');
        $data['creatuser'] = $this->mid;//$this->mid;
        $data['createtime'] = date('Y-m-d H:i:s');

        $res = M('workflow_node_process_rule')->add($data);

        if($res){
            $this->setSuccess('节点操作成功');
        }else{
            $this->setError('节点操作失败,请联系开发人员');
        }

    }

    /*
    * 工作节点列表 -R
    */

    public function nodelist(){
        $workflowid = I('post.workflowid');
        //测试数据
        $workflowid = 1;
        if(!$workflowid){
            $this->setError('工作流id必填');
        }
        $data = D('workflowNode')->nodelist($workflowid);
       $this->printJson($data);
    }


    /*
     * 删除工作节点
     * @param $nodeid -R
     * */

    public function DelNodelist(){
        $nodeid = I('post.nodeid');
        //测试数据
        // $nodeid = 5;
        if(!$nodeid){
            $this->setError('工作流节点必填');
        }
        $res = D('workflowNode')->DelNodelist($nodeid);
        if($res!==false){
                $this->setSuccess('节点删除成功');
        }else{
            $this->setError('删除失败');
        }
    }

    /**
     * 规则设置-》提交保存 -R
     */
    public function orderCommit(){
        $data = I('param.');
        //模拟测试数据
        // $data[0]['order'] = 4;
        // $data[0]['ruleid'] = 5;
        foreach ($data as $key => $value) {
            $data['order'] = $value['order'];
            $ruleid = $value['ruleid'];
        $res=M('workflow_node_process_rule')->where('ruleid='.$ruleid)->save($data);
        }

          if($res!==false){
                $this->setSuccess('排序提交成功');
            }else{
                $this->setError('提交失败');
            }


    }

}

