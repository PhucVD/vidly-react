import React, { Component } from "react";
import _ from "lodash";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTables from "./moviesTable";
import { paginate } from "./utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: 1,
    sortedColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortedColumn => {
    this.setState({ sortedColumn });
  };

  getMovies = () => {
    const {
      movies,
      pageSize,
      currentPage,
      selectedGenre,
      sortedColumn
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? movies.filter(m => m.genre._id === selectedGenre._id)
        : movies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortedColumn.path],
      [sortedColumn.order]
    );

    const pagingMovies = paginate(sortedMovies, pageSize, currentPage);

    return { pagingMovies, itemsCount: filteredMovies.length };
  };

  render() {
    const {
      movies,
      pageSize,
      currentPage,
      selectedGenre,
      sortedColumn
    } = this.state;

    if (movies.length === 0) return <p>There are no movies in the database.</p>;

    const { pagingMovies, itemsCount } = this.getMovies();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {itemsCount} movies in the database.</p>
          <MoviesTables
            movies={pagingMovies}
            sortedColumn={sortedColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={itemsCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
