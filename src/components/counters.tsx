import React, { Component } from "react";
import Counter from "./counter";
import { iCounter } from "./components.schema";

export interface CountersProps {
  onReset: any;
  onIncrement: any;
  onDecrement: any;
  onDelete: any;
  counters: iCounter[];
}

export interface CountersState {}

/**
 * @author Saurabh_M
 * @description Class component to render counters
 * @param counters Counter Data to be rendered.
 * @param onIncrement handle the increment event associated with the counter.
 * @param onDecrement handle the decrement event associated with the counter.
 * @param onDelete handle the deletion of counter.
 * @param onReset handle the resetting of all counter values.
 * @example
 * <Counters counters={} onIncrement={} onDelete={} onReset={} />
 */
class Counters extends Component<CountersProps, CountersState> {
  render() {
    const { onIncrement, onDecrement, onDelete, onReset, counters } =
      this.props;
    return (
      <div>
        <button onClick={onReset} className="btn btn-primary btn-sm m-2">
          Reset
        </button>
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            counter={counter}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }
}

export default Counters;
