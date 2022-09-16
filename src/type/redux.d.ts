//操作类型
interface TsAction {
    type: string,
    value?: unknown
}

//数据类型
interface TsState {
    toastData: {
        isShow: boolean,
        type: 'success' | 'info' | 'warning' | 'error',
        message: StringDecoder
    }
}

//操作里面的value类型
interface TsToast {
    type: 'success' | 'info' | 'warning' | 'error',
    message: StringDecoder
}