import {createStore} from 'redux'
import { StringDecoder } from 'string_decoder'

const defaultState={
    msg:'项目开幕大吉',
    toastData:{
        isShow:false,
        type:'warning',
        message:'手机号不正确'
    }
}


// 一般不会把类型限制写在当前页中,导致页面乱,可以在src任意位置创建.d.ts文件,会自动引入
const reducer=(state=defaultState,action:TsAction)=>{
    let newstate=JSON.parse(JSON.stringify(state))
    console.log(action);
    if(action.type==='show'){
        //临时指定类型
        let value=action.value as TsToast
        newstate.toastData.isShow=true
        newstate.toastData.type=value.type
        newstate.toastData.message=value.message
    }else if(action.type==='hide'){
        newstate.toastData.isShow=false
    }
    return newstate
}

const store=createStore(reducer)

export default store


/* 
    redux整个页面都需要能访问到reducer传值
    需要一个组件 使用<Provider></Provider>传值,公共
*/