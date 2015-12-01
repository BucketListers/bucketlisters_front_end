'use strict';

var bucketList_api = {
    //url: 'https://someurl',
   // url: 'http://localhost:3000',
    url: 'http://httpbin.org/',

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

    register: function register(credentials, callback) {
        this.ajax({
            method: 'POST',
            url: this.url + '/register',
            contentType: 'application/json',
            data: JSON.stringify(credentials),
            dataType: 'json'
        }, callback);
    },

    login: function login(credentials, callback) {
        this.ajax({
            method: 'POST',
            url: this.url + '/login',
            contentType: 'application/json',
            data: JSON.stringify(credentials),
            dataType: 'json'
        }, callback);
    },
    logout: function logout(id, token, callback) {
        this.ajax({
            method: 'DELETE',
            url: this.url + '/logout/' + user_id,
            headers: {
                Authorization: 'Token token=' + token
            },
            contentType: 'application/json',
            dataType: 'json'
        }, callback);
    },


    ///// Profile
    createProfile: function createProfile(profile, user_id, token, callback) {
        this.ajax({
            method: 'POST',
            url: this.url + '/users/' + user_id + '/profile',
            headers: {
                Authorization: 'Token token=' + token
            },
            contentType: 'application/json',
            data: JSON.stringify(profile),
            dataType: 'json'
        }, callback);
    },

    updateProfile: function updateProfile(profile, user_id, token, callback) {
        this.ajax({
            method: 'PATCH',
            url: this.url + '/users/' + user_id + '/profile',
            headers: {
                Authorization: 'Token token=' + token
            },
            contentType: 'application/json',
            data: JSON.stringify(profile),
            dataType: 'json'
        }, callback);
    },

    readProfile: function readProfile(user_id, token, callback) {
        this.ajax({
            method: 'GET',
            url: this.url + '/users/' + user_id + '/profile',
            headers: {
                Authorization: 'Token token=' + token
            },
            dataType: 'json'

        }, callback);
    },

    destroyProfile: function destroyProfile(user_id, token, callback) {
        this.ajax({
            method: 'DELETE',
            url: this.url + '/users/' + user_id + '/profile',
            headers: {
                Authorization: 'Token token=' + token
            },
            dataType: 'json'

        }, callback);
    },


};
