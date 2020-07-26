/*
 * @Author: your name
 * @Date: 2020-07-22 15:50:12
 * @LastEditTime: 2020-07-23 20:05:49
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

// 设置post请求参数的解析方式
app.use(express.urlencoded({extended:true}));

// 设置根目录
app.use(express.static('./uploads'));
app.use(express.static('./public'));