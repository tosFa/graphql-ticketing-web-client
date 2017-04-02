import React from 'react';
import RadioButton from './radioButton';

export default ({ options, ...props }) => {

  return (
    <div>
      { options.map((option, index) => <RadioButton key={index} {...props } label={ option } value={ option } />) }
      {
        (props.meta.invalid && props.meta.touched) ?
          <div style={ { color: 'red' } }>{props.meta.error}</div> : null
      }
    </div>
  );
}