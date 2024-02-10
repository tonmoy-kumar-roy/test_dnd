import { Draggable } from "react-beautiful-dnd";
import { ListItem } from "@mui/material";
import { DraggableListItemProps } from "../interfaces/interface";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

const DraggableListItem = ({
  item,
  index,
  setFields,
  handleRemoveField,
}: DraggableListItemProps) => {
  const [itemData, setItemData] = useState(item);
  return (
    <Draggable draggableId={`${item.Name}-${index}`} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            backgroundColor: snapshot.isDragging
              ? "hsla(0, 80%, 80%, 0.2)"
              : "inherit",
            boxShadow: snapshot.isDragging ? "2px 5px 5px gray" : "inherit",
            borderRadius: "0.2rem",
            ...provided.draggableProps.style,
          }}
        >
          <Stack
            key={index}
            direction="row"
            spacing={2}
            sx={{ mt: 4, alignItems: "center" }}
          >
            <DragIndicatorIcon />
            <TextField
              label={"Field Name"}
              fullWidth
              value={itemData?.Name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                setItemData((prevFields) => {
                  const newFields = { ...prevFields };
                  newFields.Name = value;
                  return newFields;
                });
              }}
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                setFields((prevFields) => {
                  const newFields = [...prevFields];
                  newFields[index] = {
                    ...newFields[index],
                    Name: value,
                  };
                  return newFields;
                });
              }}
            />

            <FormControl fullWidth>
              <InputLabel id="field-type"> Type</InputLabel>
              <Select
                id="field-type"
                label="Field"
                value={item.Type}
                onChange={(e) => {
                  const value = e.target.value;
                  setFields((prevFields) => {
                    const newFields = [...prevFields];
                    newFields[index] = {
                      ...newFields[index],
                      Type: value,
                    };
                    return newFields;
                  });
                }}
              >
                <MenuItem value={"text"}>Text</MenuItem>
                <MenuItem value={"number"}>Number</MenuItem>
                <MenuItem value={"date"}>Date</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              color="error"
              sx={{
                px: 4,
                borderRadius: 1,
              }}
              href=""
              onClick={handleRemoveField(index)}
            >
              Remove
            </Button>
          </Stack>
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
