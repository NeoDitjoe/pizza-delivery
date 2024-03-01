import chicago from '../public/pizza-base/Chicago Deep Dish Pizza Dough.png'
import neapolian from '../public/pizza-base/Classic Neapolitan Pizza Dough.png'
import newYork from '../public/pizza-base/New York-Style Pizza Dough.png'
import roman from '../public/pizza-base/Roman Pizza Dough.png'
import sicillian from '../public/pizza-base/Sicilian Pizza Dough.png'

const pizzaBase = [
  {
    name: 'Chicago Deep Dish Pizza Dough',
    image: chicago,  
    link: 'chicago-deep-dish-pizza-dough',
  },
  {
    name: 'Classic Neapolitan Pizza Dough',
    image: neapolian,  
    link: 'classic-neapolitan-pizza-dough',
  },
  {
    name: 'New York Style Pizza Dough',
    image: newYork,  
    link: 'new-york-style-pizza-dough',
  },
  {
    name: 'Roman Pizza Dough',
    image: roman,  
    link: 'roman-pizza-dough',
  },
  {
    name: 'Sicilian Pizza Dough',
    image: sicillian,  
    link: 'sicilian-pizza-dough',
  },
]

export default pizzaBase

export const pizzaSauces = ['Pesto', 'BBQ', 'Alfredo', 'Spicy Red', 'Garlic & Herb'  ]

export const cheeseType = ['Cheddar', 'Mozzarella'/* , 'Cream Cheese', 'Montery Jack' */]

export const veggies = [
  { value: 'tomato', label: 'Tomato' },
  { value: 'onion', label: 'Onion' },
  { value: 'pepperoni', label: 'Pepperoni' },
  { value: 'mushroom', label: 'Mushroom' },
  { value: 'green pepper', label: 'Green Pepper' },
  { value: 'black olive', label: 'Black Olive' },
  { value: 'pineapple', label: 'Pineapple' },
  { value: 'jalapeno', label: 'Jalapeno' },
  { value: 'spinach', label: 'Spinach' },
  { value: 'artichoke', label: 'Artichoke' },
  { value: 'red onion', label: 'Red Onion' },
  { value: 'banana pepper', label: 'Banana Pepper' },
  { value: 'broccoli', label: 'Broccoli' },
];

export function selectedPizza(session, router, selectedSauce, selectedCheese, selectedVeggies) {

  const getSelectedVeggies = selectedVeggies &&  selectedVeggies.map((veg) => {
    return veg.value
  })

  const selectedItem = {
    user: session.user.email.email,
    name : router.query.name && router.query.name.replaceAll('-', ' '),
    toppings : router.query.toppings && router.query.toppings.replaceAll('-', ', '),
    image: router.query.image && router.query.image,
    size: router.query.size && router.query.size.split('-')[0],
    price: router.query.size && router.query.size.split('-')[1],
    sauce: selectedSauce,
    cheese: selectedCheese,
    veggies: getSelectedVeggies,
    base: router.query.pizzas
  }

  return selectedItem
}