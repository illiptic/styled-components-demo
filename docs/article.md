# Organised components
Organising React styled-components

## Why use styled-components?
There are already many good [articles][a1] and [videos] about this.

The short answer is that CSS was designed for documents, what the “old web” was expected to contain. The emergence of pre-processors like SASS or LESS shows that the community needs more than what CSS offers. With web-apps getting more and more complex over time, CSS’ limitations are getting really visible and difficult to palliate.

Styled-components leverages the power of a complete programming language – javascript – and its scoping capabilities to help structure the code into components. This helps to avoid the common pitfalls of writing and maintaining CSS for large projects. A developer can describe a Components’ style with no risk of side-effects.

## What’s the problem?
One advantage in using CSS is that the style is completely decoupled from the code. This means that developers and designers can work in parallel without stepping (too much) onto each other’s toes.

Styled components make it easier to fall in the trap of strongly coupling style and logic. Max Stoiber explains how to avoid this, and the styled-components documentation also presents this decoupled structure. While the idea of separating logic and presentation is definitely not new, one might be tempted to take shortcuts when developing React components. It’s easy to create a Component for a validation button that handles the click action as well as the button’s style. It takes a bit more code to split it in two Components.

## The Container/Presentational architecture
This is a pretty simple principle. Components either define styles, or they manage data and logic. A very important aspect of presentation components is that they should never have any dependencies. They receive props and render dom (or children) accordingly.
Containers on the other hand know about the data architecture (state, redux, flux, etc…), but should never concern themselves with display. Dan Abramov’s [article][dan] is a very good and detailed explanation of this architecture.


## Remembering SMACSS
The Scalable and Modular Architecture for CSS(https://smacss.com) is a style-guide for organising CSS, but the basic concept is one that is almost automatically followed by styled-components. The idea is to separate CSS into five categories:
Base
Layout
Module
State
Theme

Base contains all the general rules. Layout’s purpose it to define the structural properties, as well as various sections of content (header, footer, sidebar, content, for instance).
Module contains subcategories for the various logical blocks of the UI. State defines modifier classes to indicate elements’ states, like a field in error, or a disabled button. Finally theme contains color, font, and other cosmetic aspects that might be modifiable or dependent on user preference.

## Bring them together for a solution
So what does a React app look like with clearly split components? It’s important to keep them together, for an easier navigation experience. We don’t want to organise them by type (presentation vs logic), but rather by functionality.

Thus, we’ll have a “general” folder for all the generic components (buttons and such). This will exclusively contain presentation components. The others should be organised depending on the project and its functionalities. If we have user management features, we should put all the components specific to that feature in a “users” folder, for instance.

To apply styled-components Container/Presentation architecture to a SMACSS approach, we need an extra type of component: Structural. We thus have three kinds of components; styled, structural, and logic. Since styled-components decorate a tag (or component), we need this third component to structure the dom. In some cases it might be possible to allow a logic component to handle the structure of sub-components, but when the dom structure becomes complex and is required for visual purposes, it’s best to separate them. A good example is a table, where the dom typically gets quite verbose.

## Example project
So what does a project look like in practice? Let’s build a small app that displays recipes. We can start building a Recipes component. The parent component will be a controller. It will handle the state, in this case the list of recipes. It will also call an API function to fetch the data.

```javascript
  class Recipes extends Component{
    constructor (props) {
      super(props);
      this.state = {
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

    render() {
      let {recipes} = this.state

      return (
        <RecipesContainer recipes={recipes} />
      )
    }
  }
```

It will render the list of recipes, but it doesn’t (and shouldn’t) need to know how. So we render another component that gets the list of recipes and outputs dom:

```javascript
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
```

Here actually, we’re making a tile grid. It might me a good idea to make the actual tile layout a generic component. So if we extract that, we get a new component that looks like this:

```javascript
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
```

TilesStyles.js:

```javascript
export const Tiles = styled.div`
	padding: 20px 10px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`

export const Tile = styled.div`
	flex: 1 1 auto;
	...
	display: flex;

	& > div {
		flex: 1 0 auto;
	}
`
```

Notice that this component is purely presentational. It defines its style, and wraps whatever children it receives inside another styled dom element that defines what tiles look like. It’s a good example of what your generic presentational components will look like architecturally.

Then we need to define what a recipe looks like. We need a container component to describe the relatively complex dom, as well as define the style when necessary. We end up with this

```javascript
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
```

Notice here that the container does some dom generation, but it’s the only logic it contains. Remember that you can define nested styles, so you don’t need to make a styled element for each tag that requires styling. It’s what we do here for the name and quantity of the ingredient item. Of course, we could split it further and create a new component for an ingredient. That is up to you –depending on the project complexity – to determine the granularity. In this case, it is just a styled-component defined along with the rest in the RecipeStyles file:

```javascript
export const Recipe = styled.div`
  background-color: ${theme('colors.background-highlight')};
`;

export const Title = styled.div`
	font-weight: bold;
`

export const Ingredients = styled.ul`
	margin: 5px 0;
`

export const Ingredient = styled.li`
	& .name {
		...
	}

	& .quantity {
		...
	}
`
```



## Pros
One really neat feature of styled-components is that you can use it as little as you want. You can use your favorite UI framework and add styled-components on top of it. It also means to you can easily migrate an existing project component by component.

## Cons
Designers / style integrators will need to learn to navigate the project structure. If they are used to looking for css files (or sass/less), here they will need to follow the actual components. They will also need to change their tools a bit, if they want syntax highlighting, for instance.
It’s not all bad though! It might make some want to delve further into programming!

[a1]: https://medium.com/drivetribe-engineering/why-were-slowly-migrating-to-styled-components-2f284d4b5d95
[videos]: https://www.styled-components.com/docs/basics#motivation
[dan]: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
