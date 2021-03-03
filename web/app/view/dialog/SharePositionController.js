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

Ext.define('Traccar.view.dialog.SharePositionController', {
    extend: 'Traccar.view.dialog.BaseEditController',
    alias: 'controller.sharePosition',

    onTokenCallback: function (idToken) {
        Ext.Ajax.request({
            scope: this,
            // eslint-disable-next-line max-len
            // url: 'https://us-central1-mysql-server-215313.cloudfunctions.net/pincar_follow_me?getCode=1&deviceId=' + this.getView().deviceId + '&trackingTime=' + this.lookupReference('sharePositionTimeComboBox').getValue(),
            // url: 'https://us-central1-mysql-server-215313.cloudfunctions.net/pincar_follow_me?getCode=1&deviceId=' + 24 + '&trackingTime=' + 3600,
            url: 'http://localhost:5000/mysql-server-215313/us-central1/pincar_follow_me?getCode=1&deviceId=' + 24 + '&trackingTime=' + 3600,
            headers: {
                'Authorization': 'Bearer ' + idToken.idToken
            },
            success: function (response) {
                var trackingLink = JSON.parse(response.responseText).trackingUrl;
                Traccar.app.showToast(
                    'Real time position available on <a target="_blank" and rel="noopener noreferrer" href="' +
                    trackingLink + '"> ' + trackingLink);
            },
            failure: function () {
                Traccar.app.showToast('Falha na criação do link de rastreamento');
            }
        });
    },

    onShareClick: function () {
        console.log(this.lookupReference('sharePositionTimeComboBox').getValue());
        console.log(this.getView().deviceId);
        this.closeView();
        // eslint-disable-next-line no-undef
        signinHelper.getIdToken(this.onTokenCallback);
    },

    onTimeSelect: function () {
        this.lookupReference('shareButton').setDisabled(0);
    },

    onShareResult: function (options, success, response) {
        console.log(response);
        if (success) {
            this.closeView();
            Traccar.app.showToast(response);
        } else {
            Traccar.app.showError(response);
        }
    },

    closeView: function () {
        this.callParent(arguments);
    }
});
