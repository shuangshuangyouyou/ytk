import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "@/App";
import Login from "@/views/login/Login";
import Reg from "@/views/Reg/Reg";

// 有tabbar,且都需要登录,可以放在一个公共的组件中
// import Home from "@/views/Home/Home";
// import Fast from "@/views/Fast/Fast";
// import Mine from "@/views/Mine/Mine";
// import Practice from "@/views/Practice/Practice";
// import Test from "@/views/Test/Test";

//懒加载: 就是第一次重新请求, 存缓存, 以后执行缓存: 替换上面的引入

import { lazy } from "react";
const Home = lazy(() => import("@/views/Home/Home"));
const Fast = lazy(() => import("@/views/Fast/Fast"));
const Mine = lazy(() => import("@/views/Mine/Mine"));
const Practice = lazy(() => import("@/views/Practice/Practice"));
const Test = lazy(() => import("@/views/Test/Test"));

const router = (
  <Router>
    <Routes>
      <Route path="/" element={<App></App>}>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/fast" element={<Fast></Fast>}></Route>
        <Route path="/mine" element={<Mine></Mine>}></Route>
        <Route path="/practice/:id" element={<Practice></Practice>}></Route>
        <Route path="test" element={<Test></Test>}></Route>
      </Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/reg" element={<Reg></Reg>}></Route>
    </Routes>
  </Router>
);

export default router;
