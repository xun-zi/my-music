import Scroll from "@/baseUI/Scroll/Scroll"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"


const Horizontal = styled.div`
    box-sizing:border-box;
    display:flex;
    font-size:13px;
    padding:5px;
    align-items:center;
    .title{
        white-space:nowrap;
        color:#666;
    }
`

const List = styled.div`
    display:flex;
    align-items:center;
`

const ListItem = styled.span`
    display:flex;
    align-items:center;
    white-space:nowrap;
    padding:5px;
    &.active{
        color: #d44439;
        border: 1px solid #d44439;
        opacity: 0.8;
        border-radius:5px;
    }
`

type Props = {
    onclickHandle?: Function,
    oldval?: string,
    categoryTypes: { key: string, name: string }[],
    title: string
}

export default function (props: Props) {
    const { categoryTypes, oldval, onclickHandle = () => { }, title } = props
    const [refreshCategoryScroll, setRefreshCategoryScroll] = useState(false);
    const Category = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        let categoryDOM = Category.current!;
        let tagElems = categoryDOM.querySelectorAll("span");
        let totalWidth = 0;
        Array.from(tagElems).forEach(ele => {
            totalWidth += ele.offsetWidth;
        });
        totalWidth += 2;
        categoryDOM.style.width = `${totalWidth}px`;
        setRefreshCategoryScroll(true);
    }, [refreshCategoryScroll]);
    return (
        <Horizontal>
            <Scroll direction="horizontal">
                <List ref={Category}>
                    <span className="title">{title}</span>
                    {
                        categoryTypes.map((item) => {
                            return <ListItem key={item.key} className={oldval == item.key ? "active" : "none"} onClick={() => onclickHandle(item.key)}>
                                {item.name}
                            </ListItem>
                        })
                    }
                </List>
            </Scroll>
        </Horizontal>
    )
}