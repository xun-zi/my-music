import { CSSTransition } from 'react-transition-group';
import { useEffect, useRef, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { Container, Content, KeysWrapper, SearchResult, SongItem } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { getHotKeyWordsRequest, getResultSongsListRequest, getSongDetailRequest, getSuggestListRequest } from '@/api/request';
import { changeHotList, changeSongList } from '@/store/module/search';
import SearchBox from '@/components/searchBox/SearchBox';
import Scroll from '@/baseUI/Scroll/Scroll';
import { getName } from '@/api/utils';
import { changePlayer, changePlayList, selectPlayerSong } from '@/store/module/player';

// 当搜索框为空，展示热门搜索列表
// 当搜索框有内容时，发送 Ajax 请求，显示搜索结果
// 点击搜索结果，分别进入到不同的详情页中

export default function () {
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const { hotList, suggestList, songsList } = useSelector((state: any) => state.search);
    useEffect(() => {
        getHotKeyWordsRequest().then((res: any) => {
            // console.log('getHotKeyWordsRequest', res);
            dispatch(changeHotList(res.result.hots))
        })
        setShow(true);
    }, [])

    //处理输入信息
    const [query, setQuery] = useState('');
    const queryHandle = (value: string) => {
        // console.log(value);
        setQuery(value);
        getResultSongsListRequest(value).then((res: any) => {
            // console.log('getResultSongsListRequest', res);
            dispatch(changeSongList(res.result.songs))
        })
        getSuggestListRequest(value).then((res) => {
            // console.log('getResultSongsListRequest', res);
        })
    }

    //关键字显示
    const renderKeys = () => {
        return (<KeysWrapper>
            <div className='title'>热门搜索</div>
            <div className='k-conatiner'>
                {
                    hotList.map((value: any, index: number) => {
                        // console.log(value, index)
                        return (<span className='item' key={index} onClick={() => queryHandle(value.first)}>
                            {value.first}
                        </span>)
                    })
                }
            </div>
        </KeysWrapper>)
    }

    //搜索结果

    const ListItemClick = (id: number) => {
        getSongDetailRequest(id).then((data: any) => {
            // console.log(data);
            dispatch(changePlayList(data.songs))
            dispatch(selectPlayerSong(0))
            dispatch(changePlayer(true));
        })
    }
    const renderSongList = () => {
        if (!songsList.length) return (<></>);
        return (<>
            {
                songsList.map((item: any, index: number) => {
                    return (<SongItem key={item.id} onClick={() => ListItemClick(item.id)}>
                        <div className="info">
                            <div>{item.name}</div>
                            <span>
                                {getName(item.artists)} - {item.album.name}
                            </span>
                        </div>
                    </SongItem>)
                })
            }
        </>)
    }


    const renderSearchResult = () => {
        return (<SearchResult>
            <Scroll>
                <div>
                    {renderSongList()}
                </div>
            </Scroll>
        </SearchResult>)
    }

    return (<CSSTransition
        in={show}
        timeout={300}
        appear={true}
        classNames='fly'
        unmountOnExit
        onExit={() => navigate(-1)}
    >
        <Container>
            <SearchBox query={query} queryHandlle={queryHandle} />
            <Content >
                {query == '' && renderKeys()}
                {query != '' && renderSearchResult()}

            </Content>
        </Container>
    </CSSTransition>)
}