import React, { Component } from "react";

export interface NavBarProps {
  totalCounters: number;
}

//NOTE: Since this component doesn't have any state and functions to calculate data or anything,
//      we converted it to a stateless Functional Component.
//NOTE: You cannot access lifecycle hooks in Stateless Functional Components

//ANCHOR NavBar:Stateless Functional Component
/**
 * @author Saurabh_M
 * @param totalCounters - total number of counters with value > 0
 * @returns React Element with NavBar and number of non zero counters.
 * @example
 * <NavBar totalCounters={} />
 */
const NavBar = (props: NavBarProps) => {
  const { totalCounters } = props;
  console.log("Navbar - Rendered");
  return (
    <nav className="navbar navbar-expand-large navbar-light bg-light m-1">
      <a className="navbar-brand" href="#">
        Navbar
        <span className="badge rounded-pill bg-secondary m-1">
          {totalCounters}
        </span>
      </a>
    </nav>
  );
};

export default NavBar;
