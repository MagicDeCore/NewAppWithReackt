import React from 'react';

export default function Card({card}) {
    return (
      <div className="card">
          <a className="card__link" href={card.url} target="_blank" rel="noreferrer" >
              <img className="card__img" src={card.urlToImage} alt=""/>
                  <div className="card__container">
                      <p className="card__date"></p>
                      <h3 className="card__title">{card.title}</h3>
                      <p className="card__paragraph"></p>
                  </div>
                  <p className="card__source">{card.description}</p>
          </a>
      </div>
    )
}

