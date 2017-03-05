<?php
namespace Admin\Controller;
use Think\Controller;

/*** 系统管理控制器
 * Class MessageController
 * @package Admin\Controller
 */
class SystemController extends AdminController {
    /**
     * 系统管理初始页
     */
    public function index(){

    }

    /**
     * 获取部门信息
     */
    public function getDepartmentInfo(){
        $id = I('param.id');
        //$id = 7;
        if(!$id){
            $this->setError('参数有误');
        }
        $where = ' d.id = ' . intval($id);
        $info =  D('Department')
                    ->field("d.*,o.organization_name,if(d.pid = 0, '无',dp.name) as firstdepartment_name")
                    ->table('__' . strtoupper('department'). '__ as d')
                    ->where($where)
                    ->join('__' . strtoupper('organization'). '__ as o ON d.organization_id = o.organization_id','left')
                    ->join('__' . strtoupper('department'). '__ as dp ON d.pid = dp.id', 'left')
                    ->order('id desc')
                    ->find();
        $this->printJson($info);
    }

    /**
     * 部门列表
     * @return mixed
     */
    public function getDepartmentList(){
        
        $post = I('param.');
        $page = $post['page'] ? $post['page'] : 1;
        $limit = $post['limit'] ? $post['limit'] : 20;
        $where = '';
        if($post['name']){
            $where .= " d.name like '%" . $post['name'] ."%' and ";
        }
        if($post['organization_full_name']){
            $where .= " o.organization_full_name like '%" . $post['organization_full_name'] ."%' and ";
        }
        if($post['organization_id'] > 0){
            $organization_id = $post['organization_id'];
            $where .= " d.organization_id = " . $organization_id . " and ";
        }
        if($post['option'] == 1){
            $where .= " d.status = 1 and ";
            if($post['pid']){
                $pid = intval($post['pid']);
                $where .= " d.pid = " . $pid;
            }else{
                $where .= " d.pid = 0 " ;
            }
        }
        else{
            $where .=  ' d.status <> 3';
        }
        
        $data['total'] = D('Department')
                      ->table('__' . strtoupper('department') . '__ as d')
                      ->join('__' . strtoupper('organization') . '__ as o ON d.organization_id = o.organization_id','left')
                      ->where($where)
                      ->count();
        $limit = $post['option'] == 1 ? $data['total'] : $limit;
        $data['items'] = D('Department')
                            ->field('d.*,o.organization_name,o.organization_full_name,dp.name as firstdepartment_name')
                            ->table('__' . strtoupper('department'). '__ as d')
                            ->join('__' . strtoupper('organization'). '__ as o ON d.organization_id = o.organization_id','left')
                            ->join('__' . strtoupper('department'). '__ as dp ON d.pid = dp.id', 'left')
                            ->where($where)
                            ->page($page, $limit)
                            ->order('id desc')
                            ->select();
        
        if(isset($post['pid']) && $post['pid'] == 0 && $post['position'] != 1){
            $none = array(
                'id' => 0,
                'name'=> "无",
                'pid'=> 0,
                'status'=>  "1",
            );
            array_unshift($data['items'], $none);
        }
        $this->printJson($data);
    }
    /**
     * 保存部门信息（添加或修改）
     * @return bool
     */
    public function saveDepartment(){
        $data = I('post.');
        $model =  D('Department');
        if(!$model->create($data)){
            $this->setError($model->getError());
        }else{
            $model->update_time = date('Y-m-d H:i:s');
            if(isset($data['id']) && intval($data['id']) > 0){
                $status = $model->save();
            }else{
                $status = $model->add();
            }
            if($status > 0){
                //保存成功更新缓存文件
                $this->cacheDepartment();
                $this->setSuccess('操作成功');
            }else{
                $this->setError('操作失败');
            }
        }
    }

    /**
     * 部门启用、禁用、注销
     */
    public function changeDepartment(){
        $id = I('post.id');
        $status =  in_array(I('post.status'), array(1, 2, 3)) ? I('post.status') : 1;
        if($id && $status){
            $model = D('Department');
            if(strpos($id, ',') !== false){
                $id = trim($id, ','); //去除左右两边的逗号，防止切分出空数据
                $ids = explode(',', $id);
            }else{
                $ids[] = intval($id);
            }
            $where['id'] = array('in', $ids);
            $data = array(
                'status' => $status,
                'update_time' => date('Y-m-d H:i:s'),
            );
            $status = $model->where($where)->save($data);
            if($status){
                $this->setSuccess('操作成功');
            }else{
                $this->setError('操作失败');
            }
        }
        $this->setError('参数错误');
    }

    /**
     * 职位列表
     * @return mixed
     */
    public function getPositionList(){
        $page = I('post.page') ? I('post.page') : 1;
        $limit = I('post.limit') ? I('post.limit') : 20;
        $where = '';
        if(I('post.name')){
            $where .= " p.name like '%" . I('post.name') ."%' and ";
        }
        if(I('post.pid')){
            $where .= " p.pid = " . I('post.pid') ." and ";
        }
        if(I('post.department_id')){
            $where .= " p.department_id = " . I('post.department_id') ." and ";
        }
        if(I('post.organization_name')){
            $where .= " o.organization_name like '%" . I('post.organization_name') ."%' and ";
        }
        if(I('post.if_leader')){
            $where .= " p.if_leader = " . I('post.if_leader') ." and ";
        }
        $where .= ' p.status <> 3';
        $subsql = M()->field('dp.name')->table('__' . strtoupper('department') . '__ as dp')->where('d.pid = dp.id')->buildSql();
        $data['total'] = D('Position')->table('__' . strtoupper('position') . '__ as p')
                        ->join('__' . strtoupper('organization') . '__ as o ON p.organization_id = o.organization_id', 'left')
                        ->where($where)
                        ->count();
        $data['items'] = D('Position')->field('p.*, d.pid as department_pid, d.name as department_name,o.organization_name, ' . $subsql . ' as firstdepartment_name')
                                        ->table('__' . strtoupper('position') . '__ as p')
                                        ->where($where)
                                        ->join('__' . strtoupper('organization') . '__ as o ON p.organization_id = o.organization_id', 'left')
                                        ->join('__' . strtoupper('department') . '__ as d ON p.department_id = d.id', 'left')
                                        ->page($page, $limit)
                                        ->order('p.id desc')
                                        ->select();
        $this->printJson($data);
    }

    /**
     * 获取职位信息
     */
    public function getPositionInfo(){
        $id = I('post.id');
        if(!$id){
            $this->setError('参数有误');
        }
        $where = " p.id = " . intval($id);
        $subsql = M()->field('dp.name')->table('__' . strtoupper('department') . '__ as dp')->where('d.pid = dp.id')->buildSql();
        $data = D('Position')->field('p.*, d.pid as department_pid, d.name as department_name, o.organization_name, ' . $subsql . ' as firstdepartment_name')
                                ->table('__' . strtoupper('position') . '__ as p')
                                ->where($where)
                                ->join('__' . strtoupper('organization') . '__ as o ON p.organization_id = o.organization_id', 'left')
                                ->join('__' . strtoupper('department') . '__ as d ON p.department_id = d.id', 'left')
                                ->find();
        //$data = $this->getDataFormat($data,'Position');
        $this->printJson($data);
    }

    /**
     * 保存职位信息（添加或修改）
     * @return bool
     */
    public function savePosition(){
        $data = I('post.');
        $model =  D('Position');
        if(!$model->create($data)){
            $this->setError($model->getError());
        }else{
            $model->update_time = date('Y-m-d H:i:s');
            $down_department = array();
            if($data['department_id']){
                $down_department = M('Department')->where("pid = " . $data['department_id'])->find();
            }
            if(!empty($down_department)){
                $this->setError('此部门下还有子部门，请选择该部门下的子部门');
            }
            if(isset($data['id']) && intval($data['id']) > 0){
                $status = $model->save();
            }else{
                $status = $model->add();
            }
            if($status > 0){
                //保存成功更新缓存文件
                $this->cacheDepartment();
                $this->setSuccess('操作成功');
            }else{
                $this->setError('操作失败');
            }
        }
    }

    /**
     * 系统角色列表
     */
    public function getRoleList(){
        $page = I('post.page') ? I('post.page') : 1;
        $limit = I('post.limit') ? I('post.limit') : 20;

        $where = '';
        if(I('post.title')){
            $where .= "title like '%" . I('post.title') . "%' and ";
        }
        $where .= ' status <> 3';
        $data['total'] = D('AuthRole')->where($where)->count();
        $field = true;
        if(I('post.option') == 1){
            $limit =  $data['total'];
            $field = 'id,title';
        }
        $data['items'] = D('AuthRole')->field($field)->where($where)->page($page, $limit)->order('id desc')->select();
        $this->printJson($data);
    }
    /**
     * 系统所有可用角色(供分配角色用)
     */
    public function getAllUsedRole(){
        $where['status'] = 1;
        $data['total'] = D('AuthRole')->where($where)->count();
        $field = 'id,title,remark';
        $data['items'] = D('AuthRole')->field($field)->where($where)->order('id desc')->select();
        $this->printJson($data);
    }

    /**
     * 改造成查询所有分配角色并查找当前用户已经分配的角色
     */
    public function getAllUsedRoleByUid(){
        $uid = I('post.id');//用户id
        if(empty($uid)){
            $this->setError('用户ID不能为空！');
        }
        $where['status'] = 1;
        $data['uid']=$uid;
        $data['total'] = D('AuthRole')->where($where)->count();
        $field = 'id,title,remark';
        $data['items'] = D('AuthRole')->field($field)->where($where)->order('id desc')->select();

        //查询用户角色
        $user_role = M('AuthAccess')->table('__'.strtoupper('auth_access').'__ as a')
            ->field('r.id')
            ->where('uid = ' . intval($uid))
            ->join('__'.strtoupper('auth_role').'__ as r ON a.role_id = r.id')
            ->select();
        if(!empty($data['items'])){
            foreach($data['items'] as $k=>$v){

               if(!empty($user_role)){
                   foreach($user_role as $r=>$rl){
                        if($v['id']==$rl['id']){
                            $data['items'][$k]['selected']=1;
                        }
                   }
               }
            }
        }
        $this->printJson($data);
    }


    /**
     * 获取角色信息
     */
    public function getRoleInfo(){
        $id = I('post.id');
        //$id = 3;
        if(!$id){
            $this->setError('参数有误');
        }
        $where = " id = " . intval($id);
        $data = D('AuthRole')->where($where)->find();
        $this->printJson($data);
    }

    /**
     * 保存角色（添加或修改）
     * @return bool
     */
    public function saveRole(){
        $data = I('post.');
        //$data = array('title'=>'产品总监','remark'=>'负责产品部管理及日常工作');
        //$data['id'] = 6;
        $model =  D('AuthRole');
        if(!$model->create($data)){
            $this->setError($model->getError());
        }else{
            $model->update_time = date('Y-m-d H:i:s');
            if(isset($data['id']) && intval($data['id']) > 0){
                $status = $model->save();
            }else{
                $status = $model->add();
            }
            if($status > 0){
                //保存成功更新缓存文件
                $roleData = D('AuthRole')->where('status = 1')->select();
                $this->setCacheFile('auth_role', $roleData);
                $this->setSuccess('操作成功');
            }else{
                $this->setError('操作失败');
            }
        }

    }

    /**
     * 改变角色状态 1启用 2禁用
     */
    public function changeRole(){
        $id = I('param.id');
        $status = in_array(I('param.status'), array(1,2)) ? I('param.status') : 1;
        if($id && $status){
            $status = M('auth_role')->where()->save(array('id' => $id, 'status' => $status));
            if($status){
                $this->setSuccess('操作成功');
            }else{
                $this->setError('操作失败');
            }
        }
        $this->setError('参数有误');
    }
    /**
     * 保存节点（添加或修改）
     * @return bool
     */
    public function saveNode()
    {
        $data = I('post.');
        $model = D('AuthNode');
        if (!$model->create($data)) {
            $this->setError($model->getError());
        } else {
            if (isset($data['id']) && intval($data['id']) > 0) {
                $status = $model->save();
            } else {
                $status = $model->add();
            }
            if ($status > 0) {
                //保存成功 更新缓存文件
                //$this->cacheNode();       //superone 注释 cacheNode未实现
                $this->setSuccess('操作成功');
            } else {
                $this->setError('操作失败');
            }
        }
    }
    /**
     * 删除节点（删除）
     * @return bool
     */
    public function deleteNode()
    {
        $data = I('post.');
        $model = D('AuthNode');
        $status = 0;
        if (!$model->create($data)) {
            $this->setError($model->getError());
        } else {
            if (isset($data['id']) && intval($data['id']) > 0) {
                $status = $model->delete();
            }
            if ($status > 0) {
                //保存成功 更新缓存文件
                //$this->cacheNode();       //superone 注释 cacheNode未实现
                $this->setSuccess('操作成功');
            } else {
                $this->setError('操作失败');
            }
        }
    }
    /**
     * 节点列表
     */
    public function getNodeList(){
        $page = I('post.page') ? I('post.page') : 1;
        $limit = I('post.limit') ? I('post.limit') : 20;
        $post = I('param.');
        $where = '';
        /*superone 修改字段title -》 name*/
        if($post['name']){
            $where .= "n.name like '%" . $post['name'] . "%' and ";
        }
        if(isset($post['pid'])){
            $where .= " n.pid = " . intval($post['pid']) . " and ";
        }
        $where .= " n.type = 1 and "; //新增type节点类型： 1管理后台 2 销售端
        $where .=  I('post.option') == 1 ? 'n.status = 1' : ' n.status <> 3';
        $data['total'] = D('AuthNode as n')->where($where)->count();
        $field = 'n.id,n.pid,n.name,n.module,n.url,n.iconcls,n.group,n.status,n.sort, np.name as p_node_name';

        if($post['option'] == 1){
            $limit = $data['total'];
            $field = 'n.id,n.pid,n.name,n.module,n.url,n.iconcls,n.group,n.status,n.sort';
        }
        $data['items'] = D('AuthNode as n')->field($field)
                                            ->where($where)
                                            ->join(C('DB_PREFIX') . 'auth_node as np ON n.pid = np.id', 'left')
                                            ->page($page, $limit)->order('n.sort,n.id desc')->select();
        if($post['option'] == 1){
            $array = array(
                'id' => 0,
                'name' => '无',
                'module' => '',
                'url' => '',
                'iconcls' => '',
                'group' => '',
                'status' => 1,
                'sort' => 0,
                'p_node_name' => '',
            );
            array_unshift($data['items'], $array);
        }
        $this->printJson($data);
    }
    /**
     * 所有可用节点列表
     */
    public function getAllNodeList(){
        $post = I('param.');
        $where = array();
        if(isset($post['pid'])){
            $where .= " n.pid = " . intval($post['pid']) . " and ";
        }
        $where['n.type'] = 1;
        $where['n.status'] = 1;
        $data['total'] = D('AuthNode as n')->where($where)->count();
        $field = 'n.id,n.pid,n.name,n.module,n.url,n.iconcls,n.group,n.status,n.sort, np.name as p_node_name';
        $data['items'] = D('AuthNode as n')->field($field)
            ->where($where)
            ->join(C('DB_PREFIX') . 'auth_node as np ON n.pid = np.id', 'left')
            ->order('n.sort,n.id desc')->select();
        $this->printJson($data);
    }

    /**
     * 查看节点
     */
    public function getNodeInfo(){
        $id = I('post.id');
        //$id = 110;
        if($id){
            $data = M('AuthNode')->find($id);
            $this->printJson($data);
        }
        $this->setError('参数有误');
    }
    /**
     * 节点 启用、禁用 切换
     */
    public function changeNode(){
        $id = I('post.id');
        $type = in_array(I('post.status'),array(1, 2)) ? I('post.status') : 1;
        if($id){
            $model = M('AuthNode');
            $data['update_time'] = date('Y-m-d H:i:s');
            $data['status'] = $type;
            if(strpos($id, ',') !== false){
                $id = trim($id, ','); //去除左右两边的逗号，防止切分出空数据
                $ids = explode(',', $id);
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
     * 保存机构
     */
    public function saveOrganization(){
        $data = I('post.');
        if($data['organization_name'] && $data['organization_full_name']){
            $data['update_time'] = date('Y-m-d H:i:s');
            if($data['organization_id']){
                $status = M('Organization')->save($data);
            }else{
                $status = M('Organization')->add($data);
            }
            if($status){
                $this->setSuccess('操作成功');
            }else{
                $this->setError('操作失败');
            }
        }
        $this->setError('请输入全称和简称');
    }

    /**
     * 机构列表
     */
    public function getOrganizationList(){
        $page = I('post.page') ? I('post.page') : 1;
        $limit = I('post.limit') ? I('post.limit') : 20;
        $where = '';
        if(I('post.organization_name')){
            $where .= "organization_name like '%" . I('post.organization_name') . "%' or organization_full_name like '%" . I('post.organization_name') . "%' and ";
        }
        $where .= ' status <> 3';
        $data['total'] = M('Organization')->where($where)->count();
        $field = true;
        if(I('post.option') == 1){
            $limit = $data['total'];
            $field = 'organization_id,organization_full_name,organization_name';
        }
        $data['items'] =M('Organization')->field($field)->where($where)->page($page, $limit)->order('organization_id desc')->select();
        $this->printJson($data);
    }
    /**
     * 查看机构信息
     */
    public function getOrganizationInfo(){
        $organization_id = I('post.organization_id');
        if($organization_id){
            $data = M('Organization')->find($organization_id);
            $this->printJson($data);
        }
        $this->setError('参数有误');
    }
    /**
     *  注销机构
     */
    public function cancelOrganization(){
        $id = I('post.id');
        if($id){
            if(strpos($id, ',') !== false){
                $ids = explode(',', $id);
            }else{
                $ids[] = $id;
            }
            $where['organization_id'] = array('in', $ids);
            $model = M('Organization');
            $data['update_time'] = date('Y-m-d H:i:s');
            $data['status'] = 3;
            $status = $model->where($where)->save($data);
            if($status){
                $this->setSuccess('操作成功');
            }else{
                $this->setError('操作失败');
            }
            //$data = M('Organization')->find($id);
            $this->printJson($data);
        }
        $this->setError('参数有误');
    }

    /**
     * 机构 启用、禁用 切换
     */
    public function changeOrganization(){
        $id = I('post.organization_id');
        $type = in_array(I('post.status'),array(1, 2, 3)) ? I('post.status') : 1;
        if($id){
            $model = M('Organization');
            $data['update_time'] = date('Y-m-d H:i:s');
            $data['status'] = $type;
            if(strpos($id, ',') !== false){
                $id = trim($id, ','); //去除左右两边的逗号，防止切分出空数据
                $ids = explode(',', $id);
            }else{
                $ids[] = intval($id);
            }
            $where['organization_id'] = array('in', $ids);
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
     * 职位 启用、禁用 切换
     */
    public function changePosition(){
        $id = I('post.id');
        $type = in_array(I('post.status'),array(1, 2, 3)) ? I('post.status') : 1;
        if($id){
            $model = M('Position');
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
     *  后台用户操作日志列表
     */
    public function getOperationList(){
        $page = I('post.page') ? I('post.page') : 1;
        $limit = I('post.limit') ? I('post.limit') : 20;
        $where = array();
        $data['total'] = M('OperationLog')->field('o.content,o.add_time,o.uid,u.email,u.realname')
            ->table('__OPERATION_LOG__ as o')
            ->join('__USER__ as u on u.id = o.uid')
            ->where($where)
            ->count();
        $data['items'] = M('OperationLog')->field('o.content,o.add_time,o.uid,u.email,u.realname')
                                            ->table('__OPERATION_LOG__ as o')
                                            ->join('__USER__ as u on u.id = o.uid')
                                            ->where($where)
                                            ->page($page, $limit)
                                            ->order('o.add_time desc')
                                            ->select();

        $this->printJson($data);
    }

    /**
     * 权限添加、编辑
     */
    public function savePermission(){
        $data = I('post.');
        $model = D('AuthPermission');
        if (!$model->create($data)) {
            $this->setError($model->getError());
        } else {
            $model->update_time = date('Y-m-d H:i:s');
            if (isset($data['permission_id']) && intval($data['permission_id']) > 0) {
                $status = $model->save();
            } else {
                $status = $model->add();
            }
            if ($status > 0) {
                $this->setSuccess('操作成功');
            } else {
                $this->setError('操作失败');
            }
        }
    }
    /**
     * 获取权限信息
     */
    public function getPermissionInfo(){
        $id = I('post.permission_id');
        //$id = 1;
        if($id){
            $data = M('AuthPermission')->find($id);
            $this->printJson($data);
        }
        $this->setError('参数有误');
    }
    /**
     * 权限启用、禁用 切换
     */
    public function changePermission(){
        $id = I('post.permission_id');
        $type = in_array(I('post.status'),array(1, 2, 3)) ? I('post.status') : 1;
        if($id){
            $model = M('AuthPermission');
            $data['update_time'] = date('Y-m-d H:i:s');
            $data['status'] = $type;
            if(strpos($id, ',') !== false){
                $id = trim($id, ','); //去除左右两边的逗号，防止切分出空数据
                $ids = explode(',', $id);
            }else{
                $ids[] = intval($id);
            }
            $where['permission_id'] = array('in', $ids);
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
     * 权限列表
     */
    public function getPermissionList(){
        $page = I('post.page') ? I('post.page') : 1;
        $limit = I('post.limit') ? I('post.limit') : 20;
        $option = I('post.option');
        //$option = 1;
        $where = '';
        /*superone 修改字段title -》 name*/
        if(I('param.permission_name')){
            $where .= "(permission_name like '%" . trim(I('param.permission_name')) . "%' or permission_code like '%" . trim(I('param.permission_name')) ."%') and ";
        }
        $where .=  $option == 1 ?  'status = 1' : ' status <> 3';
        $data['total'] = D('AuthPermission')->where($where)->count();
        $field = true;
        if($option == 1){
            $limit = $data['total'];
            $field = 'permission_id,permission_name,permission_code';
        }
        $data['items'] = D('AuthPermission')->field($field)->where($where)->page($page, $limit)->order('permission_id desc')->select();
//        echo D('AuthPermission')->getLastSql();
//        echo '<hr>';
        $this->printJson($data);
    }
    /**
     * 指定角色拥有的节点
     */
    public function getRoleNodeList(){
        $role_id = I('post.role_id');
        if($role_id) {
            $node_list = D('User')->getRoleNodeList($role_id);
            $this->printJson($node_list);
        }
        $this->setError('参数有误');
    }
    /**
     * 指定角色拥有的权限列表
     */
    public function getRolePermissionList(){
        $role_id = I('post.role_id');
        //$role_id = 3;
        if($role_id){
            $data = D('User')->getRolePermissionList($role_id);
            $this->printJson($data);
        }
        $this->setError('参数有误');
    }
    /**
     * 缓存部门数据
     * @return boolean
     */
    public function cacheDepartment(){
        $data = M('department')->where('status = 1')->select();
        return $this->setCacheFile('admin_department', $data);
    }
}
