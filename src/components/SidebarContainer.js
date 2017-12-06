import React, {Component} from 'react';

import Sidebar from './Sidebar.js'
import ThemeSelectorContainer from './ThemeSelectorContainer.js'
import Button from './generic/Button.js'

class SidebarContainer extends Component {
	render () {
		const {setTheme, theme} = this.props

		return (
			<Sidebar>
				<h2>Sidebar</h2>
				<ThemeSelectorContainer onChange={setTheme} value={theme}/>
				<Button>Do nothing</Button>
				<Button primary>Do nothing primarily</Button>
			</Sidebar>
		)
	}
}

export default SidebarContainer
