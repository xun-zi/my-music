import { axiosInstance } from "./config";
import { banner, CurrentAlbum } from "./type";
import { Singer } from "./type";
export const getBannerRequest = () => {
  return axiosInstance.get("/banner") as Promise<{ banners: banner[] }>;
};

export const getRecommendListRequest = () => {
  return axiosInstance.get("/personalized") as Promise<{ result: Singer[] }>;
};

export const getAlbumDetailRequest = (id: string | number) => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
};

export const getHotSingerListRequest = (count: number | string = 0) => {
  return axiosInstance.get(`/top/artists?offset=${count}`) as Promise<{
    artists: Singer[];
  }>;
};

export const getSingerListRequest = (
  category: string,
  alpha: string,
  count: number
) => {
  const [area, type] = category.split(" ");
  return axiosInstance.get(
    `/artist/list?area=${area}&type=${type}&initial=${alpha.toLowerCase()}&offset=${count}`
  );
};

export const getSingerInfoRequest = (id: number | string) => {
  return axiosInstance.get(`/artists?id=${id}`);
};

export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`);
};

export const getLyricsRequest = (id: number) => {
  return axiosInstance.get(`/lyric?id=${id}`);
};

export const getSongDetailRequest = (id: number) => {
  return axiosInstance.get(`/song/detail?ids=${id}`);
};

export const getHotKeyWordsRequest = () => {
  return axiosInstance.get(`/search/hot`);
};

export const getSuggestListRequest = (query: string) => {
  return axiosInstance.get(`/search/suggest?keywords=${query}`);
};

export const getResultSongsListRequest = (query: string) => {
  return axiosInstance.get(`/search?keywords=${query}`);
};

//歌手种类
export const categoryTypes = [
  {
    name: "华语男",
    key: "7 1",
  },
  {
    name: "华语女",
    key: "7 2",
  },
  {
    name: "华语组合",
    key: "7 3",
  },
  {
    name: "欧美男",
    key: "96 1",
  },
  {
    name: "欧美女",
    key: "96 2",
  },
  {
    name: "欧美组合",
    key: "96 3",
  },
  {
    name: "日本男",
    key: "8 1",
  },
  {
    name: "日本女",
    key: "8 2",
  },
  {
    name: "日本组合",
    key: "8 3",
  },
  {
    name: "韩国男",
    key: "16 1",
  },
  {
    name: "韩国女",
    key: "16 2",
  },
  {
    name: "韩国组合",
    key: "16 3",
  },
  {
    name: "其他男歌手",
    key: "0 1",
  },
  {
    name: "其他女歌手",
    key: "0 2",
  },
  {
    name: "其他组合",
    key: "0 3",
  },
];

//歌手首字母
export const alphaTypes = [
  {
    key: "A",
    name: "A",
  },
  {
    key: "B",
    name: "B",
  },
  {
    key: "C",
    name: "C",
  },
  {
    key: "D",
    name: "D",
  },
  {
    key: "E",
    name: "E",
  },
  {
    key: "F",
    name: "F",
  },
  {
    key: "G",
    name: "G",
  },
  {
    key: "H",
    name: "H",
  },
  {
    key: "I",
    name: "I",
  },
  {
    key: "J",
    name: "J",
  },
  {
    key: "K",
    name: "K",
  },
  {
    key: "L",
    name: "L",
  },
  {
    key: "M",
    name: "M",
  },
  {
    key: "N",
    name: "N",
  },
  {
    key: "O",
    name: "O",
  },
  {
    key: "P",
    name: "P",
  },
  {
    key: "Q",
    name: "Q",
  },
  {
    key: "R",
    name: "R",
  },
  {
    key: "S",
    name: "S",
  },
  {
    key: "T",
    name: "T",
  },
  {
    key: "U",
    name: "U",
  },
  {
    key: "V",
    name: "V",
  },
  {
    key: "W",
    name: "W",
  },
  {
    key: "X",
    name: "X",
  },
  {
    key: "Y",
    name: "Y",
  },
  {
    key: "Z",
    name: "Z",
  },
];

//排行榜编号
export const RankTypes = {
  "0": "云音乐新歌榜",
  "1": "云音乐热歌榜",
  "2": "网易原创歌曲榜",
  "3": "云音乐飙升榜",
  "4": "云音乐国电榜",
  "5": "UK排行榜周榜",
  "6": "美国Billboard周榜",
  "7": "KTV唛榜",
  "8": "iTunes榜",
  "9": "Hit FM Top榜",
  "10": "日本Oricon周榜",
  "11": "韩国Melon排行榜周榜",
  "12": "韩国Mnet排行榜周榜",
  "13": "韩国Melon原声周榜",
  "14": "中国TOP排行榜（港台榜）",
  "15": "中国TOP排行榜（内地榜）",
  "16": "香港电台中文歌曲龙虎榜",
  "17": "华语金曲榜",
  "18": "中国嘻哈榜",
  "19": "法国 NRJ Vos Hits 周榜",
  "20": "台湾Hito排行榜",
  "21": "Beatport全球电子舞曲榜",
  "22": "云音乐ACG音乐榜",
  "23": "江小白YOLO云音乐说唱榜",
};

//歌单一页限定歌曲数量
export const ONE_PAGE_COUNT = 50;

//顶部的高度
export const HEADER_HEIGHT = 45;

//播放模式
export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2,
};
