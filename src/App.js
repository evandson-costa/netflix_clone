/* eslint-disable import/no-anonymous-default-export */
import React,{ useEffect, useState } from 'react';
import Tmdb from './tmdb'
import MovieRow from "./components/MovieRow";
import '../src/App.css'
import FeaturedMovie from "./components/FeaturedMovie"
import Header from "./components/Header" 

export default () =>
{
  const [moveList, setMovieList] = useState([])
  const [feactureData, setFeactureData] = useState(null)
  const [blackHeader, setblackHeader]= useState(true)

  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list)

      // pegando o feacture
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv")
      
      setFeactureData(chosenInfo)
    }

    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () =>{
      if(window.scrollY > 10){
        setblackHeader(true);
      }else{
        setblackHeader(false);
      }
  }

  window.addEventListener('scroll', scrollListener);

  return () =>{
    window.removeEventListener('scroll', scrollListener);
  }



  }, [])

  return (
    <div className="page">
      <Header black= {blackHeader} />
      {
        feactureData &&
        <FeaturedMovie item = {feactureData} />
      }
      <div className="list">
        {
          moveList.map((item, key) => (
            <MovieRow 
              key={ key }
              title={item.title}
              items={item.items}
            />
          ))
        }
      </div>
      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> pela B7Web <br />
        Direitos de imagens para Netflix <br />
        Dados pegos do site <a href="https://www.themoviedb.org/">TMDB.org</a>
      </footer>

      { moveList.length<=0 &&
        <div className="loading">
          <img src="https://i.gifer.com/8Etj.gif" alt="Loading"/>
        </div>
      }
      
    </div>
  )
}