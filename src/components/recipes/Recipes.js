import React, {Component} from 'react';
import {ThemeProvider} from 'styled-components';

import {getRecipes} from '../../api'
import RecipesContainer from './RecipesContainer'


class Recipes extends Component{
  constructor (props) {
    super(props);
    this.state = {
      searchFilter: '',
      recipes: []
    };
  }

  componentDidMount () {
    this.loadData()
  }

  loadData () {
    getRecipes().then(recipes => {
      this.setState({recipes})
    })
  }

  change (searchFilter) {
    this.setState({searchFilter})
  }

  render() {
    let {recipes, searchFilter} = this.state

    let filteredRecipes = recipes.filter(r => (!searchFilter || (
      r.title.indexOf(searchFilter) > -1 ||
      r.ingredients.indexOf(searchFilter) > -1 ||
      r.instructions.indexOf(searchFilter) > -1
    )));

    return (
      <div>
        <input onChange={e => this.change(e.target.value)}/>
        <RecipesContainer recipes={filteredRecipes} />
        <div>Showing {filteredRecipes.length} of {recipes.length}</div>
      </div>
    )
  }
}

export default Recipes;
