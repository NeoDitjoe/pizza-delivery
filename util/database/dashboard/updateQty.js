import client from "../connectClient";

export default async function updateQty(base, cheese, sauce) {
  const db = client.db('dashboard');
  let CheeseQty
  if (cheese) {
    const getCheese = await db.collection('stock').findOne({ category: 'Cheese' })
    getCheese.items.map((item) => {
      if (item.name === cheese) {
        CheeseQty = item.quantity
      }
    })

    await db.collection('stock').updateOne(
      { category: 'Cheese', "items.name": cheese },
      { $set: { "items.$.quantity": CheeseQty - 1 } }
    );
  }

  let baseQty
  if (base) {
    const getCheese = await db.collection('stock').findOne({ category: 'Base' })
    getCheese.items.map((item) => {
      if (item.name === base) {
        baseQty = item.quantity
      }
    })

    await db.collection('stock').updateOne(
      { category: 'Base', "items.name": base },
      { $set: { "items.$.quantity": baseQty - 1 } }
    );
  }

  let SauceQty
  if (sauce) {
    const getCheese = await db.collection('stock').findOne({ category: 'Sauces' })
    getCheese.items.map((item) => {
      if (item.name === sauce) {
        SauceQty = item.quantity
      }
    })

    await db.collection('stock').updateOne(
      { category: 'Sauces', "items.name": sauce },
      { $set: { "items.$.quantity": SauceQty - 1 } }
    );
  }
}