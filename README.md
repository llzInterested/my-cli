# webpack学习记录

## loader

###

* css:`style-loader`,                                                                                                                                                                                                                               `css-loader`
* less:`style-loader`,                                                                                                                                                                                                                               `css-loader`,                                                                                                                                                                                                                               `less-loader`(依赖less)
* sass:`style-loader`,                                                                                                                                                                                                                               `css-loader`,                                                                                                                                                                                                                               `sass-loader`(依赖sass)

### 图片(css样式中的)

* `url-loader`

### 图片(html中的)

* `html-loader`

### 其他资源，如字体

* `file-loader`

### css兼容性处理

* `postcss-loader`

* `postcss-preset-env`:
  + postcss的插件，帮postcss找到package.json中browserslist的配置，通过配置加载指定的css兼容性样式
  + 默认browserslist取生产环境的配置，若需要修改为开发环境，修改node环境变量：`process.env.NODE_ENV="development"`

### js兼容性处理

* `babel-loader`

## plugins

* `html-webpack-plugin`: 以某个html文件为模板自动引入打包后的资源
* `mini-css-extract-plugin`: 打包css成单独的文件
* `optimize-css-assets-webpack-plugin`: 压缩css
* `eslint-webpack-plugin`: 添加eslint检查，检查规则推荐 `airbnb` ( `eslint-config-airbnb` )

## 优化配置

### 开发环境

* 优化打包构建速度
* 优化代码调试

### 生产环境

* 优化打包构建速度
* 优化代码运行性能

## 缓存

### babel缓存

> cacheDirectory:true

### 文件资源缓存

* `hash`：每次webpack构建会生成一个唯一的hash
  + 问题：js和css使用的是同一个hash值，重新打包会使所有缓存失效，哪怕只改了一个文件

* `chunkhash`：根据chunk生成的hash值，若打包来源同一个chunk，则hash值一样
* `contenthash`：根据文件内容生成hash

## Tree Shaking

> 去除无用代码

前提：

1. 使用es6模块化
2. 开启production环境

> - 在package.json中配置 `sideEffects:false` ，表示所有代码都没有副作用，即都能进行tree sharking，可能会把引入的css文件干掉
> - 要配置无需tree sharking的文件，例 `sideEffects:["*.css"]` , 即css文件无需进行tree sharking

## Code Split(代码分割)

1. 单入口和多入口

2.   

``` 

optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
```

3. <span id="codeSplit3">将需要单独打包的文件按下面方式引入</span>：

``` 

   import(模块路径).then(res=>{console.log('加载成功',res)}).catch(err=>{
  console.log('加载失败',err)
})
```

## Lazy Loading(懒加载)

> 使用[上述代码分割方3](#codeSplit3)es10的 `import` 语法即可

``` 

   import(模块路径).then(res=>{console.log('加载成功', res)}).catch(err=>{
  console.log('加载失败', err)
})
```

## Prefetch(预加载)

> 等其他资源加载完毕，浏览器空闲后再加载资源

``` 

import(/*webpackChunkName:'模块名称',webpackPrefetch:true*/模块路径).then(res=>{console.log('加载成功', res)}).catch(err=>{
  console.log('加载失败', err)
})
```

## PWA

> 渐进式网络开发应用程序(离线可访问)

* 使用插件 `workbox-webpack-plugin`

* 注意：serversworker需要运行在服务器上

## 多进程打包

使用 `thread-loader`

* 进程启动大概600ms，进程间通信也有开销，只有工作消耗时间长，才需要开启多进程打包

## externals

> 排除不需要打包进去的第三方包

* 之后将排除打包后的第三方包cdn引入

## DLL

> 对使用的第三方库单独打包，而不是所有node_modules中第三方包打包为一个js文件

[webpack5踩坑](https://juejin.cn/post/6905364009969844232)

# CZ

`commitlint` , `@commitlint/config-conventional` , `husky`
