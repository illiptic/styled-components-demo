import React from 'react';
import styled from 'styled-components';
import {theme} from '../utils.js'

const ThemeSelector = styled.select`
	width: 200px;
	min-height: 100%;
  border-color: ${theme('colors.main')};
`;

export default ThemeSelector
