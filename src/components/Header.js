import React from 'react';
import styled from 'styled-components';
import {theme} from '../utils.js'

const Header = styled.div`
	height: 120px;
	text-align: center;
	padding: 10px 20px;
  background-color: ${theme('colors.background-highlight')};
`;

export default Header
