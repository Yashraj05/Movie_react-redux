import React, { useEffect, useState } from "react";
import "./heroBannerStyles.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
export default function HeroBanner() {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((store) => store.home);
  const { data, loading } = useFetch("/movie/upcoming");
  
  
  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);
  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className="heroBanner">
      {!loading && <div className="backdrop-img">
        <Img src={background}></Img>
      </div>}
      <div className="opacity-layer"></div>
      <ContentWrapper>
      <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies , TV shows people to discover.Explore now
          </span>
          <div className="searchInput">
            <input
              type="text"
              onKeyUp={searchQueryHandler}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie or tv show..."
            />
            <button onClick={()=>navigate(`/search/${query}`)}>Search</button>
          </div>
        </div>
      </ContentWrapper>
      
        
      </div>
    
  );
}
