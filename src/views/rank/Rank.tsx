import { filterIndex } from "@/api/utils";
import Scroll from "@/baseUI/Scroll/Scroll";
import { fetchRankListAction } from "@/store/module/rank";
import { useEffect, useLayoutEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GlobalListItem, Img, OfficeListItem, OList, Title, Wrapper } from "./style";
import { GList } from "./style";
import LazyLoad, { forceCheck } from "react-lazyload"
import musicImg from "@/assets/music.png"

type ImgType = {
    id: number,
    coverImgUrl: string,
    updateFrequency: string
}

export default function () {

    const dispatch = useDispatch<any>();
    const { rankList, loading } = useSelector(({ rank }: any) => rank)
    useEffect(() => {
        dispatch(fetchRankListAction());
    }, [])
    const [officeList, globalList] = filterIndex(rankList)
    function ImgEl(data: ImgType) {
        return (<Img>
            <div className="decorate"></div>

            <LazyLoad placeholder={<img src={musicImg} />}>
                <img src={data.coverImgUrl + "?param=300x300"} />
            </LazyLoad>
            <span>{data.updateFrequency}</span>
        </Img>)
    }

    function OfficeListEl() {
        return (<OList>
            {
                officeList.map((item) => {
                    return <OfficeListItem key={item.id}>
                        <div className="imgWrapper">
                            {
                                ImgEl(item)
                            }
                        </div>
                        <div className="desc">
                            {
                                item.tracks.map((data, index) => {
                                    return <span key={index}>
                                        {`${data.first} - ${data.second}`}
                                    </span>
                                })
                            }
                        </div>
                    </OfficeListItem>
                })
            }
        </OList>)
    }

    function GloblListEl() {
        return (<GList>
            {
                globalList.map((item) => {

                    return (<GlobalListItem key={item.id}>
                        {
                            ImgEl(item)
                        }
                    </GlobalListItem>)
                })
            }
        </GList>)
    }

    function showEL() {
        return (
            <Wrapper>
                <Scroll onScroll={forceCheck}>
                    <div>
                        <Title>官方榜</Title>
                        <OfficeListEl />
                        <Title>全球榜</Title>
                        <GloblListEl />
                    </div>
                </Scroll>
            </Wrapper>
        )
    }

    return loading ? 'loading' : showEL();
}