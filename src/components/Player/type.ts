export type CurrentSong = {
  id: number;
  dt: number;
  al: {
    picUrl: string;
    name: string;
  };
  name: string;
  ar: { name: string }[];
};
