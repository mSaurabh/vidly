import * as React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

export interface TableProps {
  columns: any[];
  sortColumn: any;
  onSort: Function;
  data: any[];
}

const Table = ({ data, columns, onSort, sortColumn }: TableProps) => {
  return (
    <table className="table m-2">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
