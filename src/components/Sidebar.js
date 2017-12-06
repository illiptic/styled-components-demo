import React from 'react';
import styled from 'styled-components';
import {theme} from '../utils.js'

const Sidebar = styled.div`
	width: 200px;
	min-height: 400px;
	padding: 10px 20px;
  background-color: ${theme('colors.background-highlight')};
	border: 1px solid black;
	float: left;
`;

export default Sidebar
