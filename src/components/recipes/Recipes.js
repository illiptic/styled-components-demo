import React, {Component} from 'react';
import {ThemeProvider} from 'styled-components';

import TilesContainer from '../TilesContainer.js'
import Recipe from './Recipe.js'


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
        {
          title:'PB&J',
          time: '5 min',
          defaultServings: 2,
          ingredients:[
            {name: 'Toast', quantity: 2, unit: 'slices'},
            {name: 'Peanut Butter', quantity: 1, unit: 'tablespoon'},
            {name: 'Jam', quantity: 1, unit: 'tablespoon'}
          ],
          instructions:[
            'Lay first slice of toast on the table',
            'spread peanut butter with a knife',
            'spread jam on top',
            'place second slice of toast on top',
            'voilà!'
          ]
        },
        {
          title:'Cereal',
          time: '2 min',
          ingredients:[
            {name: 'cereal', quantity: 2, unit: 'cups'},
            {name: 'milk', quantity: 1, unit: 'dl'}
          ],
          instructions:[
            'Pour cereal in a bowl',
            'pour milk on top',
            'voilà!'
          ]
        }
      ]
    })
  }

  render() {
    let {recipes} = this.state

    return (
      <TilesContainer>
        {recipes.map((recipe, i) => (<Recipe key={i} {...recipe}/>))}
      </TilesContainer>
    )
  }
}

export default Recipes;
