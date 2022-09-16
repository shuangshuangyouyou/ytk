import React,{useEffect} from "react";
import "./Toast.less";
import Alert from "@mui/material/Alert";
import { useSelector,useDispatch } from "react-redux";
export default function Toast() {
    const {isShow,type,message}=useSelector((state:TsState)=>state.toastData)
    const dispatch=useDispatch()

    //判断如果isShow为true, 弹框显示了,倒计时n秒后,让他消失
    //监听某个值的改变
    useEffect(()=>{
        if(isShow){
            setTimeout(()=>{
                dispatch({
                    type:'hide'
                })
            },1500)
        }
    },[isShow])
  return (

    // 变量要求: 所有组件,都能响应式操作弹框的显示隐藏和样式,所以放在redux
    <div style={{ display: isShow ? "block" : "none" }}>
      <Alert severity={type}>{message}</Alert>
    </div>
  );
}
