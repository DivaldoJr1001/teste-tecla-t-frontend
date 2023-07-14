export const environment: Env = {
  apiUrl: 'http://localhost:3000',
  imageUrl: 'https://www.themoviedb.org/t/p/w220_and_h330_face/'
};

export interface Env {
  apiUrl: string,
  imageUrl: string
}
