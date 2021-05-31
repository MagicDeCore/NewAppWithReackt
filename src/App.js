import React, {useEffect, useState} from 'react';
import Card from "./Components/Card";
import More from "./Components/More";
import NoArticles from "./Components/NoArcticles";
import LoaderSpinner from "./Components/LoaderSpinner";

export const APIKey = "ae6971aa95a34ef78aac37fb2a868bd5";

function App() {
  let [news, setNews] = useState([]);
  let [title, setTitle] = useState('');
  let [page, setPage] = useState('2');
  const [isTopNews, setIsTopNews] = useState(true);
  const [isFetching, setIsFetching] = useState(true);

  function retrieveNews() {
    let newsUrl = `https://nomoreparties.co/news/v2/everything?q=${title}&apiKey=${APIKey}&pageSize=5&page=1`;
    fetch(newsUrl).then((res) => {
      return res.json();
    }).then((data) => {
      setNews(data.articles);
      setIsTopNews(false);
      window.scrollTo(0, 0);
    })
  }

  function loadMore() {
    if (page < 9) {
      let newsUrl = isTopNews
        ? `https://nomoreparties.co/news/v2/top-headlines?country=us&apiKey=${APIKey}&pageSize=5&page=${page}`
        : `https://nomoreparties.co/news/v2/everything?q=${title}&apiKey=${APIKey}&pageSize=5&page=${page}`;
      fetch(newsUrl).then((res) => {
        return res.json();
      }).then((data) => {
        let arrayNews = news;
        data.articles.forEach(item => arrayNews.push(item));
        setNews(arrayNews);
        setPage(Number(page) + 1);
      })
    }
    return 0;
  }

  async function retrieveTopNews() {
    let newsUrl = `https://nomoreparties.co/news/v2/top-headlines?country=us&apiKey=${APIKey}&pageSize=5`;

    setIsFetching(true);
    const data = await fetch(newsUrl).then((res) => res.json())
    setNews(data.articles);
    setIsFetching(false);
    setIsTopNews(true);
  }

  useEffect(() => {
      (
        async () => {
          setIsFetching(true);
          await retrieveTopNews();
          setIsFetching(false);
        }
      )();
    }, []
  );


  return <div className="wrapper">
    <More setTitle={setTitle} title={title} retrieveNews={retrieveNews} loadMore={loadMore}
            setIsTopNews={setIsTopNews}/>
    <div className="search-result">
      <div className="cards">
        <h2 className="cards__title">Search Results</h2>
      </div>
        <div className="cards-items">
          {news.length ? news.map((card, i) => (
            <Card card={card} key={i}/>
          )) : (isFetching ? <LoaderSpinner/> : <NoArticles/>)}
        </div>
      <button className="cards__button" onClick={loadMore}>Show more</button>
    </div>
  </div>
}

export default App;
