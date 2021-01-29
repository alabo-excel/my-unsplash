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
  },[])

  const fetchMoreData = () => {
    setPage(page + 1)
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=8`)
    .then(response => response.json())
    .then(data => {
      setImage([...images, ...data])
    })
  }
  return(
    <div>
    <InfiniteScroll
        dataLength={images.length}
        next={fetchMoreData}
        hasMore={true}
        loader={
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
      >
      <div className="row">
        {images.map((image, index) => (
          <div key={index}  className="col-lg-3 mb-4">
            <img src={image.download_url} alt={index} />
            <div className="d-flex justify-content-between p-3 on-top">
              <p>{image.author}</p>
              <a href={image.download_wurl} download={image.author + '.jpg'}>
              <div className="download p-2 ">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-download" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
              </div>
              </a>
            </div>
          </div>
        ))}
      </div>
      </InfiniteScroll>
    </div>
  )
}

export default Images;
