import './Charts.css'
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

export default function Charts({ recipes = [] }) {

  // diet pie chart data
  const dietCounts = recipes.reduce((acc, recipe) => {
    recipe.diets.forEach((diet) => {
      acc[diet] = (acc[diet] || 0) + 1
    })
    return acc
  }, {})

  const dietData = Object.entries(dietCounts).map(([name, value]) => ({ name, value }))

  // cook time bar chart data
  const timeData = recipes.map((r) => ({
    name: r.title,
    minutes: r.readyInMinutes
  }))

  console.log(dietData)
  console.log(timeData)

  const COLORS = ['#3d7a5a', '#5bb38a', '#1d5f9e', '#c6890a', '#b83232', '#6b6b62']

  return (
  <div className="charts-wrap">

    {/* Diet Pie Chart */}
    <div className="chart-card">
      <h3 className="chart-title">Diet Breakdown</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={dietData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {dietData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>

    {/* Cook Time Bar Chart */}
    <div className="chart-card">
      <h3 className="chart-title">Cook Time by Recipe</h3>
      <BarChart width={600} height={300} data={timeData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" hide={true} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="minutes" fill="#3d7a5a" />
      </BarChart>
    </div>

  </div>
)
}