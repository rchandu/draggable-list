export type ObjectItemType = Record<string, any>;

export interface DraggableStringList {
  items: string[];
}

export interface DraggableListWithObject<T extends ObjectItemType> {
  items: T[];
  labelKey: keyof T;
}

export type DraggableListProps<T extends ObjectItemType> =
  | DraggableStringList
  | DraggableListWithObject<T>;
