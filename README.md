# react-webpack-template

使用webpack 2 搭建的react项目模板.实现了react项目的基础配置,同时实现了部分常用组件.

# Install
```bash
$ npm install -g webpack@2 webpack-dev-server@2
$ git clone https://github.com/m860/react-webpack-template.git
$ cd react-webpack-template
$ npm install
```
# Development
```bash
$ npm run dev
```
然后在浏览器中访问:[http://localhost:3000](http://localhost:3000)

# Production
```bash
$ npm run build
```

# Router
[react-router](https://github.com/ReactTraining/react-router)

# APP Configuration

## index:Function

设置启动页

## transitionTimeout

设置页面切换时的时间,单位是毫秒(ms)

## getTransitionName

设置页面切换的动画,可以根据location设置不同的动画,如:

```javascript
getTransitionName:(location)=>{
    if(location.action==="POP"){
        return "page-pop";
    }
    return "page-push";
}
```








