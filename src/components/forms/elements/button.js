import React, { Component } from 'react';
import styled from 'styled-components';

export const Button = styled.button`
  background: red;
`;

export default ({ onClick, children }) => <Button onClick={ onClick }>{children}</Button>;