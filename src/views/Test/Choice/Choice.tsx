import React, { useState } from "react";
import "./Choice.less";
import { useLocation } from "react-router-dom";
import ChoiceItem from "../ChoiceItem/ChoiceItem";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { submitContent } from "@/request/api";
interface IQueType {
  [key: string]: string;
}

//设置辅助函数 显示题目类型
const QueType: IQueType = {
  all: "全部",
  many: "多选",
  one: "单选",
  check: "判断",
};

// 选项类型

export default function Choice(props: Iprops) {
  let { data } = props;

  let location = useLocation();
  // console.log(location);
  // console.log(data);

  let option: IOption[] = JSON.parse(data.optionContent);

  //用户选择的选项
  const [ischeck, setCheck] = useState<string[]>([]);

  //判断选择是否正确
  const [msg, setMsg] = useState("");
  //显示正确答案
  const [rightAnswer, setAnswer] = useState("");

  const oncheck = (v: string) => {
    //多选
    if (data.questionType === "many") {
      //多选需要追加进去, 不能直接替换
      let newarr = JSON.parse(JSON.stringify(ischeck));
      //多选还需要判断当前已选里时候包含已选择项, 包括就截取, 不包括就追加
      if (newarr.includes(v)) {
        //截取
        let begin = ischeck.indexOf(v);
        newarr.splice(begin, 1);
      } else {
        //追加
        newarr.push(v);
      }
      setCheck(newarr);
    } else {
      //单选  | 判断  : 可以直接选中
      let newarr = [v];
      setCheck(newarr);
    }
  };

  //检查答案
  const checkAnswer = async () => {
    // console.log(ischeck);
    // console.log(data.answer);
    //将自己选择的类型转为字符型,并对此排序
    let userAnswer = ischeck.sort().join(",");
    // console.log(userAnswer);
    setAnswer(data.answer);
    if (userAnswer === data.answer) {
      setMsg("✅回答正确");
    } else {
      setMsg("❌回答错误");
    }

    let res = await submitContent({
      categoryCode: data.categoryCode,
      actionType: "exam_test",
      userAnswer: data.answer,
      actionCode: data.categoryCode,
      id: data.id.toString(),
    });
    console.log(res);
  };

  return (
    <div className="Choice">
      <div className="ChoiceTop">
        <div className="question">{QueType[data.questionType]}</div>
        <div className="queContnet">{data.title}</div>
      </div>
      <div className="ChoiceContent">
        {option.map((item, index) => {
          return (
            <ChoiceItem
              key={index}
              data={item}
              ischeck={ischeck.includes(item.key)}
              oncheck={oncheck}
            ></ChoiceItem>
          );
        })}
      </div>
      <div className="confirm" onClick={checkAnswer}>
        确认
      </div>

      <div className="msgInfo">
        <div className="msg">{msg}</div>
      </div>
      <div className="answer">
        <div className="anserTitle">正确答案:</div>
        <div className="answerContent">{rightAnswer}</div>
      </div>
    </div>
  );
}
