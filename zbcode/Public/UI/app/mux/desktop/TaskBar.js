/**
 * Created by Administrator on 2015/12/2 0002.
 */
Ext.define('ZFCui.mux.desktop.TaskBar', {
    extend: 'Ext.ux.desktop.TaskBar',

    /**
     * 重写桌面图标模板定义
     * 桌面图标模板
     * @cfg {String} shortcutTpl
     * This XTemplate is used to render items in the DataView. If this is changed, the
     * {@link #shortcutItemSelector} will probably also need to changed.
     */
    shortcutTpl: [
        '<tpl for=".">',
            '<div class="ux-desktop-shortcut my-ux-desktop-shortcut" id="{name}-shortcut">',
                '<div class="ux-desktop-shortcut-icon {iconCls}">',
                    '<img src="',Ext.BLANK_IMAGE_URL,'" title="{name}">',
                '</div>',
                '<span class="ux-desktop-shortcut-text">{name}</span>',
            '</div>',
        '</tpl>',
        '<div class="x-clear"></div>'
    ]
});