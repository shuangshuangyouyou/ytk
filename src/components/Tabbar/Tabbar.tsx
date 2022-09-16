import React, { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import "./Tabbar.less";
import home1 from "@/static/images/tabbar/home_1.png";
import home2 from "@/static/images/tabbar/home_2.png";
import fast from "@/static/images/tabbar/fast.png";
import my1 from "@/static/images/tabbar/my_1.png";
import my2 from "@/static/images/tabbar/my_2.png";

export default function Tabbar() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  //辅助数组
  const routes = ["/home", "/fast", "/mine"];

  //解决刷新后, tabbar回到第0位置的bug
  //使用useLocation获取域名
  let location = useLocation();
  // console.log(location.pathname);

  useEffect(() => {
    // if(location.pathname==='/home'){
    //   setValue(0)
    // }else if(location.pathname==='/fast'){
    //   setValue(1)
    // }else if(location.pathname==='/mine'){
    //   setValue(2)
    // }
    setValue(routes.indexOf(location.pathname));
  }, [location.pathname]);

  return (
    <div className="Tabbar" style={{display:value>=0?'block':'none'}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);

          navigate(routes[newValue]);
          // if(newValue===0){
          //   navigate('/home')
          // }else if(newValue===1){
          //   navigate('fast')
          // }else if(newValue===2){
          //   navigate('mine')
          // }
        }}
      >
        <BottomNavigationAction
          label="首页"
          icon={<img src={value === 0 ? home1 : home2} />}
        />
        <BottomNavigationAction label="快速刷题" icon={<img src={fast} />} />
        <BottomNavigationAction
          label="我的"
          icon={<img src={value === 2 ? my1 : my2} />}
        />
      </BottomNavigation>
    </div>
  );
}
