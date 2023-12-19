import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

const CountButton = () => {
    const [count, setCount] = useState(1);

    const increaseQty = () => {
        setCount(count + 1)
      }
    
      const decreaseQty = () =>{
        if(count > 1) {
            setCount(count - 1);
        }
      }
  return (
    <div>
      <Button variant="secondary" onClick={decreaseQty}>
        -
      </Button>
      <input
        style={{
          width: "30px",
          margin: "3px",
          border: "none",
          textAlign: "center",
        }}
        value={count}
        readOnly
      />
      <Button variant="secondary" onClick={increaseQty}>
        +
      </Button>
    </div>
  );
};

export default CountButton;
