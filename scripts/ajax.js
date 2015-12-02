'use strict';

var bucketList_api = {
    //url: 'https://someurl',
    url: 'http://localhost:3000',
    // url: 'http://httpbin.org/',

    ajax: function(config, cb) {
        $.ajax(config).done(function(data, textStatus, jqxhr) {
            cb(null, data);
        }).fail(function(jqxhr, status, error) {
            cb({
                jqxher: jqxhr,
                status: status,
                error: error
            });
        });
    },

    signup: function register(credentials, callback) {
        this.ajax({
            method: 'POST',
            url: this.url + '/signup',
            contentType: 'application/json',
            data: JSON.stringify(credentials)
        }, callback);
    },

    login: function login(credentials, callback) {
        this.ajax({
            method: 'POST',
            url: this.url + '/login',
            contentType: 'application/json',
            data: JSON.stringify(credentials),
            xhrFields: {
                withCredentials: true
            }
            // dataType: 'json'
        }, callback);
    },
    logout: function logout(callback) {
        this.ajax({
            method: 'POST',
            url: this.url + '/logout',
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            }
        }, callback);
    },


    ///// List and List Items

    showList: function showList(callback) {
        this.ajax({
            method: 'GET',
            url: this.url + '/items',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }

        }, callback);
    },

    createListItem: function createListItem(listItem, callback) {
        this.ajax({
            method: 'POST',
            url: this.url + '/items',
            contentType: 'application/json',
            data: JSON.stringify(listItem),
            xhrFields: {
                withCredentials: true
            },
            dataType: 'json'
        }, callback);
    },

    updateListItem: function updateListItem(item_id, callback) {
        this.ajax({
            method: 'PATCH',
            url: this.url + '/items/' + item_id,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }, callback);
    },

    destroyListItem: function destroyListItem(item_id, callback) {
        this.ajax({
            method: 'DELETE',
            url: this.url + '/items' + item_id,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }

        }, callback);
    },


};
