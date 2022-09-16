import React from 'react'

import { Outlet } from 'react-router-dom'
import '@/App.less'

import Tabbar from '@/components/Tabbar/Tabbar'
export default function App() {

  //所有登录以后的页面,都要在App.tsx中访问,在这判断是否登录
  return (
    <div>
      {/* App */}
        <Outlet></Outlet>
        <Tabbar></Tabbar>
    </div>
  )
}
