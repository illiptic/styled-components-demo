
export function getRecipes () {
  return new Promise(resolve => resolve([
      {
        id: 1,
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
        id: 2,
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
      },
      {
        id: 3,
        title:'Cabbage soup',
        time: '30 min',
        ingredients:[
          {name: 'cabbage', quantity: 1, unit: 'cabbage'},
          {name: 'water', quantity: 1, unit: 'l'},
          {name: 'salt & pepper', quantity: 1, unit: 'teaspoon'},
        ],
        instructions:[
          'Cut cabbage into pieces',
          'This is your last resort',
          'Boil water',
          'Put cabbage in the pot',
          'Add salt & pepper',
          'Forget for 30 minutes'
        ]
      }
    ])
  )
}
