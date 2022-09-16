import axios from 'axios'
const instance =axios.create({
    baseURL:'/api',
    timeout:5000
})

//请求拦截
instance.interceptors.request.use(config=>{
    //判断是否有tokenm如果有, 加到请求头
    const token=localStorage.getItem('token')
    if(token){
        config.headers=config.headers||{}
        config.headers['x-auth-token']=token
    }
    return config
},err=>{
    return Promise.reject(err)
})

//响应拦截
instance.interceptors.response.use(res=>{
    return res.data
},err=>{
    return Promise.reject(err)
})

export default instance