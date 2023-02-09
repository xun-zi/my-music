import { Top, Tab, TabItem, Content } from "./style";
import { NavLink, Outlet } from "react-router-dom"
import { Suspense } from "react";



export default function () {


    return (<div>
        <Top>
            <span className="iconfont icon-menu"></span>
            <span>云音悦</span>
            <span className="iconfont icon-search"></span>
        </Top>
        <Tab>
            <NavLink to="/recommend"><span>推荐</span></NavLink>
            <NavLink to="/singers"><span>歌手</span></NavLink>
            <NavLink to="/rank"><span>排行榜</span></NavLink>
        </Tab>
        <Content>
            <Suspense fallback="loading">
                <Outlet />
            </Suspense>
        </Content>
    </div>)
}