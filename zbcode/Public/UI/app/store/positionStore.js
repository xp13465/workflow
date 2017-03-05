/**
 * Created by Administrator on 2015/12/14 0014.
 */

Ext.define('ui.store.positionStore',{
    extend : 'ui.extend.base.Store',
    fields : [
        'id',
        'department_pid',
        'department_id',
        'organization_name',
        'organization_id',
        'name',
        'firstdepartment_name',
        'department_name',
        'status',
        'if_leader'

    ]
});
/*
Ext.create('Ext.data.Store', {
    storeId:'simpsonsStore',
    fields:['name', 'email', 'phone'],
    data:{'items':[
        { 'name': 'Lisa',  "email":"lisa@simpsons.com",  "phone":"555-111-1224"  },
        { 'name': 'Bart',  "email":"bart@simpsons.com",  "phone":"555-222-1234" },
        { 'name': 'Homer', "email":"home@simpsons.com",  "phone":"555-222-1244"  },
        { 'name': 'Marge', "email":"marge@simpsons.com", "phone":"555-222-1254"  }
    ]},
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'items'
        }
    }
});
*/