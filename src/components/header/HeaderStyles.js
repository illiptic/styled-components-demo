import React from 'react';
import styled from 'styled-components';
import {theme} from '../../utils.js'
import logo from '../../../assets/cubeforce.png'

export const Header = styled.div`
	height: 120px;
	text-align: center;
	padding: 10px 20px;
  background-color: ${theme('colors.background-highlight')};
`;

export const Title = styled.h1`
	font-size: xx-large;
	color: ${theme('colors.primary')};
`;

export const Logo = styled.span`
	display: inline-block;
	background-image: url(${logo});
  width: 64px;
  height: 64px;
  background-size: contain;
  background-repeat: no-repeat;
`;

export const OptionsMenu = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;
`
