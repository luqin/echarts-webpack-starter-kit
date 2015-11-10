# Webpack ECharts Starter Kit
Starter template for [ECharts](https://github.com/luqin/echarts) with [webpack](https://github.com/webpack/webpack). 

Demo: http://luqin.github.io/webpack-echarts-starter-kit

## Usage

```js
import echarts from 'echarts/echarts';
import 'echarts/chart/wordCloud';

let mychart = echarts.init(dom);
let charCloudOption = {...};
mychart.setOption(charCloudOption);
```

## Getting Started

```sh
$ npm install
$ npm run build
```
