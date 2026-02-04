
export interface MovieItem {
  id: string;
  title: string;
  poster: string;
  rating: number | string;
  year: string;
  type: 'movie' | 'tv';
  genre: string;
  detailPath: string;
}

export interface Episode {
  id: string;
  title: string;
  episodeNumber: string;
  playerUrl: string;
}

export interface MovieDetail extends MovieItem {
  description: string;
  playerUrl?: string;
  episodes?: Episode[];
  related?: MovieItem[];
}

export interface ApiResponse {
  success: boolean;
  items: MovieItem[];
  page: number;
  hasMore: boolean;
}

export enum Category {
  TRENDING = 'trending',
  INDO_MOVIES = 'indonesian-movies',
  INDO_DRAMA = 'indonesian-drama',
  KDRAMA = 'kdrama',
  SHORT_TV = 'short-tv',
  ANIME = 'anime'
}

export const CATEGORY_LABELS: Record<Category, string> = {
  [Category.TRENDING]: 'Trending Now',
  [Category.INDO_MOVIES]: 'Indonesian Movies',
  [Category.INDO_DRAMA]: 'Indo Drama',
  [Category.KDRAMA]: 'K-Drama',
  [Category.SHORT_TV]: 'Short TV',
  [Category.ANIME]: 'Anime'
};
