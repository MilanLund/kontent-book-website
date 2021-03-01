// Kentico Kontent Delivery API


import { DeliveryClient } from '@kentico/kontent-delivery'
import { name, version } from '../package.json'

const sourceTrackingHeaderName = 'X-KC-SOURCE'

const client = new DeliveryClient({
  projectId: process.env.KONTENT_PROJECT_ID,
  globalHeaders: (_queryConfig) => [
    {
      header: sourceTrackingHeaderName,
      value: `${name};${version}`,
    },
  ],
});

function parseRecipeItem(item) {
  return {
    title: `${item.title.value} ${item.subtitle.value}`,
    text: item.text.value,
    ingredients: item.ingredients.value,
    instructions: item.instructions.value,
    notes: item.notes.value,
    images: dateStripped(item.images),
  }
}

const dateStripped = obj => {
	let newObj = {}
	Object.keys(obj).forEach(key => {
		let value = obj[key]
		if (value !== null) {
			// If array, loop...
			if (Array.isArray(value)) {
				value = value.map(item => dateStripped(item))
			}
			// ...if property is date/time, stringify/parse...
			else if (typeof value === 'object' && typeof value.getMonth === 'function') {
				value = JSON.parse(JSON.stringify(value))
			}
			// ...and if a deep object, loop.
			else if (typeof value === 'object') {
				value = dateStripped(value)
			}
		}
		newObj[key] = value
	})

	return newObj
};

export async function getRecipeItem() {
  const recipeResponse = await client
    .item('pekanovy_dort_s_karamelovym_kremem')
    .toPromise()

  return parseRecipeItem(recipeResponse.item);
}

