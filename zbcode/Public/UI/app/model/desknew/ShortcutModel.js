/**
 * Created by Administrator on 2015/12/5 0005.
 */
Ext.define('ui.model.desknew.ShortcutModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'name'},
        { name: 'iconCls' },
        { name: 'module' },
        { name: 'group' },
        { name: 'desc' },
        { name: 'type' },
        { name: 'url' }
    ]
});