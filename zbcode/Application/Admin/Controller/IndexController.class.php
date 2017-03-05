<?php
namespace Admin\Controller;
use Think\Controller;
class IndexController extends AdminController {
    public function index(){
        $this->assign('system_name', C('SYSTEM_NAME'));
        $tpl = isMobile() ? 'index_mobile' : 'index';
        $this->display($tpl);
    }

}