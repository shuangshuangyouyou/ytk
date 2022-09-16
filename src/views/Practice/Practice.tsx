import React,{useEffect,useState} from "react";
import "./Practice.less";
import { useParams,useNavigate } from "react-router-dom";
import PracticeItem from "./PracticeItem/PracticeItem";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import {GetTestCate} from '@/request/api'
export default function Practice() {
  let params = useParams();
  let navigate=useNavigate()

  interface TsState{
    key:string
    value:string|number
  }

  const [examCate,setCategory]=useState<TsState[]>([])
  const [examTypeValue,setType]=useState<string|number>('all')
  const [examCateValue,setCate]=useState<string|number>('all')
  const [examNumValue,setNum]=useState<string|number>(5)

  // console.log(params);

  //试题分类, 只展示数据, 不用响应式
  //选择中文, 获取对应英文的值, 把数据设计成如下形式
  //all全部   err错误   done已做   notdone没做
  const examType=[
    {key:'全部',value:'all'},
    {key:'错误',value:'err'},
    {key:'已做',value:'done'},
    {key:'没做',value:'notdone'}
  ]

  //题目分类
  // const examCate=[
  //   {key:'全部/24',value:'all'},
  //   {key:'全部/24',value:'all'},
  //   {key:'全部/24',value:'all'},
  //   {key:'全部/24',value:'all'},
  // ]
  //定义一个辅助函数, 将题型和英文之间的关系对应
  interface TsFun{
    [key:string]:string
  }
  const funType:TsFun={
    all:'全部',
    qa:'问答',
    code:'编程',
    one:'单选',
    check:'判断',
    many:'多选'
  }

  const GetTestCategory=async ()=>{
    //ts识别params.id可能存在可能不存在, 加一个! 表名一定存在
    let res=await GetTestCate(params.id!)
    // console.log(res);
    let newData=res.data.map((item)=>{
      // item.key: all
      //item.value: 24
      let content={key:funType[item.key]+"/"+item.value,value:item.key}
      return content
    })
    // console.log(newData);
    setCategory(newData)
  }

  useEffect(()=>{
    GetTestCategory()
  })


  //做题数量
  const examNum=[
    {key:'5',value:5},
    {key:'10',value:10},
    {key:'20',value:20},
    {key:'30',value:30},
    {key:'50',value:50},
    {key:'100',value:100},
  ]

  //跳转到答题页
  const jump =()=>{
    navigate('/test',{
      state:{
        testNum:examNumValue,
        testType:examTypeValue,
        actionCode:params.id,
        questionType:examCateValue
      }
    })
  }



  return (
    <div className="practice">
      <div className="practiceTop">
        <div className="enterPractice" onClick={jump}>进入练习</div>
        <div className="enterExam">进入考试模式</div>
      </div>

      <div className="currentRight">
        <CleaningServicesIcon className="rightIcon"></CleaningServicesIcon>
        <div className="rightClear">清除记录</div>
      </div>
      <PracticeItem title="试题分类" data={examType} sendVal={(v)=>{setType(v)}}></PracticeItem>
      <PracticeItem title="题目类型" data={examCate} sendVal={(v)=>{setCate(v)}}></PracticeItem>
      <PracticeItem title="做题数量" data={examNum} sendVal={(v)=>{setNum(v)}}></PracticeItem>

    </div>
  );
}
