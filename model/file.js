/*
 * @Author: your name
 * @Date: 2020-07-22 17:21:25
 * @LastEditTime: 2020-07-23 17:24:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo\model\file.js
 */

//  用于直接操作相册和图片的模板
const fs = require('fs');
// 删除非空文件夹
const rf = require('rimraf');
const sd = require('silly-datetime');//生成时间戳
const path = require('path');

/**
 * @method: 读取某个文件夹的内容
 * @param {String}  dirName 被读取的文件夹名称或路径
 * @param {function} callback 回调函数
 */
exports.getDirs = function (dirName, callback) {
    fs.readdir(dirName, function (err, files) {
        callback(err, files);
    })
}

/**
 * @method:根据传递进来的路径创建对应的文件夹 
 * @param {String} dirName 文件夹路径
 * @param: {function} callback 回调函数
 */
exports.create = function (dirName, callback) {
    fs.mkdir(dirName, function (err) {
        callback(err);
    })
}

/**
 * @method: 删除文件夹
 * @param {String} dirName 被删除文件夹的路径
 * @param: {function} callback 回调函数
 */
exports.delete = function(dirName,callback){
    rf(dirName,function(err){
        callback(err);
    })
}


/**
 * @method: 根据传进来的文件夹名称和文件对象,修改其保存路径及文件名称
 * @param: {String} dirName 保存的路径
 * @param {File} pic 被操作的文件对象
 * @param: {function} callback 回调函数
 */
exports.rename = function(dirName,pic,callback){
    // 获取文件的旧路径
    var oldPath = pic.path
    // 获取文件的旧名称
    var name = pic.name
    // 获取文件的后缀名
    // ext = name.substring(name.lastIndexOf('.')); // .xxx
    /* var arr = name.split('.');
    ext = arr[arr.length-1];//xxx */
    var ext = path.extname(name);//.xxx

    // 设置新的文件名
    // var n = new Date().getTime()
    var str = sd.format(new Date(),'YYYYMMDDHHmmss')+Math.floor(Math.random()*1000)+ext;//2020072318252354.jpg
    // 改名(修改路径)
    // 新的路径
    var newPath = './uploads/'+dirName+'/'+str;
    fs.rename(oldPath,newPath,function(err){
        callback(err);
    })
}
