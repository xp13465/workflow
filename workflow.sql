/*
Navicat MySQL Data Transfer

Source Server         : 本机
Source Server Version : 50710
Source Host           : localhost:3306
Source Database       : workflow

Target Server Type    : MYSQL
Target Server Version : 50710
File Encoding         : 65001

Date: 2017-03-05 11:08:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for formtable
-- ----------------------------
DROP TABLE IF EXISTS `formtable`;
CREATE TABLE `formtable` (
  `formtableid` int(11) NOT NULL AUTO_INCREMENT COMMENT '表单ID',
  `parentid` int(11) NOT NULL DEFAULT '0' COMMENT '主表ID',
  `formtablename` varchar(64) NOT NULL DEFAULT '' COMMENT '表单名称',
  `formtabledesc` varchar(255) NOT NULL DEFAULT '' COMMENT '表单描述',
  `validflag` tinyint(1) NOT NULL DEFAULT '1' COMMENT '回收状态',
  `createuser` int(11) NOT NULL DEFAULT '0' COMMENT '创建人',
  `createtime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `modifyuser` int(11) NOT NULL DEFAULT '0' COMMENT '维护人',
  `modifytime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '维护时间',
  PRIMARY KEY (`formtableid`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8 COMMENT='表单表';

-- ----------------------------
-- Records of formtable
-- ----------------------------
INSERT INTO `formtable` VALUES ('1', '0', '初始主表单', '', '1', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable` VALUES ('2', '1', '初始化主表单明细1', '', '1', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable` VALUES ('3', '1', '初始化主表单明细2', '', '1', '1', '2016-03-24 13:45:23', '1', '2016-03-24 13:45:23');
INSERT INTO `formtable` VALUES ('10', '0', '', '', '1', '1', '2016-03-24 13:47:41', '1', '2016-03-24 13:47:41');
INSERT INTO `formtable` VALUES ('11', '0', '', '', '1', '1', '2016-03-24 13:52:35', '1', '2016-03-24 13:52:35');
INSERT INTO `formtable` VALUES ('12', '0', '', '', '1', '1', '2016-03-24 14:04:13', '1', '2016-03-24 14:04:13');
INSERT INTO `formtable` VALUES ('13', '0', '', '', '1', '1', '2016-03-24 14:04:25', '1', '2016-03-24 14:04:25');
INSERT INTO `formtable` VALUES ('14', '0', '', '', '1', '1', '2016-03-24 14:05:24', '1', '2016-03-24 14:05:24');
INSERT INTO `formtable` VALUES ('15', '0', '', '', '1', '1', '2016-03-24 14:06:41', '1', '2016-03-24 14:06:41');
INSERT INTO `formtable` VALUES ('16', '0', '', '', '1', '1', '2016-03-24 14:07:08', '1', '2016-03-24 14:07:08');
INSERT INTO `formtable` VALUES ('17', '0', '', '', '1', '1', '2016-03-24 14:07:59', '1', '2016-03-24 14:07:59');
INSERT INTO `formtable` VALUES ('18', '0', '', '', '1', '1', '2016-03-24 14:11:14', '1', '2016-03-24 14:11:14');
INSERT INTO `formtable` VALUES ('19', '0', '', '', '1', '1', '2016-03-24 14:15:26', '1', '2016-03-24 14:15:26');
INSERT INTO `formtable` VALUES ('20', '0', '', '', '1', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable` VALUES ('21', '0', '', '', '1', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable` VALUES ('22', '0', '', '', '1', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable` VALUES ('23', '0', '', '', '1', '1', '2016-03-24 14:20:43', '1', '2016-03-24 14:20:43');
INSERT INTO `formtable` VALUES ('24', '0', '', '', '1', '1', '2016-03-24 14:22:08', '1', '2016-03-24 14:22:08');
INSERT INTO `formtable` VALUES ('25', '0', '', '', '1', '1', '2016-03-24 14:22:20', '1', '2016-03-24 14:22:20');
INSERT INTO `formtable` VALUES ('26', '0', '', '', '1', '1', '2016-03-24 14:23:12', '1', '2016-03-24 14:23:12');
INSERT INTO `formtable` VALUES ('27', '0', '', '', '1', '1', '2016-03-24 14:26:04', '1', '2016-03-24 14:26:04');
INSERT INTO `formtable` VALUES ('28', '0', '', '', '1', '1', '2016-03-24 14:29:41', '1', '2016-03-24 14:29:41');
INSERT INTO `formtable` VALUES ('29', '0', '', '', '1', '1', '2016-03-24 14:30:13', '1', '2016-03-24 14:30:13');
INSERT INTO `formtable` VALUES ('30', '0', '', '', '1', '1', '2016-03-24 14:30:15', '1', '2016-03-24 14:30:15');
INSERT INTO `formtable` VALUES ('31', '0', '', '', '1', '1', '2016-03-24 14:31:13', '1', '2016-03-24 14:31:13');
INSERT INTO `formtable` VALUES ('32', '0', '', '', '1', '1', '2016-03-24 14:31:14', '1', '2016-03-24 14:31:14');
INSERT INTO `formtable` VALUES ('33', '0', '', '', '1', '1', '2016-03-24 14:31:32', '1', '2016-03-24 14:31:32');
INSERT INTO `formtable` VALUES ('34', '0', '', '', '1', '1', '2016-03-24 14:32:05', '1', '2016-03-24 14:32:05');
INSERT INTO `formtable` VALUES ('35', '0', '', '', '1', '1', '2016-03-24 14:32:18', '1', '2016-03-24 14:32:18');
INSERT INTO `formtable` VALUES ('36', '0', '', '', '1', '1', '2016-03-24 14:33:02', '1', '2016-03-24 14:33:02');
INSERT INTO `formtable` VALUES ('37', '0', '', '', '1', '1', '2016-03-24 14:33:27', '1', '2016-03-24 14:33:27');
INSERT INTO `formtable` VALUES ('38', '0', '', '', '1', '1', '2016-03-24 14:33:27', '1', '2016-03-24 14:33:27');
INSERT INTO `formtable` VALUES ('39', '0', '', '', '1', '1', '2016-03-24 14:33:33', '1', '2016-03-24 14:33:33');
INSERT INTO `formtable` VALUES ('40', '0', '测试表单', '', '1', '1', '2016-03-30 10:13:39', '1', '2016-03-30 10:13:39');
INSERT INTO `formtable` VALUES ('42', '10', '\'test明细表\'', '', '1', '1', '2016-04-06 13:37:07', '1', '2016-04-06 13:37:07');
INSERT INTO `formtable` VALUES ('100', '0', '请假单表单', '请假单表单', '1', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable` VALUES ('101', '0', '外出单表单', '', '1', '1', '2017-02-13 14:23:11', '1', '2017-02-13 14:23:11');
INSERT INTO `formtable` VALUES ('102', '0', '外出单表单', '', '1', '1', '2017-02-13 14:29:17', '1', '2017-02-13 14:29:17');

-- ----------------------------
-- Table structure for formtable_fields
-- ----------------------------
DROP TABLE IF EXISTS `formtable_fields`;
CREATE TABLE `formtable_fields` (
  `fieldid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键 字段ID',
  `formtableid` int(11) NOT NULL DEFAULT '0' COMMENT '表单ID',
  `fieldname` varchar(32) NOT NULL DEFAULT '' COMMENT '字段英文名',
  `fieldtitle` varchar(32) NOT NULL DEFAULT '' COMMENT '字段标题（中文）',
  `fieldtype` tinyint(4) NOT NULL DEFAULT '0' COMMENT '字段类型',
  `fieldtypechild` tinyint(4) NOT NULL DEFAULT '0' COMMENT '字段类型子',
  `fieldstr` varchar(32) NOT NULL DEFAULT '' COMMENT '字段',
  `length` int(11) NOT NULL DEFAULT '0',
  `decimal` tinyint(4) NOT NULL DEFAULT '0',
  `default` varchar(32) NOT NULL DEFAULT '' COMMENT '默认值',
  `order` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `source_type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '来源类型 0无，1自定义表',
  `source_table` varchar(32) NOT NULL DEFAULT '' COMMENT '来源表',
  `source_key` varchar(32) NOT NULL DEFAULT '' COMMENT '来源表KEY字段',
  `source_value` varchar(32) NOT NULL DEFAULT '' COMMENT '来源表VALUE字段',
  `createuser` int(11) NOT NULL DEFAULT '0' COMMENT '创建人',
  `createtime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `modifyuser` int(11) NOT NULL DEFAULT '0' COMMENT '维护人',
  `modifytime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '维护时间',
  PRIMARY KEY (`fieldid`),
  KEY `formtableid` (`formtableid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8 COMMENT='表单字段';

-- ----------------------------
-- Records of formtable_fields
-- ----------------------------
INSERT INTO `formtable_fields` VALUES ('1', '1', 'xingming', '姓名', '1', '3', 'varchar', '32', '0', '', '0', '0', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable_fields` VALUES ('2', '1', 'riqi', '日期', '4', '13', 'date', '0', '0', '0000-00-00', '0', '0', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable_fields` VALUES ('3', '1', 'shixiang', '事项', '1', '3', 'varchar', '255', '0', '', '0', '0', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable_fields` VALUES ('4', '1', 'beizhu', '备注', '2', '11', 'text', '0', '0', '', '0', '0', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable_fields` VALUES ('5', '1', 'shuliang', '数量', '1', '5', 'int', '11', '0', '0', '0', '0', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable_fields` VALUES ('6', '1', 'jine', '金额', '1', '2', 'decimal', '14', '2', '0', '0', '0', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable_fields` VALUES ('7', '1', 'shijian', '时间', '4', '14', 'datetime', '0', '0', '0000-00-00 00:00:00', '0', '0', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable_fields` VALUES ('8', '1', 'fujian', '附件', '7', '12', 'text', '0', '0', '', '0', '0', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable_fields` VALUES ('9', '1', 'yuangong', '员工', '8', '17', 'int', '0', '0', '0', '0', '0', 'user', 'id', 'realname', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable_fields` VALUES ('10', '1', 'xuanxiang', '选项', '9', '22', 'text', '0', '0', '', '0', '0', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable_fields` VALUES ('11', '1', 'select', '下拉', '10', '16', 'text', '0', '0', '', '0', '0', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable_fields` VALUES ('13', '2', 'price', '明细1价格', '1', '2', 'decimal', '14', '0', '', '0', '0', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable_fields` VALUES ('14', '2', 'num', '明细1数量', '1', '1', 'int', '11', '0', '', '0', '0', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable_fields` VALUES ('15', '2', 'xiaoji', '明细1小计', '1', '2', 'decimal', '14', '2', '', '0', '0', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable_fields` VALUES ('16', '2', 'select', '明细1多选', '9', '22', 'text', '0', '0', '1', '0', '0', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable_fields` VALUES ('17', '3', 'price', '明细2价格', '1', '2', 'decimal', '14', '0', '', '0', '0', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable_fields` VALUES ('18', '3', 'num', '明细2数量', '1', '1', 'int', '11', '0', '', '0', '0', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable_fields` VALUES ('19', '3', 'xiaoji', '明细2小计', '1', '2', 'decimal', '14', '2', '', '0', '0', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable_fields` VALUES ('20', '3', 'select', '明细2下拉', '10', '16', 'text', '0', '0', '1', '0', '0', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `formtable_fields` VALUES ('43', '10', 'test1', '测试1', '1', '2', '', '5', '3', '', '0', '0', '', '', '', '1', '2016-03-29 18:00:53', '1', '2016-03-29 18:00:53');
INSERT INTO `formtable_fields` VALUES ('44', '10', 'test2', '测试2', '1', '2', '', '0', '0', '', '0', '0', '', '', '', '1', '2016-03-29 18:00:53', '1', '2016-03-29 18:00:53');
INSERT INTO `formtable_fields` VALUES ('45', '10', 'test3', '测试3', '1', '2', '', '6', '2', '', '0', '0', '', '', '', '1', '2016-03-29 18:00:53', '1', '2016-03-30 09:33:49');
INSERT INTO `formtable_fields` VALUES ('49', '10', 'test4', '测试4', '1', '2', 'varchar', '5', '2', '', '0', '0', '', '', '', '1', '2016-03-30 09:33:49', '1', '2016-03-30 09:33:49');
INSERT INTO `formtable_fields` VALUES ('52', '10', 'test3', '测试3', '1', '2', '', '6', '2', '', '0', '0', '', '', '', '1', '2016-03-30 14:39:33', '1', '2016-03-30 14:39:33');
INSERT INTO `formtable_fields` VALUES ('53', '10', 'test4', '测试4', '1', '2', '', '6', '2', '', '0', '0', '', '', '', '1', '2016-03-30 14:39:33', '1', '2016-03-30 14:39:33');
INSERT INTO `formtable_fields` VALUES ('62', '40', 'test5', '测试5', '1', '2', 'decimal', '6', '2', '', '0', '0', '', '', '', '1', '2016-03-30 17:32:26', '1', '2016-03-30 17:32:26');
INSERT INTO `formtable_fields` VALUES ('63', '40', 'test6', '测试6', '1', '3', 'varchar', '0', '0', '', '0', '0', '', '', '', '1', '2016-03-30 17:32:26', '1', '2016-03-30 17:32:26');
INSERT INTO `formtable_fields` VALUES ('64', '40', 'test5', '测试5', '1', '2', 'decimal', '6', '2', '', '0', '0', '', '', '', '1', '2016-03-30 17:35:03', '1', '2016-03-30 17:35:03');
INSERT INTO `formtable_fields` VALUES ('65', '40', 'test6', '测试6', '1', '3', 'varchar', '0', '0', '', '0', '0', '', '', '', '1', '2016-03-30 17:35:03', '1', '2016-03-30 17:35:03');
INSERT INTO `formtable_fields` VALUES ('66', '40', 'test5', '测试5', '1', '2', 'decimal', '6', '2', '', '0', '0', '', '', '', '1', '2016-03-30 17:36:02', '1', '2016-03-30 17:36:02');
INSERT INTO `formtable_fields` VALUES ('67', '40', 'test6', '测试6', '1', '3', 'varchar', '0', '0', '', '0', '0', '', '', '', '1', '2016-03-30 17:36:02', '1', '2016-03-30 17:36:02');
INSERT INTO `formtable_fields` VALUES ('68', '40', 'test5', '测试5', '1', '2', 'decimal', '6', '2', '', '0', '0', '', '', '', '1', '2016-03-30 17:43:32', '1', '2016-03-30 17:43:32');
INSERT INTO `formtable_fields` VALUES ('69', '40', 'test6', '测试6', '1', '3', 'varchar', '0', '0', '', '0', '0', '', '', '', '1', '2016-03-30 17:43:32', '1', '2016-03-30 17:43:32');
INSERT INTO `formtable_fields` VALUES ('82', '40', 'test5', '测试5', '1', '2', 'decimal', '5', '2', '', '0', '0', '', '', '', '1', '2016-03-31 09:04:48', '1', '2016-03-31 09:04:48');
INSERT INTO `formtable_fields` VALUES ('83', '40', 'test6', '测试6', '1', '3', 'varchar', '0', '0', '', '0', '0', '', '', '', '1', '2016-03-31 09:04:48', '1', '2016-03-31 09:04:48');
INSERT INTO `formtable_fields` VALUES ('84', '40', 'test5', '测试5', '1', '2', 'decimal', '5', '2', '', '0', '0', '', '', '', '1', '2016-03-31 09:05:51', '1', '2016-03-31 09:05:51');
INSERT INTO `formtable_fields` VALUES ('85', '40', 'test6', '测试6', '1', '3', 'varchar', '0', '0', '', '0', '0', '', '', '', '1', '2016-03-31 09:05:51', '1', '2016-03-31 09:05:51');
INSERT INTO `formtable_fields` VALUES ('86', '40', 'test5', '测试5', '1', '2', 'decimal', '5', '2', '', '0', '0', '', '', '', '1', '2016-03-31 09:25:37', '1', '2016-03-31 09:25:37');
INSERT INTO `formtable_fields` VALUES ('87', '40', 'test10000', '测试bbbbb', '1', '3', 'varchar', '6', '0', '', '0', '0', '', '', '', '1', '2016-03-31 09:25:37', '1', '2016-03-31 09:25:37');
INSERT INTO `formtable_fields` VALUES ('88', '40', 'test10001', '测试bbbbb', '1', '3', 'varchar', '7', '0', '', '0', '0', '', '', '', '1', '2016-03-31 09:35:36', '1', '2016-03-31 09:35:36');
INSERT INTO `formtable_fields` VALUES ('91', '40', 'test100', '测试100', '4', '13', 'date', '0', '0', '', '0', '0', '', '', '', '1', '2016-04-01 16:36:09', '1', '2016-04-01 16:36:09');
INSERT INTO `formtable_fields` VALUES ('93', '100', 'shenqingren', '申请人', '1', '5', 'int', '11', '0', '', '0', '0', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for formtable_fields_type
-- ----------------------------
DROP TABLE IF EXISTS `formtable_fields_type`;
CREATE TABLE `formtable_fields_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `name` varchar(32) NOT NULL DEFAULT '' COMMENT '名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='表单字段类型项';

-- ----------------------------
-- Records of formtable_fields_type
-- ----------------------------
INSERT INTO `formtable_fields_type` VALUES ('1', '单行文本');
INSERT INTO `formtable_fields_type` VALUES ('2', '多行文本');
INSERT INTO `formtable_fields_type` VALUES ('4', '日期');
INSERT INTO `formtable_fields_type` VALUES ('5', '时间');
INSERT INTO `formtable_fields_type` VALUES ('7', '附件上传');
INSERT INTO `formtable_fields_type` VALUES ('8', '预览按钮');
INSERT INTO `formtable_fields_type` VALUES ('9', 'check按钮');
INSERT INTO `formtable_fields_type` VALUES ('10', '选择框');

-- ----------------------------
-- Table structure for formtable_fields_type_child
-- ----------------------------
DROP TABLE IF EXISTS `formtable_fields_type_child`;
CREATE TABLE `formtable_fields_type_child` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `typeid` int(11) NOT NULL DEFAULT '0' COMMENT '类型',
  `fieldstr` varchar(32) NOT NULL,
  `name` varchar(32) NOT NULL DEFAULT '' COMMENT '名称',
  `value` varchar(64) NOT NULL DEFAULT '' COMMENT '值',
  `defaultlength` int(11) NOT NULL DEFAULT '0' COMMENT '默认长度',
  `defaultdecimal` int(11) NOT NULL DEFAULT '0' COMMENT '默认小数',
  `source_table` varchar(32) NOT NULL DEFAULT '' COMMENT '来源表',
  `source_key` varchar(32) NOT NULL DEFAULT '' COMMENT '来源表KEY字段',
  `source_value` varchar(32) NOT NULL DEFAULT '' COMMENT '来源表VALUE字段',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COMMENT='表单字段类型值';

-- ----------------------------
-- Records of formtable_fields_type_child
-- ----------------------------
INSERT INTO `formtable_fields_type_child` VALUES ('2', '1', 'decimal', '浮点数', '0', '11', '2', '', '', '');
INSERT INTO `formtable_fields_type_child` VALUES ('3', '1', 'varchar', '文本框', '', '255', '0', '', '', '');
INSERT INTO `formtable_fields_type_child` VALUES ('5', '1', 'int', '整数', '0', '11', '0', '', '', '');
INSERT INTO `formtable_fields_type_child` VALUES ('11', '2', 'text', '多行文本', '', '0', '0', '', '', '');
INSERT INTO `formtable_fields_type_child` VALUES ('12', '7', 'text', '附件上传', '', '0', '0', '', '', '');
INSERT INTO `formtable_fields_type_child` VALUES ('13', '4', 'date', '日期', '0000-00-00', '0', '0', '', '', '');
INSERT INTO `formtable_fields_type_child` VALUES ('14', '5', 'datetime', '时间', '0000-00-00 00:00:00', '0', '0', '', '', '');
INSERT INTO `formtable_fields_type_child` VALUES ('15', '9', 'text', '单选', '', '0', '0', '', '', '');
INSERT INTO `formtable_fields_type_child` VALUES ('16', '10', 'text', '下拉', '', '0', '0', '', '', '');
INSERT INTO `formtable_fields_type_child` VALUES ('17', '8', 'int', '单人员', '0', '11', '0', 'user', 'id', 'realname');
INSERT INTO `formtable_fields_type_child` VALUES ('18', '8', 'text', '多人员', '', '0', '0', 'user', 'id', 'realname');
INSERT INTO `formtable_fields_type_child` VALUES ('19', '8', 'int', '单部门', '0', '11', '0', 'department', 'id', 'name');
INSERT INTO `formtable_fields_type_child` VALUES ('20', '8', 'text', '多部门', '', '0', '0', 'department', 'id', 'name');
INSERT INTO `formtable_fields_type_child` VALUES ('21', '8', 'int', '单流程', '', '0', '0', 'workflowrequest', 'requestid', 'requestname');
INSERT INTO `formtable_fields_type_child` VALUES ('22', '9', 'text', '多选', '', '0', '0', '', '', '');

-- ----------------------------
-- Table structure for formtable_fields_values
-- ----------------------------
DROP TABLE IF EXISTS `formtable_fields_values`;
CREATE TABLE `formtable_fields_values` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `fieldid` int(11) NOT NULL DEFAULT '0' COMMENT '字段ID',
  `key` int(11) NOT NULL DEFAULT '0' COMMENT '键',
  `value` varchar(64) NOT NULL DEFAULT '' COMMENT '值',
  `isdefault` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否默认',
  PRIMARY KEY (`id`),
  KEY `fieldid` (`fieldid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='表单字段选项表';

-- ----------------------------
-- Records of formtable_fields_values
-- ----------------------------
INSERT INTO `formtable_fields_values` VALUES ('1', '10', '1', '选项1', '0');
INSERT INTO `formtable_fields_values` VALUES ('2', '10', '2', '选项2', '0');
INSERT INTO `formtable_fields_values` VALUES ('3', '10', '3', '选项3', '1');
INSERT INTO `formtable_fields_values` VALUES ('4', '11', '1', '下拉1', '0');
INSERT INTO `formtable_fields_values` VALUES ('5', '11', '2', '下拉2', '1');
INSERT INTO `formtable_fields_values` VALUES ('6', '11', '3', '下拉3', '0');
INSERT INTO `formtable_fields_values` VALUES ('7', '16', '1', '多选1', '0');
INSERT INTO `formtable_fields_values` VALUES ('8', '16', '2', '多选2', '1');
INSERT INTO `formtable_fields_values` VALUES ('9', '16', '3', '多选3', '0');
INSERT INTO `formtable_fields_values` VALUES ('10', '20', '1', '下拉1', '0');
INSERT INTO `formtable_fields_values` VALUES ('11', '20', '2', '下拉2', '0');
INSERT INTO `formtable_fields_values` VALUES ('12', '20', '3', '下拉3', '1');

-- ----------------------------
-- Table structure for workflow
-- ----------------------------
DROP TABLE IF EXISTS `workflow`;
CREATE TABLE `workflow` (
  `workflowid` int(11) NOT NULL AUTO_INCREMENT COMMENT '工作流ID',
  `categoryid` int(11) NOT NULL DEFAULT '0' COMMENT '工作流分类',
  `formtableid` int(11) NOT NULL DEFAULT '0' COMMENT '表单ID',
  `workflowname` varchar(255) NOT NULL DEFAULT '' COMMENT '工作流名称',
  `filepath` varchar(64) NOT NULL DEFAULT '' COMMENT '附件目录',
  `customizenumber` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否自定义编号',
  `mailmessage` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否邮件通知',
  `validflag` tinyint(1) NOT NULL DEFAULT '1' COMMENT '回收状态',
  `createuser` int(11) NOT NULL DEFAULT '0' COMMENT '创建人',
  `createtime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `modifyuser` int(11) NOT NULL DEFAULT '0' COMMENT '维护人',
  `modifytime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '维护时间',
  PRIMARY KEY (`workflowid`),
  KEY `formtableid` (`formtableid`) USING BTREE,
  KEY `categoryid` (`categoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8 COMMENT='工作流主表';

-- ----------------------------
-- Records of workflow
-- ----------------------------
INSERT INTO `workflow` VALUES ('1', '1', '1', '初始化流程', '', '0', '0', '1', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow` VALUES ('2', '2', '0', '', '', '0', '0', '0', '1', '2016-03-24 11:27:35', '1', '2016-03-24 11:27:35');
INSERT INTO `workflow` VALUES ('3', '2', '0', '', '', '0', '0', '0', '1', '2016-03-24 11:28:20', '1', '2016-03-24 11:28:20');
INSERT INTO `workflow` VALUES ('4', '1', '0', '', '', '0', '0', '0', '1', '2016-03-24 11:29:13', '1', '2016-03-24 11:29:13');
INSERT INTO `workflow` VALUES ('5', '3', '0', '', '', '0', '0', '0', '1', '2016-03-24 11:32:19', '1', '2016-03-24 11:32:19');
INSERT INTO `workflow` VALUES ('6', '3', '0', '', '', '0', '0', '0', '1', '2016-03-24 11:43:05', '1', '2016-03-24 11:43:05');
INSERT INTO `workflow` VALUES ('7', '1', '0', '', '', '0', '0', '0', '1', '2016-03-24 11:44:44', '1', '2016-03-24 11:44:44');
INSERT INTO `workflow` VALUES ('8', '2', '0', '', '', '0', '0', '0', '1', '2016-03-24 11:44:55', '1', '2016-03-24 11:44:55');
INSERT INTO `workflow` VALUES ('9', '3', '0', '', '', '0', '0', '1', '1', '2016-03-24 11:59:22', '1', '2016-03-24 11:59:22');
INSERT INTO `workflow` VALUES ('10', '2', '0', '', '', '0', '0', '1', '1', '2016-03-24 13:47:08', '1', '2016-03-24 13:47:08');
INSERT INTO `workflow` VALUES ('11', '2', '0', '', '', '0', '0', '1', '1', '2016-03-24 13:47:15', '1', '2016-03-24 13:47:15');
INSERT INTO `workflow` VALUES ('12', '2', '0', '', '', '0', '0', '1', '1', '2016-03-24 14:42:24', '1', '2016-03-24 14:42:24');
INSERT INTO `workflow` VALUES ('13', '1', '0', '', '', '0', '0', '1', '1', '2016-03-24 14:43:34', '1', '2016-03-24 14:43:34');
INSERT INTO `workflow` VALUES ('14', '3', '0', '', '', '0', '0', '1', '1', '2016-03-24 14:43:46', '1', '2016-03-24 14:43:46');
INSERT INTO `workflow` VALUES ('15', '1', '0', '', '', '0', '0', '1', '1', '2016-03-24 14:43:49', '1', '2016-03-24 14:43:49');
INSERT INTO `workflow` VALUES ('16', '1', '0', '', '', '0', '0', '1', '1', '2016-03-24 14:44:11', '1', '2016-03-24 14:44:11');
INSERT INTO `workflow` VALUES ('17', '2', '0', '', '', '0', '0', '1', '1', '2016-03-24 14:44:59', '1', '2016-03-24 14:44:59');
INSERT INTO `workflow` VALUES ('18', '2', '0', '', '', '0', '0', '1', '1', '2016-03-24 14:50:01', '1', '2016-03-24 14:50:01');
INSERT INTO `workflow` VALUES ('19', '2', '0', '', '', '0', '0', '1', '1', '2016-03-24 14:50:57', '1', '2016-03-24 14:50:57');
INSERT INTO `workflow` VALUES ('20', '1', '0', '', '', '0', '0', '1', '1', '2016-03-24 15:10:19', '1', '2016-03-24 15:10:19');
INSERT INTO `workflow` VALUES ('21', '1', '0', '', '', '0', '0', '1', '1', '2016-03-24 15:11:52', '1', '2016-03-24 15:11:52');
INSERT INTO `workflow` VALUES ('22', '1', '0', '', '', '0', '0', '1', '1', '2016-03-24 15:13:32', '1', '2016-03-24 15:13:32');
INSERT INTO `workflow` VALUES ('23', '1', '0', '', '', '0', '0', '1', '1', '2016-03-24 15:13:35', '1', '2016-03-24 15:13:35');
INSERT INTO `workflow` VALUES ('100', '1', '100', '请假单流程', '', '0', '0', '1', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for workflow_authority
-- ----------------------------
DROP TABLE IF EXISTS `workflow_authority`;
CREATE TABLE `workflow_authority` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `workflowid` int(11) NOT NULL DEFAULT '0' COMMENT '工作流ID',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '权限类型 1按创建人，2按自定义人，3按表单中人字段，4按自定义角色，',
  `relation` tinyint(4) NOT NULL DEFAULT '0' COMMENT '权限类型关联 1本人，2上级主管，3机构角色，4所有角色',
  `fieldid` int(11) NOT NULL DEFAULT '0' COMMENT '字段ID',
  `userid` int(11) NOT NULL DEFAULT '0' COMMENT '用户ID',
  `roleid` int(11) NOT NULL DEFAULT '0' COMMENT '角色ID',
  `organizationid` int(11) NOT NULL DEFAULT '0' COMMENT '机构ID',
  `departmentid` int(11) NOT NULL DEFAULT '0' COMMENT '部门ID',
  `mode` tinyint(1) NOT NULL DEFAULT '0' COMMENT '处理方式 1查看，2编辑，3全局控制',
  `order` tinyint(4) NOT NULL DEFAULT '0' COMMENT '排序',
  `createuser` int(11) NOT NULL DEFAULT '0' COMMENT '创建人',
  `createtime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `modifyuser` int(11) NOT NULL DEFAULT '0' COMMENT '维护人',
  `modifytime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '维护时间',
  PRIMARY KEY (`id`),
  KEY `workflowid` (`workflowid`) USING BTREE,
  KEY `workflowid, type, relation, fieldid, userid, roleid, organizatio` (`workflowid`,`type`,`relation`,`fieldid`,`userid`,`roleid`,`organizationid`,`departmentid`,`mode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='工作流权限表';

-- ----------------------------
-- Records of workflow_authority
-- ----------------------------

-- ----------------------------
-- Table structure for workflow_category
-- ----------------------------
DROP TABLE IF EXISTS `workflow_category`;
CREATE TABLE `workflow_category` (
  `categoryid` int(11) NOT NULL AUTO_INCREMENT COMMENT '工作流分类ID',
  `categoryname` varchar(64) NOT NULL DEFAULT '' COMMENT '分类名称',
  `validflag` tinyint(1) NOT NULL DEFAULT '1' COMMENT '回收状态',
  `createuser` int(11) NOT NULL DEFAULT '0' COMMENT '创建人',
  `createtime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `modifyuser` int(11) NOT NULL DEFAULT '0' COMMENT '维护人',
  `modifytime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '维护时间',
  PRIMARY KEY (`categoryid`),
  KEY `categoryid` (`categoryid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='工作流分类表';

-- ----------------------------
-- Records of workflow_category
-- ----------------------------
INSERT INTO `workflow_category` VALUES ('1', '测试类', '1', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_category` VALUES ('2', '开发类', '1', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_category` VALUES ('3', '运维类', '1', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for workflow_formtable
-- ----------------------------
DROP TABLE IF EXISTS `workflow_formtable`;
CREATE TABLE `workflow_formtable` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `requestid` int(11) NOT NULL DEFAULT '0' COMMENT '请求ID',
  `workflowid` int(11) NOT NULL DEFAULT '0' COMMENT '工作流ID',
  `formtableid` int(11) NOT NULL DEFAULT '0' COMMENT '表单ID',
  PRIMARY KEY (`id`),
  KEY `workflowid` (`workflowid`) USING BTREE,
  KEY `requestid` (`requestid`) USING BTREE,
  KEY `formtableid` (`formtableid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流程自定义表单';

-- ----------------------------
-- Records of workflow_formtable
-- ----------------------------

-- ----------------------------
-- Table structure for workflow_formtable1
-- ----------------------------
DROP TABLE IF EXISTS `workflow_formtable1`;
CREATE TABLE `workflow_formtable1` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `requestid` int(11) NOT NULL DEFAULT '0' COMMENT '请求ID',
  `workflowid` int(11) NOT NULL DEFAULT '0' COMMENT '工作流ID',
  `formtableid` int(11) NOT NULL DEFAULT '0' COMMENT '表单ID',
  `xingming` varchar(32) DEFAULT '',
  `riqi` date DEFAULT '0000-00-00',
  `shixiang` varchar(255) DEFAULT NULL,
  `beizhu` text,
  `shuliang` int(11) DEFAULT '0',
  `jine` decimal(14,2) DEFAULT '0.00',
  `shijian` datetime DEFAULT '0000-00-00 00:00:00',
  `fujian` text,
  `yuangong` int(11) DEFAULT '0',
  `xuanxiang` text,
  `select` text,
  `bumen` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `workflowid` (`workflowid`) USING BTREE,
  KEY `requestid` (`requestid`) USING BTREE,
  KEY `formtableid` (`formtableid`) USING BTREE,
  KEY `requestid, workflowid, formtableid` (`requestid`,`workflowid`,`formtableid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8 COMMENT='流程自定义表单';

-- ----------------------------
-- Records of workflow_formtable1
-- ----------------------------
INSERT INTO `workflow_formtable1` VALUES ('1', '1', '0', '1', '陈琳辉1', '0000-00-00', '没事', '备注', '0', '0.00', '0000-00-00 00:00:00', '', '0', '3', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('2', '0', '0', '0', '收到', '0000-00-00', '14', '1414', '123', '321.00', '0000-00-00 00:00:00', null, '0', '3', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('3', '-1', '0', '0', '收到', '0000-00-00', '14', '1414', '123', '321.00', '0000-00-00 00:00:00', null, '0', '3', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('4', '0', '0', '0', '收到', '0000-00-00', '14', '1414', '123', '321.00', '0000-00-00 00:00:00', null, '0', '3', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('5', '8', '0', '0', '收到', '0000-00-00', '14', '1414', '123', '321.00', '0000-00-00 00:00:00', null, '0', '3', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('6', '8', '0', '0', '姓名', '0000-00-00', '312', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('7', '9', '0', '0', '姓名', '0000-00-00', '312', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('8', '10', '0', '0', '2', '0000-00-00', '4', '', '5', '6.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('9', '11', '0', '0', '2', '0000-00-00', '4', '', '5', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('10', '12', '0', '0', '2', '0000-00-00', '1', '', '1231', '1.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('11', '13', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('12', '14', '1', '0', '', '0000-00-00', '44', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('13', '15', '0', '0', '陈琳辉', '0000-00-00', '就看见接口', '12444爱迪生', '123', '123.00', '2010-12-12 00:00:00', '', '0', '3', '1', '0');
INSERT INTO `workflow_formtable1` VALUES ('14', '16', '0', '0', '14', '0000-00-00', '14', '', '14', '1441.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('15', '17', '0', '0', '14', '0000-00-00', '14', '', '14', '1441.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('16', '18', '0', '0', '14', '0000-00-00', '14', '', '14', '1441.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('17', '19', '0', '0', '14', '0000-00-00', '14', '', '14', '1441.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('18', '20', '0', '0', '14', '0000-00-00', '14', '', '14', '1441.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('19', '21', '0', '0', '14', '0000-00-00', '14', '', '14', '1441.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('20', '22', '0', '0', '14', '0000-00-00', '14', '', '14', '1441.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('21', '23', '0', '0', '14', '0000-00-00', '14', '', '14', '1441.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('22', '24', '0', '0', '14', '0000-00-00', '14', '', '14', '1441.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('23', '25', '1', '0', '14', '0000-00-00', '14', '', '14', '1441.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('24', '26', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('25', '27', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('26', '28', '1', '0', '', '0000-00-00', '', '', '0', '2.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('27', '29', '1', '0', '414', '0000-00-00', '414', '', '14', '144.00', '0000-00-00 00:00:00', '', '0', '3', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('28', '30', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('29', '31', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('30', '32', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('31', '33', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('32', '34', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('33', '35', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('34', '36', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('35', '37', '1', '0', '', '0000-00-00', '', '', '41', '4.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('36', '38', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('37', '39', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('38', '40', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('39', '41', '0', '0', '', '0000-00-00', '', '141414141414414141', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('40', '42', '0', '0', '', '0000-00-00', '', '141414141414414141', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('41', '43', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('42', '44', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('43', '45', '1', '0', '123', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '3', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('44', '46', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('45', '47', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('46', '48', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('47', '49', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('48', '50', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('49', '51', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('50', '52', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('51', '53', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('52', '54', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('53', '55', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('54', '56', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('55', '57', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('56', '58', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('57', '59', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('58', '60', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('59', '61', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('60', '62', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('61', '63', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('62', '64', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('63', '65', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('64', '66', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('65', '67', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('66', '68', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('67', '69', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('68', '70', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('69', '71', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('70', '72', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('71', '73', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('72', '74', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('73', '75', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('74', '76', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('75', '77', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('76', '78', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('77', '79', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('78', '80', '0', '0', '', '0000-00-00', '1', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('79', '81', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('80', '82', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('81', '83', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('82', '84', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('83', '85', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('84', '86', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('85', '87', '0', '0', '', '0000-00-00', '1', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('86', '88', '0', '0', '', '0000-00-00', '1', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('87', '89', '0', '0', '', '0000-00-00', '1', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('88', '90', '0', '0', '', '0000-00-00', '1', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('89', '91', '0', '0', '', '0000-00-00', '1', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('90', '92', '0', '0', '', '0000-00-00', '1', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('91', '93', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('92', '94', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('93', '95', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('94', '96', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('95', '97', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('96', '98', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('97', '99', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('98', '100', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('99', '101', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('100', '102', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('101', '103', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('102', '104', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('103', '105', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('104', '106', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('105', '107', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('106', '108', '0', '0', '', '0000-00-00', '12', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('107', '109', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('108', '110', '0', '0', '', '0000-00-00', '', '', '0', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('109', '111', '0', '0', '', '0000-00-00', '', '', '222', '222.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('110', '112', '0', '0', '', '0000-00-00', '', '', '222', '222.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('111', '113', '0', '0', '', '0000-00-00', '1', '', '222', '222.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('112', '114', '0', '0', '', '0000-00-00', '1', '', '222', '222.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('113', '115', '0', '0', '', '0000-00-00', '1', '', '222', '222.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('114', '116', '0', '0', '', '0000-00-00', '1', '', '222', '222.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('115', '117', '0', '0', '', '0000-00-00', '1', '', '222', '222.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('116', '118', '0', '0', '', '0000-00-00', '1', '', '222', '222.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('117', '119', '0', '0', '', '0000-00-00', '1', '', '222', '222.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('118', '120', '0', '0', '', '0000-00-00', '1', '', '222', '222.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('119', '121', '0', '0', '414', '0000-00-00', '414', '', '14', '144.00', '0000-00-00 00:00:00', '', '0', '3', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('120', '122', '0', '0', '414', '0000-00-00', '414', '', '14', '144.00', '0000-00-00 00:00:00', '', '0', '3', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('121', '123', '0', '0', '414', '0000-00-00', '414', '', '14', '144.00', '0000-00-00 00:00:00', '', '0', '3', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('122', '124', '1', '0', '414', '0000-00-00', '414', '', '14', '144.00', '0000-00-00 00:00:00', '', '0', '3', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('123', '125', '0', '0', '', '0000-00-00', '1', '', '222', '222.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('124', '126', '0', '0', '', '0000-00-00', '', '13123', '0', '101.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('125', '127', '0', '0', '', '0000-00-00', '1', '', '0', '101.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('126', '128', '1', '0', '', '0000-00-00', '1', '40', '0', '111.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('127', '129', '1', '0', '', '0000-00-00', '1', '1,40', '0', '111.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('128', '130', '1', '0', '', '0000-00-00', '1', '1,40', '0', '111.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('129', '131', '1', '0', '414', '0000-00-00', '1', '1,40', '0', '111.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('130', '132', '1', '0', 'www', '0000-00-00', '12', '1,39', '0', '111.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('131', '133', '0', '0', '414', '0000-00-00', '414', '', '14', '144.00', '0000-00-00 00:00:00', '', '0', '3', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('132', '134', '0', '0', '414', '0000-00-00', '414', '', '14', '144.00', '0000-00-00 00:00:00', '', '0', '3', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('133', '135', '0', '0', '414', '0000-00-00', '414', '', '14', '144.00', '0000-00-00 00:00:00', '', '0', '3', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('134', '136', '0', '0', '414', '0000-00-00', '414', '1,39', '14', '144.00', '0000-00-00 00:00:00', '', '0', '3', '1', '0');
INSERT INTO `workflow_formtable1` VALUES ('135', '137', '0', '0', '414', '0000-00-00', '414', '1,39', '14', '144.00', '0000-00-00 00:00:00', '', '0', '3', '1', '0');
INSERT INTO `workflow_formtable1` VALUES ('136', '138', '0', '0', '', '0000-00-00', '2', '2112', '1', '0.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('137', '146', '0', '0', '', '0000-00-00', '', '', '0', '20.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('138', '148', '0', '0', '', '0000-00-00', null, null, '0', '20.00', '0000-00-00 00:00:00', null, '0', null, '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('139', '149', '0', '0', '', '0000-00-00', null, null, '0', '20.00', '0000-00-00 00:00:00', null, '0', null, '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('140', '150', '0', '0', '', '0000-00-00', null, null, '0', '20.00', '0000-00-00 00:00:00', null, '0', null, '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('141', '151', '0', '0', '', '0000-00-00', null, null, '0', '20.00', '0000-00-00 00:00:00', null, '0', null, '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('142', '158', '0', '0', '', '0000-00-00', null, null, '0', '20.00', '0000-00-00 00:00:00', null, '0', null, '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('143', '159', '0', '0', '', '0000-00-00', '', '', '0', '20.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('144', '160', '0', '0', '', '0000-00-00', '', '', '0', '20.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('145', '161', '0', '0', '', '0000-00-00', '', '', '0', '20.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('146', '162', '0', '0', '', '2016-12-12', '', '', '0', '20.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('147', '163', '0', '0', '', '2016-12-12', '', '', '0', '20.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('148', '164', '0', '0', '', '2016-12-12', '', '', '0', '30.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('149', '165', '0', '0', '', '2016-12-12', '', '', '0', '30.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('150', '166', '0', '0', '', '2016-12-12', '', '', '0', '30.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('151', '167', '0', '0', '', '2016-12-12', '', '', '0', '30.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('152', '168', '0', '0', '', '2016-12-12', '', '', '0', '30.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('153', '169', '0', '0', '', '2016-12-12', '', '', '0', '30.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('154', '170', '0', '0', '', '2016-12-12', '', '', '0', '30.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('155', '171', '0', '0', '', '2016-12-12', '', '', '0', '30.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('156', '172', '0', '0', '', '2016-12-12', '', '', '0', '30.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('157', '173', '0', '0', '', '2016-12-12', '', '', '0', '30.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('158', '174', '0', '0', '', '2016-12-12', '', '', '0', '30.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('159', '175', '0', '0', '', '2016-12-12', '', '', '0', '30.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('160', '176', '0', '0', '', '2016-12-12', '', '', '0', '30.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('161', '177', '0', '0', '', '2016-12-12', '', '', '0', '30.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('162', '178', '0', '0', '', '2016-12-12', '', '', '0', '30.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('163', '179', '0', '0', '', '2016-12-12', '', '', '0', '30.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('164', '180', '0', '0', '', '2016-12-12', '', '', '0', '30.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('165', '181', '0', '0', '', '2016-12-12', '', '', '0', '30.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('166', '182', '0', '0', '', '2016-12-12', '', '', '0', '100.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('167', '183', '1', '0', '', '2016-12-12', '', '', '0', '1001.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('168', '184', '1', '0', '', '2016-12-12', '', '', '0', '120.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('169', '185', '0', '0', '', '2016-12-12', '', '', '0', '122.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('170', '186', '0', '0', '', '2016-12-12', '', '', '0', '20.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('171', '187', '0', '0', '', '2016-12-12', '', '', '0', '100.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('172', '188', '1', '0', '', '2016-12-12', '', '', '0', '120.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');
INSERT INTO `workflow_formtable1` VALUES ('173', '189', '0', '0', '', '2016-12-12', '', '', '0', '120.00', '0000-00-00 00:00:00', '', '0', '', '2', '0');

-- ----------------------------
-- Table structure for workflow_formtable100
-- ----------------------------
DROP TABLE IF EXISTS `workflow_formtable100`;
CREATE TABLE `workflow_formtable100` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `requestid` int(11) NOT NULL DEFAULT '0' COMMENT '请求ID',
  `workflowid` int(11) NOT NULL DEFAULT '0' COMMENT '工作流ID',
  `formtableid` int(11) NOT NULL DEFAULT '0' COMMENT '表单ID',
  `shenqingren` int(11) NOT NULL DEFAULT '0' COMMENT '申请人',
  PRIMARY KEY (`id`),
  KEY `workflowid` (`workflowid`) USING BTREE,
  KEY `requestid` (`requestid`) USING BTREE,
  KEY `formtableid` (`formtableid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='流程自定义表单';

-- ----------------------------
-- Records of workflow_formtable100
-- ----------------------------
INSERT INTO `workflow_formtable100` VALUES ('1', '190', '100', '0', '0');
INSERT INTO `workflow_formtable100` VALUES ('2', '191', '0', '0', '1');
INSERT INTO `workflow_formtable100` VALUES ('3', '192', '0', '0', '1');
INSERT INTO `workflow_formtable100` VALUES ('4', '193', '0', '0', '1');
INSERT INTO `workflow_formtable100` VALUES ('5', '194', '0', '0', '1');
INSERT INTO `workflow_formtable100` VALUES ('6', '195', '0', '0', '1');
INSERT INTO `workflow_formtable100` VALUES ('7', '196', '0', '0', '1');
INSERT INTO `workflow_formtable100` VALUES ('8', '197', '0', '0', '1');
INSERT INTO `workflow_formtable100` VALUES ('9', '198', '0', '0', '1');
INSERT INTO `workflow_formtable100` VALUES ('10', '199', '0', '0', '22');
INSERT INTO `workflow_formtable100` VALUES ('11', '200', '0', '0', '444');
INSERT INTO `workflow_formtable100` VALUES ('12', '201', '100', '0', '442');

-- ----------------------------
-- Table structure for workflow_formtable101
-- ----------------------------
DROP TABLE IF EXISTS `workflow_formtable101`;
CREATE TABLE `workflow_formtable101` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `requestid` int(11) NOT NULL DEFAULT '0' COMMENT '请求ID',
  `workflowid` int(11) NOT NULL DEFAULT '0' COMMENT '工作流ID',
  `formtableid` int(11) NOT NULL DEFAULT '0' COMMENT '表单ID',
  PRIMARY KEY (`id`),
  KEY `workflowid` (`workflowid`) USING BTREE,
  KEY `requestid` (`requestid`) USING BTREE,
  KEY `formtableid` (`formtableid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流程自定义表单';

-- ----------------------------
-- Records of workflow_formtable101
-- ----------------------------

-- ----------------------------
-- Table structure for workflow_formtable102
-- ----------------------------
DROP TABLE IF EXISTS `workflow_formtable102`;
CREATE TABLE `workflow_formtable102` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `requestid` int(11) NOT NULL DEFAULT '0' COMMENT '请求ID',
  `workflowid` int(11) NOT NULL DEFAULT '0' COMMENT '工作流ID',
  `formtableid` int(11) NOT NULL DEFAULT '0' COMMENT '表单ID',
  PRIMARY KEY (`id`),
  KEY `workflowid` (`workflowid`) USING BTREE,
  KEY `requestid` (`requestid`) USING BTREE,
  KEY `formtableid` (`formtableid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流程自定义表单';

-- ----------------------------
-- Records of workflow_formtable102
-- ----------------------------

-- ----------------------------
-- Table structure for workflow_formtable1dt2
-- ----------------------------
DROP TABLE IF EXISTS `workflow_formtable1dt2`;
CREATE TABLE `workflow_formtable1dt2` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `mainid` int(11) NOT NULL DEFAULT '0' COMMENT '主记录ID',
  `requestid` int(11) NOT NULL DEFAULT '0' COMMENT '请求ID',
  `workflowid` int(11) NOT NULL DEFAULT '0' COMMENT '工作流ID',
  `formtableid` int(11) NOT NULL DEFAULT '0' COMMENT '表单ID',
  `price` decimal(14,2) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  `xiaoji` decimal(14,2) DEFAULT NULL,
  `select` text,
  PRIMARY KEY (`id`),
  KEY `workflowid` (`workflowid`) USING BTREE,
  KEY `requestid` (`requestid`) USING BTREE,
  KEY `formtableid` (`formtableid`) USING BTREE,
  KEY `requestid, workflowid, formtableid, mainid` (`requestid`,`workflowid`,`formtableid`,`mainid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8 COMMENT='流程自定义表单';

-- ----------------------------
-- Records of workflow_formtable1dt2
-- ----------------------------
INSERT INTO `workflow_formtable1dt2` VALUES ('5', '1', '1', '1', '2', '31323.00', '444', '444.00', '2,3');
INSERT INTO `workflow_formtable1dt2` VALUES ('6', '1', '1', '1', '2', '4414.00', '13213', '12313.00', '2');
INSERT INTO `workflow_formtable1dt2` VALUES ('7', '1', '1', '1', '2', '4414.00', '12313', '555.00', '1,2,3');
INSERT INTO `workflow_formtable1dt2` VALUES ('8', '1', '1', '1', '2', '0.00', '0', '44.00', '2');
INSERT INTO `workflow_formtable1dt2` VALUES ('9', '1', '1', '1', '2', '0.00', '1', '21.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('10', '1', '1', '1', '2', '0.00', '0', '0.00', '1,2,3');
INSERT INTO `workflow_formtable1dt2` VALUES ('11', '1', '12', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('12', '1', '12', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('13', '1', '12', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('14', '1', '12', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('15', '1', '12', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('16', '1', '12', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('17', '1', '12', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('18', '1', '12', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('19', '11', '13', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('20', '1', '14', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('21', '1', '14', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('22', '1', '14', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('23', '1', '15', '1', '2', '1.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('24', '1', '15', '1', '2', '2.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('25', '1', '29', '1', '2', '0.00', '0', '0.00', '3');
INSERT INTO `workflow_formtable1dt2` VALUES ('26', '1', '29', '1', '2', '0.00', '0', '0.00', '2,3');
INSERT INTO `workflow_formtable1dt2` VALUES ('27', '1', '29', '1', '2', '0.00', '0', '0.00', '2');
INSERT INTO `workflow_formtable1dt2` VALUES ('28', '1', '29', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('29', '28', '30', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('30', '28', '30', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('31', '29', '31', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('32', '29', '31', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('35', '1', '40', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('36', '1', '40', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('37', '1', '40', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('38', '1', '45', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('39', '1', '45', '1', '2', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt2` VALUES ('40', '1', '126', '1', '2', '0.00', '0', '0.00', '2');
INSERT INTO `workflow_formtable1dt2` VALUES ('41', '1', '126', '1', '2', '0.00', '0', '0.00', '2,3');
INSERT INTO `workflow_formtable1dt2` VALUES ('42', '1', '136', '1', '2', '0.00', '0', '0.00', '1');
INSERT INTO `workflow_formtable1dt2` VALUES ('43', '1', '136', '1', '2', '0.00', '0', '0.00', '3');
INSERT INTO `workflow_formtable1dt2` VALUES ('44', '135', '137', '1', '2', '0.00', '0', '0.00', '1,2');
INSERT INTO `workflow_formtable1dt2` VALUES ('45', '135', '137', '1', '2', '0.00', '0', '0.00', '2');
INSERT INTO `workflow_formtable1dt2` VALUES ('46', '135', '137', '1', '2', '0.00', '0', '0.00', '3');

-- ----------------------------
-- Table structure for workflow_formtable1dt3
-- ----------------------------
DROP TABLE IF EXISTS `workflow_formtable1dt3`;
CREATE TABLE `workflow_formtable1dt3` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `mainid` int(11) NOT NULL DEFAULT '0' COMMENT '主记录ID',
  `requestid` int(11) NOT NULL DEFAULT '0' COMMENT '请求ID',
  `workflowid` int(11) NOT NULL DEFAULT '0' COMMENT '工作流ID',
  `formtableid` int(11) NOT NULL DEFAULT '0' COMMENT '表单ID',
  `price` decimal(14,2) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  `xiaoji` decimal(14,2) DEFAULT NULL,
  `select` text,
  PRIMARY KEY (`id`),
  KEY `workflowid` (`workflowid`) USING BTREE,
  KEY `requestid` (`requestid`) USING BTREE,
  KEY `formtableid` (`formtableid`) USING BTREE,
  KEY `requestid, workflowid, formtableid, mainid` (`requestid`,`workflowid`,`formtableid`,`mainid`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COMMENT='流程自定义表单';

-- ----------------------------
-- Records of workflow_formtable1dt3
-- ----------------------------
INSERT INTO `workflow_formtable1dt3` VALUES ('9', '1', '1', '1', '3', '0.00', '1', '21.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('11', '1', '12', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('12', '1', '12', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('13', '1', '12', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('14', '1', '12', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('15', '1', '12', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('16', '1', '12', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('17', '1', '12', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('18', '1', '12', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('19', '11', '13', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('20', '1', '14', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('21', '1', '14', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('22', '1', '14', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('23', '1', '14', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('24', '1', '14', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('25', '1', '15', '1', '3', '3.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('26', '1', '15', '1', '3', '5.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('27', '1', '29', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('28', '1', '29', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('29', '28', '30', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('30', '28', '30', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('31', '28', '30', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('32', '1', '40', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('33', '1', '40', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('34', '1', '40', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('35', '1', '45', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('36', '1', '45', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('37', '1', '126', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('38', '1', '126', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('39', '1', '136', '1', '3', '0.00', '13', '0.00', '3');
INSERT INTO `workflow_formtable1dt3` VALUES ('40', '1', '136', '1', '3', '0.00', '3', '0.00', '1');
INSERT INTO `workflow_formtable1dt3` VALUES ('41', '1', '136', '1', '3', '0.00', '0', '0.00', '');
INSERT INTO `workflow_formtable1dt3` VALUES ('42', '135', '137', '1', '3', '0.00', '0', '0.00', '3');
INSERT INTO `workflow_formtable1dt3` VALUES ('43', '135', '137', '1', '3', '0.00', '0', '0.00', '3');
INSERT INTO `workflow_formtable1dt3` VALUES ('44', '135', '137', '1', '3', '0.00', '0', '0.00', '3');

-- ----------------------------
-- Table structure for workflow_formtable40
-- ----------------------------
DROP TABLE IF EXISTS `workflow_formtable40`;
CREATE TABLE `workflow_formtable40` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `requestid` int(11) NOT NULL DEFAULT '0' COMMENT '请求ID',
  `workflowid` int(11) NOT NULL DEFAULT '0' COMMENT '工作流ID',
  `test10000` varchar(6) NOT NULL DEFAULT '' COMMENT '测试bbbbb|||87',
  `test10001` varchar(7) NOT NULL DEFAULT '' COMMENT '测试bbbbb|||88',
  `test100` date NOT NULL DEFAULT '0000-00-00' COMMENT '测试100',
  PRIMARY KEY (`id`),
  KEY `workflowid` (`workflowid`) USING BTREE,
  KEY `requestid` (`requestid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='流程自定义表单';

-- ----------------------------
-- Records of workflow_formtable40
-- ----------------------------
INSERT INTO `workflow_formtable40` VALUES ('1', '1', '1', '', '', '0000-00-00');
INSERT INTO `workflow_formtable40` VALUES ('2', '0', '0', '', '', '0000-00-00');

-- ----------------------------
-- Table structure for workflow_formtable42dt10
-- ----------------------------
DROP TABLE IF EXISTS `workflow_formtable42dt10`;
CREATE TABLE `workflow_formtable42dt10` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `mainid` int(11) NOT NULL DEFAULT '0' COMMENT '请求ID',
  `requestid` int(11) NOT NULL DEFAULT '0' COMMENT '请求ID',
  `workflowid` int(11) NOT NULL DEFAULT '0' COMMENT '工作流ID',
  `formtableid` int(11) NOT NULL DEFAULT '0' COMMENT '表单ID',
  PRIMARY KEY (`id`),
  KEY `workflowid` (`workflowid`) USING BTREE,
  KEY `requestid` (`requestid`) USING BTREE,
  KEY `formtableid` (`formtableid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='流程自定义表单';

-- ----------------------------
-- Records of workflow_formtable42dt10
-- ----------------------------
INSERT INTO `workflow_formtable42dt10` VALUES ('1', '1', '1', '1', '1');

-- ----------------------------
-- Table structure for workflow_node
-- ----------------------------
DROP TABLE IF EXISTS `workflow_node`;
CREATE TABLE `workflow_node` (
  `nodeid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `workflowid` int(11) NOT NULL DEFAULT '0' COMMENT '工作流ID',
  `nodename` varchar(255) NOT NULL DEFAULT '' COMMENT '节点名称',
  `nodetype` tinyint(1) NOT NULL DEFAULT '0' COMMENT '节点类型 1创建,2审批,3提交,4归档',
  `order` tinyint(4) NOT NULL COMMENT '排序',
  `beforesql` varchar(2000) NOT NULL DEFAULT '' COMMENT '节点前操作序列化（条件类型，值）',
  `aftersql` varchar(2000) NOT NULL DEFAULT '' COMMENT '节点后操作  序列化（条件类型，值）',
  `designrow` tinyint(1) NOT NULL DEFAULT '1' COMMENT '布局列数',
  `designdesc` text NOT NULL COMMENT '布局详情 冗余',
  `createtime` datetime DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `creator` varchar(55) DEFAULT '0' COMMENT '创建人',
  PRIMARY KEY (`nodeid`),
  KEY `workflowid` (`workflowid`) USING BTREE,
  KEY `workflowid, nodetype` (`workflowid`,`nodetype`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='工作流节点';

-- ----------------------------
-- Records of workflow_node
-- ----------------------------
INSERT INTO `workflow_node` VALUES ('1', '1', '创建节点', '1', '1', '`field9` = \'10\' and `field6` = \'20\'', '', '2', '', '0000-00-00 00:00:00', '0');
INSERT INTO `workflow_node` VALUES ('2', '1', '一审节点', '2', '2', '', '', '2', '', '0000-00-00 00:00:00', '0');
INSERT INTO `workflow_node` VALUES ('3', '1', '二审节点', '2', '2', '', '', '2', '', '0000-00-00 00:00:00', '0');
INSERT INTO `workflow_node` VALUES ('4', '1', '归档节点', '4', '4', '', '', '2', '', '0000-00-00 00:00:00', '0');
INSERT INTO `workflow_node` VALUES ('5', '100', '申请请假', '1', '1', '', '', '1', '', '0000-00-00 00:00:00', '0');
INSERT INTO `workflow_node` VALUES ('6', '100', '主管审批', '2', '2', '', '', '1', '', '0000-00-00 00:00:00', '0');
INSERT INTO `workflow_node` VALUES ('7', '100', '总经理审批', '2', '3', '', '', '1', '', '0000-00-00 00:00:00', '0');
INSERT INTO `workflow_node` VALUES ('8', '100', '人事审批', '2', '4', '', '', '1', '', '0000-00-00 00:00:00', '0');
INSERT INTO `workflow_node` VALUES ('9', '100', '确认归档', '4', '5', '', '', '1', '', '0000-00-00 00:00:00', '0');

-- ----------------------------
-- Table structure for workflow_node_fields
-- ----------------------------
DROP TABLE IF EXISTS `workflow_node_fields`;
CREATE TABLE `workflow_node_fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `fieldid` int(11) NOT NULL DEFAULT '0' COMMENT '字段ID',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '1可编辑 2必填 3只读',
  `nodeid` int(11) NOT NULL DEFAULT '0' COMMENT '节点ID',
  `default` varchar(32) NOT NULL DEFAULT '' COMMENT '默认值',
  `prompt` varchar(32) NOT NULL DEFAULT '' COMMENT '提示',
  `order` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `createuser` int(11) NOT NULL DEFAULT '0' COMMENT '创建人',
  `createtime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `modifyuser` int(11) NOT NULL DEFAULT '0' COMMENT '维护人',
  `modifytime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '维护时间',
  PRIMARY KEY (`id`),
  KEY `fieldid` (`fieldid`) USING BTREE,
  KEY `nodeid` (`nodeid`) USING BTREE,
  KEY `nodeid, fieldid, type` (`nodeid`,`fieldid`,`type`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8 COMMENT='工作流节点字段属性';

-- ----------------------------
-- Records of workflow_node_fields
-- ----------------------------
INSERT INTO `workflow_node_fields` VALUES ('1', '1', '2', '1', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('2', '2', '1', '1', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('3', '3', '2', '1', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('4', '4', '2', '1', '', '', '9', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('5', '5', '2', '1', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('6', '6', '2', '1', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('7', '7', '2', '1', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('8', '8', '2', '1', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('9', '9', '2', '1', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('10', '10', '2', '1', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('11', '11', '2', '1', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('12', '12', '2', '1', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('13', '13', '2', '1', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('14', '14', '2', '1', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('15', '15', '2', '1', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('16', '1', '3', '2', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('17', '2', '3', '2', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('18', '3', '3', '2', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('19', '4', '3', '2', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('20', '5', '3', '2', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('21', '6', '3', '2', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('22', '7', '3', '2', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('23', '8', '3', '2', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('24', '9', '3', '2', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('25', '10', '3', '2', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('26', '11', '3', '2', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('27', '12', '3', '2', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('28', '13', '3', '2', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('29', '14', '3', '2', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('30', '15', '3', '2', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('31', '1', '3', '3', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('32', '2', '3', '3', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('33', '3', '3', '3', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('34', '4', '3', '3', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('35', '5', '3', '3', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('36', '6', '3', '3', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('37', '7', '3', '3', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('38', '8', '3', '3', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('39', '9', '3', '3', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('40', '10', '3', '3', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('41', '11', '3', '3', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('42', '12', '3', '3', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('43', '13', '3', '3', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('44', '14', '3', '3', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('45', '15', '3', '3', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('46', '1', '3', '4', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('47', '2', '3', '4', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('48', '3', '3', '4', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('49', '4', '3', '4', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('50', '5', '3', '4', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('51', '6', '3', '4', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('52', '7', '3', '4', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('53', '8', '3', '4', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('54', '9', '3', '4', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('55', '10', '3', '4', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('56', '11', '3', '4', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('57', '12', '3', '4', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('58', '13', '3', '4', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('59', '14', '3', '4', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('60', '15', '3', '4', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('61', '16', '2', '1', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('62', '17', '2', '1', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('63', '18', '2', '1', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('64', '19', '2', '1', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('65', '20', '2', '1', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_fields` VALUES ('66', '93', '1', '5', '', '', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for workflow_node_process
-- ----------------------------
DROP TABLE IF EXISTS `workflow_node_process`;
CREATE TABLE `workflow_node_process` (
  `processid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键节点操作ID',
  `workflowid` int(11) NOT NULL DEFAULT '0' COMMENT '工作流ID',
  `nodeid` int(11) NOT NULL DEFAULT '0' COMMENT '（工作流）节点ID',
  `processname` varchar(64) NOT NULL DEFAULT '' COMMENT '操作名称',
  `undersigntype` tinyint(4) NOT NULL DEFAULT '0' COMMENT '1一人签署，2会签签署，3轮流签署，4条件签署',
  `createuser` int(11) NOT NULL DEFAULT '0' COMMENT '创建人',
  `createtime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `modifyuser` int(11) NOT NULL DEFAULT '0' COMMENT '维护人',
  `modifytime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '维护时间',
  PRIMARY KEY (`processid`),
  KEY `workflowid` (`workflowid`) USING BTREE,
  KEY `processid` (`processid`),
  KEY `workflowid, processid, nodeid, undersigntype` (`workflowid`,`processid`,`nodeid`,`undersigntype`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='工作流节点操作';

-- ----------------------------
-- Records of workflow_node_process
-- ----------------------------
INSERT INTO `workflow_node_process` VALUES ('1', '1', '1', '创建人', '1', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_process` VALUES ('2', '1', '2', '一审抄送', '2', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_process` VALUES ('3', '1', '3', '二审', '3', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_process` VALUES ('4', '1', '4', '归档', '3', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_process` VALUES ('5', '1', '2', '一审审批', '2', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_process` VALUES ('6', '100', '5', '创建人', '1', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_process` VALUES ('7', '100', '6', '主管', '1', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_process` VALUES ('8', '100', '7', '总经理', '1', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for workflow_node_process_rule
-- ----------------------------
DROP TABLE IF EXISTS `workflow_node_process_rule`;
CREATE TABLE `workflow_node_process_rule` (
  `ruleid` int(11) NOT NULL AUTO_INCREMENT,
  `processid` int(11) NOT NULL DEFAULT '0' COMMENT '节点操作ID',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '类型1按创建人，2按自定义人，3按表单中人字段，4按自定义角色，',
  `relation` tinyint(4) NOT NULL DEFAULT '0' COMMENT '关联类型 1本人，2上级主管，3某机构某角色，4所有某角色',
  `fieldid` int(11) NOT NULL DEFAULT '0' COMMENT '字段ID',
  `userid` int(11) NOT NULL DEFAULT '0' COMMENT '用户ID',
  `roleid` int(11) NOT NULL DEFAULT '0' COMMENT '角色ID',
  `organizationid` int(11) NOT NULL DEFAULT '0' COMMENT '机构ID',
  `departmentid` int(11) NOT NULL DEFAULT '0' COMMENT '部门ID',
  `conditiondesc` varchar(2000) NOT NULL DEFAULT '' COMMENT '处理条件 描述',
  `conditionsql` varchar(2000) NOT NULL DEFAULT '' COMMENT '处理条件 sql',
  `processmode` tinyint(1) NOT NULL DEFAULT '0' COMMENT '处理方式 1创建 2签署，3转发，4抄送 5归档 （签署可以通过退回，转发只能回复，抄送只能查看）',
  `order` tinyint(4) NOT NULL DEFAULT '0' COMMENT '排序',
  `createuser` int(11) NOT NULL DEFAULT '0' COMMENT '创建人',
  `createtime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `modifyuser` int(11) NOT NULL DEFAULT '0' COMMENT '维护人',
  `modifytime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '维护时间',
  PRIMARY KEY (`ruleid`),
  KEY `processid` (`processid`) USING BTREE,
  KEY `processid, type, relation, fieldid, userid, roleid, organization` (`processid`,`type`,`relation`,`fieldid`,`userid`,`roleid`,`organizationid`,`departmentid`,`processmode`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='工作流节点操作规则';

-- ----------------------------
-- Records of workflow_node_process_rule
-- ----------------------------
INSERT INTO `workflow_node_process_rule` VALUES ('1', '1', '1', '1', '0', '1', '0', '1', '0', '', '', '1', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_process_rule` VALUES ('2', '2', '4', '3', '0', '1', '59', '1', '0', '', '`shixiang`  = 1', '3', '1', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_process_rule` VALUES ('3', '3', '1', '1', '0', '1', '0', '1', '0', '', '', '2', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_process_rule` VALUES ('4', '4', '1', '1', '0', '1', '0', '1', '0', '', '', '5', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_process_rule` VALUES ('5', '2', '1', '1', '0', '1', '59', '1', '0', '', '', '4', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_process_rule` VALUES ('6', '5', '1', '1', '0', '1', '59', '1', '0', '', '', '2', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_process_rule` VALUES ('7', '7', '1', '1', '0', '0', '0', '0', '0', '', '', '2', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_process_rule` VALUES ('8', '6', '1', '1', '0', '0', '0', '0', '0', '', '', '2', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_node_process_rule` VALUES ('9', '8', '1', '1', '0', '0', '0', '0', '0', '', '', '2', '0', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for workflow_number_rule
-- ----------------------------
DROP TABLE IF EXISTS `workflow_number_rule`;
CREATE TABLE `workflow_number_rule` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `workflowid` int(11) NOT NULL DEFAULT '0' COMMENT '工作流ID',
  `rule_1` varchar(2000) NOT NULL DEFAULT '' COMMENT '规则1  开头 序列化（启用，条件类型，值）',
  `rule_2` varchar(2000) NOT NULL DEFAULT '' COMMENT '规则2 序列化（启用，条件类型，值）',
  `rule_3` varchar(2000) NOT NULL DEFAULT '' COMMENT '规则3 序列化（启用，条件类型，值）',
  `rule_4` varchar(2000) NOT NULL DEFAULT '' COMMENT '规则4 序列化（启用，条件类型，值）',
  `rule_5` varchar(2000) NOT NULL DEFAULT '' COMMENT '规则5 序列化（启用，条件类型，值）',
  `rule_6` varchar(2000) NOT NULL DEFAULT '' COMMENT '规则6 序列化（启用，条件类型，值）',
  `rule_7` varchar(2000) NOT NULL DEFAULT '' COMMENT '规则7 序列化（启用，条件类型，值）',
  PRIMARY KEY (`id`),
  KEY `workflowid` (`workflowid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='工作流编号规则';

-- ----------------------------
-- Records of workflow_number_rule
-- ----------------------------

-- ----------------------------
-- Table structure for workflow_outlet
-- ----------------------------
DROP TABLE IF EXISTS `workflow_outlet`;
CREATE TABLE `workflow_outlet` (
  `outletid` int(11) NOT NULL AUTO_INCREMENT COMMENT '工作流节点出口ID',
  `workflowid` int(11) NOT NULL DEFAULT '0' COMMENT '工作流ID',
  `name` varchar(64) NOT NULL DEFAULT '' COMMENT '出口名称',
  `beforenode` int(11) NOT NULL DEFAULT '0' COMMENT '起始节点',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '出口类型 1通过，2退回',
  `afternode` int(11) NOT NULL DEFAULT '0' COMMENT '到达节点',
  `order` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `validflag` int(11) NOT NULL DEFAULT '1' COMMENT '1是否已经删除 0为正常',
  `rule` varchar(2000) NOT NULL DEFAULT '' COMMENT '条件规则',
  `affixationsql` varchar(2000) NOT NULL DEFAULT '' COMMENT '出口附带操作 序列化（条件类型，值）',
  `conditiondesc` varchar(2000) NOT NULL DEFAULT '' COMMENT '条件描述',
  `conditionsql` varchar(2000) NOT NULL DEFAULT '' COMMENT '条件SQL语句',
  `createuser` int(11) NOT NULL DEFAULT '0' COMMENT '创建人',
  `createtime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `modifyuser` int(11) NOT NULL DEFAULT '0' COMMENT '维护人',
  `modifytime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '维护时间',
  PRIMARY KEY (`outletid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='工作流节点出口';

-- ----------------------------
-- Records of workflow_outlet
-- ----------------------------
INSERT INTO `workflow_outlet` VALUES ('1', '1', '提交一审', '1', '1', '2', '0', '1', '', '', '金额 大于 100', '`jine`  >100', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_outlet` VALUES ('2', '1', '提交二审', '2', '1', '3', '0', '1', '', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_outlet` VALUES ('3', '1', '一审退回', '2', '2', '1', '0', '1', '', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_outlet` VALUES ('4', '1', '提交归档', '3', '1', '4', '0', '1', '', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_outlet` VALUES ('5', '1', '二审退回', '3', '2', '1', '0', '1', '', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_outlet` VALUES ('6', '100', '提交主管审批', '5', '1', '6', '0', '1', '', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_outlet` VALUES ('7', '100', '主管退回', '6', '2', '5', '0', '1', '', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_outlet` VALUES ('8', '100', '提交总经理审批', '6', '1', '7', '0', '1', '', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_outlet` VALUES ('9', '100', '总经理退回', '7', '2', '5', '0', '1', '', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_outlet` VALUES ('10', '100', '提交人事审批', '7', '1', '8', '0', '1', '', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_outlet` VALUES ('11', '100', '提交人事归档', '8', '1', '9', '0', '1', '', '', '', '', '0', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for workflow_requestbase
-- ----------------------------
DROP TABLE IF EXISTS `workflow_requestbase`;
CREATE TABLE `workflow_requestbase` (
  `requestid` int(11) NOT NULL AUTO_INCREMENT COMMENT '流程请求id',
  `workflowid` int(11) NOT NULL DEFAULT '0' COMMENT '工作流ID',
  `formtableid` int(11) NOT NULL DEFAULT '0' COMMENT '表单ID',
  `requestname` varchar(255) NOT NULL DEFAULT '' COMMENT '流程请求名称',
  `request_number` varchar(255) NOT NULL DEFAULT '' COMMENT '流程编号',
  `urgent` tinyint(1) NOT NULL DEFAULT '0' COMMENT '紧急程度 1一般  2正常  3紧急',
  `nodeid` int(11) NOT NULL DEFAULT '0' COMMENT '当前节点ID',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '请求流程状态 1暂存，2流转，3完成,4关闭',
  `validflag` tinyint(1) NOT NULL DEFAULT '1' COMMENT '回收状态',
  `cur_process` int(11) NOT NULL DEFAULT '0' COMMENT '当前操作人',
  `createuser` int(11) NOT NULL DEFAULT '0' COMMENT '创建人',
  `createtime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `modifyuser` int(11) NOT NULL DEFAULT '0' COMMENT '维护人',
  `modifytime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '维护时间',
  PRIMARY KEY (`requestid`),
  KEY `workflowid` (`workflowid`) USING BTREE,
  KEY `formtableid` (`formtableid`) USING BTREE,
  KEY `workflowid, formtableid, request_number, nodeid, status` (`workflowid`,`formtableid`,`request_number`,`nodeid`,`status`),
  KEY `requestid, nodeid, status, validflag, cur_process` (`requestid`,`nodeid`,`status`,`validflag`,`cur_process`)
) ENGINE=InnoDB AUTO_INCREMENT=202 DEFAULT CHARSET=utf8 COMMENT='流程主表';

-- ----------------------------
-- Records of workflow_requestbase
-- ----------------------------
INSERT INTO `workflow_requestbase` VALUES ('1', '1', '1', '收到', '', '0', '1', '1', '1', '0', '1', '0000-00-00 00:00:00', '1', '2016-03-29 10:41:11');
INSERT INTO `workflow_requestbase` VALUES ('22', '1', '1', '13', '', '0', '2', '2', '1', '39', '1', '2016-03-30 09:52:27', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('23', '1', '1', '13', '', '0', '2', '2', '1', '39', '1', '2016-03-30 10:07:39', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('24', '1', '1', '13', '', '0', '2', '2', '1', '39', '1', '2016-03-30 10:08:21', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('25', '1', '1', '', '', '0', '4', '2', '1', '1', '1', '2016-03-30 10:08:36', '1', '2016-03-30 11:12:14');
INSERT INTO `workflow_requestbase` VALUES ('26', '1', '1', '', '', '0', '2', '2', '1', '39', '1', '2016-03-30 11:16:53', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('27', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-30 11:17:03', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('28', '1', '1', '', '', '0', '4', '3', '1', '1', '1', '2016-03-30 11:17:11', '1', '2016-03-30 11:18:04');
INSERT INTO `workflow_requestbase` VALUES ('29', '1', '1', '', '', '0', '4', '3', '1', '1', '1', '2016-03-30 13:53:47', '1', '2016-03-30 16:42:29');
INSERT INTO `workflow_requestbase` VALUES ('30', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-30 17:09:32', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('31', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-30 17:09:40', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('32', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-30 17:09:47', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('33', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-30 17:10:44', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('34', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-30 17:10:53', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('35', '1', '1', '', '', '0', '2', '2', '1', '39', '1', '2016-03-30 17:11:07', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('36', '1', '1', '', '', '0', '2', '2', '1', '39', '1', '2016-03-30 17:11:16', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('37', '1', '1', '', '', '0', '4', '3', '1', '1', '1', '2016-03-30 17:11:27', '1', '2016-03-30 17:12:54');
INSERT INTO `workflow_requestbase` VALUES ('38', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-30 17:18:15', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('39', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-30 17:18:30', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('40', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-30 17:19:11', '1', '2016-03-30 17:19:42');
INSERT INTO `workflow_requestbase` VALUES ('41', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 10:25:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('42', '1', '1', '', '', '0', '2', '2', '1', '39', '1', '2016-03-31 10:25:17', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('43', '1', '1', '', '', '0', '2', '2', '1', '39', '1', '2016-03-31 10:26:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('44', '1', '1', '', '', '0', '2', '2', '1', '39', '1', '2016-03-31 10:26:39', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('45', '1', '1', '', '', '0', '2', '2', '1', '39', '1', '2016-03-31 10:42:03', '1', '2016-03-31 10:48:21');
INSERT INTO `workflow_requestbase` VALUES ('46', '1', '1', '', '', '0', '2', '2', '1', '39', '1', '2016-03-31 13:36:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('47', '1', '1', '', '', '0', '2', '2', '1', '39', '1', '2016-03-31 13:37:43', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('48', '1', '1', '', '', '0', '2', '2', '1', '39', '1', '2016-03-31 13:38:34', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('49', '1', '1', '', '', '0', '2', '2', '1', '39', '1', '2016-03-31 13:38:53', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('50', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:39:34', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('51', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:40:05', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('52', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:40:49', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('53', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:41:46', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('54', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:42:04', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('55', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:42:25', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('56', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:43:57', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('57', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 13:44:20', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('58', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:44:51', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('59', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 13:45:22', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('60', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:46:26', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('61', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:48:40', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('62', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 13:48:55', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('63', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 13:49:52', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('64', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 13:50:48', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('65', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:52:10', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('66', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 13:52:29', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('67', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 13:53:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('68', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:55:26', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('69', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:55:32', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('70', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:56:47', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('71', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:57:38', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('72', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:58:14', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('73', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:58:25', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('74', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:58:42', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('75', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:58:59', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('76', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 13:59:49', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('77', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:00:22', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('78', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:00:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('79', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:01:04', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('80', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:01:28', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('81', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:02:38', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('82', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:02:45', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('83', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:02:55', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('84', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:02:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('85', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:03:32', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('86', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:03:43', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('87', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:03:50', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('88', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:04:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('89', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:04:53', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('90', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:05:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('91', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:05:27', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('92', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:05:46', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('93', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:06:39', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('94', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:07:49', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('95', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:08:24', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('96', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:09:03', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('97', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:09:43', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('98', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:10:01', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('99', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:10:51', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('100', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:11:21', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('101', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:11:38', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('102', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:11:51', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('103', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:12:32', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('104', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:14:16', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('105', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:16:57', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('106', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:26:14', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('107', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:26:32', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('108', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:27:16', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('109', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:30:48', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('110', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-03-31 14:32:22', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('111', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:32:31', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('112', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:32:42', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('113', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:32:54', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('114', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:33:20', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('115', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:33:38', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('116', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:38:43', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('117', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:38:55', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('118', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:39:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('119', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:41:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('120', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:42:41', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('121', '1', '1', '13123', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:48:21', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('122', '1', '1', '13123', '', '0', '2', '2', '1', '1', '1', '2016-03-31 14:49:50', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('123', '1', '1', '13123', '', '0', '2', '2', '1', '1', '1', '2016-03-31 15:01:40', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('124', '1', '1', '', '', '0', '4', '3', '1', '1', '1', '2016-03-31 15:15:07', '1', '2016-03-31 15:16:48');
INSERT INTO `workflow_requestbase` VALUES ('125', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 15:22:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('126', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 15:25:33', '1', '2016-03-31 15:30:26');
INSERT INTO `workflow_requestbase` VALUES ('127', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-03-31 15:30:45', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('128', '1', '1', '', '', '0', '4', '2', '1', '40', '1', '2016-03-31 15:44:15', '1', '2016-03-31 15:44:25');
INSERT INTO `workflow_requestbase` VALUES ('129', '1', '1', '', '', '0', '4', '2', '1', '1', '1', '2016-03-31 15:45:40', '1', '2016-03-31 15:45:46');
INSERT INTO `workflow_requestbase` VALUES ('130', '1', '1', '', '', '0', '4', '3', '1', '1', '1', '2016-03-31 15:46:34', '1', '2016-03-31 15:46:41');
INSERT INTO `workflow_requestbase` VALUES ('131', '1', '1', '', '', '0', '4', '3', '1', '1', '1', '2016-03-31 15:48:55', '39', '2016-03-31 15:54:43');
INSERT INTO `workflow_requestbase` VALUES ('132', '1', '1', '', '', '0', '4', '3', '1', '1', '1', '2016-03-31 15:56:05', '39', '2016-03-31 15:57:26');
INSERT INTO `workflow_requestbase` VALUES ('133', '1', '1', '13123', '', '0', '2', '2', '1', '1', '1', '2016-03-31 16:56:25', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('134', '1', '1', '13123', '', '0', '2', '2', '1', '1', '1', '2016-03-31 16:56:32', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('135', '1', '1', '13123', '', '0', '2', '2', '1', '1', '1', '2016-03-31 16:56:58', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('136', '1', '1', '13123', '', '0', '1', '1', '1', '0', '1', '2016-03-31 17:15:26', '1', '2016-03-31 17:23:55');
INSERT INTO `workflow_requestbase` VALUES ('137', '1', '1', '13123', '', '0', '2', '2', '1', '1', '1', '2016-03-31 17:24:08', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('138', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-04-11 16:59:56', '1', '2016-04-11 17:00:22');
INSERT INTO `workflow_requestbase` VALUES ('139', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 11:51:20', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('140', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 11:51:21', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('141', '1', '1', '21', '', '0', '1', '1', '1', '0', '1', '2016-12-14 11:51:28', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('142', '1', '1', '21', '', '0', '1', '1', '1', '0', '1', '2016-12-14 11:51:30', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('143', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 11:51:35', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('144', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 11:51:41', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('145', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 13:46:27', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('146', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 13:48:02', '1', '2016-12-14 13:52:09');
INSERT INTO `workflow_requestbase` VALUES ('147', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 13:52:26', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('148', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 13:52:48', '1', '2016-12-14 13:53:51');
INSERT INTO `workflow_requestbase` VALUES ('149', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 13:54:09', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('150', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 13:54:24', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('151', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 13:55:41', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('152', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:00:35', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('153', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:00:48', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('154', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:05:33', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('155', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:06:12', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('156', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:07:27', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('157', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:07:55', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('158', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:08:44', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('159', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:14:22', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('160', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:16:15', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('161', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:16:47', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('162', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:22:29', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('163', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:22:42', '1', '2016-12-14 14:37:59');
INSERT INTO `workflow_requestbase` VALUES ('164', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:38:14', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('165', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:38:58', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('166', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:40:57', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('167', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:41:17', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('168', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:41:30', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('169', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:42:21', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('170', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:42:28', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('171', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:42:38', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('172', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:43:44', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('173', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:44:05', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('174', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:44:17', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('175', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:44:24', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('176', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:44:31', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('177', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:45:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('178', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:46:37', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('179', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:46:46', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('180', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:47:00', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('181', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:47:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('182', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-14 14:47:28', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('183', '1', '1', '', '', '0', '3', '2', '1', '0', '1', '2016-12-14 14:47:32', '1', '2016-12-14 14:55:21');
INSERT INTO `workflow_requestbase` VALUES ('184', '1', '1', '我们', '', '0', '4', '2', '1', '1', '1', '2016-12-14 14:56:19', '1', '2016-12-14 15:42:56');
INSERT INTO `workflow_requestbase` VALUES ('185', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-12-14 17:01:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('186', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-22 14:32:05', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('187', '1', '1', '', '', '0', '1', '1', '1', '0', '1', '2016-12-22 14:32:13', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('188', '1', '1', '', '', '0', '3', '2', '1', '1', '1', '2016-12-22 14:32:18', '1', '2016-12-22 14:32:30');
INSERT INTO `workflow_requestbase` VALUES ('189', '1', '1', '', '', '0', '2', '2', '1', '1', '1', '2016-12-29 11:55:05', '1', '2016-12-29 11:57:49');
INSERT INTO `workflow_requestbase` VALUES ('190', '100', '100', '', '', '0', '0', '1', '1', '0', '1', '2017-02-13 14:29:22', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('191', '100', '100', '', '', '0', '5', '1', '1', '0', '1', '2017-02-13 14:47:02', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('192', '100', '100', '', '', '0', '6', '2', '1', '0', '1', '2017-02-13 14:47:30', '1', '2017-02-13 15:07:19');
INSERT INTO `workflow_requestbase` VALUES ('193', '100', '100', '', '', '0', '5', '1', '1', '0', '1', '2017-02-13 14:48:57', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('194', '100', '100', '', '', '0', '5', '1', '1', '0', '1', '2017-02-13 14:49:10', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('195', '100', '100', '', '', '0', '5', '1', '1', '0', '1', '2017-02-13 14:49:17', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('196', '100', '100', '', '', '0', '5', '1', '1', '0', '1', '2017-02-13 14:51:02', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('197', '100', '100', '', '', '0', '5', '1', '1', '0', '1', '2017-02-13 14:51:39', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('198', '100', '100', '', '', '0', '5', '1', '1', '0', '1', '2017-02-13 14:55:45', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('199', '100', '100', '', '', '0', '6', '2', '1', '0', '1', '2017-02-13 15:09:21', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('200', '100', '100', '', '', '0', '6', '2', '1', '0', '1', '2017-02-13 15:10:24', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase` VALUES ('201', '100', '100', '', '', '0', '7', '2', '1', '1', '1', '2017-02-13 15:16:35', '1', '2017-02-13 15:16:39');

-- ----------------------------
-- Table structure for workflow_requestbase_processlog
-- ----------------------------
DROP TABLE IF EXISTS `workflow_requestbase_processlog`;
CREATE TABLE `workflow_requestbase_processlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `requestid` int(11) NOT NULL DEFAULT '0' COMMENT '流程ID',
  `beforeuser` int(11) NOT NULL DEFAULT '0' COMMENT '发起人',
  `afteruser` varchar(1000) NOT NULL DEFAULT '' COMMENT '响应人',
  `beforenode` int(11) NOT NULL DEFAULT '0' COMMENT '发起节点',
  `afternode` int(11) NOT NULL DEFAULT '0' COMMENT '响应节点',
  `response` tinyint(1) NOT NULL DEFAULT '0' COMMENT '响应',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '响应类型 1创建 2签署，3转发，4抄送 5归档',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态 1批准  2退回',
  `memo` varchar(2000) NOT NULL DEFAULT '' COMMENT '处理备注',
  `createuser` int(11) NOT NULL DEFAULT '0' COMMENT '创建人',
  `createtime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `modifyuser` int(11) NOT NULL DEFAULT '0' COMMENT '维护人',
  `modifytime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '维护时间',
  PRIMARY KEY (`id`),
  KEY `requestid` (`requestid`) USING BTREE,
  KEY `afteruser` (`afteruser`(255)) USING BTREE,
  KEY `beforeuser` (`beforeuser`) USING BTREE,
  KEY `afternode` (`afternode`) USING BTREE,
  KEY `beforenode` (`beforenode`) USING BTREE,
  KEY `requestid, beforeuser, afteruser, beforenode, afternode, respons` (`requestid`,`beforeuser`,`afteruser`(255),`beforenode`,`afternode`,`response`,`type`,`status`)
) ENGINE=InnoDB AUTO_INCREMENT=769 DEFAULT CHARSET=utf8 COMMENT='流程流转日志';

-- ----------------------------
-- Records of workflow_requestbase_processlog
-- ----------------------------
INSERT INTO `workflow_requestbase_processlog` VALUES ('33', '2', '39', '1', '2', '1', '1', '1', '0', '', '1', '0000-00-00 00:00:00', '1', '2016-03-29 10:22:38');
INSERT INTO `workflow_requestbase_processlog` VALUES ('113', '1', '1', '1', '1', '2', '1', '2', '2', '', '1', '2016-03-29 10:41:11', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('114', '1', '1', '37', '1', '2', '1', '2', '2', '', '1', '2016-03-29 10:41:11', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('115', '1', '1', '31', '1', '2', '1', '2', '2', '', '1', '2016-03-29 10:41:11', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('116', '1', '1', '35', '1', '2', '1', '2', '2', '', '1', '2016-03-29 10:41:11', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('117', '1', '1', '34', '1', '2', '1', '2', '2', '', '1', '2016-03-29 10:41:11', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('155', '22', '1', '39', '1', '2', '1', '2', '2', '', '1', '2016-03-30 09:52:27', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('156', '22', '1', '37', '1', '2', '1', '2', '2', '', '1', '2016-03-30 09:52:27', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('157', '22', '1', '31', '1', '2', '1', '2', '2', '', '1', '2016-03-30 09:52:27', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('158', '22', '1', '35', '1', '2', '1', '2', '2', '', '1', '2016-03-30 09:52:27', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('159', '22', '1', '34', '1', '2', '1', '2', '2', '', '1', '2016-03-30 09:52:27', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('160', '23', '1', '39', '1', '2', '1', '2', '2', '', '1', '2016-03-30 10:07:39', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('161', '23', '1', '37', '1', '2', '1', '2', '2', '', '1', '2016-03-30 10:07:39', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('162', '23', '1', '31', '1', '2', '1', '2', '2', '', '1', '2016-03-30 10:07:39', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('163', '23', '1', '35', '1', '2', '1', '2', '2', '', '1', '2016-03-30 10:07:39', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('164', '23', '1', '34', '1', '2', '1', '2', '2', '', '1', '2016-03-30 10:07:39', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('165', '24', '1', '39', '1', '2', '1', '2', '2', '', '1', '2016-03-30 10:08:21', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('166', '24', '1', '37', '1', '2', '1', '2', '2', '', '1', '2016-03-30 10:08:21', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('167', '24', '1', '31', '1', '2', '1', '2', '2', '', '1', '2016-03-30 10:08:21', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('168', '24', '1', '35', '1', '2', '1', '2', '2', '', '1', '2016-03-30 10:08:21', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('169', '24', '1', '34', '1', '2', '1', '2', '2', '', '1', '2016-03-30 10:08:21', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('170', '25', '1', '39', '1', '2', '1', '2', '0', '1', '1', '2016-03-30 10:08:37', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('171', '25', '1', '37', '1', '2', '1', '2', '0', '1', '1', '2016-03-30 10:08:37', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('172', '25', '1', '31', '1', '2', '1', '2', '0', '1', '1', '2016-03-30 10:08:37', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('173', '25', '1', '35', '1', '2', '1', '2', '0', '1', '1', '2016-03-30 10:08:37', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('174', '25', '1', '1,34', '1', '2', '1', '2', '1', '', '1', '2016-03-30 10:08:37', '1', '2016-03-30 11:01:14');
INSERT INTO `workflow_requestbase_processlog` VALUES ('175', '25', '1', '1', '1', '2', '1', '2', '1', '准备通过它', '1', '2016-03-30 11:01:14', '1', '2016-03-30 11:07:15');
INSERT INTO `workflow_requestbase_processlog` VALUES ('176', '25', '1', '1', '2', '3', '1', '2', '1', '1321331213', '1', '2016-03-30 11:07:15', '1', '2016-03-30 11:12:14');
INSERT INTO `workflow_requestbase_processlog` VALUES ('178', '25', '1', '1', '3', '4', '0', '2', '0', '', '1', '2016-03-30 11:12:14', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('179', '26', '1', '39', '1', '2', '1', '2', '2', '', '1', '2016-03-30 11:16:53', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('180', '26', '1', '37', '1', '2', '1', '2', '2', '', '1', '2016-03-30 11:16:53', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('181', '26', '1', '31', '1', '2', '1', '2', '2', '', '1', '2016-03-30 11:16:53', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('182', '26', '1', '35', '1', '2', '1', '2', '2', '', '1', '2016-03-30 11:16:53', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('183', '26', '1', '34', '1', '2', '1', '2', '2', '', '1', '2016-03-30 11:16:53', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('184', '28', '1', '1', '1', '2', '1', '2', '1', '1231', '1', '2016-03-30 11:17:12', '1', '2016-03-30 11:17:36');
INSERT INTO `workflow_requestbase_processlog` VALUES ('185', '28', '1', '1', '1', '2', '1', '2', '1', '22', '1', '2016-03-30 11:17:12', '1', '2016-03-30 11:17:42');
INSERT INTO `workflow_requestbase_processlog` VALUES ('186', '28', '1', '1', '1', '2', '1', '2', '1', '33', '1', '2016-03-30 11:17:12', '1', '2016-03-30 11:17:47');
INSERT INTO `workflow_requestbase_processlog` VALUES ('187', '28', '1', '1', '1', '2', '1', '2', '1', '44', '1', '2016-03-30 11:17:12', '1', '2016-03-30 11:17:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('188', '28', '1', '1', '1', '2', '1', '2', '1', '55', '1', '2016-03-30 11:17:12', '1', '2016-03-30 11:17:57');
INSERT INTO `workflow_requestbase_processlog` VALUES ('189', '28', '1', '1', '2', '3', '1', '2', '1', '66', '1', '2016-03-30 11:17:57', '1', '2016-03-30 11:18:04');
INSERT INTO `workflow_requestbase_processlog` VALUES ('190', '28', '1', '1', '3', '4', '1', '2', '1', '归档啦', '1', '2016-03-30 11:18:04', '1', '2016-03-30 11:27:50');
INSERT INTO `workflow_requestbase_processlog` VALUES ('191', '29', '1', '1', '1', '2', '1', '2', '2', '', '1', '2016-03-30 13:53:48', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('192', '29', '1', '1', '1', '2', '1', '2', '2', '', '1', '2016-03-30 13:53:48', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('193', '29', '1', '1', '1', '2', '1', '2', '2', '', '1', '2016-03-30 13:53:48', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('194', '29', '1', '1', '1', '2', '1', '2', '2', '', '1', '2016-03-30 13:53:48', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('195', '29', '1', '1', '1', '2', '1', '2', '2', '', '1', '2016-03-30 13:53:48', '1', '2016-03-30 15:16:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('196', '29', '1', '1', '2', '1', '1', '1', '1', '123123', '1', '2016-03-30 15:16:52', '1', '2016-03-30 15:17:21');
INSERT INTO `workflow_requestbase_processlog` VALUES ('198', '29', '1', '39', '1', '2', '1', '2', '2', '我 退回', '1', '2016-03-30 15:17:21', '1', '2016-03-30 15:17:38');
INSERT INTO `workflow_requestbase_processlog` VALUES ('199', '29', '1', '37', '1', '2', '1', '2', '2', '我 退回', '1', '2016-03-30 15:17:21', '1', '2016-03-30 15:17:38');
INSERT INTO `workflow_requestbase_processlog` VALUES ('200', '29', '1', '1', '1', '2', '1', '2', '2', '我 退回', '1', '2016-03-30 15:17:21', '1', '2016-03-30 15:17:38');
INSERT INTO `workflow_requestbase_processlog` VALUES ('201', '29', '1', '35', '1', '2', '1', '2', '2', '我 退回', '1', '2016-03-30 15:17:21', '1', '2016-03-30 15:17:38');
INSERT INTO `workflow_requestbase_processlog` VALUES ('202', '29', '1', '34', '1', '2', '1', '2', '2', '我 退回', '1', '2016-03-30 15:17:21', '1', '2016-03-30 15:17:38');
INSERT INTO `workflow_requestbase_processlog` VALUES ('203', '29', '1', '1', '2', '1', '1', '1', '1', '提交看看', '1', '2016-03-30 15:17:38', '1', '2016-03-30 15:22:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('205', '29', '1', '1', '1', '2', '1', '2', '1', '通过以下', '1', '2016-03-30 15:22:53', '1', '2016-03-30 15:23:50');
INSERT INTO `workflow_requestbase_processlog` VALUES ('210', '29', '1', '1', '2', '3', '1', '2', '2', '131414', '1', '2016-03-30 15:23:50', '1', '2016-03-30 15:40:58');
INSERT INTO `workflow_requestbase_processlog` VALUES ('211', '29', '1', '1', '3', '1', '1', '1', '1', '131231231414', '1', '2016-03-30 15:40:58', '1', '2016-03-30 15:44:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('212', '29', '1', '39', '1', '2', '1', '2', '2', '444', '1', '2016-03-30 15:44:00', '1', '2016-03-30 15:45:54');
INSERT INTO `workflow_requestbase_processlog` VALUES ('213', '29', '1', '37', '1', '2', '1', '2', '2', '444', '1', '2016-03-30 15:44:00', '1', '2016-03-30 15:45:54');
INSERT INTO `workflow_requestbase_processlog` VALUES ('214', '29', '1', '1', '1', '2', '1', '2', '2', '444', '1', '2016-03-30 15:44:00', '1', '2016-03-30 15:45:54');
INSERT INTO `workflow_requestbase_processlog` VALUES ('215', '29', '1', '35', '1', '2', '1', '2', '2', '444', '1', '2016-03-30 15:44:00', '1', '2016-03-30 15:45:54');
INSERT INTO `workflow_requestbase_processlog` VALUES ('216', '29', '1', '34', '1', '2', '1', '2', '2', '444', '1', '2016-03-30 15:44:00', '1', '2016-03-30 15:45:54');
INSERT INTO `workflow_requestbase_processlog` VALUES ('217', '29', '1', '1', '2', '1', '1', '1', '1', '4141414', '1', '2016-03-30 15:45:54', '1', '2016-03-30 16:02:57');
INSERT INTO `workflow_requestbase_processlog` VALUES ('228', '29', '1', '39', '1', '2', '1', '3', '1', '123123', '1', '2016-03-30 16:02:57', '39', '2016-03-30 16:31:33');
INSERT INTO `workflow_requestbase_processlog` VALUES ('229', '29', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-30 16:02:57', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('230', '29', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-30 16:02:57', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('231', '29', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-30 16:02:57', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('232', '29', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-30 16:02:57', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('233', '29', '1', '2', '1', '2', '0', '4', '0', '', '1', '2016-03-30 16:02:57', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('234', '29', '1', '1', '1', '2', '1', '2', '1', '通过', '1', '2016-03-30 16:02:57', '1', '2016-03-30 16:07:07');
INSERT INTO `workflow_requestbase_processlog` VALUES ('235', '29', '1', '1', '2', '3', '1', '2', '1', '呃呃呃', '1', '2016-03-30 16:07:07', '1', '2016-03-30 16:42:29');
INSERT INTO `workflow_requestbase_processlog` VALUES ('236', '29', '1', '1', '3', '4', '1', '5', '1', '归档啦', '1', '2016-03-30 16:42:29', '1', '2016-03-30 16:51:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('237', '35', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-30 17:11:07', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('238', '35', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-30 17:11:07', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('239', '35', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-30 17:11:07', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('240', '35', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-30 17:11:07', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('241', '35', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-30 17:11:07', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('242', '35', '1', '2', '1', '2', '0', '4', '0', '', '1', '2016-03-30 17:11:07', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('243', '35', '1', '2', '1', '2', '1', '2', '2', '141414', '1', '2016-03-30 17:11:07', '1', '2016-03-31 10:48:11');
INSERT INTO `workflow_requestbase_processlog` VALUES ('244', '36', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-30 17:11:16', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('245', '36', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-30 17:11:16', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('246', '36', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-30 17:11:16', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('247', '36', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-30 17:11:16', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('248', '36', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-30 17:11:16', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('249', '36', '1', '2', '1', '2', '0', '4', '0', '', '1', '2016-03-30 17:11:16', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('250', '36', '1', '2', '1', '2', '1', '2', '2', '141414', '1', '2016-03-30 17:11:16', '1', '2016-03-31 10:48:11');
INSERT INTO `workflow_requestbase_processlog` VALUES ('251', '37', '1', '39', '1', '2', '1', '3', '1', '123123', '1', '2016-03-30 17:11:28', '39', '2016-03-30 17:12:10');
INSERT INTO `workflow_requestbase_processlog` VALUES ('252', '37', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-30 17:11:28', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('253', '37', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-30 17:11:28', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('254', '37', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-30 17:11:28', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('255', '37', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-30 17:11:28', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('256', '37', '1', '2', '1', '2', '0', '4', '0', '', '1', '2016-03-30 17:11:28', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('257', '37', '1', '1', '1', '2', '1', '2', '1', '141414', '1', '2016-03-30 17:11:28', '1', '2016-03-30 17:12:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('258', '37', '1', '1', '2', '3', '1', '2', '2', '15151', '1', '2016-03-30 17:12:18', '1', '2016-03-30 17:12:25');
INSERT INTO `workflow_requestbase_processlog` VALUES ('259', '37', '1', '1', '3', '1', '1', '1', '1', '141441', '1', '2016-03-30 17:12:25', '1', '2016-03-30 17:12:33');
INSERT INTO `workflow_requestbase_processlog` VALUES ('260', '37', '1', '39', '1', '2', '1', '3', '1', '1231233', '1', '2016-03-30 17:12:33', '39', '2016-03-31 09:58:33');
INSERT INTO `workflow_requestbase_processlog` VALUES ('261', '37', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-30 17:12:33', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('262', '37', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-30 17:12:33', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('263', '37', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-30 17:12:33', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('264', '37', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-30 17:12:33', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('265', '37', '1', '2', '1', '2', '0', '4', '0', '', '1', '2016-03-30 17:12:33', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('266', '37', '1', '1', '1', '2', '1', '2', '1', '414141', '1', '2016-03-30 17:12:33', '1', '2016-03-30 17:12:51');
INSERT INTO `workflow_requestbase_processlog` VALUES ('267', '37', '1', '1', '2', '3', '1', '2', '1', '1414', '1', '2016-03-30 17:12:51', '1', '2016-03-30 17:12:54');
INSERT INTO `workflow_requestbase_processlog` VALUES ('268', '37', '1', '1', '3', '4', '1', '5', '1', '141431414141', '1', '2016-03-30 17:12:54', '1', '2016-03-30 17:13:37');
INSERT INTO `workflow_requestbase_processlog` VALUES ('269', '42', '1', '1', '0', '0', '1', '1', '1', '创建流程！', '1', '2016-03-31 10:25:17', '1', '2016-03-31 10:25:17');
INSERT INTO `workflow_requestbase_processlog` VALUES ('270', '42', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:25:18', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('271', '42', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:25:18', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('272', '42', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:25:18', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('273', '42', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:25:18', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('274', '42', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:25:18', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('275', '42', '1', '2', '1', '2', '0', '4', '0', '', '1', '2016-03-31 10:25:18', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('276', '42', '1', '2', '1', '2', '1', '2', '2', '141414', '1', '2016-03-31 10:25:18', '1', '2016-03-31 10:48:11');
INSERT INTO `workflow_requestbase_processlog` VALUES ('277', '43', '1', '1', '1', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 10:26:11', '1', '2016-03-31 10:26:11');
INSERT INTO `workflow_requestbase_processlog` VALUES ('278', '43', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:26:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('279', '43', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:26:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('280', '43', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:26:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('281', '43', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:26:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('282', '43', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:26:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('283', '43', '1', '2', '1', '2', '0', '4', '0', '', '1', '2016-03-31 10:26:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('284', '43', '1', '2', '1', '2', '1', '2', '2', '141414', '1', '2016-03-31 10:26:11', '1', '2016-03-31 10:48:11');
INSERT INTO `workflow_requestbase_processlog` VALUES ('285', '44', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 10:26:39', '1', '2016-03-31 10:26:39');
INSERT INTO `workflow_requestbase_processlog` VALUES ('286', '44', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:26:39', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('287', '44', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:26:39', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('288', '44', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:26:39', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('289', '44', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:26:39', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('290', '44', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:26:39', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('291', '44', '1', '2', '1', '2', '0', '4', '0', '', '1', '2016-03-31 10:26:39', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('292', '44', '1', '2', '1', '2', '1', '2', '2', '141414', '1', '2016-03-31 10:26:39', '1', '2016-03-31 10:48:11');
INSERT INTO `workflow_requestbase_processlog` VALUES ('293', '45', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 10:42:07', '1', '2016-03-31 10:42:07');
INSERT INTO `workflow_requestbase_processlog` VALUES ('294', '45', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:42:08', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('295', '45', '1', '1', '1', '2', '1', '3', '1', '141414', '1', '2016-03-31 10:42:08', '1', '2016-03-31 10:47:56');
INSERT INTO `workflow_requestbase_processlog` VALUES ('296', '45', '1', '1', '1', '2', '1', '3', '1', '14411441', '1', '2016-03-31 10:42:08', '1', '2016-03-31 10:47:59');
INSERT INTO `workflow_requestbase_processlog` VALUES ('297', '45', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:42:08', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('298', '45', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:42:08', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('299', '45', '1', '2', '1', '2', '0', '4', '0', '', '1', '2016-03-31 10:42:08', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('300', '45', '1', '1', '1', '2', '1', '2', '2', '141414', '1', '2016-03-31 10:42:08', '1', '2016-03-31 10:48:11');
INSERT INTO `workflow_requestbase_processlog` VALUES ('301', '45', '1', '1', '2', '1', '1', '1', '1', '', '1', '2016-03-31 10:48:11', '1', '2016-03-31 10:48:22');
INSERT INTO `workflow_requestbase_processlog` VALUES ('302', '45', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:48:22', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('303', '45', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:48:22', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('304', '45', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:48:22', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('305', '45', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:48:22', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('306', '45', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 10:48:22', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('307', '45', '1', '2', '1', '2', '0', '4', '0', '', '1', '2016-03-31 10:48:22', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('308', '45', '1', '2', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 10:48:22', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('309', '46', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 13:36:11', '1', '2016-03-31 13:36:11');
INSERT INTO `workflow_requestbase_processlog` VALUES ('310', '46', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:36:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('311', '46', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:36:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('312', '46', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:36:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('313', '46', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:36:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('314', '46', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:36:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('315', '46', '1', '2', '1', '2', '0', '4', '0', '', '1', '2016-03-31 13:36:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('316', '46', '1', '2', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 13:36:11', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('317', '47', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 13:37:43', '1', '2016-03-31 13:37:43');
INSERT INTO `workflow_requestbase_processlog` VALUES ('318', '47', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:37:43', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('319', '47', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:37:43', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('320', '47', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:37:43', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('321', '47', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:37:43', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('322', '47', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:37:43', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('323', '47', '1', '2', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 13:37:43', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('324', '48', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 13:38:34', '1', '2016-03-31 13:38:34');
INSERT INTO `workflow_requestbase_processlog` VALUES ('325', '48', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:38:35', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('326', '48', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:38:35', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('327', '48', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:38:35', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('328', '48', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:38:35', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('329', '48', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:38:35', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('330', '48', '1', '2', '1', '2', '0', '4', '0', '', '1', '2016-03-31 13:38:35', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('331', '48', '1', '2', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 13:38:35', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('332', '49', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 13:38:54', '1', '2016-03-31 13:38:54');
INSERT INTO `workflow_requestbase_processlog` VALUES ('333', '49', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:38:54', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('334', '49', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:38:54', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('335', '49', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:38:54', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('336', '49', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:38:54', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('337', '49', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:38:54', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('338', '49', '1', '2', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 13:38:54', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('346', '57', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 13:44:20', '1', '2016-03-31 13:44:20');
INSERT INTO `workflow_requestbase_processlog` VALUES ('347', '57', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 13:44:21', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('348', '57', '1', '', '1', '2', '0', '4', '0', '', '1', '2016-03-31 13:44:21', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('349', '57', '1', 'z', '1', '2', '0', '4', '0', '', '1', '2016-03-31 13:44:21', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('350', '57', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:44:21', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('351', '57', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:44:21', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('352', '57', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:44:21', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('353', '57', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:44:21', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('354', '57', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:44:21', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('355', '57', '1', '2', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 13:44:21', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('357', '59', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 13:45:22', '1', '2016-03-31 13:45:22');
INSERT INTO `workflow_requestbase_processlog` VALUES ('358', '59', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 13:45:23', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('359', '59', '1', '', '1', '2', '0', '4', '0', '', '1', '2016-03-31 13:45:23', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('360', '59', '1', 'z', '1', '2', '0', '4', '0', '', '1', '2016-03-31 13:45:23', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('361', '59', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:45:23', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('362', '59', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:45:23', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('363', '59', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:45:23', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('364', '59', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:45:23', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('365', '59', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:45:23', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('366', '59', '1', '2', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 13:45:23', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('369', '62', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 13:48:55', '1', '2016-03-31 13:48:55');
INSERT INTO `workflow_requestbase_processlog` VALUES ('370', '62', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 13:48:55', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('371', '62', '1', '', '1', '2', '0', '4', '0', '', '1', '2016-03-31 13:48:55', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('372', '62', '1', 'z', '1', '2', '0', '4', '0', '', '1', '2016-03-31 13:48:55', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('373', '62', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:48:55', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('374', '62', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:48:55', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('375', '62', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:48:55', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('376', '62', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:48:55', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('377', '62', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:48:55', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('378', '62', '1', '2', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 13:48:55', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('379', '63', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 13:49:52', '1', '2016-03-31 13:49:52');
INSERT INTO `workflow_requestbase_processlog` VALUES ('380', '63', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 13:49:52', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('381', '63', '1', '', '1', '2', '0', '4', '0', '', '1', '2016-03-31 13:49:52', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('382', '63', '1', 'z', '1', '2', '0', '4', '0', '', '1', '2016-03-31 13:49:52', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('383', '63', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:49:52', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('384', '63', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:49:52', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('385', '63', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:49:52', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('386', '63', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:49:52', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('387', '63', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:49:52', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('388', '63', '1', '2', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 13:49:52', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('389', '64', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 13:50:48', '1', '2016-03-31 13:50:48');
INSERT INTO `workflow_requestbase_processlog` VALUES ('390', '64', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 13:50:48', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('391', '64', '1', '', '1', '2', '0', '4', '0', '', '1', '2016-03-31 13:50:48', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('392', '64', '1', 'z', '1', '2', '0', '4', '0', '', '1', '2016-03-31 13:50:48', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('393', '64', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:50:48', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('394', '64', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:50:48', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('395', '64', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:50:48', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('396', '64', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:50:48', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('397', '64', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:50:48', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('398', '64', '1', '2', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 13:50:48', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('400', '66', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 13:52:30', '1', '2016-03-31 13:52:30');
INSERT INTO `workflow_requestbase_processlog` VALUES ('401', '66', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 13:52:30', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('402', '66', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:52:30', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('403', '66', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:52:30', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('404', '66', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:52:30', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('405', '66', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:52:30', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('406', '66', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:52:30', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('407', '66', '1', '2', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 13:52:30', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('408', '67', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 13:53:56', '1', '2016-03-31 13:53:56');
INSERT INTO `workflow_requestbase_processlog` VALUES ('409', '67', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 13:53:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('410', '67', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:53:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('411', '67', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:53:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('412', '67', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:53:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('413', '67', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:53:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('414', '67', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 13:53:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('415', '67', '1', '2', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 13:53:56', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('437', '85', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:03:32', '1', '2016-03-31 14:03:32');
INSERT INTO `workflow_requestbase_processlog` VALUES ('438', '85', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:03:33', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('439', '85', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:03:33', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('440', '85', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:03:33', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('441', '85', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:03:33', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('442', '85', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:03:33', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('443', '85', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:03:33', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('444', '85', '1', '2', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:03:33', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('447', '87', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:03:50', '1', '2016-03-31 14:03:50');
INSERT INTO `workflow_requestbase_processlog` VALUES ('448', '87', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:03:51', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('449', '87', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:03:51', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('450', '87', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:03:51', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('451', '87', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:03:51', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('452', '87', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:03:51', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('453', '87', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:03:51', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('454', '87', '1', '2', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:03:51', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('455', '88', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:04:20', '1', '2016-03-31 14:04:20');
INSERT INTO `workflow_requestbase_processlog` VALUES ('456', '88', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:04:20', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('457', '88', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:04:20', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('458', '88', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:04:20', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('459', '88', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:04:20', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('460', '88', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:04:20', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('461', '88', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:04:20', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('462', '88', '1', '2', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:04:20', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('463', '89', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:04:53', '1', '2016-03-31 14:04:53');
INSERT INTO `workflow_requestbase_processlog` VALUES ('464', '89', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:04:53', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('465', '89', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:04:53', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('466', '89', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:04:53', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('467', '89', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:04:53', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('468', '89', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:04:53', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('469', '89', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:04:53', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('470', '89', '1', '2', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:04:53', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('471', '90', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:05:11', '1', '2016-03-31 14:05:11');
INSERT INTO `workflow_requestbase_processlog` VALUES ('472', '90', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:05:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('473', '90', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:05:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('474', '90', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:05:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('475', '90', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:05:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('476', '90', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:05:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('477', '90', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:05:11', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('478', '90', '1', '2', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:05:11', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('479', '91', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:05:27', '1', '2016-03-31 14:05:27');
INSERT INTO `workflow_requestbase_processlog` VALUES ('480', '91', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:05:28', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('481', '91', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:05:28', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('482', '91', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:05:28', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('483', '91', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:05:28', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('484', '91', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:05:28', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('485', '91', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:05:28', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('486', '91', '1', '2', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:05:28', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('496', '101', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:11:38', '1', '2016-03-31 14:11:38');
INSERT INTO `workflow_requestbase_processlog` VALUES ('497', '101', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:11:38', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('498', '101', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:11:38', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('509', '107', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:26:32', '1', '2016-03-31 14:26:32');
INSERT INTO `workflow_requestbase_processlog` VALUES ('510', '107', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:26:33', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('511', '107', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:26:33', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('512', '108', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:27:16', '1', '2016-03-31 14:27:16');
INSERT INTO `workflow_requestbase_processlog` VALUES ('513', '108', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:27:17', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('514', '108', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:27:17', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('517', '111', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:32:31', '1', '2016-03-31 14:32:31');
INSERT INTO `workflow_requestbase_processlog` VALUES ('518', '111', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:32:32', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('519', '111', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:32:32', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('520', '112', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:32:42', '1', '2016-03-31 14:32:42');
INSERT INTO `workflow_requestbase_processlog` VALUES ('521', '112', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:32:43', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('522', '112', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:32:43', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('523', '113', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:32:55', '1', '2016-03-31 14:32:55');
INSERT INTO `workflow_requestbase_processlog` VALUES ('524', '113', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:32:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('525', '113', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:32:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('526', '113', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:32:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('527', '113', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:32:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('528', '113', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:32:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('529', '113', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:32:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('530', '113', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:32:56', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('531', '114', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:33:21', '1', '2016-03-31 14:33:21');
INSERT INTO `workflow_requestbase_processlog` VALUES ('532', '114', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:33:22', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('533', '114', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:33:22', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('534', '114', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:33:22', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('535', '114', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:33:22', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('536', '114', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:33:22', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('537', '114', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:33:22', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('538', '114', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:33:22', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('539', '115', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:33:39', '1', '2016-03-31 14:33:39');
INSERT INTO `workflow_requestbase_processlog` VALUES ('540', '115', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:33:39', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('541', '115', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:33:39', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('542', '115', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:33:39', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('543', '115', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:33:39', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('544', '115', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:33:39', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('545', '115', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:33:39', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('546', '115', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:33:39', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('547', '116', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:38:43', '1', '2016-03-31 14:38:43');
INSERT INTO `workflow_requestbase_processlog` VALUES ('548', '116', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:38:43', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('549', '116', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:38:43', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('550', '116', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:38:43', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('551', '116', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:38:43', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('552', '116', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:38:43', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('553', '116', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:38:43', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('554', '116', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:38:43', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('555', '117', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:38:55', '1', '2016-03-31 14:38:55');
INSERT INTO `workflow_requestbase_processlog` VALUES ('556', '117', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:38:55', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('557', '117', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:38:55', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('558', '117', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:38:55', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('559', '117', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:38:55', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('560', '117', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:38:55', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('561', '117', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:38:55', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('562', '117', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:38:55', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('563', '118', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:39:19', '1', '2016-03-31 14:39:19');
INSERT INTO `workflow_requestbase_processlog` VALUES ('564', '118', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:39:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('565', '118', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:39:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('566', '118', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:39:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('567', '118', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:39:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('568', '118', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:39:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('569', '118', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:39:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('570', '118', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:39:19', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('571', '119', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:41:56', '1', '2016-03-31 14:41:56');
INSERT INTO `workflow_requestbase_processlog` VALUES ('572', '119', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:41:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('573', '119', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:41:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('574', '119', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:41:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('575', '119', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:41:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('576', '119', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:41:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('577', '119', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:41:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('578', '119', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:41:56', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('579', '120', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:42:41', '1', '2016-03-31 14:42:41');
INSERT INTO `workflow_requestbase_processlog` VALUES ('580', '120', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:42:41', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('581', '120', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:42:41', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('582', '120', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:42:41', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('583', '120', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:42:41', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('584', '120', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:42:41', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('585', '120', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 14:42:41', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('586', '120', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:42:41', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('587', '121', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:48:22', '1', '2016-03-31 14:48:22');
INSERT INTO `workflow_requestbase_processlog` VALUES ('588', '121', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:48:22', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('589', '121', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:48:22', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('590', '122', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 14:49:50', '1', '2016-03-31 14:49:50');
INSERT INTO `workflow_requestbase_processlog` VALUES ('591', '122', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 14:49:51', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('592', '122', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 14:49:51', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('593', '123', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 15:01:40', '1', '2016-03-31 15:01:40');
INSERT INTO `workflow_requestbase_processlog` VALUES ('594', '123', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 15:01:41', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('595', '123', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 15:01:41', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('596', '124', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 15:15:07', '1', '2016-03-31 15:15:07');
INSERT INTO `workflow_requestbase_processlog` VALUES ('597', '124', '1', '1', '1', '2', '1', '4', '1', '141414', '1', '2016-03-31 15:15:07', '1', '2016-03-31 15:16:57');
INSERT INTO `workflow_requestbase_processlog` VALUES ('598', '124', '1', '1', '1', '2', '1', '2', '1', '1323', '1', '2016-03-31 15:15:07', '1', '2016-03-31 15:16:43');
INSERT INTO `workflow_requestbase_processlog` VALUES ('599', '124', '1', '1', '2', '3', '1', '2', '1', '131313', '1', '2016-03-31 15:16:43', '1', '2016-03-31 15:16:48');
INSERT INTO `workflow_requestbase_processlog` VALUES ('600', '124', '1', '1', '3', '4', '1', '5', '1', '1313', '1', '2016-03-31 15:16:49', '1', '2016-03-31 15:16:54');
INSERT INTO `workflow_requestbase_processlog` VALUES ('601', '125', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 15:22:19', '1', '2016-03-31 15:22:19');
INSERT INTO `workflow_requestbase_processlog` VALUES ('602', '125', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 15:22:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('603', '125', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:22:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('604', '125', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:22:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('605', '125', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:22:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('606', '125', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:22:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('607', '125', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:22:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('608', '125', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 15:22:19', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('615', '126', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 15:30:26', '1', '2016-03-31 15:30:26');
INSERT INTO `workflow_requestbase_processlog` VALUES ('616', '126', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 15:30:27', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('617', '126', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 15:30:27', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('618', '127', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 15:30:45', '1', '2016-03-31 15:30:45');
INSERT INTO `workflow_requestbase_processlog` VALUES ('619', '127', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 15:30:46', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('620', '127', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:30:46', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('621', '127', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:30:46', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('622', '127', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:30:46', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('623', '127', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:30:46', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('624', '127', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:30:46', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('625', '127', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 15:30:46', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('626', '128', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 15:44:15', '1', '2016-03-31 15:44:15');
INSERT INTO `workflow_requestbase_processlog` VALUES ('627', '128', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 15:44:15', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('628', '128', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:44:15', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('629', '128', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:44:15', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('630', '128', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:44:15', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('631', '128', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:44:15', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('632', '128', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:44:15', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('633', '128', '1', '1', '1', '2', '1', '2', '1', '', '1', '2016-03-31 15:44:15', '1', '2016-03-31 15:44:21');
INSERT INTO `workflow_requestbase_processlog` VALUES ('634', '128', '1', '1', '2', '3', '1', '2', '1', '', '1', '2016-03-31 15:44:21', '1', '2016-03-31 15:44:25');
INSERT INTO `workflow_requestbase_processlog` VALUES ('635', '128', '1', '40', '3', '4', '0', '5', '0', '', '1', '2016-03-31 15:44:25', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('636', '129', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 15:45:40', '1', '2016-03-31 15:45:40');
INSERT INTO `workflow_requestbase_processlog` VALUES ('637', '129', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 15:45:40', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('638', '129', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:45:40', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('639', '129', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:45:40', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('640', '129', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:45:40', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('642', '129', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:45:40', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('643', '129', '1', '1', '1', '2', '1', '2', '1', '', '1', '2016-03-31 15:45:40', '1', '2016-03-31 15:45:43');
INSERT INTO `workflow_requestbase_processlog` VALUES ('644', '129', '1', '1', '2', '3', '1', '2', '1', '', '1', '2016-03-31 15:45:44', '1', '2016-03-31 15:45:46');
INSERT INTO `workflow_requestbase_processlog` VALUES ('645', '129', '1', '1', '3', '4', '0', '5', '0', '', '1', '2016-03-31 15:45:46', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('646', '130', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 15:46:34', '1', '2016-03-31 15:46:34');
INSERT INTO `workflow_requestbase_processlog` VALUES ('647', '130', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 15:46:34', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('648', '130', '1', '39', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:46:34', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('649', '130', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:46:34', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('650', '130', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:46:34', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('651', '130', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:46:34', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('652', '130', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:46:34', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('653', '130', '1', '1', '1', '2', '1', '2', '1', '', '1', '2016-03-31 15:46:34', '1', '2016-03-31 15:46:37');
INSERT INTO `workflow_requestbase_processlog` VALUES ('654', '130', '1', '1', '2', '3', '1', '2', '1', '', '1', '2016-03-31 15:46:37', '1', '2016-03-31 15:46:41');
INSERT INTO `workflow_requestbase_processlog` VALUES ('655', '130', '1', '1,39', '3', '4', '1', '5', '1', '141441', '1', '2016-03-31 15:46:41', '1', '2016-03-31 15:47:35');
INSERT INTO `workflow_requestbase_processlog` VALUES ('656', '131', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 15:48:56', '1', '2016-03-31 15:48:56');
INSERT INTO `workflow_requestbase_processlog` VALUES ('657', '131', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 15:48:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('658', '131', '1', '39', '1', '2', '1', '3', '1', '1414', '1', '2016-03-31 15:48:56', '39', '2016-03-31 15:56:20');
INSERT INTO `workflow_requestbase_processlog` VALUES ('659', '131', '1', '37', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:48:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('660', '131', '1', '31', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:48:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('661', '131', '1', '35', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:48:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('662', '131', '1', '34', '1', '2', '0', '3', '0', '', '1', '2016-03-31 15:48:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('663', '131', '1', '1', '1', '2', '1', '2', '1', 'ff', '1', '2016-03-31 15:48:56', '1', '2016-03-31 15:49:02');
INSERT INTO `workflow_requestbase_processlog` VALUES ('664', '131', '1', '1,40', '2', '3', '1', '2', '1', '444', '1', '2016-03-31 15:49:02', '1', '2016-03-31 15:49:10');
INSERT INTO `workflow_requestbase_processlog` VALUES ('665', '131', '1', '39', '2', '3', '1', '2', '1', '', '1', '2016-03-31 15:49:10', '39', '2016-03-31 15:54:43');
INSERT INTO `workflow_requestbase_processlog` VALUES ('666', '131', '39', '1', '3', '4', '1', '5', '1', '1414', '39', '2016-03-31 15:54:43', '1', '2016-03-31 15:55:44');
INSERT INTO `workflow_requestbase_processlog` VALUES ('667', '132', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 15:56:05', '1', '2016-03-31 15:56:05');
INSERT INTO `workflow_requestbase_processlog` VALUES ('668', '132', '1', '1', '1', '2', '1', '4', '1', '1414', '1', '2016-03-31 15:56:05', '1', '2016-03-31 15:56:28');
INSERT INTO `workflow_requestbase_processlog` VALUES ('669', '132', '1', '1', '1', '2', '1', '2', '1', '1414', '1', '2016-03-31 15:56:05', '1', '2016-03-31 15:56:09');
INSERT INTO `workflow_requestbase_processlog` VALUES ('670', '132', '1', '1,39', '2', '3', '1', '2', '1', 's  ', '1', '2016-03-31 15:56:09', '1', '2016-03-31 15:56:12');
INSERT INTO `workflow_requestbase_processlog` VALUES ('671', '132', '1', '39', '2', '3', '1', '2', '1', '141441', '1', '2016-03-31 15:56:12', '39', '2016-03-31 15:57:26');
INSERT INTO `workflow_requestbase_processlog` VALUES ('672', '132', '39', '1,39', '3', '4', '1', '5', '1', '1414', '39', '2016-03-31 15:57:27', '1', '2016-03-31 15:57:46');
INSERT INTO `workflow_requestbase_processlog` VALUES ('673', '132', '39', '39', '3', '4', '1', '5', '1', '141441', '1', '2016-03-31 15:57:46', '39', '2016-03-31 16:04:24');
INSERT INTO `workflow_requestbase_processlog` VALUES ('674', '133', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 16:56:25', '1', '2016-03-31 16:56:25');
INSERT INTO `workflow_requestbase_processlog` VALUES ('675', '133', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 16:56:25', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('676', '133', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 16:56:25', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('677', '134', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 16:56:32', '1', '2016-03-31 16:56:32');
INSERT INTO `workflow_requestbase_processlog` VALUES ('678', '134', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 16:56:32', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('679', '134', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 16:56:32', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('680', '135', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 16:56:58', '1', '2016-03-31 16:56:58');
INSERT INTO `workflow_requestbase_processlog` VALUES ('681', '135', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 16:56:58', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('682', '135', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 16:56:58', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('683', '137', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-03-31 17:24:09', '1', '2016-03-31 17:24:09');
INSERT INTO `workflow_requestbase_processlog` VALUES ('684', '137', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-03-31 17:24:09', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('685', '137', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-03-31 17:24:09', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('709', '183', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-12-14 14:47:32', '1', '2016-12-14 14:47:32');
INSERT INTO `workflow_requestbase_processlog` VALUES ('710', '183', '1', '1', '1', '2', '1', '4', '1', '212112', '1', '2016-12-14 14:47:32', '1', '2016-12-14 14:51:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('711', '183', '1', '1', '1', '2', '1', '2', '1', '212121', '1', '2016-12-14 14:47:32', '1', '2016-12-14 14:50:57');
INSERT INTO `workflow_requestbase_processlog` VALUES ('713', '184', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-12-14 14:56:19', '1', '2016-12-14 14:56:19');
INSERT INTO `workflow_requestbase_processlog` VALUES ('714', '184', '1', '1', '1', '2', '1', '4', '1', '2121', '1', '2016-12-14 14:56:19', '1', '2016-12-14 15:30:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('715', '184', '1', '1', '1', '2', '1', '2', '1', '21', '1', '2016-12-14 14:56:19', '1', '2016-12-14 14:56:30');
INSERT INTO `workflow_requestbase_processlog` VALUES ('716', '184', '1', '1,39,22', '2', '3', '1', '2', '2', '12212121', '1', '2016-12-14 14:56:30', '1', '2016-12-14 15:09:39');
INSERT INTO `workflow_requestbase_processlog` VALUES ('717', '184', '1', '1', '3', '1', '1', '1', '1', '1213', '1', '2016-12-14 15:09:39', '1', '2016-12-14 15:10:09');
INSERT INTO `workflow_requestbase_processlog` VALUES ('718', '184', '1', '1', '1', '2', '1', '4', '1', '12', '1', '2016-12-14 15:10:09', '1', '2016-12-14 15:39:25');
INSERT INTO `workflow_requestbase_processlog` VALUES ('719', '184', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-12-14 15:10:09', '1', '2016-12-14 15:10:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('720', '184', '1', '1', '2', '1', '1', '1', '1', '123123124', '1', '2016-12-14 15:10:18', '1', '2016-12-14 15:10:33');
INSERT INTO `workflow_requestbase_processlog` VALUES ('721', '184', '1', '1', '1', '2', '1', '4', '1', '', '1', '2016-12-14 15:10:33', '1', '2016-12-14 15:41:05');
INSERT INTO `workflow_requestbase_processlog` VALUES ('722', '184', '1', '1', '1', '2', '1', '2', '2', '12312', '1', '2016-12-14 15:10:33', '1', '2016-12-14 15:11:23');
INSERT INTO `workflow_requestbase_processlog` VALUES ('723', '184', '1', '1', '2', '1', '1', '1', '1', '', '1', '2016-12-14 15:11:23', '1', '2016-12-14 15:27:25');
INSERT INTO `workflow_requestbase_processlog` VALUES ('724', '184', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-12-14 15:27:25', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('725', '184', '1', '1', '1', '2', '1', '2', '2', '122121', '1', '2016-12-14 15:27:25', '1', '2016-12-14 15:30:19');
INSERT INTO `workflow_requestbase_processlog` VALUES ('726', '184', '1', '1', '2', '1', '1', '1', '1', '2121', '1', '2016-12-14 15:30:19', '1', '2016-12-14 15:32:04');
INSERT INTO `workflow_requestbase_processlog` VALUES ('727', '184', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-12-14 15:32:04', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('728', '184', '1', '1', '1', '2', '1', '2', '1', '21', '1', '2016-12-14 15:32:04', '1', '2016-12-14 15:38:40');
INSERT INTO `workflow_requestbase_processlog` VALUES ('729', '184', '1', '1', '2', '3', '1', '2', '2', '21', '1', '2016-12-14 15:38:40', '1', '2016-12-14 15:41:32');
INSERT INTO `workflow_requestbase_processlog` VALUES ('730', '184', '1', '1', '3', '1', '1', '1', '1', '2112', '1', '2016-12-14 15:41:32', '1', '2016-12-14 15:42:03');
INSERT INTO `workflow_requestbase_processlog` VALUES ('731', '184', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-12-14 15:42:03', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('732', '184', '1', '1', '1', '2', '1', '2', '1', '2121', '1', '2016-12-14 15:42:03', '1', '2016-12-14 15:42:48');
INSERT INTO `workflow_requestbase_processlog` VALUES ('733', '184', '1', '1', '2', '3', '1', '2', '1', '21', '1', '2016-12-14 15:42:48', '1', '2016-12-14 15:42:56');
INSERT INTO `workflow_requestbase_processlog` VALUES ('734', '184', '1', '1', '3', '4', '0', '5', '0', '', '1', '2016-12-14 15:42:56', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('735', '185', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-12-14 17:01:19', '1', '2016-12-14 17:01:19');
INSERT INTO `workflow_requestbase_processlog` VALUES ('736', '185', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-12-14 17:01:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('737', '185', '1', '1', '1', '2', '0', '2', '0', '', '1', '2016-12-14 17:01:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('740', '188', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-12-22 14:32:18', '1', '2016-12-22 14:32:18');
INSERT INTO `workflow_requestbase_processlog` VALUES ('741', '188', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-12-22 14:32:18', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('742', '188', '1', '1', '1', '2', '1', '2', '1', '12123', '1', '2016-12-22 14:32:18', '1', '2016-12-22 14:32:31');
INSERT INTO `workflow_requestbase_processlog` VALUES ('743', '188', '1', '1', '2', '3', '0', '2', '0', '', '1', '2016-12-22 14:32:31', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('747', '189', '0', '1', '0', '1', '1', '1', '1', '创建流程！', '1', '2016-12-29 11:57:49', '1', '2016-12-29 11:57:49');
INSERT INTO `workflow_requestbase_processlog` VALUES ('748', '189', '1', '1', '1', '2', '0', '4', '0', '', '1', '2016-12-29 11:57:50', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('749', '189', '1', '1', '1', '2', '0', '2', '0', '', '1', '2016-12-29 11:57:50', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('760', '192', '0', '1', '0', '5', '1', '1', '1', '创建流程！', '1', '2017-02-13 15:07:19', '1', '2017-02-13 15:07:19');
INSERT INTO `workflow_requestbase_processlog` VALUES ('761', '192', '1', '1', '5', '6', '0', '0', '0', '', '1', '2017-02-13 15:07:19', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('762', '199', '0', '1', '0', '5', '1', '1', '1', '创建流程！', '1', '2017-02-13 15:09:21', '1', '2017-02-13 15:09:21');
INSERT INTO `workflow_requestbase_processlog` VALUES ('763', '199', '1', '1', '5', '6', '0', '0', '0', '', '1', '2017-02-13 15:09:21', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('764', '200', '0', '1', '0', '5', '1', '1', '1', '创建流程！', '1', '2017-02-13 15:10:24', '1', '2017-02-13 15:10:24');
INSERT INTO `workflow_requestbase_processlog` VALUES ('765', '200', '1', '1', '5', '6', '0', '0', '0', '', '1', '2017-02-13 15:10:24', '0', '0000-00-00 00:00:00');
INSERT INTO `workflow_requestbase_processlog` VALUES ('766', '201', '0', '1', '0', '5', '1', '1', '1', '创建流程！', '1', '2017-02-13 15:16:35', '1', '2017-02-13 15:16:35');
INSERT INTO `workflow_requestbase_processlog` VALUES ('767', '201', '1', '1', '5', '6', '1', '2', '1', '123123213', '1', '2017-02-13 15:16:35', '1', '2017-02-13 15:16:40');
INSERT INTO `workflow_requestbase_processlog` VALUES ('768', '201', '1', '1', '6', '7', '0', '2', '0', '', '1', '2017-02-13 15:16:40', '0', '0000-00-00 00:00:00');

-- ----------------------------
-- View structure for workflownode
-- ----------------------------
DROP VIEW IF EXISTS `workflownode`;
CREATE ALGORITHM=UNDEFINED DEFINER=`admin`@`%` SQL SECURITY DEFINER VIEW `workflownode` AS (select `a`.`nodeid` AS `nodeid`,`a`.`workflowid` AS `workflowid`,`a`.`nodename` AS `nodename`,`a`.`nodetype` AS `nodetype`,`a`.`order` AS `order`,`a`.`beforesql` AS `beforesql`,`a`.`aftersql` AS `aftersql`,`a`.`designrow` AS `designrow`,`a`.`designdesc` AS `designdesc`,`a`.`createtime` AS `createtime`,`a`.`creator` AS `creator`,`b`.`processname` AS `processname`,`c`.`fieldid` AS `fieldid`,`d`.`type` AS `type`,`e`.`name` AS `name` from ((((`workflow_node` `a` left join `workflow_node_process` `b` on((`a`.`nodeid` = `b`.`nodeid`))) left join `workflow_node_process_rule` `c` on((`c`.`processid` = `b`.`processid`))) left join `workflow_node_fields` `d` on((`d`.`nodeid` = `a`.`nodeid`))) left join `workflow_outlet` `e` on((`e`.`workflowid` = `a`.`workflowid`)))) ;
