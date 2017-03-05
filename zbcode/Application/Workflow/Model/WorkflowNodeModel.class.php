<?php
namespace Workflow\Model;
use Think\Model;
class  WorkflowNodeModel extends  Model
{

    static $nodetype = array(
        1 => '创建',
        2 => '审批',
        3 => '提交',
        4 => '归档'
    );
     /*基本规则*/
    static $baserule = array(
        1 => '一人签署',
        2 => '会签签署',
        3 => '轮流签署',
        4 => '条件签署'
    );

    /**
     * 操作模式
     */

    static $processmode = array(
        1 => '签署',
        2 => '转发',
        3 => '抄送'
        );


    /**
     * 条件选择
     */
    static $condition = array(

        1 => '等于',
        2 => '小于',
        3 => '大于',
        4 => '包含',
        5 => '不包含',
        6 => '为空',
        7 => '不为空',
        8 => '介于',
        9 => '非介于'

        );

    /**
     * 字段三种类型
     */
    static $fieldtype = array(

            1 => '可编辑',
            2 => '只读',
            3 => '必填'
        );

    /*
     * 查看某一流程的所有节点 R
     * */
    public function SomeNodes($where,$page,$limit){
        $data['total'] = $this->where($where)->count('nodeid');
        $data['items'] = $this->field('nodeid,nodename,nodetype,order')
                        ->where($where)
                        ->page($page,$limit)
                        ->select();
        foreach($data as $k=>$v){
                $data['items']['nodetype']=$this::$nodetype[$data['items']['nodetype']];
        }
        return $data;
    }

    /*
     * 设置某个节点
     * */
    public function ViewNodeSet($where){
        $data = $this->field('nodeid,nodename,nodetype,order')->where($where)->find();
        return $data;
    }


    /*
     * 删除某些节点$nodeid
     * */
    public function nodeid($nodeid){
        $where = '(';
        $where.= $nodeid;
        $where.=')';
        $res = $this->where('nodeid in'.$where)->delete();
        if($res){
            return true;
        }else{
            $this->error = '删除节点失败';
            return false;
        }


  }


  /*
    查看批量编辑选中的节点 R
    @param $nodeid 
    */
    public function Selectedlist($nodeid,$curpage,$limit){

            $list = $this->where('nodeid in '.$nodeid)
                    ->order('`order`')
                    ->page($curpage,$limit)
                    ->select();
            return $list;

    }

    /*
     * 字段设置-待选字段
     * */
    public function SelectFields($workflowid){

        $res=D('formtable_fields')
              ->alias('a')
              ->field('a.fieldid,a.fieldname,a.fieldtitle,a.fieldtype')
              ->join('__FORMTABLE__ as c on c.formtableid=a.formtableid')
              ->join('__WORKFLOW__ as b on  b.formtableid=c.formtableid')
              ->where("b.workflowid={$workflowid}")
              ->select();
        return $res;
    }
    /**
     * 字段编辑状态
     */


    public function getFieldType(){
        $list = self::$fieldtype;
        return $list;
    }

    /*
     *获取基本规则
     *
     * */
    public function getBaseRule(){
        $rules = $this::$baserule;
        return $rules;
    }


    /**
      * 获取- 节点类型-2016-04-07 author lj
      * */

    public function getNodetype(){
        return self::$nodetype;
    }

    /**
     * 获取操作模式 
     */
    public function getProcessMode(){
        return self::$processmode;
    }

    /**
     * 获取条件 2016-04-07 author lj
     */
    public function getCondition(){

        return self::$condition;
    }


    /*
     *增加节点规则（go on 2016-04-07 author lj）
     * @param nodeid(必填)
     *
     * */

    public function addProcessRule(){
        $workflowid = I('post.workflowid');
        $nodeid = I('post.nodeid');
        $processid = I('post.processid');
        $data = array();
        $data['undersigntype'] = I('post.undersigntype');
        $data['type'] = I('post.type');
        $data['relation'] =　I('post.relation');
        $data['processmode'] = I('post.processmode');
        $data['condition'] = I('post.condition');

   }


   /**
    * 规则设置-操作条件-编辑 2016-04-07 author lj -R
    * @param nodeid
    */
   public function conditionMatch($nodeid){

       
        $list ['items'] = M('workflow_node_fields')->where('nodeid='.$nodeid)->select();
        return $list;

        // $this->printJson($condition);


   }

    /*
     * 规则设置-（下面）节点列表
     * @param $workflowid
     **/

    public function nodelist($workflowid){
            $data['items'] = $this->where('workflowid='.$workflowid)->select();
            return $data;
    }

    /*
     * 删除节点列表
     * $nodeid
     * */

    public function DelNodelist($nodeid){
        $nodeid = "(".$nodeid.")";
        $res = $this->where('nodeid in '.$nodeid)->delete();
        if($res){
            // return true;
            return true;
        }else{
            // $this->error='删除失败';
            return false;
        }
    }


    /*
     *编辑出口
     * @param $outletid
     * */

    public function editOutlet($outletid){
        $data['items'] = $this->where('outletid='.$outletid)->find();
        return $data;
    }

}