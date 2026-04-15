import { useState } from "react";
import { Link } from 'react-router-dom'
import "./List.css";

function healthColor(score) {
  if (score >= 80) return "#3d7a5a";
  if (score >= 55) return "#c6890a";
  return "#b83232";
}

export default function List({ recipes = [], cuisines = [], diets = [], onRowClick = () => {} }) {
  const [search, setSearch]   = useState("");
  const [cuisine, setCuisine] = useState("All Cuisines");
  const [diet, setDiet]       = useState("Any Diet");
  const [sortKey, setSortKey] = useState(null);   // "healthScore" | "readyInMinutes" | "pricePerServing"
  const [sortAsc, setSortAsc] = useState(true);

  /* ── Filtering ── */
  let filtered = recipes.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch  = r.title.toLowerCase().includes(q) || String(r.id).includes(q);
    const matchCuisine = cuisine === "All Cuisines" || r.cuisines.includes(cuisine);
    const matchDiet    = diet    === "Any Diet"     || r.diets.includes(diet);
    return matchSearch && matchCuisine && matchDiet;
  });

  /* ── Sorting ── */
  if (sortKey) {
    filtered = [...filtered].sort((a, b) =>
      sortAsc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]
    );
  }

  function handleSort(key) {
    if (sortKey === key) {
      setSortAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  function sortIcon(key) {
    if (sortKey !== key) return <span className="rl-sort-indicator">⇅</span>;
    return <span className="rl-sort-indicator">{sortAsc ? "↑" : "↓"}</span>;
  }

  return (
    <div className="rl-wrap">

        {/* ── Controls ── */}
        <div className="rl-controls">
          <div className="rl-search-wrap">
            <span className="rl-search-icon">🔍</span>
            <input
              className="rl-search"
              type="text"
              placeholder="Search by title or recipe ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="rl-divider" />

          <select className="rl-select" value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
            {cuisines.map((c) => <option key={c}>{c}</option>)}
          </select>

          <select className="rl-select" value={diet} onChange={(e) => setDiet(e.target.value)}>
            {diets.map((d) => <option key={d}>{d}</option>)}
          </select>

          <div className="rl-divider" />
          <span className="rl-count">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {/* ── Table ── */}
        <div className="rl-table-card">
          <div className="rl-table-scroll">
            <table className="rl-table">
              <thead>
                <tr>
                  <th className="rl-th-img"></th>
                  <th>Recipe</th>
                  <th>Cuisine</th>
                  <th>Diets</th>
                  <th
                    className="rl-sortable"
                    onClick={() => handleSort("healthScore")}
                  >
                    Health Score {sortIcon("healthScore")}
                  </th>
                  <th
                    className="rl-sortable"
                    onClick={() => handleSort("readyInMinutes")}
                  >
                    Cook Time {sortIcon("readyInMinutes")}
                  </th>
                  <th
                    className="rl-sortable"
                    onClick={() => handleSort("pricePerServing")}
                  >
                    Price / Serving {sortIcon("pricePerServing")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="rl-empty">No recipes match your filters.</td>
                  </tr>
                ) : filtered.map((r) => (
                  <tr key={r.id} onClick={() => onRowClick(r)}>
                    <td>
                      {/* recipe.image from API */}
                      <img
                        className="rl-thumb"
                        src={r.image}
                        alt={r.title}
                        onError={(e) => { e.target.style.opacity = 0; }}
                      />
                    </td>
                    <td>
                      {/* recipe.title + recipe.id */}
                      <Link to={`/recipe/${r.id}`} className="rl-recipe-name">{r.title}</Link>
                      <div className="rl-recipe-id">id: {r.id}</div>
                    </td>
                    <td>
                      {/* recipe.cuisines[] */}
                      {r.cuisines.length
                        ? r.cuisines.map((c) => (
                            <span key={c} className="rl-tag rl-tag-cuisine">{c}</span>
                          ))
                        : <span className="rl-none">—</span>}
                    </td>
                    <td>
                      {/* recipe.diets[] */}
                      {r.diets.length ? (
                        <div className="rl-tag-row">
                          {r.diets.map((d) => (
                            <span key={d} className="rl-tag rl-tag-diet">{d}</span>
                          ))}
                        </div>
                      ) : <span className="rl-none">—</span>}
                    </td>
                    <td>
                      {/* recipe.healthScore */}
                      <div className="rl-health-wrap">
                        <div className="rl-health-bar-bg">
                          <div
                            className="rl-health-fill"
                            style={{ width: `${r.healthScore}%`, background: healthColor(r.healthScore) }}
                          />
                        </div>
                        <span className="rl-score-text">{r.healthScore}</span>
                      </div>
                    </td>
                    <td className="rl-time">
                      {/* recipe.readyInMinutes */}
                      ⏱ {r.readyInMinutes} min
                    </td>
                    <td className="rl-price">
                      {/* recipe.pricePerServing — spoon API returns cents, so divide by 100 in app.jsx when fetching data */}
                      ${r.pricePerServing.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
  );
}