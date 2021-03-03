/*
 * Copyright 2017 Anton Tananaev (anton@traccar.org)
 * Copyright 2017 Andrey Kunitsyn (andrey@traccar.org)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('Traccar.view.dialog.SharePosition', {
    extend: 'Traccar.view.dialog.Base',

    requires: [
        'Traccar.view.dialog.SharePositionController'
    ],

    controller: 'sharePosition',
    title: 'Share position',

    items: [{
        xtype: 'combobox',
        reference: 'sharePositionTimeComboBox',
        fieldLabel: 'Sharing time',
        displayField: 'label',
        valueField: 'value',
        store: 'SharePositionTime',
        queryMode: 'local',
        editable: false,
        allowBlank: false,
        listeners: {
            select: 'onTimeSelect'
        }
    }],

    buttons: [{
        xtype: 'tbfill'
    }, {
        glyph: 'xf1e0@FontAwesome',
        tooltip: 'Share position',
        tooltipType: 'title',
        minWidth: 0,
        disabled: true,
        reference: 'shareButton',
        handler: 'onShareClick'
    }, {
        glyph: 'xf00d@FontAwesome',
        tooltip: Strings.sharedCancel,
        tooltipType: 'title',
        minWidth: 0,
        handler: 'closeView'
    }]
});
