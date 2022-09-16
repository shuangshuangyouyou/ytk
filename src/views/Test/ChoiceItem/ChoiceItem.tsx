import React from "react";
import "./ChoiceItem.less";
import ChoiceImg from "@/static/images/user/choice_me.png";
import { display } from "@mui/system";

interface IProps {
  data: IOption;
  ischeck: boolean;
  oncheck:(val:string)=>void
}
export default function ChoiceItem(props: IProps) {
  let { data, ischeck,oncheck } = props;
  return (
    <div className="ChoiceItem">
      <div className="ChoiceItemNum" onClick={()=>{oncheck(data.key)}} >
        <div className="ChoiceIcon">
          <img
            src={ChoiceImg}
            style={{ display: ischeck ? "block" : "none" }}
            alt=""
          />
        </div>
        <div className="ChoiceTitle">{data.key}、</div>
        <div className="ChoiceContent">{data.value}</div>
      </div>
    </div>
  );
}
