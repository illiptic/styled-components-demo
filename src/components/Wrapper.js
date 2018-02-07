import React from 'react';
import styled from 'styled-components';
import {theme, media} from '../utils.js'

const Wrapper = styled.div`
	min-height: 600px;
  background-color: ${theme('colors.background')};
`;

// ${media.large`background: dodgerblue;`}
// ${media.medium`background: mediumseagreen;`}
// ${media.small`background: palevioletred;`}

export default Wrapper
