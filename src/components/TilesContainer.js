import React, {Component} from 'react';

import Tile from './Tile.js'
import Tiles from './Tiles.js'

class TilesContainer extends Component {
	render () {
		let {children} = this.props

		return (
			<Tiles>
				{
					React.Children.map(children, (child, i) => (
						<Tile key={i}>
							{child}
						</Tile>
					))
				}
			</Tiles>
		)
	}
}

export default TilesContainer
