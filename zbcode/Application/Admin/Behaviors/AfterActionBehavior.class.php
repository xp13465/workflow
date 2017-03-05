<?php
namespace Admin\Behaviors;
use Admin\Controller\AdminController;
use Think\App;
use Think\Behavior;
use Think\Think;

class AfterActionBehavior extends Behavior
{
    public function run(&$params)
    {
        AdminController::afterAction();
    }
}