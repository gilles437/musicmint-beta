export interface Album {
  id: string;
  albumid: string;
  maxsupply: number;
  from: string;
  to: string;
  contract: string;
  uri: string;
  timestamp: string;
}

export interface AlbumMetadata {
  name?: string;
  title: string;
  image: string;
  description: string;
  price: string;
  timestamp: string;
}

export interface Song {
  id: string;
  albumid: string;
  songid: string;
  maxsupply: number;
  from: string;
  to: string;
  uri: string;
  timestamp: string;
}

export interface SongMetadata {
  title: string;
  price: string;
  image: string;
  sound: string;
};
