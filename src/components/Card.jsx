import { useState, useEffect } from "react";
import "./Card.css";

export default function Card( {recipe }) {
  //temporary (only runs if API doesn't work)
  const MOCK = { id: 716429, title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs", image: "https://img.spoonacular.com/recipes/716429-312x231.jpg", readyInMinutes: 45, servings: 2, cuisines: ["Italian"], diets: ["vegetarian"], pricePerServing: 3.14 };

  const data = recipe ?? MOCK;

  return (
    <div className="featured">
      <div className="featured-label">Recipe of the Day</div>

      <div className="featured-body">

        {/* Image */}
        <div className="featured-img-wrap">
          <img
            className="featured-img"
            src={data.image}
            alt={data.title}
            onError={(e) => { e.target.style.opacity = 0; }}
          />
          {data.cuisines?.length > 0 && (
            <span className="featured-cuisine-badge">{data.cuisines[0]}</span>
          )}
        </div>

        {/* Title */}
        <div className="featured-title-card">
          <div className="featured-stat-label">Title</div>
          <div className="featured-title">{data.title}</div>
          <div className="featured-id">id: {data.id}</div>
        </div>

        {/* Cook Time */}
        <div className="featured-stat-card">
          <div className="featured-stat-label">Cook Time</div>
          <div className="featured-stat-value">{data.readyInMinutes}</div>
          <div className="featured-stat-unit">minutes</div>
        </div>

        {/* Servings */}
        <div className="featured-stat-card">
          <div className="featured-stat-label">Servings</div>
          <div className="featured-stat-value">{data.servings}</div>
          <div className="featured-stat-unit">people</div>
        </div>

        {/* Price */}
        <div className="featured-stat-card">
          <div className="featured-stat-label">Price</div>
          <div className="featured-stat-value">${data.pricePerServing.toFixed(2)}</div>
          <div className="featured-stat-unit">per serving</div>
        </div>

        {/* Diet */}
        <div className="featured-stat-card">
          <div className="featured-stat-label">Diet</div>
          <div className="featured-diet-tags">
            {data.diets?.length > 0
              ? data.diets.map((d) => <span key={d} className="featured-diet-tag">{d}</span>)
              : <span className="featured-none">—</span>}
          </div>
        </div>

      </div>
    </div>
  );
}