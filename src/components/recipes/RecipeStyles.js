import React from 'react';
import styled from 'styled-components';
import {theme} from '../../utils.js'

export const Recipe = styled.div`
	padding: 5px;
  background-color: ${theme('colors.background-highlight')};
`;

export const Title = styled.div`
	font-weight: bold;
	margin-bottom: 2px;
`

export const Ingredients = styled.ul`
	margin: 5px 0;
`

export const Ingredient = styled.li`

	& .name {
		display: inline-block;
		width: 100px;
		margin-right: 5px;
	}

	& .quantity {
		color: ${theme('colors.main')}
	}
`
