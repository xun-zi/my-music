import { alphaTypes, categoryTypes, getSingerListRequest } from "@/api/request"
import { Singer } from "@/api/type"
import Horizontal from "@/baseUI/Horizontal/Horizontal"
import Scroll from "@/baseUI/Scroll/Scroll"
import { fetchSingerListAction } from "@/store/module/singers"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { List, ListItem, PullDown, PullUp, Wrapper } from "./style"
import LazyLoad, { forceCheck } from "react-lazyload"
import musicImg from "@/assets/music.png"
import { BallScaleMultiple, BallPulse } from '@alex_xu/react-loading';
import { changeSingerList } from "@/store/module/recommend"
import PageTransition from "@/components/pageTransition"
import SingerEl from "../singer/singer"
import { Navigate, Outlet, useNavigate } from "react-router-dom"


export default function () {
    const [category, setCategory] = useState(categoryTypes[0].key);
    const [alphabet, setAlphabet] = useState(alphaTypes[0].name);
    const [offset, setOffset] = useState(0);
    const dispatch = useDispatch<any>();
    // const { singerList } = useSelector(({ singers }: any) => {
    //     return {
    //         singerList: singers.singerList as Singer[]
    //     }
    // })

    const [singerList, setSingerList] = useState<Singer[]>([]);

    const categoryHandle = (val: string) => {
        if (val == category) return;
        setCategory(val)
    }
    const alphabetHandle = (val: string) => {
        if (val == alphabet) return;
        setAlphabet(val)
    }
    useEffect(() => {
        getSingerList();
    }, [category, alphabet])

    function getSingerList() {
        getSingerListRequest(category, alphabet, offset * 30).then(({ artists }: any) => {
            // console.log(artists);
            // console.log("category, alphabet, offset",category,alphabet,offset)
            dispatch(changeSingerList(artists));
            if (offset == 0) {
                setSingerList(artists);
            } else {
                setSingerList((data) => {
                    return [...data, ...artists]
                });
            }

        })
    }

    useEffect(() => {
        getSingerList();
    }, [])

    const [isPullDown, setIsPullDown] = useState(false);
    useEffect(() => {
        if (!isPullDown) return;
        getSingerList();
        setIsPullDown(false);
    }, [isPullDown])
    const [isPullUp, setIsPullUp] = useState(false);
    useEffect(() => {
        if (!isPullUp) return;
        setOffset((state) => {
            return state + 1;
        })
        getSingerList();
        setIsPullUp(false)
    }, [isPullUp])


    const navigate = useNavigate();
    const ListItemClick = (id: string | number) => {
        navigate("/singers/" + id)
    }

    return (<div>
        <Wrapper >
            <Horizontal title="分类(默认热门):" categoryTypes={categoryTypes} oldval={category} onclickHandle={categoryHandle} />
            <Horizontal title="首字母:" categoryTypes={alphaTypes} oldval={alphabet} onclickHandle={alphabetHandle} />
            <List>
                <PullDown style={{ display: isPullDown ? "block" : "none" }}><BallScaleMultiple /></PullDown>
                <Scroll onScroll={forceCheck} onhandlePullDown={() => setIsPullDown(true)} onhandlePullUp={() => setIsPullUp(true)}>
                    <div>
                        {
                            singerList.map((item) => {

                                return (
                                    <ListItem key={item.id} onClick={() => ListItemClick(item.id!)}>
                                        <LazyLoad placeholder={<img src={musicImg} />}>
                                            <img src={item.picUrl + '?Param=50x50'}></img>
                                        </LazyLoad>
                                        <span>{item.name}</span>
                                    </ListItem>
                                )
                            })
                        }
                    </div>
                </Scroll>
                <PullUp style={{ display: isPullUp ? "block" : "none" }}><BallPulse /></PullUp>
            </List>
        </Wrapper>
        <Outlet />
    </div>)
}