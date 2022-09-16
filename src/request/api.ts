import instance from './request'
//请求接口要设置参数的数据类型, 需要设置返回值的数据类型


//登录接口
export const LoginApi = (params: TsLogin): TLogin => instance.post('/1024/login', params)

//注册接口
export const RegApi = (params: TsReg): TReg => instance.post('/1024/register', params)

//首页接口
export const HomeApi = (): THome => instance.get('/6666')

//获取题目类型接口
export const GetTestCate = (actionCode: string, testType = 'all'): TTest => instance.get(`/1314/${actionCode}/${testType}`)

//获取所有题目接口
export const GetAllTest = (params:TsGetAllTest) => instance.post('/1314', params)

//提交答题接口
export const submitContent = (params:TsGetAnwser) => instance.put('/1314', params)

