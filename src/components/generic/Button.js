import React from 'react';
import styled from 'styled-components';
import {theme} from '../utils.js'

const Button = styled.button`
  min-width: 30px;
  border-color: ${({primary, theme}) => primary ? theme.colors.primary : theme.colors.main};
  color: ${({primary, theme}) => primary ? theme.colors.primary : theme.colors.main};
`;

export default Button
