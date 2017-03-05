<?php
/**
 * Class CommonController
 * @package Home\Controller
 */
namespace Home\Controller;
use Think\Controller;
use Think\Verify;


class CommonController extends Controller {

    public function login(){

    }

    public function checkLogin(){

    }
    public function varify(){
        $varify = new \Think\Verify();
        $varify->entry();
    }
}