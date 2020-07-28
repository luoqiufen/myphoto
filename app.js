/*
 * @Author: your name
 * @Date: 2020-07-22 15:50:12
 * @LastEditTime: 2020-07-27 14:23:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \photo\app.js
 */ 
// 创建服务器
const express = require('express');
const router = require('./route');
const app = express();

app.listen(4000);

// 设置视图模板引擎
app.set('view engine','ejs');

// 设置post请求参数的解析方式
// application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

// 设置根目录
app.use(express.static('./public'));
app.use(express.static('./uploads'));

// 处理 / 请求,展示相册首页
app.get('/',function(req,res){
    // 重定向让浏览器重新发送一个 /dir的请求
    res.redirect('/dir');
})

// 处理相册相关的请求(所有以 /dir 开头的请求)
app.use('/dir',router.dir);


// 处理图片相关的请求(所有以 /pic 开头的请求)
app.use('/pic',router.pic);


// 处理所有其他错误的请求地址
app.use(function(req,res){
    res.render('error',{errMsg:'地址错误'});
})
