/*
 * @Author: your name
 * @Date: 2020-07-22 16:20:52
 * @LastEditTime: 2020-07-23 17:56:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo\route\pic.js
 */ 
// 创建图片相关的路由
const express = require('express');
const router = express.Router();
const fd = require('formidable');
const file = require('../model/file.js');
const {FAILED, SUCCESS} = require('../status');

// 处理 /pic/show请求,展示某个相册里面的内容
router.get('/show',function(req,res){
    // 获取请求参数,得到被点击的相册名称
    var dirName = req.query.dirName;
    if(!dirName){
        res.render('error',{errMsg:'获取相册出错'});
        return;
    }
    // dirName = 'uploads/'+dirName

    // 调用file里面的getDirs方法获取里面的内容
    file.getDirs('uploads/'+dirName, function (err, files) {
        if (err) {
            console.log(err);
            res.render('error', { errMsg: '打开相册失败' });
            return;
        }
        // 成功
        res.render('show', { pics: files,dirName:dirName });
    });
})

// 处理get方式的/pic/upload请求,跳转到上传页面
router.get('/upload',function(req,res){
    // 在上传图片时需要知道图片传到哪个相册中
    // 获取uploads下所有相册名
    file.getDirs('uploads/', function (err, dirs) {
        if (err) {
            console.log(err);
            res.render('error', { errMsg: '获取相册出错' });
            return;
        }
        // 获取相册成功,将其传递给上传页面
        res.render( 'upload',{dirs,dirs});
    });

})

// 处理post方式的/pic/upload请求,上传图片
router.post('/upload',function(req,res){
    // 处理图片的上传
    // 创建表单对象
    var form = new fd.IncomingForm();
    // 设置上传临时保存路径
    form.uploadDir = './temp';
    // 解析请求
    form.parse(req,function(err,fields,files){
        if(err){
            console.log(err);
            res.render('error',{errMsg:'上传图片失败'});
            return;
        }
        // 获取表单中的数据
        // 文本域数据: 选择的文件夹名称
        var dirName = fields.dirName;
        // 获取图片对象
        var pic = files.pic;
        // 调用file处理图片
        file.rename(dirName,pic,function(err){
            if(err){
                console.log(err);
                res.render('error',{errMsg:'上传失败'});
                return;
            }
            // 上传成功,跳转到上传图片的文件夹
            res.redirect('/pic/show?dirName='+dirName);
        })
    })
})


// 暴露路由
module.exports = router