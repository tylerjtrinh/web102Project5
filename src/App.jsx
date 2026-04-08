import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Card from './components/Card'
import List from './components/List'
const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY

function App() {

  const MOCK_RECIPES = [
  { id: 716429, title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs", image: "https://img.spoonacular.com/recipes/716429-312x231.jpg", readyInMinutes: 45, servings: 2, cuisines: ["Italian"], diets: ["vegetarian"], healthScore: 87, pricePerServing: 3.14 },
  { id: 715538, title: "Braised Chicken Thighs with Olives & Lemon", image: "https://img.spoonacular.com/recipes/715538-312x231.jpg", readyInMinutes: 60, servings: 4, cuisines: ["American"], diets: [], healthScore: 73, pricePerServing: 4.50 },
  { id: 782601, title: "Red Kidney Bean Curry", image: "https://img.spoonacular.com/recipes/782601-312x231.jpg", readyInMinutes: 40, servings: 4, cuisines: ["Indian"], diets: ["vegan", "vegetarian"], healthScore: 91, pricePerServing: 2.10 },
  { id: 715497, title: "Berry Banana Breakfast Smoothie", image: "https://img.spoonacular.com/recipes/715497-312x231.jpg", readyInMinutes: 5, servings: 1, cuisines: ["American"], diets: ["vegan", "gluten free"], healthScore: 96, pricePerServing: 1.75 },
  { id: 664147, title: "Tuscan White Bean Soup", image: "https://img.spoonacular.com/recipes/664147-312x231.jpg", readyInMinutes: 30, servings: 6, cuisines: ["Italian"], diets: ["vegan"], healthScore: 89, pricePerServing: 1.60 },
]
  const [activeNav, setActiveNav] = useState('Browse')
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const fetchRecipes = async () => {
      const params = new URLSearchParams({
        apiKey: API_KEY,
        number: 10,
        addRecipeInformation: true,
      })

      const url = `https://api.spoonacular.com/recipes/complexSearch?${params}`
      console.log(url)
      // fetch
      const res = await fetch(url)

      const RecipeData = await res.json()
      const FixedRecipeData = RecipeData.results.map((recipe) => (
        {
          ...recipe,
          pricePerServing: recipe.pricePerServing / 100
        }
      ))
      
      setRecipes(FixedRecipeData)
    }
    fetchRecipes()
  }, [])

  const cuisines = ["All Cuisines", ...new Set(recipes.flatMap((r) => r.cuisines))]
  const diets = ["Any Diet", ...new Set(recipes.flatMap((r) => r.diets))]

  return (
    <div className="app-layout">
      <Navbar activeNav={activeNav} onNavChange={setActiveNav} />
      <main className="app-main">
        <Card recipe={recipes[0]} />
        <List recipes={recipes} cuisines={cuisines} diets={diets} />
      </main>
    </div>
  )
}

export default App
