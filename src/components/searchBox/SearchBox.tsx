import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SearchWrapper } from "./style";


interface Props {
    query: string,
    queryHandlle: Function
}

function SearchBox(props: Props) {
    const {
        query,
        queryHandlle
    } = props;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        inputRef.current!.focus();
    }, [])
    return (<SearchWrapper>
        <span className="iconfont icon-back_android" onClick={() => navigate('/recommend')}></span>
        <input
            className="input"
            ref={inputRef}
            placeholder="搜索歌曲、歌手、专辑"
            value={query}
            onChange={(e) => queryHandlle(e.target.value)}
        />
        <span
            className="iconfont icon-delete"
            style={{ display: query == '' ? 'none' : 'block' }}
            onClick={() => queryHandlle('')}
        />
    </SearchWrapper>)
}



export default SearchBox;