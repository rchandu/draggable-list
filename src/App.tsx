import { useMemo, useState } from 'react';
import './App.css';
import SimpleListSwap from './examples/SimpleListSwap';
import SimpleSwap from './examples/SimpleSwap';

interface ExampleInfo {
  id: string;
  Component: React.FC;
  displayName: string;
}

const ExampleList: ExampleInfo[] = [SimpleSwap, SimpleListSwap];

function App() {
  const [currentExample, setCurrentExample] = useState<ExampleInfo>(SimpleSwap);

  const handleSelectExample = (ev: any) => {
    const selectedId = ev.target.value;
    let selectedExample = ExampleList.find(
      (x) => x.id === selectedId
    ) as ExampleInfo;
    setCurrentExample(selectedExample);
  };

  const CurrentComponent = useMemo(
    () => currentExample?.Component,
    [currentExample]
  );

  return (
    <div className="App">
      <section>
        <label htmlFor="select-example">Select example</label>
        <select
          name="select-example"
          id="select-example"
          placeholder="Select Example"
          value={currentExample?.id}
          onChange={handleSelectExample}
        >
          {ExampleList.map((currExample) => (
            <option key={currExample.id} value={currExample.id}>
              {currExample.displayName}
            </option>
          ))}
        </select>
      </section>
      <section>
        <h1>{currentExample?.displayName ?? ''}</h1>
        <div>{CurrentComponent && <CurrentComponent />}</div>
      </section>
    </div>
  );
}

export default App;
