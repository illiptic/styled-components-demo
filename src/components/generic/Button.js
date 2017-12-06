import React from 'react';
import styled from 'styled-components';
import {theme, gradient} from '../../utils.js'

const Button = styled.button`
  min-width: 30px;
  height: 26px;
  border-color: ${({primary, theme}) => primary ? theme.colors.contrast : theme.colors.main};
  color: ${({primary, theme}) => primary ? theme.colors.contrast : theme.colors.main};

  ${({primary, theme}) => gradient(primary ? theme.colors.primaryGradient : theme.colors.gradient)}

  &:focus {
    box-shadow: 0px 0px 1px black;
    outline: none;
  }

  &:active {
    ${gradient({start: '#bbbbbb', end: '#666666'})}
  }
`;

export default Button
