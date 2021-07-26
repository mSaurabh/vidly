import _ from "lodash";

export function paginate(items: any[], pageNumber: number, pageSize: number) {
  //console.log("in Paginate");
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
