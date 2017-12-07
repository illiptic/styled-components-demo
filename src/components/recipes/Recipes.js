import React, {Component} from 'react';
import {ThemeProvider} from 'styled-components';

import TilesContainer from '../TilesContainer.js'
import RecipeContainer from './RecipeContainer.js'


class Recipes extends Component{
  constructor (props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount () {
    this.getRecipes()
  }

  getRecipes () {
    this.setState({
      recipes: [
        {title:'PB&J', time: '5 min', ingredients:['Toast: 2 slices', 'Peanut Butter', 'Jam'], instructions:['Lay first slice of toast on the table', 'spread peanut butter with a knife', 'spread jam on top', 'place second slice of toast on top', 'voilà!'] }
      ]
    })
  }

  render() {
    let {recipes} = this.state

    return (
      <TilesContainer>
        {recipes.map((recipe, i) => (<RecipeContainer key={i} {...recipe}/>))}
      </TilesContainer>
    )
  }
}

export default Recipes;
