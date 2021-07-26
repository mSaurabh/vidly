import React, { Component } from "react";
import _ from "lodash";

import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres, iGenre } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { sortBy } from "../utils/sorting";
import { iMovie } from "./movies.schema";
import { Link } from "react-router-dom";

export interface MoviesProps {
  history: any;
  match: any;
}
export interface MoviesState {}
/**
 *
 *
 * @class Movies
 * @extends {Component}
 */
class Movies extends Component<MoviesProps, MoviesState> {
  state = {
    currentPage: 1,
    genres: [] as iGenre[],
    movies: [] as iMovie[],
    pageSize: 4,
    selectedGenre: {} as iGenre,
    sortColumn: { path: "title", order: sortBy.ASC },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({
      movies: getMovies(),
      genres,
    });
  }

  handleDelete = (movie: iMovie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie: iMovie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre: iGenre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn: any) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      selectedGenre,
      movies: allMovies,
      currentPage,
      pageSize,
      sortColumn,
    } = this.state;

    //NOTE: Step 1: Filter Data
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    //NOTE Step 2: Sort Data
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    //NOTE Step 3: Paginate Data
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  handleNewMovie = () => {
    const { history } = this.props;
    history.push(history.location.pathname + "/new");
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, selectedGenre, genres } =
      this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data } = this.getPageData();

    return (
      <React.Fragment>
        <div className="row m-2">
          <div className="col-2">
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
            <p className="m-2">Showing {totalCount} movies in the database.</p>
            <MoviesTable
              movies={data}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
