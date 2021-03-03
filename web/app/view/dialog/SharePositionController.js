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
        var baseUrl = Traccar.app.getAttributePreference('followMe.baseUrl', null);
        Ext.Ajax.request({
            scope: this,
            url: baseUrl + '?getCode=1&deviceId=' + window.deviceId + '&trackingTime=' + window.trackingTime,
            headers: {
                'Authorization': 'Bearer ' + idToken.idToken
            },
            success: function (response) {
                var trackingLink = JSON.parse(response.responseText).trackingUrl;
                Traccar.app.showToast(
                    Strings.sharePositionSuccess +
                    '<a target="_blank" and rel="noopener noreferrer" href="' +
                    trackingLink + '"> ' + trackingLink);
            },
            failure: function () {
                Traccar.app.showToast(Strings.sharePositionFailure);
            }
        });
    },

    onShareClick: function () {
        window.deviceId = this.getView().deviceId;
        window.trackingTime = this.lookupReference('sharePositionTimeComboBox').getValue();
        this.closeView();
        // eslint-disable-next-line no-undef
        signinHelper.getIdToken(this.onTokenCallback);
    },

    onTimeSelect: function () {
        this.lookupReference('shareButton').setDisabled(0);
    },

    onShareResult: function (options, success, response) {
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
