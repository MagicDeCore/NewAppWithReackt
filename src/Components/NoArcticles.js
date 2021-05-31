import React from 'react';

export default function NoArticles() {
    return (
      <section className="search-result" id="not-found">
        <div className="search-result__not-found"></div>
        <h2 className="search-result__title"></h2>
        <p className="search-result__paragraph"></p>
      </section>
    )
}