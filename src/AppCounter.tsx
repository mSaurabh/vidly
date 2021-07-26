import React, { Component } from "react";
import "./App.css";
import { iCounter } from "./components/components.schema";
import Counters from "./components/counters";
import NavBar from "./components/navbar-old";

export interface AppCounterProps {}

export interface AppCounterState {
  counters: iCounter[];
}

class AppCounter extends React.Component<AppCounterProps, AppCounterState> {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ] as iCounter[],
  };

  //NOTE Constructor is called only once
  //NOTE In constructor you can set the state directly instead of calling setState(this call will give an error in constructor)
  //ANCHOR You should not update state directly because the old virtual DOM is compared with new virtual DOM
  //      and then React will check which components have changed will update the real DOM.
  constructor(props: any) {
    super(props);
    console.log("App - Constructor ", JSON.stringify(props));

    //NOTE: This will update the state
    //this.state.counters = [{ id: 1, value: 2 }];

    //this.setState({ counters: [{ id: 1, value: 2 }] });
  }

  //NOTE componentDidMount() called after the render method
  componentDidMount() {
    console.log("App-Mounted");
  }

  handleDelete = (counterId: number) => {
    console.log("Counter called ", counterId);
    const counters = this.state.counters.filter((x) => x.id !== counterId);
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c: iCounter) => {
      return { ...c, value: 0 };
    });
    this.setState({ counters });
  };

  handleIncrement = (counter: iCounter) => {
    //console.log("Counter called ", JSON.stringify(counter));
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);

    counters[index].value++;
    this.setState({ counters });
  };

  handleDecrement = (counter: iCounter) => {
    //console.log("Counter called ", JSON.stringify(counter));
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);

    counters[index].value--;

    this.setState({ counters });
  };
  render() {
    console.log("App-Rendered");
    return (
      <>
        <NavBar
          totalCounters={this.state.counters.filter((c) => c.value > 0).length}
        />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
          />
        </main>
      </>
    );
  }
}

export default AppCounter;
