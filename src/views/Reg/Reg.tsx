import React, { useState } from "react";

import Logo from "@/static/images/logo.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Link, useNavigate } from "react-router-dom";

//自定义hook
import { useToast } from "@/utils/toast";
import "./Reg.less";
import { RegApi } from "@/request/api";
export default function Reg() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const toast = useToast();

  let navigate = useNavigate();

  //点击返回登录页面
  const backLogin = () => {
    navigate("/login");
  };

  //点击注册按钮
  const toReg = async () => {
    console.log(phone, password);
    let zz = /^1[3-9]\d{9}$/;
    if (zz.test(phone)) {
      //注册
      let res = await RegApi({
        phone,
        password,
      });
      console.log(res);
      //ts不确定res类型
      //res类型是请求接口,所以要处理当前接口的返回值类型
      if (res.errCode == 0) {
        // alert("注册成功");
        //跳转到登录页
        toast("success", "注册成功");
        navigate("/login");
      }
    } else {
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
    <div className="reg">
      <img src={Logo} alt="" />
      <div className="LoginPage">Register Page</div>
      <TextField
        className="loginInp"
        value={phone}
        onChange={(v) => {
          setPhone(v.target.value);
        }}
        id="outlined-basic"
        label="请输入手机号码"
        variant="outlined"
      />
      <TextField
        className="loginInp"
        value={password}
        onChange={(v) => {
          setPassword(v.target.value);
        }}
        type="password"
        id="outlined-basic"
        label="请输入密码"
        variant="outlined"
      />
      <Button className="loginBtn" onClick={toReg} variant="contained">
        立即注册
      </Button>
      <div className="toRegBack">
        <div className="toReg" onClick={backLogin}>
          返回登录
        </div>
      </div>
      <div className="Copyright">Copyright@又又儿 2022.</div>
    </div>
  );
}
