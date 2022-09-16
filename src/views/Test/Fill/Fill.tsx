import React from 'react'
import './Fill.less'

interface IQueType{
    [key:string]:string
  }
  
  //设置辅助函数 显示题目类型
  const QueType:IQueType={
    all:'全部',
    qa:"问答",
    fill:'判断',
    code:"编程"
  }
export default function Fill(props:Iprops) {
    let {data}=props
  return (
    <div className='Fill'>
        <div className="FillTop">
            <div className="question">
                {QueType[data.questionType]}
            </div>
            <div className="queContnet">
                {data.title}
            </div>
        </div>
        <textarea className='FillContent' placeholder='请输入答案' name="" id="" cols={30} rows={10}></textarea>
        <div className="rule">
            此类型题目暂不支持打分, 按正确记分。
        </div>
        <div className="confirm">
            确认
        </div>
    </div>
  )
}
