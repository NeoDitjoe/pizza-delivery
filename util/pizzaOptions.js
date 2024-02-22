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
    name: 'New York-Style Pizza Dough',
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

export const pizzaSauces = ['Pesto Sauce', 'BBQ Sauce', 'Alfredo Sauce', 'Spicy Red Sauce', 'Garlec & Herb Sauce'  ]