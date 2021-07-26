import * as React from "react";
import Joi from "joi";
import Form from "./common/form";
import { getMovie, saveMovie } from "services/fakeMovieService";
import { getGenres } from "services/fakeGenreService";
import { iMovie } from "./movies.schema";
import { iGenre } from "../services/fakeGenreService";

export interface MovieFormProps {
  schemaObject: any;
  history: any;
  match: any;
}

export interface MovieFormState {}

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [] as iGenre[],
    errors: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
  };

  constructor(props: MovieFormProps) {
    super(props);
  }

  schemaObject: { [key: string]: any } = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).max(100).label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).label("Rate"),
  };

  schema = Joi.object(this.schemaObject);

  handleDDChange = (selectedItem: any) => {
    const genreId = selectedItem.currentTarget.value;
    const data = { ...this.state.data, genreId };
    this.setState({ data });
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id
      ? this.props.match.params.id
      : "new";
    if (movieId === "new") return;

    const movie: iMovie | undefined = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie: iMovie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    const { data: movie } = this.state;
    console.log("Saving Movie ", movie);
    saveMovie(movie);

    this.props.history.push("/movies");
  };

  render() {
    const { genres } = this.state;
    return (
      <div className="container">
        <h1>Movie Form</h1>
        <form
          onSubmit={(event: any) => {
            this.handleSubmit(event);
            this.doSubmit();
          }}
        >
          {this.renderInput("title", "Title", "text", true)}
          {this.renderSelect("genreId", "Genre", genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
