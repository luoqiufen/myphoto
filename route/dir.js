// 创建相册相关的路由
const express = require('express');
const router = express.Router();
const file = require('../model/file.js');

// 处理dir请求,显示所有相册
router.get('/',function(req,res){
    // 读取uploads里面的文件夹
    file.getDirs('./uploads',function(err,files){
        if(err){
            console.log(err);
            res.render('error',{errMsg:'打开相册失败'});
            return;
        }
        // 成功
        res.render('index',{dirs:files});
    })
})

// 处理get方式的 /dir/mkdir请求,跳转到新建相册页面
router.get('/mkdir',function(req,res){
    // 获取请求参数
    var dirname = req.body.dirname
})



// 暴露路由
module.exports = router;