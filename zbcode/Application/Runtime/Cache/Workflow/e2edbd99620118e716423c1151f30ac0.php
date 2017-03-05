<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <title>自定义表单新增</title>
</head>
<body>
<form action="/workflow/form_manager/add_fields" method="post">
    <input type="hidden" name="formtableid" value="100">
    <input type="hidden" name="parentid" value="0">
    <table border="1" width="570" cellspacing="0">
        <thead align="center"><td >序号</td><td>字段名称</td><td>英文名称</td><td>字段类型</td><td>字段子类型</td><td>字段长度</td><td>字段小数点</td></thead>
        <tr>
            <td><input type="text" name="fieldid[]"/></td>
            <td><input type="text" name="fieldtitle[]" /></td>
            <td><input type="text" name="fieldname[]" /></td>
            <td><input type="text" name="name[]" /></td>
            <td><input type="text" name="childname[]" /></td>
            <td><input type="text" name="length[]" /></td>
            <td><input type="text" name="decimal[]" /></td>
        </tr>
        <tr>
            <td><input type="text" name="fieldid[]" /></td>
            <td><input type="text" name="fieldtitle[]" /></td>
            <td><input type="text" name="fieldname[]" /></td>
            <td><input type="text" name="name[]" /></td>
            <td><input type="text" name="childname[]" /></td>
            <td><input type="text" name="length[]" /></td>
            <td><input type="text" name="decimal[]" /></td>
        </tr>
        <tr>
            <td><input type="text" name="fieldid[]" /></td>
            <td><input type="text" name="fieldtitle[]" /></td>
            <td><input type="text" name="fieldname[]" /></td>
            <td><input type="text" name="name[]" /></td>
            <td><input type="text" name="childname[]" /></td>
            <td><input type="text" name="length[]" /></td>
            <td><input type="text" name="decimal[]" /></td>
        </tr>
    </table>
    <input type="submit" value="提交">
</form>
</body>
</html>