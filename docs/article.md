# Organised components
Organising React **styled-components**

> While I focus on **styled-components**, the point is valid for any similar css-in-js library, such as [emotion][emotion] or [a whole list of others][cssinjs]

## Why use **styled-components**?
There are already [many][a3] [good][a2] [articles][a1] [and][v2] [videos][v1] about this.

In brief, CSS was designed for documents, what the “old web” was expected to contain. The emergence of pre-processors like SASS or LESS shows that the community needs more than what CSS offers. With web-apps getting more and more complex over time, CSS’ limitations became increasingly visible and difficult to palliate.

**styled-components** leverages the power of a complete programming language – javascript – and its scoping capabilities to help structure the code into components. This helps to avoid the common pitfalls of writing and maintaining CSS for large projects. A developer can describe a components’ style with no risk of side-effects.

## What’s the problem?
One advantage in using CSS is that the style is completely decoupled from the code. This means that developers and designers can work in parallel without interfering with each other.

On the other hand **styled-components** makes it easier to fall in the trap of strongly coupling style and logic. [Max Stoiber][v3] explains how to avoid this. While the idea of separating logic and presentation is definitely not new, one might be tempted to take shortcuts when developing React components. For example, it’s easy to create a component for a validation button that handles the click action as well as the button’s style. It takes a bit more effort to split it in two components.

## The Container/Presentational architecture
This is a pretty simple principle. Components either define how things look, or they manage data and logic. A very important aspect of presentation components is that they should never have any dependencies. They receive props and render dom (or children) accordingly.
Containers on the other hand know about the data architecture (state, redux, flux, etc.), but should never be responsible for display. [Dan Abramov][dan]’s article is a very good and detailed explanation of this architecture.


## Remembering SMACSS
Although the [Scalable and Modular Architecture for CSS][smacss] is a style-guide for organising CSS, the basic concept is one that is followed, for the most part automatically, by **styled-components**. The idea is to separate CSS into five categories:

* __Base__ contains all the general rules.
* __Layout__’s purpose it to define the structural properties, as well as various sections of content (header, footer, sidebar, content, for instance).
* __Module__ contains subcategories for the various logical blocks of the UI.
* __State__ defines modifier classes to indicate elements’ states, e.g. field in error, disabled button.
* __Theme__ contains color, font, and other cosmetic aspects that may be modifiable or dependent on user preference.

Keeping this separation while using **styled-components** is easy. Projects usually include some kind of CSS normalisation or reset. This typically falls in the __Base__ category. You may also define general font sizing, line sizing, etc. This can be done through normal CSS (or SASS/LESS), or through the _injectGlobal_ function provided by **styled-components**.

For __Layout__ rules, if you use a UI framework, then it will probably define container classes, or a grid system. You can easily use those classes in conjunction with your own rules in the layout components you write.

__Module__ is automatically followed by the architecture of **styled-components**, since the styles are attached to components directly, rather than described in external files. Basically, each styled component that you write will be its own module. You can write your styling code without worrying about side-effects.

__State__ will be rules you define within your components as variable rules. You simply define a function to interpolate values of your CSS attributes. If using a UI framework, you might have useful classes to add to your components as well. You will probably also have CSS pseudo-selector rules (hover, focus, etc.)

The __Theme__ can simply be interpolated within your components. It is a good idea to define your theme as a set of variables to be used throughout your application. You can even derive colors programmatically (using a library, or manually), for instance to handle contrasts and highlights. Remember that you have the full power of a programming language at your disposal!

## Bring them together for a solution
It is important to keep them together, for an easier navigation experience; We don’t want to organise them by type (presentation vs logic), but rather by functionality.

Thus, we will have a folder for all the generic components (buttons and such). The others should be organised depending on the project and its functionalities. For instance, if we have user management features, we should group all the components specific to that feature.

To apply **styled-components**' Container/Presentation architecture to a SMACSS approach, we need an extra type of component: Structural. We end up with three kinds of components; styled, structural, and container. Since **styled-components** decorates a tag (or component), we need this third type of component to structure the dom. In some cases it might be possible to allow a container component to handle the structure of sub-components, but when the dom structure becomes complex and is required for visual purposes, it’s best to separate them. A good example is a table, where the dom typically gets quite verbose.

## Example project
Let’s build a small app that displays recipes, to illustrate these principles. We can start building a Recipes component. The parent component will be a controller. It will handle the state, in this case the list of recipes. It will also call an API function to fetch the data.

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

It will render the list of recipes, but it does not (and should not) need to know how. So we render another component that gets the list of recipes and outputs dom:

```javascript
class RecipesContainer extends Component{
  render() {
    let {recipes} = this.props

    return (
      <TilesContainer>
        {recipes.map(recipe => (<Recipe key={recipe.id} {...recipe}/>))}
      </TilesContainer>
    )
  }
}
```

Here actually, we want to make a tile grid. It may me a good idea to make the actual tile layout a generic component. So if we extract that, we get a new component that looks like this:

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

Then, we need to define what a recipe looks like. We need a container component to describe the relatively complex dom, as well as define the style when necessary. We end up with this:

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

Notice here that the container does some dom generation, but it’s the only logic it contains. Remember that you can define nested styles, so you don’t need to make a styled element for each tag that requires styling. It’s what we do here for the name and quantity of the ingredient item. Of course, we could split it further and create a new component for an ingredient. That is up to you –depending on the project complexity – to determine the granularity. In this case, it is just a styled component defined along with the rest in the RecipeStyles file:

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

For the purpose of this exercise, I have used the _ThemeProvider_. It injects the theme in the props of styled components. You can simply use it as `color: ${props => props.theme.core_color}`, I am just using a small wrapper to protect from missing attributes in the theme:

```javascript
const theme = (key) => (prop) => _.get(prop.theme, key) || console.warn('missing key', key)
```

You can also define your own constants in a module and use those instead. For example: `color: ${styleConstants.core_color}`.


## Pros
A perk of using **styled-components** is that you can use it as little as you want. You can use your favorite UI framework and add **styled-components** on top of it. This also means that you can easily migrate an existing project component by component. You can choose to style most of the layout with standard CSS and only use **styled-components** for reusable components.  

## Cons
Designers / style integrators will need to learn very basic javascript to handle variables and use them in place of SASS/LESS.

They will also have to learn to navigate the project structure. Although I would argue that finding the styles for a component in that component's folder is easier than having to find the right CSS/SASS/LESS file that contains the rule you need to modify.

They will also need to change their tools a bit, if they want syntax highlighting, linting, etc. A good place to start is with [this Atom plugin][atom] and [this babel plugin][babelplugin].

[a1]: https://medium.com/drivetribe-engineering/why-were-slowly-migrating-to-styled-components-2f284d4b5d95
[a2]: https://hackernoon.com/why-we-use-styled-components-at-decisiv-a8ac6e1507ac
[a3]: https://blog.cloudboost.io/styled-components-and-why-theyre-great-204b3ff10260
[v1]: https://www.styled-components.com/docs/basics#motivation
[v2]: https://www.youtube.com/watch?v=19gqsBc_Cx0
[v3]: https://www.youtube.com/watch?v=2j9rSur_mnk
[dan]: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
[smacss]: https://smacss.com/book/categorizing
[cssinjs]: https://github.com/MicheleBertoli/css-in-js
[emotion]: https://emotion.sh

[babelplugin]: https://github.com/styled-components/babel-plugin-styled-components
[atom]: https://atom.io/packages/language-babel
