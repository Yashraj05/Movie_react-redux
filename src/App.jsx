
import { useEffect } from "react"
import { fetchDataFromApi } from "./utils/api"
import { useSelector,useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { Routes,Route, BrowserRouter } from "react-router-dom";


import Header from './components/header/Header'
import Footer from "./components/footer/footer";
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';






export default function App() {
 const {url} = useSelector((store)=>store.home);
  const dispatch = useDispatch();
  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[])
 
  const fetchApiConfig = () =>{
  fetchDataFromApi('/configuration').then((res)=>{
    console.log(res);
    const url = {
      backdrop : res.images.secure_base_url + 'original',
      profile : res.images.secure_base_url + 'original',
      poster : res.images.secure_base_url + 'original',
    } 
    dispatch(getApiConfiguration(url));
  })
 }

 const genresCall = async () => {
  let promises = [];
  let endPoints = ["tv", "movie"];
  let allGenres = {};

  endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
  });

  const data = await Promise.all(promises);
  console.log(data);
  data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
  });

  dispatch(getGenres(allGenres));
};

  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/:mediaType/:id" element={<Details></Details>}></Route>
          <Route path="/search/:query" element={<SearchResult></SearchResult>}></Route>
          <Route path="/explore/:mediaType" element={<Explore></Explore>}></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>        
        </Routes>
        <Footer> </Footer>
      </BrowserRouter>
      </div>
  )
}
