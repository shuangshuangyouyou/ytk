import React, { useEffect, useState } from "react";
import "./Login.less";
import { LoginApi } from "@/request/api";
import Logo from "@/static/images/logo.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useToast } from "@/utils/toast";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const data = useSelector((state) => state);

  let navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();


  const goReg = () => {
    navigate("/reg");
  };

  const backHome = () => {
    navigate("/home");
  };

  //登录按钮
  //ts目的: 检查代码是否出现一些低级问题
  const toLogin = async () => {
    console.log(123);
    console.log(username, password);

    let zz = /^1[3-9]\d{9}$/;
    if (zz.test(username)) {
      let res = await LoginApi({
        username:username,
        password:'wolfcode123'
      });
      console.log(res, 123);
      if (res.errCode == 0) {
        //跳转到登录页
        //登录成功
        toast("success", "登录成功");

        //存储token
        localStorage.setItem('token',res.data)

        navigate("/home");
      }
    }else {
      // alert("手机号格式不正确");
      dispatch({
        type: "show",
        value: {
          type: "error",
          message: "手机号格式不正确",
        },
      });
    }
  };

  return (
    // 给当前的页面最大的div设置一个类名,使当前less的作用域就是这个class
    <div className="login">
      <img src={Logo} alt="" />
      <div className="LoginPage">Login Page</div>
      <TextField
        className="loginInp"
        id="outlined-basic"
        label="请输入手机号码"
        value={username}
        variant="outlined"
        onChange={(v) => {
          setUsername(v.target.value);
        }}
      />
      <TextField
        className="loginInp"
        id="outlined-basic"
        value={password}
        label="请输入密码"
        variant="outlined"
        type="password"
        onChange={(v) => {
          setPassword(v.target.value);
        }}
      />
      <Button className="loginBtn" variant="contained" onClick={toLogin}>
        直接登录
      </Button>
      <div className="toRegBack">
        <div className="toReg" onClick={goReg}>
          前往注册
        </div>
        <div className="backHome" onClick={backHome}>
          返回首页
        </div>
      </div>
      <div className="Copyright">Copyright@又又儿 2022.</div>
    </div>
  );
}
