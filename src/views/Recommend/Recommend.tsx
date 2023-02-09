import Scroll from "@/baseUI/Scroll/Scroll";
import Slider from "@/components/Slider/Slider";
import { fetchBannerListDateAction } from "@/store/module/recommend";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import style from "@/assets/global-style"
import { Singer } from "@/api/type";
import { List, ListItem, Title } from "./style";
import { getCount } from "@/api/utils";


export default function () {

    const dispatch = useDispatch();

    const { bannerList, singerList } = useSelector(({ recommend }: any) => {
        return {
            bannerList: recommend.bannerList,
            singerList: recommend.singerList
        }
    })


    // const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
    //     return {
    //         id: item,
    //         picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
    //         name: "隔壁老樊",
    //         accountId: 277313426,
    //         playCount: 11111,
    //     }
    // });

    useEffect(() => {
        dispatch(fetchBannerListDateAction() as any);
    }, [])
    const GoodList = ({ singerList }: { singerList: Singer[] }) => {
        return (<List>
            {
                singerList.map(singer => {
                    return (<ListItem key={singer.id}>
                        <div className="imgWrapper" >
                            <img src={singer.picUrl + "?Param=300x300"} />
                            <div className="playCount">
                                <span className="iconfont icon-music"></span>
                                <span>{getCount(singer.playCount)}</span>
                            </div>
                            <div className="decorate"></div>
                        </div>
                        <div className="desc">{singer.name}</div>
                    </ListItem>)
                })
            }
        </List>)
    }
    // <Slider bannerList={bannerList}></Slider>
    return (
        <Scroll>
            <div>
                <Slider bannerList={bannerList}></Slider>
                <Title>推荐歌单</Title>
                <GoodList singerList={singerList} />
            </div>
        </Scroll>
    )
}