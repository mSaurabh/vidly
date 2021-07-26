import React, { Component } from "react";
import { sortBy } from "../../utils/sorting";

interface iTableColumns {
  path?: string;
  label?: string;
  key?: string;
  content?: any;
}
export interface TableHeaderProps {
  columns: iTableColumns[];
  sortColumn: any;
  onSort: Function;
}

class TableHeader extends Component<TableHeaderProps> {
  raiseSort = (path: any) => {
    const order =
      this.props.sortColumn.order === sortBy.ASC ? sortBy.DESC : sortBy.ASC;
    const sortColumn = { path, order };
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column: iTableColumns) => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;

    return <i className={"m-1 fa fa-sort-" + sortColumn.order} />;
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((column: iTableColumns): any => (
            <th
              className={"clickable"}
              key={column.path ? column.path : column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
