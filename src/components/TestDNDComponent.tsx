import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import DraggableListItem from "./DraggableListItem";
// import { memo } from "react";
import { reorder } from "../Utils/function";
import { IDynamicFields } from "../interfaces/interface";
import { MouseEventHandler } from "react";

const TestDNDComponent = ({
  fields,
  setFields,
  handleRemoveField,
}: {
  fields: IDynamicFields[];
  setFields: React.Dispatch<React.SetStateAction<IDynamicFields[]>>;
  handleRemoveField: (
    x: number
  ) => MouseEventHandler<HTMLAnchorElement> | undefined;
}) => {
  // const [items, setItems] = useState([
  //   {
  //     id: "Item_1",
  //     primary: "Incredible Wooden Computer",
  //   },
  //   {
  //     id: "Item_2",
  //     primary: "Awesome Steel Pizza",
  //   },
  //   {
  //     id: "Item_3",
  //     primary: "Refined Metal Pants",
  //   },
  //   {
  //     id: "Item_4",
  //     primary: "Incredible Wooden Sausages",
  //   },
  //   {
  //     id: "Item_5",
  //     primary: "Refined Cotton Salad",
  //   },
  //   {
  //     id: "Item_6",
  //     primary: "Rustic Concrete Cheese",
  //   },
  //   {
  //     id: "Item_7",
  //     primary: "Handmade Metal Fish",
  //   },
  //   {
  //     id: "Item_8",
  //     primary: "Unbranded Cotton Mouse",
  //   },
  //   {
  //     id: "Item_9",
  //     primary: "Ergonomic Frozen Chips",
  //   },
  // ]);

  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    const newItems = reorder(fields, source.index, destination.index);

    setFields(newItems);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {/* {items.map((item, index) => (
                <DraggableListItem item={item} index={index} key={item.id} />
              ))} */}

              {fields.map((field, index) => (
                <DraggableListItem
                  item={field}
                  index={index}
                  key={`${field.Name}-${index}`}
                  setFields={setFields}
                  handleRemoveField={handleRemoveField}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TestDNDComponent;
