import { CurrentSong } from "@/components/Player/type";

export type banner = {
  imageUrl: string;
};

export type Singer = {
  id?: number;
  picUrl?: string;
  name?: string;
  playCount: number;
};

export type CurrentAlbum = {
  creator: {
    avatarUrl: string;
    nickname: string;
  };
  coverImgUrl: string;
  subscribedCount: number;
  name: string;
  tracks:CurrentSong[]
};
