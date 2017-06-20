# <%= props.name %>

> <%= props.description %>

## 使用

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 说明

+ dev为开发过程（包含代码写作与开发自测）
+ build包含了三个分类
  + 普通：run build 正式发布使用的build
  + test：run build-test 测试及CI测试使用的build
  + release：run build-release release版本（内部测试、beta测试等）使用的build

## TODO

+ 测试依赖及文件可选