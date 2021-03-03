/*
 * Copyright 2021 Rafael Miquelino (rafaelmiquelino@gmail.com)
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

Ext.define('Traccar.store.SharePositionTime', {
    extend: 'Ext.data.Store',
    fields: ['label', 'value'],

    data: [{
        label: '1 ' + Strings.sharedHours,
        value: 3600
    }, {
        label: '2 ' + Strings.sharedHours,
        value: 7200
    }, {
        label: '4 ' + Strings.sharedHours,
        value: 14400
    }, {
        label: '8 ' + Strings.sharedHours,
        value: 28800
    }, {
        label: '24 ' + Strings.sharedHours,
        value: 86400
    }, {
        label: '48 ' + Strings.sharedHours,
        value: 172800
    }]
});
