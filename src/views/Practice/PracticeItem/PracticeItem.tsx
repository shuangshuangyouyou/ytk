import React, { useState } from "react";
import "./PracticeItem.less";

interface TsData {
  key: string;
  value: string | number;
}

interface TsProps {
  title: string;
  data: TsData[];
  sendVal:(p:string|number)=>void

}
export default function PracticeItem(props: TsProps) {
  let { title, data,sendVal } = props;
  const [num, setNum] = useState(0);
  return (
    <div className="topicList">
      <div className="currentSubject">{title}</div>
      <div className="topicContent">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                console.log(item.value);    //发送给父亲
                setNum(index)
                sendVal(item.value)
              }}
              className={num===index?"active":''}
            >
              {item.key}
            </div>
          );
        })}
      </div>
    </div>
  );
}
