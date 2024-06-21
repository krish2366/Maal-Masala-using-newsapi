import Spinner from "./Spinner";
import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const NewsComponent = (props) => {
  let [loading, setLoading] = useState(true);
  let [article, setArticle] = useState([]);
  let [page, setPage] = useState(1);
  let [totalResults, setTotalResults] = useState(0);

  // console.log(props.category);

  let capatalise = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  const updateData = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country.toLowerCase()}&category=${props.category.toLowerCase()}&apiKey=${
      props.apiKey
    }&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    setArticle(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title =
      props.category === "general"
        ? "Maal Masala"
        : `Maal Masala-${capatalise(props.category)}`;
    updateData();
  }, []);

  // As we have installed infinte scroll to our website we'd not need next nd previous buttons
  // we have changed whole active code to function based component from class based component except some like these
  // const handleNextClick = async () =>{
  //   setLoading(true);
  //   if( page <  Math.ceil(totalResults/(props.pageSize))){
  //     setPage(page+1);
  //     updateData();
  //   }
  // }
  // As we have installed infinte scroll to our website we'd not need next nd previous buttons
  // const handlePrevClick = async() =>{
  //   setPage(page-1);
  //   setLoading(true);
  //   updateData();
  // }

  const fetchMoreData = async () => {
    setTimeout(async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country.toLowerCase()}&category=${props.category.toLowerCase()}&apiKey=${
        props.apiKey
      }&page=${page + 1}&pageSize=${props.pageSize}`;
      setPage(page + 1);
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticle(article.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    }, 1000);
  };

  return (
    <div className="container my-3">
      <h2 style={{ marginTop: "5rem" }}>
        Today's Headline - {capatalise(props.category)}
      </h2>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={article.length}
        next={fetchMoreData}
        hasMore={article.length < totalResults}
        loader={<Spinner />}
        style={{ overflow: "hidden" }}
      >
        <div className="row">
          {
            /* {!loading && */
            article.map((ele) => {
              return (
                <div key={ele.url} className="col-md-4">
                  <Newsitem
                    title={ele.title ? ele.title.slice(0, 44) + "..." : ""}
                    description={
                      ele.description ? ele.description.slice(0, 88) + "..." : ""
                    }
                    imgUrl={ele.urlToImage}
                    newsUrl={ele.url}
                    author={ele.author ? ele.author : "..."}
                    date={ele.publishedAt ? ele.publishedAt : ""}
                    source={ele.source.name ? ele.source.name : "..."}
                  />
                </div>
              );
            })
          }
        </div>
      </InfiniteScroll>

      {/* As we have installed infinte scroll to our website we'd not need next nd previous buttons */}

      {/* <div className="container d-flex justify-content-between">
          <button type="button" disabled={page===1} className="btn btn-primary " onClick={this.handlePrevClick} > &larr; Previous</button>
          <button disabled={page+1 > Math.ceil(totalResults/(props.pageSize))} type="button" className="btn btn-primary " onClick={this.handleNextClick} >Next &#8594;</button>
        </div> */}
    </div>
  );
};

export default NewsComponent;

// NewsComponent.defaultProps = {
//   country: "in",
//   pageSize: 5,
//   category: "general",
// };

NewsComponent.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
