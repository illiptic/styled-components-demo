import React from 'react';
import styled from 'styled-components';
import {theme} from '../utils.js'

const ThemeSelector = styled.select`
	width: 200px;
	min-height: 100%;
  border-color: ${theme('colors.main')};
	color: ${theme('colors.main')};

	&:focus {
    box-shadow: 0px 0px 1px black;
    outline: none;
  }
`;

export default ThemeSelector
