# ECharts Webpack Starter Kit
Starter template for [ECharts](https://github.com/luqin/echarts) with [webpack](https://github.com/webpack/webpack). 

Demo: http://luqin.github.io/echarts-webpack-starter-kit

## Usage

```js
import echarts from 'echarts';
import 'echarts/chart/bar';
import 'echarts/chart/pie';

let mychart = echarts.init(dom, null, { renderer: 'canvas' });
mychart.setOption({ ... });
```

or

```js
import echarts from 'echarts/dist/echarts'; // or echarts.common or echarts.simple

let mychart = echarts.init(dom, null, { renderer: 'canvas' });
mychart.setOption({ ... });
```

## Getting Started

```sh
$ npm install
$ npm run build
```
