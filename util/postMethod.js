

export default async function PostMethod(path, body) {

  const response = await fetch(path, {
    method: 'POST',
    body: JSON.stringify(body),
    headers : {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Check your internet connection!');
  }

  return data
}