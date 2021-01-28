import React, { useState, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import '../App.css'
function Images() {
  const [images, setImage] = useState([]);
  const [page, setPage] = useState(2);

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=1&limit=28')
    .then((response) => response.json())
    .then((data) => {
      setImage(data)
    })
  })
const fetchMoreData = () => {
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=28`)
    .then((response) => response.json())
    .then((data) => {
      setImage([...images, ...data])
    })
  }
  return(
    <div>
    <InfiniteScroll
        dataLength={images.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      ><div className="row">
        {images.map((image, index) => (
          <div key={index}  className="col-lg-3">
            <img src={image.download_url} alt={index} />
            <p>{image.author}</p>
          </div>
        ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default Images;
