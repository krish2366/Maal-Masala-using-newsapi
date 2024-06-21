import React from "react";

const Newsitem = (props)=> {

    let { title, description, imgUrl, newsUrl, author, date ,source} = props;

    let blankImgUrl =
      "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png";

    return (
      <div className="m-3">
        <div className="card">
          <div>
            <span className="badge rounded-pill bg-danger" style={{display:'flex',justifyContent:"end",position:'absolute',right:0}}>
              {source}
            </span>
          </div>
          <img
            src={imgUrl ? imgUrl : blankImgUrl}
            className="card-img-top"
            alt="img"
            style={{ maxHeight: "160px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              Presented by <b>{author}</b>
            </p>
            <p className="card-text">Date: {date.slice(0, 10)}</p>
            <a href={newsUrl} target="_main" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default Newsitem;
