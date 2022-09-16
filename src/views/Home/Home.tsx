import React, { useEffect, useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import HomeItem from "./HomeItem/HomeItem";
import "./Home.less";
import { HomeApi } from "@/request/api";
import BannerImg from "@/static/images/home/xiaolang.png";
import ListImg1 from "@/static/images/home/books.png";
import ListImg2 from "@/static/images/home/examination.png";
import ListImg3 from "@/static/images/home/practice.png";

export default function Home() {
  //定义页面所需数据
  const [title, setTitle] = useState("");
  const [study, setStudy] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [collect, setCollect] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [exemItems, setExemItems] = useState<TsExam[]>([]);

  //请求首页数据
  const getHome = async () => {
    //把首页数据存入缓存
    let homeData = sessionStorage.getItem("homeData");
    if (homeData) {
      //有缓存直接使用
      let data = JSON.parse(homeData);
      setTitle(data.exam.title);
      setStudy(data.study);
      setWrong(data.wrong);
      setCollect(data.collect);
      setItemCount(data.exam.itemCount);
      setExemItems(data.exemItems);
    } else {
      //没有缓存, 重新请求
      let res = await HomeApi();
      console.log(res);
      setTitle(res.data.exam.title);
      setStudy(res.data.study);
      setWrong(res.data.wrong);
      setCollect(res.data.collect);
      setItemCount(res.data.exam.itemCount);
      setExemItems(res.data.exemItems);

      //请求后, 将首页所有数据,存入缓存
      sessionStorage.setItem('homeData',JSON.stringify(res.data))
    }
  };
  useEffect(() => {
    getHome();
  }, []);

  return (
    <div className="home">
      {/* 顶部标题 */}
      <div className="topTitle">
        <div className="java">{title}</div>
        <div className="change">
          <div className="changeConent">切换考试科目</div>
          <ArrowRightIcon></ArrowRightIcon>
        </div>
      </div>

      {/* 顶部图片 */}
      <div className="banner">
        <div className="bannerTitle">欢迎Tomato来到xx学习库</div>
        <div className="bannerBottom">
          <img className="bannerB_left" src={BannerImg} alt="" />
          <div className="bannerB_right">
            <div className="bannerB_R_top">
              <div className="study">已学{study}题</div>
              <div className="centerShu">|</div>
              <div className="total">共{itemCount}题</div>
            </div>
            <div className="bannerB_R_bottom">
              <div className="error">
                <div className="errorNumber">{wrong}</div>
                <div className="errorConent">错题</div>
              </div>
              <div className="collect">
                <div className="collectNumber">{collect}</div>
                <div className="collectConent">收藏</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 题目列表 */}
      <div className="topicList">
        <div className="listImg">
          <img src={ListImg1} alt="" />
          <img src={ListImg2} alt="" />
          <img src={ListImg3} alt="" />
        </div>
      </div>

      {/* 学科题库标题 */}
      <div className="subjectTitle">
        <div className="BigTitle">学科题库</div>
        <div className="smallTitle">坚持每一天,成长看得见</div>
      </div>

      {exemItems.map((item, index) => {
        return <HomeItem key={index} data={item}></HomeItem>;
      })}
    </div>
  );
}
