import React, {Component} from 'react';
import ThemeSelector from './ThemeSelector.js'

const options = [
	{id: 'default', display: 'Default'},
	{id: 'dark', display: 'Dark'},
	{id: 'light', display: 'Light'}
]

class ThemeSelectorContainer extends Component {
		render () {
			let {onChange, value} = this.props
			return (
				<ThemeSelector value={value} onChange={e => onChange(e.target.value)}>
					{options.map(o => (
						<option key={o.id} value={o.id}>{o.display}</option>
					))}
				</ThemeSelector>
			)
		}
}

export default ThemeSelectorContainer
