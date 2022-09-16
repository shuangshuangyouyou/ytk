import React from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import "./HomeItem.less";
import Subject from "@/static/images/home/subject.png";
import Button, { ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

//进度条样式
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#2E57FF" : "#308fe8",
  },
}));

//按钮样式
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#2E57FF",
  "&:hover": {
    backgroundColor: "#2E57FF",
  },
}));

//父传子类型
interface Tsprops {
  data: TsExam;
}

//随机数定义
function rand(m: number, n: number) {
  return Math.ceil(Math.random() * (n - m + 1)) + (m - 1);
}

export default function HomeItem(props: Tsprops) {
  // console.log(props);
  let { data } = props;
  let navigate=useNavigate()

  //已学: 做一个假数据
  let learn = rand(0, data.itemCount);

  return (
    <div>
      {/* 学科题库内容 */}
      <div className="subjectContent">
        <div className="subjectImg">
          <img src={Subject} alt="" />
        </div>
        <div className="subjectCenter">
          <div className="subTop">{data.title}</div>
          <div className="subCenter">
            {learn}/{data.itemCount}题
          </div>
          <div className="subBottom">
            <BorderLinearProgress
              variant="determinate"
              value={Math.floor((learn / data.itemCount) * 100)}
            />
          </div>
        </div>
        <div className="pricateBtn">
          <ColorButton variant="contained" onClick={()=>{navigate('/practice/'+data.actionCode)}}>练习</ColorButton>
        </div>
      </div>
    </div>
  );
}
