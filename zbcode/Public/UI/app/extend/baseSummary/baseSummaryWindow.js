/**
 * Created by Administrator on 2015/12/17 0017.
 */
//baseSummaryWindow
Ext.define('ui.extend.baseSummary.baseSummaryWindow', {
    extend: 'ui.extend.baseClass.baseWindow',
    layout : 'fit',
    setTitle : function(title){
        this.callParent(arguments);
        if(this.btnTo){
            this.btnTo.setTitle(title);
        }
    }
});