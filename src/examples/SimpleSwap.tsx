import DraggableList from '../lib/DraggableList';

const demoItems: string[] = [
  'test 1',
  'test 2',
  'test 3',
  'test 4',
  'test 5',
  'test 6',
  'test 7'
];

const SimpleSwap: React.FC = () => {
  return (
    <div>
      <DraggableList items={demoItems} />
    </div>
  );
};

export default {
  id: 'simple-swap',
  displayName: 'Simple swap',
  Component: SimpleSwap
};
