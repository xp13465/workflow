<?php
namespace Workflow\Model;
use Think\Model;
class  WorkflowCategoryModel extends  Model
{
    protected  $_validate = array(
        array('categoryname','require','资产名称不能为空!'),
    );

}