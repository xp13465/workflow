<?php
namespace Admin\Model;

use Think\Log;
use Think\Model;

class UserModel extends Model
{
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

    public function checkLogin($post)
    {
        return $this->where(" binary  email = '%s' and password = '%s' and status = 1", [trim($post['email']), md5(trim($post['password']))])->find();
    }

    /**
     * 获取用户信息
     * @param $email
     * @return array $info
     */
    public function getUserInfo($email)
    {
        if ($email) {
            $where['email'] = trim($email);
            $info = $this->where($where)->find();
            return $info;
        }
        return false;
    }

    /**
     * 获取用户角色
     * @param $uid
     * @return array $RoleIds
     */
    public function getUserRole($uid)
    {
        $where['aa.uid'] = intval($uid);
        $where['ar.status'] = 1;
        $roles = M('auth_access as aa')->field('aa.role_id')
                                        ->join(C('DB_PREFIX') . 'auth_role as ar ON aa.role_id = ar.id', 'left')
                                        ->where($where)->select();
        if ($roles) {
            foreach ($roles as $k => $role) {
                $RoleIds[] = $role['role_id'];
            }
            return $RoleIds;
        }
        return false;
    }

    /**
     * 获取角色节点
     * @param $role
     * @param int $pid 默认 -1：所有节点 0：一级节点 >0 : 二级节点
     * @return array $data
     */
    public function getRoleNodeList($role, $pid = -1)
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
        if(isMobile()){ //移动端显示
            $where['n.ismobi'] = 1;
        }

        $data = M('AuthRoleNode')->field('DISTINCT r.node_id,n.name,n.pid,n.module,n.iconCls,n.group ,n.url'/*superone 加入url字段*/)
            ->table('__AUTH_ROLE_NODE__ as r')
            ->join('__AUTH_NODE__ as n on n.id = r.node_id')
            ->where($where)
            ->order('n.sort asc, n.id desc')
            ->select();
        //echo M('AuthRoleNode')->getLastSql();
        return $data;
    }

    /**
     * 获取角色权限列表
     * @param $role
     * @return array $data
     */
    public function getRolePermissionList($role)
    {

        if (is_array($role) && !empty($role)) {
            $where['r.role_id'] = array('in', $role);
        } else if (intval($role)) {
            $where['r.role_id'] = $role;
        }
        $data = M('AuthRolePermission')->field('DISTINCT r.permission_id,n.permission_name,n.permission_code')
            ->table('__AUTH_ROLE_PERMISSION__ as r')
            ->join('__AUTH_PERMISSION__ as n on n.permission_id = r.permission_id')
            ->where($where)
            ->select();
        //echo  M('AuthRolePermission')->getLastSql();
        return $data;
    }

    /**
     * 获取运营总监帐号
     * @return array
     */
    public function companyOperationLeaders(){
        $uid = array();
        $uidArr = M('User')->field('id')->where(array('position_id'=>45, 'status'=>1))->select();
        if(!empty($uidArr)){
            foreach($uidArr as $key=>$value){
                $uid[] = $value['id'];
            }
        }
        return $uid;
    }
    /**
     * 获取分管领导帐号
     * @return array
     */
    public function companyLeaders(){
        $uid = array();
        $uidArr = M('User')->field('id')->where(array('position_id'=>42, 'status'=>1))->select();
        if(!empty($uidArr)){
            foreach($uidArr as $key=>$value){
                $uid[] = $value['id'];
            }
        }
        return $uid;
    }
    /**
     * 获取法务帐号
     * @return array
     */
    public function companyLawUser(){
        $uid = array();
        $uidArr = M('User')->field('id')->where(array('position_id'=>47, 'status'=>1))->select();
        if(!empty($uidArr)){
            foreach($uidArr as $key=>$value){
                $uid[] = $value['id'];
            }
        }
        return $uid;
    }
    /**
     * 参与费率审核的人员
     * @return array
     */
    public function companyFeesUser(){
        $uid = array();
        $where['position_id'] =  array('in', array(42, 43, 50));
        $where['status'] = 1;
        $uidArr = M('User')->field('id')->where($where)->select();
        if(!empty($uidArr)){
            foreach($uidArr as $key=>$value){
                $uid[] = $value['id'];
            }
        }
        return $uid;
    }
}