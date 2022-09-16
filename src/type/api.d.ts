//登录接口参数类型
interface TsLogin {
    username: string,
    password: string
}

//注册接口参数类型
interface TsReg {
    phone: string
    password: string
}


//注册接口返回值数据类型
//data类型每次不确定, 可以用泛型A
interface TsRes<A> {
    data: A
    errCode: number
    message: string
}
//注册返回值类型
type TReg = Promise<TsRes<{}>>

//登录返回值类型
type TLogin = Promise<TsRes<string>>

//首页返回值类型
interface TsExam {
    actionCode: string
    actionName: string
    actionType: string
    businessLevel: null
    createTime: string
    createUser: string
    id: number
    info: string
    invalid: number
    itemCount: number
    numberLevel: number
    pid: null
    sort: number
    tenantId: null
    title: string
    updateTime: string
}
interface TsHome {
    collect: number
    exam: TsExam
    exemItems: TsExam[]
    study: number
    wrong: number
}
type THome = Promise<TsRes<TsHome>>


//题目类型返回值类型
interface TsTest {
    key: string,
    value: string | number
}
type TTest = Promise<TsRes<TsTest[]>>


//获取题目参数类型
interface TsGetAllTest {
    testNum: string
    testType: string
    actionCode: string
    questionType: string
}

//题目答案
interface TsGetAnwser {
    categoryCode: string
    actionType: string
    userAnswer: string
    actionCode: string
    id:string
}

//题目列表的返回值类型
interface IGetAllTest {
    analysis: string
    answer: string
    categoryCode: string
    collcetStatus: boolean
    collcetTotal: number
    content: string
    id: number
    invalid: number
    oerationTotal: number
    optionContent: string
    questionType: string
    score: number
    sort: number
    tenantId: number
    title: string
    userAnswer: string
    wrongAnswer: number
}
type TGetAllTest = Promise<TsRes<IGetAllTest[]>>


//选择题题目类型
interface Iprops {
    data: IGetAllTest
}


//选择题选项类型
interface IOption {
    key: string;
    value: string;
    sort: number;
}