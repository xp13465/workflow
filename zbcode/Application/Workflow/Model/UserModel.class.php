<?php
namespace Workflow\Model;

use Think\Log;
use Think\Model;

class UserModel extends Model
{
	protected $dbName = 'zibang';
	protected $tablePrefix  = 'zb_';
    protected $_validate = array(
        array('email', 'email', '邮箱格式错误'),
        array('email', '', '邮箱地址已被占用', 2, 'unique', 3),
        array('password', 'require', '请填写密码'),
        //array('password', 5,'密码长度必须大于5位', 'length', 3),
        array('realname', 'require', '请填写姓名'),
        array('department_id', 'number', '请填选择部门'),
        array('position_id', 'number', '请填选择职位'),
        //array('leader_id','number','请填选择分管领导'),
    );
    protected $_auto = array(
        array('add_time', 'date', 1, 'function', 'Y-m-d H:i:s'),
        array('update_time', 'date', 2, 'function', 'Y-m-d H:i:s'),
        array('password', 'md5', 3, 'function'),

    );
	
	 /**
     * 获取角色节点
     * @param $role
     * @param int $pid 默认 -1：所有节点 0：一级节点 >0 : 二级节点
     * @return array $data
     */
    public function getRoleUserList($role)
    {

        if (is_array($role) && !empty($role)) {
            $where['r.role_id'] = array('in', $role);

        } else if (intval($role)) {
            $where['r.role_id'] = $role;
        }
        if ($pid >= 0) {
            $where['n.pid'] = $pid;
        }

        $where['n.type'] = 1; //取管理后端的节点

        $where['n.status'] = 1;
        $data = M('AuthRoleNode')->field('DISTINCT r.node_id,n.name,n.pid,n.module,n.iconCls,n.group ,n.url'/*superone 加入url字段*/)
            ->table('__AUTH_ROLE_NODE__ as r')
            ->join('__AUTH_NODE__ as n on n.id = r.node_id')
            ->where($where)
            ->order('n.sort asc, n.id desc')
            ->select();
        //echo M('AuthRoleNode')->getLastSql();
        return $data;
    }

}