import React, {Component} from 'react';

import {Header, Title, Logo, OptionsMenu} from './HeaderStyles.js'

import ThemeSelectorContainer from '../ThemeSelectorContainer.js'

class HeaderContainer extends Component {
		render () {
			let {setTheme, theme} = this.props

			return (
				<Header>
					<Logo />
					<Title>Organised Components</Title>
					<OptionsMenu>
						<ThemeSelectorContainer onChange={setTheme} value={theme}/>
					</OptionsMenu>
				</Header>
			)
		}
}

export default HeaderContainer
