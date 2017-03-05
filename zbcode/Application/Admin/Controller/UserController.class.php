<?php
namespace Admin\Controller;
use Think\Controller;

/**
 * 用户管理控制器
 * Class UserController
 * @package Admin\Controller
 */
class UserController extends AdminController {

    /**
     * 用户审核
     */
    public function checkUser(){
        $Muser = D('User');
        $where['id'] = I('post.id');
        $data['status'] = in_array(I('post.status'), array(1,2)) ?  I('post.status'): 1;
        if($where['id'] && $data['status']){
            $status = $Muser->where($where)->save($data);
            if($status){
                $this->setSuccess('审核成功');
            }else{
                $this->setError('审核失败,请重新操作');
            }
        }else{
            $this->setError('参数有误');
        }
    }
    /**
     * 获取用户详细信息
     */
    public function getUserInfoDetail(){
        $id = I('param.id');
        if(!$id){
            $this->setError('参数有误');
        }
        $where = ' u.id = ' . intval($id);
        $info = D('User')->field('u.*, p.name as position_name, o.organization_name, d.name as department_name,pp.name as leader_name, dp.id as firstdepartment_id, dp.name as firstdepartment_name')
                        ->table('__' . mb_strtoupper('user') . '__ as u')
                        ->where($where)
                        ->join('__' . mb_strtoupper('position') . '__ as p ON u.position_id = p.id', 'left')
                        ->join('__' . mb_strtoupper('organization') . '__ as o ON o.organization_id = u.organization_id', 'left')
                        ->join('__' . mb_strtoupper('department') . '__ as d ON d.id = u.department_id', 'left')
                        ->join('__' . mb_strtoupper('department') . '__ as dp ON d.pid = dp.id', 'left')
                        ->join('__' . mb_strtoupper('position') . '__ as pp on pp.id = u.leader_id', 'left')
                        ->find();
        $this->printJson($info);
    }
    /**
     * 用户列表
     */
    public function getUserList(){
        $Muser = D('User');
        $page['page'] = I('post.page') ? I('post.page') : 1;
        $page['limit'] = I('post.limit') ? I('post.limit') : 20;

        if(I('post.email')){
            $where['user.email'] = I('post.email');
        }
        if(I('post.name')){
            $where['_string'] = "user.realname like '%" . trim(I('post.name')) . "%' or user.email like '%" . trim(I('post.name')) . "%'";
        }
        if(I('post.status') > 0){
            $where['user.status'] = I('post.status');
        }
        //构造出关联查询的SQL
        $data['total'] = $Muser->field('user.*, __DEPARTMENT__.name as department_name, __POSITION__.pid as leader_position_id, __POSITION__.name as position_name')
            ->table('__USER__ as user')
            ->where($where)
            ->join('__DEPARTMENT__ ON user.department_id = __DEPARTMENT__.id', 'left')
            ->join('__POSITION__ ON user.position_id = __POSITION__.id', 'left')
            ->count();

        $data['items'] = $Muser->field('user.*, d.name as subdepartmentname, d.pid as department_pid, p.pid as leader_position_id, p.name as position_name,og.organization_name, pp.name as leader_position_name,dp.name as firstdepartmentname')
            ->table('__USER__ as user')
            ->where($where)
            ->join('__DEPARTMENT__ as d ON user.department_id = d.id', 'left')
            ->join('__POSITION__ as p ON user.position_id = p.id', 'left')
            ->join('__ORGANIZATION__ as og ON og.organization_id = user.organization_id', 'left')
            ->join('__DEPARTMENT__ as dp ON d.pid = dp.id', 'left')
            ->join('__POSITION__ as pp ON user.leader_id = pp.id', 'left')
            ->page($page['page'], $page['limit'])
            ->order('user.id desc')
            ->select();
        //echo $Muser->getLastSql();
        $this->printJson($data);
    }
    /**
     * 前台注册用户列表，默认只显示-待审核
     */
    public function getRegisterUserList(){
        $Muser = D('User');
        $page['page'] = I('post.page') ? I('post.page') : 1;
        $page['limit'] = I('post.limit') ? I('post.limit') : 20;

        if(I('post.email')){
            $where['user.email'] = I('post.email');
        }
        if(I('post.name')){
            $where['_string'] = "user.realname like '%" . trim(I('post.name')) . "%' or user.email like '%" . trim(I('post.name')) . "%'";
        }
        $where['user.status'] = 3;
        if(I('post.status') > 0){
            $where['user.status'] = I('post.status');
        }
        $where['register_mode'] = 1;
        //构造出关联查询的SQL
        $data['total'] = $Muser->field('user.*, __DEPARTMENT__.name as department_name, __POSITION__.pid as leader_position_id, __POSITION__.name as position_name')
            ->table('__USER__ as user')
            ->where($where)
            ->join('__DEPARTMENT__ ON user.department_id = __DEPARTMENT__.id', 'left')
            ->join('__POSITION__ ON user.position_id = __POSITION__.id', 'left')
            ->count();

        $data['items'] = $Muser->field('user.*, d.name as subdepartmentname, d.pid as department_pid, p.pid as leader_position_id, p.name as position_name,og.organization_name, pp.name as leader_position_name,dp.name as firstdepartmentname')
            ->table('__USER__ as user')
            ->where($where)
            ->join('__DEPARTMENT__ as d ON user.department_id = d.id', 'left')
            ->join('__POSITION__ as p ON user.position_id = p.id', 'left')
            ->join('__ORGANIZATION__ as og ON og.organization_id = user.organization_id', 'left')
            ->join('__DEPARTMENT__ as dp ON d.pid = dp.id', 'left')
            ->join('__POSITION__ as pp ON user.leader_id = pp.id', 'left')
            ->page($page['page'], $page['limit'])
            ->order('user.id desc')
            ->select();
        //echo $Muser->getLastSql();
        $this->printJson($data);
    }
    /**
     * 用户 启用、注销  superone
     */
    public function changeUser(){
        $id = I('post.id');
        $type = in_array(I('post.status'),array(1, 2)) ? I('post.status') : 1;
        if($id){
            $model = M('User');
            $data['update_time'] = date('Y-m-d H:i:s');
            $data['status'] = $type;
            if(strpos($id, ',') !== false){
                $id = trim($id, ',');
                $ids = explode(',' ,$id);
            }else{
                $ids[] = intval($id);
            }
            $where['id'] = array('in', $ids);
            $status = $model->where($where)->save($data);
            if($status){
                $this->setSuccess('操作成功');
            }else{
                $this->setError('操作失败');
            }
        }
        $this->setError('参数有误');
    }
    /**
     * 编辑、新增用户信息
     */
    public function saveUser(){
        $data = I('post.');
        //$data = array('id'=>6, 'email'=>'xw@qq.com', 'password'=>'123456');
        $model = D('User');
        $log = '';
        //防止修改帐号信息，密码被清空
        if($data){
            if(!$model->create($data)){
                $this->setError($model->getError());
            }else{
                if(isset($data['id']) && intval($data['id']) > 0){
                    $password = $model->where('id='.$data['id'])->getField('password');
                    $model->password = $password;
                    $status = $model->save();
                    $log = '：编辑用户帐号【'.$model->email.'】';
                }else{
                    $model->password = md5(C('INIT_PASSWORD'));
                    $model->register_mode = 2; //注册方式：2 后台创建
                    $log = '：创建用户帐号【'.$model->email.'】';
                    $status = $model->add();
                }
                if($status){
                    $this->createOperationLog($this->getUname() . $log);
                    $this->setSuccess('操作成功');
                }else{
                    $this->setError('操作失败');
                }
            }
        }
        $this->setError('参数有误');
    }
    /**
     * 用户拥有的角色
     */
    public function getUserRoleList(){
        //$data['total'] = M('AuthAccess')->where('uid = ' . $this->uid)->count();
        $uid = I('post.uid') ? I('post.uid')  : $this->uid;
        $data['items'] = M('AuthAccess')->table('__'.strtoupper('auth_access').'__ as a')
                                            ->where('uid = ' . intval($uid))
                                            ->join('__'.strtoupper('auth_role').'__ as r ON a.role_id = r.id')
                                            ->select();
        $this->printJson($data);
    }
    /**
     * 个性化设置
     */
    public function userSetting(){
        $content = I('post.deskbg');
        $data = array(
            'uid' => $this->uid,
            'type' => 1,
            'content' => $content,
            'add_time' => date('Y-m-d H:i:s'),
        );
        $status = M('SystemSetting')->add($data);
        if($status){
            $this->setSuccess('设置成功');
        }else{
            $this->setError('设置失败');
        }
    }
    /**
     * 获取用户桌面个性化设置
     */
    public function getUserSetting(){
        $where = array(
            'uid' => $this->uid,
            'type' => 1,
            'status' => 1,
        );
        $data = M('SystemSetting')->where($where)->find();
        $this->printJson($data);
    }
    /**
    *重置用户密码
    */
    public function resetPassword(){
      $uid = I('param.id');
      if($uid){
        $data['id'] = $uid;
        $password = C('INIT_PASSWORD');
        $new_password = trim($password);
        $data['password'] = md5($new_password);
        $data['update_time'] = date('Y-m-d H:i:s');
        $status = D('User')->save($data);

        $user_info = D('User')->field('id, email, realname')->find($uid);
        if($status){
          //密码修改成功后，发送提示信息
          $this->sendUserMessage('密码修改成功', '亲爱的用户，您好！你的密码已经重置为:' . trim($password) . ', 请您牢记新密码。', $user_info['id']);
          $this->setSuccess('密码重置成功');
        }else{
          $this->setError('密码重置失败');
        }
      }
      $this->setError('参数有误');
    }
    /**
    *用户修改密码
    */
    public function updateSelfPassword(){
      $old_password = I('post.old_password');
      $new_password = I('post.new_password');
      if($old_password && $new_password){
          $user_info = $this->getUserInfo();
          if(md5($old_password) == $user_info['password']){
            $data['id'] = $this->uid;
            $data['password'] = md5($new_password);
            $data['update_time'] = date('Y-m-d H:i:s');
            $status = D('User')->save($data);
            if($status){
              //密码修改成功后，发送提示信息
              $this->sendUserMessage('密码修改成功', '亲爱的用户，您好！你的密码已经修改为:' . $new_password . ', 请您牢记新密码。', $this->uid);
              //生成操作日志
              $content = '用户：'.$user_info['realname'].' 部门：' . $this->getDpName() . ' , 修改登陆密码。';
              $this->createOperationLog($content);
              $this->setSuccess('密码修改成功');
            }else{
              $this->setError('密码修改失败');
            }
          }else {
            $this->setError('原密码不正确');
          }
      }
      $this->setError('参数有误');
    }

    /**
     * 获取产品联系人列表
     */
    public function getProductCustomerList(){
        $page = I('param.page') ? I('param.page') : 1;
        $limit = I('param.limit') ? I('param.limit') : 20;
        $where = array();
        if(I('param.name')){
            $where['contacter'] = array('like', '%'.trim(I('param.name')).'%');
        }
        $data['total'] = D('Product')->count();
        $data['items'] = D('Product')->field('id, full_name,short_name,contact_tel, contacter')->where($where)->page($page, $limit)->select();
        $this->printJson($data);
    }
}
