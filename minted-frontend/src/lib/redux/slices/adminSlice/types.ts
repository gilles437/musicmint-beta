export interface SuperAdmin {
  to: string;
  timestamp: string;
}

export interface Artist {
  to: string;
  contract: string;
  timestamp: string;
}

export interface ArtistMetadata {
  name: string;
  description: string;
  image: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
}
