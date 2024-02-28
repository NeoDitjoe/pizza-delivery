import client from "../connectClient";

export default async function editQty(category, product, qty) {
  const db = client.db('dashboard');

  await db.collection('stock').updateOne(
    { category: category, "items.name": product }, 
    { $set: { "items.$.quantity": qty } }
    );
}
