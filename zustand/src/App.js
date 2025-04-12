import logo from './logo.svg';
import './App.css';
import CountBox from './component/CountBox';
import { useState } from 'react';
import countStore from './store/Store';

function App() {
  // const [count, setCount] = useState(0);
  const {count, increase, decrease, increaseBy, decreaseBy} = countStore();
  return (
    <div className='App'>
      <h1>Count : {count}</h1>
      <button onClick={increase}>1씩 증가</button>
      <button onClick={() => increaseBy(10)}>10씩 증가</button>
      <button onClick={decrease}>1씩 감소</button>
      <button onClick={() => decreaseBy(10)}>10씩 감소</button>
      <CountBox />
    </div>
  );
}

export default App;
