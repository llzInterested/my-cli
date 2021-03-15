import $ from 'jquery';
import './css/index.css';
import './css/index1.css';

// import { a } from './a';

// import(/*webpackChunkName:'test'*/'./a').then(res=>{console.log('加载成功',res)}).catch(err=>{
//   console.log('加载失败',err)
// })
// import "./css/iconfont.css";
// import "./index.less";
// import "./index.sass";

console.log('index文件加载了', $);

document.getElementById('box1').onclick = function () {
  import(/* webpackChunkName:'test',webpackPrefetch:true */'./a').then((res) => {
    console.log('点击111', res.a);
  });
};

// 注册serviceWorker(有兼容问题)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((res) => {
      console.log('sw注册成功', res);
    }).catch((e) => {
      console.log('sw注册失败', e);
    });
  });
}
