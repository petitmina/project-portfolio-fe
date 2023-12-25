import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

const CountButton = ({onQtyChange}) => {
    const [count, setCount] = useState(1);

    const increaseQty = () => {
        const newQty = count + 1;
        setCount(newQty);
        onQtyChange(newQty);
      }
    
      const decreaseQty = () =>{
        if(count > 1) {
          const newQty = count -1
            setCount(newQty);
            onQtyChange(newQty)
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
