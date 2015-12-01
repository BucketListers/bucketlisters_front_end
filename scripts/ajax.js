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
            // xhrFields: {
            //     withCredentials: true
            // },
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
            //dataType: 'json'
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
