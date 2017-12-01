import React from 'react';
import styled from 'styled-components';
import {theme} from '../utils.js'

import path from '../../assets/cubeforce.png';

const Logo = styled.span`
	display: inline-block;
	background-image: url(${path});
  width: 64px;
  height: 64px;
  background-size: contain;
  background-repeat: no-repeat;
`;

export default Logo
