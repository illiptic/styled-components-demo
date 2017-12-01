import React, {Component} from 'react';

import Header from './Header.js'
import Title from './Title.js'
import Logo from './Logo.js'


class HeaderContainer extends Component {
		render () {
			return (
				<Header>
					<Logo />
					<Title>Organised Components</Title>
				</Header>
			)
		}
}

export default HeaderContainer
