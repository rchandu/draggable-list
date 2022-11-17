import { useEffect, useMemo, useRef, useState } from 'react';
import { DraggableListProps, ObjectItemType } from './DraggableListProps';
type SwapTarget = { startId?: string; endId?: string };

interface WrappedItem<T = any> {
  id: string;
  item: T;
}

function swapItemsInArray(
  targetArr: WrappedItem[] = [],
  startId: string,
  endId: string
) {
  const startPos = targetArr.findIndex((x) => x.id === startId);
  const endPos = targetArr.findIndex((x) => x.id === endId);
  const len = targetArr.length;
  if (startPos >= 0 && startPos < len - 1 && endPos >= 0 && endPos < len - 1) {
    const newArr = [...targetArr];
    const temp = targetArr[endPos];
    newArr[endPos] = newArr[startPos];
    newArr[startPos] = temp;
    return newArr;
  }
  return targetArr;
}

const wrapItems = (items: any[] = []) =>
  items.map((x, idx) => ({ item: x, id: `${idx}` }));

const getItemLabelFn = (props: DraggableListProps) => {
  if ('labelKey' in props) {
    const labelKey = props.labelKey;
    return (i: ObjectItemType) => i[labelKey] ?? '';
  } else {
    return (i: string) => i;
  }
};

export function DraggableList<T>(props: DraggableListProps) {
  const [orderedItems, setOrderedItems] = useState<WrappedItem[]>([]);
  const swapItemsRef = useRef<SwapTarget | null>();

  useEffect(() => {
    setOrderedItems(wrapItems(props.items));
  }, [props.items]);

  const handleMouseDown = (ev: any) => {
    ev.preventDefault();
    ev.stopPropagation();
    const target = ev.target;
    const startId = target.getAttribute('data-swap-id');
    swapItemsRef.current = { startId };
  };

  const handleMouseUp = (ev: any) => {
    ev.preventDefault();
    ev.stopPropagation();
    const target = ev.target;
    const endId = target.getAttribute('data-swap-id');
    swapItemsRef.current = { ...swapItemsRef.current, endId };
    const { startId } = swapItemsRef.current ?? {};
    if (startId && endId) {
      setOrderedItems([...swapItemsInArray(orderedItems, startId, endId)]);
    }
  };

  const itemLabelGenerator = useMemo(
    () => getItemLabelFn(props),
    [props.items]
  );

  return (
    <ul
      className="dragContainer"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {orderedItems.map((currItem) => (
        <li data-swap-id={currItem.id} key={currItem.id}>
          {itemLabelGenerator(currItem.item)}
        </li>
      ))}
    </ul>
  );
}

export default DraggableList;
