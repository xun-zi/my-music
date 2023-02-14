export const getCount = (count: number) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + "万";
  } else {
    return Math.floor(count / 10000000) / 10 + "亿";
  }
};

export const getName = (list: { name: string }[]) => {
  let str = "";
  list.map((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

export const getSongUrl = (id: number | string) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};

export const isEmptyObject = (obj: Object) =>
  !obj || Object.keys(obj).length === 0;

// 处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = (rankList: any[]) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return [rankList.slice(0, i + 1), rankList.slice(i + 1)];
    }
  }
  return []
};

export const formatPlayTime = (interval: number) => {
  interval = interval | 0;
  let mintue = ((interval / 60) | 0).toString().padStart(2, "0");
  let second = (interval % 60).toString().padStart(2, "0");
  return `${mintue}:${second}`;
};
