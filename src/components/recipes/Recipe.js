import React, {Component} from 'react';
import {ThemeProvider} from 'styled-components';

import RecipeContainer from './RecipeContainer.js'


class Recipe extends Component{
  constructor (props) {
    super(props);
    this.state = {
      servings: props.defaultServings || 1
    };
  }

  changeServings (servings) {
    this.setState({servings})
  }

  render() {
    let {servings} = this.state

    return (
      <RecipeContainer servings={servings} changeServings={this.changeServings.bind(this)} {...this.props}/>
    )
  }
}

export default Recipe;
