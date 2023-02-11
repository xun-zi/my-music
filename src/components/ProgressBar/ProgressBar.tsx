import { useEffect, useRef, useState } from "react";
import { Wrapper } from "./style";


export default function () {
    
    const progressBtnRef = useRef<HTMLDivElement | null>(null);
    const progressBarRef = useRef<HTMLDivElement | null>(null);
    const progressWrapperRef = useRef<HTMLDivElement | null>(null);

    const TouchData = useRef({
        initiated: false,
        startPos: 0,
        progressW: 0,
    });

    const ProgressChange = (num: number) => {
        const progressBar = progressBarRef.current!;
        const progressBtn = progressBtnRef.current!;
        progressBar.style.width = num + 'px';
        progressBtn.style.left = num - 11 + 'px';
    }

    return (<Wrapper>
        <span className="curTime">0:00</span>
        <div className="progressWrapper" ref={progressWrapperRef} onClick={
            (e) => {
                const rect = progressWrapperRef.current!.getBoundingClientRect();
                const offsetWidth = e.pageX - rect.left;
                ProgressChange(offsetWidth)
            }
        }>
            <div className="progressBar" ref={progressBarRef} ></div>
            <div className="btn"
                ref={progressBtnRef}
                onTouchStart={(e) => {
                    const data: any = {};
                    data.initiated = true;
                    data.startPos = e.touches[0].pageX;
                    data.progressW = +progressBarRef.current!.style.width.slice(0, -2);
                    TouchData.current = data;
                }}
                onTouchMove={(e) => {
                    if (!TouchData.current.initiated) return;
                    const offset = e.touches[0].pageX - TouchData.current.startPos;
                    const newBarW = TouchData.current.progressW + offset;
                    let overAllW = progressWrapperRef.current!.clientWidth;
                    if (newBarW > overAllW || newBarW < 0) return;
                    ProgressChange(newBarW)
                }}
                onTouchEnd={(e) => {
                    TouchData.current.initiated = false;
                }}
            />
        </div>
        <span className="duration">4:17</span>
    </Wrapper>)
}