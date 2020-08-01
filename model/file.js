// 用于直接操作相册和图片的模板
const fs = require('fs');
// 删除非空文件夹
const rf = require('rimraf');
const sd = require('silly-datetime');
const path = require('path');

/**
 * 读取某个文件夹的内容
 * @param {String} dirName 被读取文件夹名称或路径
 * @param {function} callback 回调函数
 */
exports.getDirs = function(dirName,callback){
    fs.readdir(dirName,function(err,files){
        callback(err,files);
    })
}

/**
 * 创建文件夹
 * @param {String} dirName 文件夹路径
 * @param {function} callback 回调函数
 */
exports.create = function(dirName,callback){
    fs.mkdir(dirName,function(err){
        callback(err);
    })
} 