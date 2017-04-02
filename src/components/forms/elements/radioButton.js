import React from 'react';


export default ({ input, ...inputProps }) => {
  console.log(inputProps, input);
  return (
    <div>
      <input
        {...inputProps}
        onChange={input.onChange}
        value={inputProps.value}
        name={inputProps.value}
        type="radio"
        checked={ input.value === inputProps.value }
      />{inputProps.label}
    </div>
  );
}