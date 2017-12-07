import React, {Component} from 'react';

import {Recipe, Title, Ingredients, Ingredient, Instructions} from './RecipeStyles.js'

class RecipeContainer extends Component {
	render () {
		let {title, ingredients, instructions, time} = this.props

		return (
			<Recipe>
				<Title>{title}</Title>
				<div>{time}</div>
				<Ingredients>
					{ingredients.map((ingredient, i) => (<Ingredient key={i}>{ingredient}</Ingredient>))}
				</Ingredients>
				<div>
					{instructions.map((instruction, i) => (<p key={i}>{instruction}</p>))}
				</div>
			</Recipe>
		)
	}
}

export default RecipeContainer
