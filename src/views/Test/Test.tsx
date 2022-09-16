import React, { useEffect, useState } from "react";
import "./Test.less";
import { useLocation } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Fill from "./Fill/Fill";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import Choice from "./Choice/Choice";

import { GetAllTest } from "@/request/api";
export default function Test() {
  let location = useLocation();
  // console.log(location);

  //存储所有题目
  const [testContent, setContent] = useState<IGetAllTest[]>([]);
  //辅助变量  目的: 判断当前题目属于什么题型
  const ChoiceType = ["one", "check", "many"];
  //在数组里面是选择题, 不在数组里面是填空题

  //判断是第几道题
  const [num,setNum]=useState(0)

  const getTest = async () => {
    let res = await GetAllTest(location.state as TsGetAllTest);
    // console.log(res);
    setContent(res.data);
    // console.log(res.data);
  };

  useEffect(() => {
    getTest();
  }, []);

  return (
    <div className="topic">
      {/* <div className="warn">
        <WarningAmberIcon className="warnIcon"></WarningAmberIcon>
        <div className="warnContent">该功能暂未开放</div>
      </div> */}
      <div className="topicTop">
        <div className="topLeft">
          <AssignmentIcon className="topicNum"></AssignmentIcon>
          <div className="fenzi">{num+1}</div>/ <div>{testContent.length}</div>
        </div>
        <div className="topRight">
          <div className="collection">收藏</div>
          <StarBorderIcon className="star"></StarBorderIcon>
        </div>
      </div>
      <div>
        <Swiper
          onSlideChange={(v) => setNum(v.activeIndex)}
        >
          {testContent.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                {ChoiceType.includes(item.questionType) ? (
                  <Choice data={item}></Choice>
                ) : (
                  <Fill data={item}></Fill>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
        {/* <Fill></Fill>
        <Choice></Choice> */}
      </div>
    </div>
  );
}
