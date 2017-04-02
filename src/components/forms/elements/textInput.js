import React from 'react';

const styles = {
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
  }
};

export default ({ input, ...inputProps }) => {
  console.log(inputProps);
  return (
    <div>
      <input
        {...inputProps}
        onChange={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        style={[styles.input]}
        type="input"
      />
      {
        (inputProps.meta.invalid && inputProps.meta.touched) ?
          <div style={ { color: 'red' } }>{inputProps.meta.error}</div> : null
      }
    </div>
  );
}