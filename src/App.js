/* eslint-disable import/no-anonymous-default-export */
import React,{ useEffect, useState } from 'react';
import Tmdb from './tmdb'
import MovieRow from "./components/MovieRow";
import '../src/App.css'
import FeaturedMovie from "./components/FeaturedMovie"

export default () =>
{
  const [moveList, setMovieList] = useState([])
  const [feactureData, setFeactureData] = useState(null)

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

  return (
    <div className="page">
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
    </div>
  )
}