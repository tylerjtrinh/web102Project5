import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../components/Card.css'

const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY

export default function DetailPage() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    const fetchRecipe = async () => {
      const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      const res = await fetch(url)
      const RecipeData = await res.json()
      console.log(RecipeData)

      setRecipe(RecipeData)

    }
    fetchRecipe()
  }, [id]) 

  if (!recipe) return <div>Loading...</div>

 return (
  <main className="app-main">

      {/* Hero */}
      <div className="featured">
        <div className="featured-label">Recipe Detail</div>
        <div className="featured-body">
          <div className="featured-img-wrap">
            <img className="featured-img" src={recipe.image} alt={recipe.title} />
            {recipe.dishTypes?.length > 0 && (
              <span className="featured-cuisine-badge">{recipe.dishTypes[0]}</span>
            )}
          </div>

          <div className="featured-title-card">
            <div className="featured-stat-label">Title</div>
            <div className="featured-title">{recipe.title}</div>
            <div className="featured-diet-tags">
              {recipe.diets?.map((d) => (
                <span key={d} className="featured-diet-tag">{d}</span>
              ))}
            </div>
          </div>

          <div className="featured-stat-card">
            <div className="featured-stat-label">Health Score</div>
            <div className="featured-stat-value">{recipe.healthScore}</div>
            <div className="featured-stat-unit">out of 100</div>
          </div>

          <div className="featured-stat-card">
            <div className="featured-stat-label">Likes</div>
            <div className="featured-stat-value">{recipe.aggregateLikes}</div>
            <div className="featured-stat-unit">people liked this</div>
          </div>

          <div className="featured-stat-card">
            <div className="featured-stat-label">Price</div>
            <div className="featured-stat-value">${(recipe.pricePerServing / 100).toFixed(2)}</div>
            <div className="featured-stat-unit">per serving</div>
          </div>

          <div className="featured-stat-card">
            <div className="featured-stat-label">Prep + Cook</div>
            <div className="featured-stat-value">{recipe.readyInMinutes}</div>
            <div className="featured-stat-unit">minutes total</div>
          </div>

        </div>
      </div>

      {/* Summary */}
      <div className="featured-stat-card">
        <div className="featured-stat-label">Summary</div>
        <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
      </div>

      {/* Ingredients */}
      <div className="featured-stat-card">
        <div className="featured-stat-label">Ingredients</div>
        <ul>
          {recipe.extendedIngredients?.map((ing) => (
            <li key={ing.id}>{ing.original}</li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="featured-stat-card">
        <div className="featured-stat-label">Instructions</div>
        <p>{recipe.instructions}</p>
      </div>

    </main>
)
}