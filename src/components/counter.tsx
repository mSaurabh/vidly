import React, { Component } from "react";
import { iCounter } from "./components.schema";

export interface CounterProps {
  onIncrement: Function;
  onDecrement: Function;
  onDelete: Function;
  counter: iCounter;
}

export interface CounterState {}

/**
 * @author Saurabh_M
 * @description Class component to render a counter.
 * @param key Key associated with the counter (unique)
 * @param counter Counter Data to be rendered.
 * @param onIncrement handle the increment event associated with the counter.
 * @param onDecrement handle the decrement event associated with the counter.
 * @param onDelete handle the deletion of counter.
 * @example <Counter key={} counter={} onIncrement={} onDelete={} />
 */
class Counter extends Component<CounterProps, CounterState> {
  //NOTE: if the arrow function doesn't work, then bind the method using
  //        1. Constructor approach or
  //        2. bind the "this" keyword to the method explicitly ex: this.handleIncrement.bind(this)

  //   constructor(props: any) {
  //     super(props);
  //     this.handleIncrement = this.handleIncrement.bind(this);
  //     console.log("Constructor", this);
  //   }

  //ANCHOR Arrow functions DO NOT rebind "this" keyword they inherit it.
  handleIncrement = () => {
    this.setState({ value: this.props.counter.value + 1 });
  };

  render() {
    const { onIncrement, onDecrement, onDelete, counter } = this.props;

    return (
      <div className="row justify-content-left">
        <div className="col-1">
          <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        </div>
        <div className="col justify-content-left">
          <button
            onClick={() => onIncrement(counter)}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>
          <button
            onClick={() => onDecrement(counter)}
            className="btn btn-secondary btn-sm m-2"
            disabled={counter.value === 0 ? true : false}
          >
            -
          </button>
          <button
            onClick={() => onDelete(counter.id)}
            className="btn btn-danger btn-sm"
          >
            X
          </button>
        </div>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 bg-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value: count } = this.props.counter;
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
