'use strict';
var fs = require('fs');
var querystring = require('querystring');

var request = require('request');
var fbbkJson = require('fbbk-json');
var iconv = require('iconv-lite');

var api = 'http://v.baidu.com/v?&rn=20&ct=905969664&&db=0&s=0&fr=videoMultiNeed&pn=0&word=';

module.exports = exports.baiduVideo = function(keyword, callback) {
    request({
        url: api + querystring.escape(keyword),
        encoding: null
    }, function(err, res, body) {
        if (err) {
            callback(err);
        }

        body = iconv.decode(body, 'gbk');

        body = body.substring(body.indexOf('({') + 1, body.indexOf('})') + 1);

        var data = fbbkJson.parse(body);

        var result = data.data.reduce(function (memo, curr) {
            return memo.concat({
                title: curr.ti,
                url: 'http://v.baidu.com' + curr.url,
                duration: curr.duration,
                via: curr.srcShortUrlExt,
                viaUrl: curr.srcShortUrl
            });
        }, []);

        callback(null, result);
    });
};


