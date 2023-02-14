import { Singer } from "@/api/type";
import { getCount } from "@/api/utils";
import { useNavigate } from "react-router-dom";
import { ListItem } from "./style";
import musicImg from "@/assets/music.png"
import LazyLoad, { forceCheck } from "react-lazyload"
type Props = {
    singer: Singer,
    width?: number | string
}

export default function (props: Props) {
    const { singer, width } = props;
    const navigate = useNavigate();
    const navHandle = (id: number | string) => {
        console.log("navHandle")
        navigate(id + "")
    }
    return (<ListItem key={singer.id} onClick={() => singer.id && navHandle(singer.id)} width={width}>
        <div className="imgWrapper" >
            <LazyLoad placeholder={<img src={musicImg} />}>
                <img src={singer.picUrl + "?Param=300x300"} />
            </LazyLoad>
            <div className="playCount">
                <span className="iconfont icon-music"></span>
                <span>{getCount(singer.playCount)}</span>
            </div>
            <div className="decorate"></div>
        </div>
        <div className="desc" style={{ display: singer.name ? "" : "none" }}>{singer.name}</div>
    </ListItem>)
}