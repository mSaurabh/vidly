import React, { Component } from "react";
import _ from "lodash";

export interface TableBodyProps {
  data: any[];
  columns: any[];
}

class TableBody extends Component<TableBodyProps> {
  renderCell = (item: any, column: any) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item: any, column: any) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
