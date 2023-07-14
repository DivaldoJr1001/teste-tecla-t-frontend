export interface Movie {
  _id: string,
  adult: boolean,
  backdrop_path: string,
  genres: string[],
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  likes_count: number
}

export const movieStub = (): Movie => ({
  _id: '',
  adult: false,
  backdrop_path: '',
  genres: [],
  original_language: '',
  original_title: '',
  overview: '',
  popularity: 0,
  poster_path: '',
  release_date: '',
  title: '',
  video: false,
  likes_count: 0
});
