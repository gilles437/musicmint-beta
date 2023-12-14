export interface Album {
  id: string;
  albumid: number;
  maxsupply: number;
  from: string;
  to: string;
  price: string;
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
  timestamp?: string;
}

export interface Song {
  id: string;
  albumid: number;
  songid: number;
  maxsupply: number;
  from: string;
  to: string;
  price: string;
  uri: string;
  timestamp: string;
}

export interface SongMetadata {
  title: string;
  price: string;
  image: string;
  sound: string;
};
