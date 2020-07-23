/*
 * @Author: your name
 * @Date: 2020-07-22 16:24:31
 * @LastEditTime: 2020-07-22 16:24:31
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \photo\route\index.js
 */ 

//  将dir和pic两个路由模块合并成一个模块并暴露出去
module.exports = {
    dir: require('./dir.js'),
    pic: require('./pic.js')
}