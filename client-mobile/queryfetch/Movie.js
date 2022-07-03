import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query GetMovies {
  getMovies {
    id
    title
    synopsis
    trailerURL
    imgURL
    rating
    GenreId
    UserMongoId
    Genre {
      id
      name
    }
  }
  getGenre {
    id
    name
  }
}
`


export const MOVIE_DETAIL_BY_ID = gql`
query GetMovieDetail($getMovieDetailId: ID!) {
  getMovieDetail(id: $getMovieDetailId) {
    id
    title
    synopsis
    trailerURL
    imgURL
    UserId
    rating
    GenreId
    UserMongoId
    Genre {
      name
      id
    }
    Casts {
      id
      profilePict
      name
      MovieId
    }
    Author {
      username
    }
  }
}
`



