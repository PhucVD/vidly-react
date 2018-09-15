import _ from "lodash";

export function paginate(items, pageSize, pageIndex) {
  const startIndex = pageSize * (pageIndex - 1);
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
