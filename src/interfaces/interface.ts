import { MouseEventHandler } from "react";

export interface IDynamicFields {
  Name: string;
  Type: string;
  Value: string;
}

export interface IInterestDynamicFields {
  OrganizationId: string;
  DynamicFields: IDynamicFields[];
}

export interface Item {
  id: string;
  primary: string;
  // secondary: string;
}

export interface DraggableListItemProps {
  item: IDynamicFields;
  index: number;
  setFields: React.Dispatch<React.SetStateAction<IDynamicFields[]>>;
  handleRemoveField: (
    x: number
  ) => MouseEventHandler<HTMLAnchorElement> | undefined;
}
