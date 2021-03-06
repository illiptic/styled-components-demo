import React from 'react';
import styled from 'styled-components';

export const Tiles = styled.div`
	padding: 20px 10px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;

export const Tile = styled.div`
	flex: 1 1 auto;
	min-width: 250px;
	padding: 5px;
	margin: 5px;
	box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3);
	display: flex;

	& > div {
		flex: 1 0 auto;
	}
`;
