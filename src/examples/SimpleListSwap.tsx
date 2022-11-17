import DraggableList from '../lib/DraggableList';

interface DemoType {
  id: string;
  displayName: string;
}

const demoItems: DemoType[] = [
  { displayName: 'test 1', id: 'test1' },
  { displayName: 'test 2', id: 'test2' },
  { displayName: 'test 3', id: 'test3' },
  { displayName: 'test 4', id: 'test4' },
  { displayName: 'test 5', id: 'test5' },
  { displayName: 'test 6', id: 'test6' },
  { displayName: 'test 7', id: 'test7' }
];

const SimpleListSwap: React.FC = () => {
  return (
    <div>
      <h1>Demo for draggable list</h1>
      <DraggableList items={demoItems} labelKey="displayName" />
    </div>
  );
};

export default {
  id: 'simple-list-swap',
  displayName: 'Simple list swap',
  Component: SimpleListSwap
};
