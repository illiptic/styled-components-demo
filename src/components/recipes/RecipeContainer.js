import React, {Component} from 'react';

import {Recipe, Title, Ingredients, Ingredient, Instructions} from './RecipeStyles.js'

class RecipeContainer extends Component {
	onChangeServings (e) {
		let {changeServings} = this.props
		changeServings(e.target.value)
	}

	render () {
		let {title, ingredients, instructions, time, servings} = this.props

		return (
			<Recipe>
				<Title>{title}</Title>
				<div>{time}</div>
				<div>Serving
					<input type="number" min="1" max="1000" value={servings} onChange={this.onChangeServings.bind(this)}/>
				</div>
				<Ingredients>
					{ingredients.map((ingredient, i) => (
						<Ingredient key={i} servings={servings}>
							<span className="name">{ingredient.name}</span>
							<span className="quantity">{ingredient.quantity * servings} {ingredient.unit}</span>
						</Ingredient>
					))}
				</Ingredients>
				<div>
					{instructions.map((instruction, i) => (<p key={i}>{instruction}</p>))}
				</div>
			</Recipe>
		)
	}
}

export default RecipeContainer
