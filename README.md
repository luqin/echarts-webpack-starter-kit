# ECharts Webpack Starter Kit
Starter template for [ECharts](https://github.com/luqin/echarts) with [webpack](https://github.com/webpack/webpack). 

Demo: http://luqin.github.io/echarts-webpack-starter-kit

## Usage

```sh
$ npm i echarts --save
```

```js
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';

// or
import echarts from 'echarts'; // echarts/index.common or echarts/index.simple

let mychart = echarts.init(dom);
mychart.setOption({ ... });
```

## Getting Started

```sh
$ npm install
$ npm run build
```
