import styles from '../styles/Home.module.css'
import { getRecipeItem } from "../lib/kontentClient";

export default function Home({ recipeItem }) {
  return (
    <main>
      <h1>{recipeItem.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: recipeItem.text }} />
      <div dangerouslySetInnerHTML={{ __html: recipeItem.ingredients }} />
      <div dangerouslySetInnerHTML={{ __html: recipeItem.instructions }} />
      {recipeItem.images.value.map(item => 
        <img src={item.url} />
      )}
    </main>
  )
}

export async function getStaticProps() {
  const recipeItem = await getRecipeItem();

  return {
    props: { recipeItem },
  };
}