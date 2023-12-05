export interface Album {
  id: string;
  albumid: string;
  songid: string;
  maxsupply: number;
  from: string;
  to: string;
  contract: string;
  uri: string;
  timestamp: string;
  metadata?: AlbumMetadata;
}

export interface AlbumMetadata {
  id?: string;
  name?: string;
  title: string;
  image: string;
  description: string;
  price: string;
  timestamp: string;
}

export interface SongMetadata {
  title: string;
  price: string;
  maxSupply: string;
  image: string;
  sound: string;
};
