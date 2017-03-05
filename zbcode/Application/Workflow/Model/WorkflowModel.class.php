<?php
namespace Workflow\Model;
use Think\Model;
class WorkflowModel  extends Model{
    protected  $_validate = array(
        array('categoryid','require','所属模块不能为空!',1),
        array('formtableid','require','关联表单不能为空!',1),
        array('workflowname','require','流程名称不能为空!',1),
    );
}

