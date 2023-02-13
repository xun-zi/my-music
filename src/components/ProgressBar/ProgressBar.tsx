import { formatPlayTime } from "@/api/utils";
import { useEffect, useRef, useState } from "react";
import { Wrapper } from "./style";

type Props = {
    duration: number,
    currentTime: number,
    onProgressChange: (time: number) => any
}

export default function (props: Props) {
    const { duration, currentTime, onProgressChange } = props
    const progressBtnRef = useRef<HTMLDivElement | null>(null);
    const progressBarRef = useRef<HTMLDivElement | null>(null);
    const progressWrapperRef = useRef<HTMLDivElement | null>(null);
    // console.log("duration",duration);
    // console.log("currentTime",currentTime)



    //事件
    const TouchData = useRef({
        initiated: false,
        startPos: 0,
        progressW: 0,
    });

    useEffect(() => {
        ProgressChange(progressWrapperRef.current!.clientWidth * currentTime / duration * 1000);
    }, [currentTime])

    const ProgressChange = (num: number) => {
        const progressBar = progressBarRef.current!;
        const progressBtn = progressBtnRef.current!;
        progressBar.style.width = num + 'px';
        progressBtn.style.left = num - 11 + 'px';
    }

    const progressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = progressWrapperRef.current!.getBoundingClientRect();
        const offsetWidth = e.pageX - rect.left;
        ProgressChange(offsetWidth);
        onProgressChange(offsetWidth / progressWrapperRef.current!.clientWidth)
    }

    const progressTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const data: any = {};
        data.initiated = true;
        data.startPos = e.touches[0].pageX;
        data.progressW = +progressBarRef.current!.style.width.slice(0, -2);
        TouchData.current = data;
    }
    
    const progressTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!TouchData.current.initiated) return;
        const offset = e.touches[0].pageX - TouchData.current.startPos;
        const newBarW = TouchData.current.progressW + offset;
        let overAllW = progressWrapperRef.current!.clientWidth;
        if (newBarW > overAllW || newBarW < 0) return;
        ProgressChange(newBarW)
        onProgressChange(newBarW / overAllW)
    }

    const progressTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        TouchData.current.initiated = false;
    }

    return (<Wrapper>
        <span className="curTime">{formatPlayTime(currentTime)}</span>
        <div className="progressWrapper" ref={progressWrapperRef} onClick={progressClick}>
            <div className="progressBar" ref={progressBarRef} ></div>
            <div className="btn"
                ref={progressBtnRef}
                onTouchStart={progressTouchStart}
                onTouchMove={progressTouchMove}
                onTouchEnd={progressTouchEnd}
            />
        </div>
        <span className="duration">{formatPlayTime(duration / 1000)}</span>
    </Wrapper>)
}