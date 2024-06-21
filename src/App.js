import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import NewsComponent from './components/NewsComponent';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App=()=> {
  const pageSize = 10;
  const apiKey=process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(10)




    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar
        color='yellow'
        progress={progress}
        />
        <Routes>
          
          <Route  exact  path="/" element={<NewsComponent apiKey={apiKey} setProgress={setProgress} key="general" country={"in"} pageSize={pageSize} category="general" />}></Route>

          <Route  exact  path="/business" element={<NewsComponent apiKey={apiKey} setProgress={setProgress} key="business" country={"in"} pageSize={pageSize} category="business" />}></Route>

          <Route  exact  path="/entertainment" element={<NewsComponent apiKey={apiKey} setProgress={setProgress} key="entertainment" country={"in"} pageSize={pageSize} category="entertainment" />}></Route>
          
          <Route  exact  path="/health" element={<NewsComponent apiKey={apiKey} setProgress={setProgress} key="health" country={"in"} pageSize={pageSize} category="health" />}></Route>

          <Route  exact  path="/science" element={<NewsComponent apiKey={apiKey} setProgress={setProgress} key="science" country={"in"} pageSize={pageSize} category="science" />}></Route>

          <Route  exact  path="/sports" element={<NewsComponent apiKey={apiKey} setProgress={setProgress} key="sports"  country={"in"} pageSize={pageSize} category="sports" />}></Route>

          <Route  exact  path="/technology" element={<NewsComponent apiKey={apiKey} setProgress={setProgress} key="technology" country={"in"} pageSize={pageSize} category="technology" />}></Route>

          
            
          
        </Routes>
        </BrowserRouter>
      </div>
    )
  
}
export default App;