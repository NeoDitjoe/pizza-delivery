import { runningOutOfProduct } from "@/util/mail";
import client from "../connectClient";

export default async function updateAdmin(base, cheese, sauce, veggies) {

  const db = client.db('dashboard')

  const getBase = await db.collection('stock').findOne({ category: 'Base' })
  const getCheese = await db.collection('stock').findOne({ category: 'Cheese' })
  const getsauces = await db.collection('stock').findOne({ category: 'Sauces' })
  const getveggies = await db.collection('stock').findOne({ category: 'Veggies'}) 

  const notifyOnBase = getBase.items.find((item) => item.name === base)
  const notifyOnCheese = getCheese.items.find((item) => item.name === cheese)
  const notifyOnsauces = getsauces.items.find((item) => item.name === sauce)

  const veggiesRunningOut = []

  veggies?.map((veg) => {
    const notifyOnVeggies = getveggies.items.find((item) => item.name === veg.label)

    if (notifyOnVeggies.quantity < 29) {
      veggiesRunningOut.push(notifyOnVeggies.name)
    }

  })

  if (veggiesRunningOut) {
    await runningOutOfProduct(20, `on each of these veggies ${veggiesRunningOut.join(', ')}, ''`)
  }

  if (notifyOnBase.quantity < 11) {
    await runningOutOfProduct('10', base, 'base')
  }

  if (notifyOnCheese.quantity < 26) {
    await runningOutOfProduct('25', cheese, 'Cheese')
  }

  if (notifyOnsauces.quantity < 4) {
    await runningOutOfProduct('3', sauce, 'Sauce')
  }

}