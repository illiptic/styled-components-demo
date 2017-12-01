import React from 'react';
import styled from 'styled-components';
import {theme} from '../utils.js'

const Header = styled.div`
	width: 100%;
	height: 200px;
	text-align: center;
	padding: 10px 20px;
  background-color: ${theme('colors.background-highlight')};
`;

export default Header
