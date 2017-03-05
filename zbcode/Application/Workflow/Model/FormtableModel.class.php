<?php
namespace Workflow\Model;
use Think\Model;
class  FormtableModel extends  Model{
        protected  $_validate = array(
            array('formtablename','require','表单名称不能为空!',1),
        );







}