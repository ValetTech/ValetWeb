import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementByAmount, reset } from './counterSlice';

function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const [incrementAmount, setIncrementAmount] = useState('0');

  const addValue = Number(incrementAmount) || 0;

  const resetAll = () => {
    dispatch(reset());
    setIncrementAmount('0');
  };

  return (
    <section>
      <p>{count}</p>
      <div>
        <button type="button" onClick={() => dispatch(increment())}>
          +
        </button>
        <button type="button" onClick={() => dispatch(decrement())}>
          -
        </button>
      </div>
      <input
        type="text"
        value={incrementAmount}
        onChange={(e) => setIncrementAmount(e.target.value)}
      />
      <div>
        <button
          type="button"
          onClick={() => dispatch(incrementByAmount(addValue))}
        >
          Add Amount
        </button>
        <button type="button" onClick={resetAll}>
          Reset
        </button>
      </div>
    </section>
  );
}

export default Counter;
