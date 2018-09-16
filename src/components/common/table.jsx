import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = props => {
  const { data, columns, sortedColumn, onSort } = props;

  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortedColumn={sortedColumn}
        onSort={onSort}
      />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
