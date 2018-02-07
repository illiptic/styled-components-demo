import React, {Component} from 'react';

import Tiles from '../generic/Tiles'
import Recipe from './Recipe.js'

class RecipesContainer extends Component{
  render() {
    let {recipes} = this.props

    return (
      <Tiles>
        {recipes.map(recipe => (<Recipe key={recipe.id} {...recipe}/>))}
      </Tiles>
    )
  }
}

export default RecipesContainer
