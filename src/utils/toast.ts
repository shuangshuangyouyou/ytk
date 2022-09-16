//自定义toast的hook

import {useDispatch} from 'react-redux'
function useToast() {
    let dispatch=useDispatch()
    return (type: 'success' | 'info' | 'warning' | 'error', message: string) => {
        dispatch({
            type:'show',
            value:{
                type:type,
                message:message
            }
        })
    }
}
export { useToast }