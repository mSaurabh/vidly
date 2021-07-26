import * as React from "react";

/**
 *
 *
 * @export
 * @interface ListGroupProps
 */
export interface ListGroupProps {
  items: any[];
  selectedItem: any;
  textProperty?: string;
  valueProperty?: string;
  onItemSelect: Function;
  style?: React.CSSProperties;
}

/**
 *
 *
 * @param {ListGroupProps} props
 * @return {*}
 */
const ListGroup = (props: ListGroupProps) => {
  const { items, selectedItem, onItemSelect } = props;

  const textProperty = props.textProperty ? props.textProperty : "name";
  const valueProperty = props.valueProperty ? props.valueProperty : "_id";

  return (
    <ul className="list-group" style={props.style}>
      {items.map((item: any) => (
        <li
          className={
            item === selectedItem
              ? "list-group-item d-flex justify-content-between align-items-center active"
              : "list-group-item d-flex justify-content-between align-items-center"
          }
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          style={{ overflow: "hidden" }}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
