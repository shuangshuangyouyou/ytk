import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
// import App from './App';
import router from "@/router";
import store from "@/store";
import { Provider } from "react-redux";
import Toast from "@/components/Toast/Toast";
import Loading from "./components/loading/loading";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <App />,
  // 此时所有页面都可以使用redux中的内容
  <Provider store={store}>
    <Toast></Toast>
    {/* 懒加载必须配合: Suspense  : 注意需要引入, 然后将router罩上 */}
    <Suspense fallback={<Loading></Loading>}>{router}</Suspense>
  </Provider>
);
