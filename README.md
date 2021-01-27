# webpack学习记录

## loader

###

* css:`style-loader`,                                                          `css-loader`
* less:`style-loader`,                                                          `css-loader`,                                                          `less-loader`(依赖less)
* sass:`style-loader`,                                                          `css-loader`,                                                          `sass-loader`(依赖sass)

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

## source-map

提供源代码到构建后代码映射，方便排错

* `source-map`: 生成外部映射, 有错误代码准确信息和源代码错误位置

- 

[webpack5踩坑](https://juejin.cn/post/6905364009969844232)
