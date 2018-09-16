import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    const sortedColumn = { ...this.props.sortedColumn };
    if (sortedColumn.path === path) {
      sortedColumn.order = sortedColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortedColumn.path = path;
      sortedColumn.order = "asc";
    }

    this.props.onSort(sortedColumn);
  };

  renderSortIcon = column => {
    const { sortedColumn } = this.props;
    if (column.path !== sortedColumn.path) return null;
    return <i className={"fa fa-sort-" + sortedColumn.order} />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              key={column.path}
              className={column.label ? "clickable" : ""}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
