/** @format */

import React from "react";
import { Box, Img } from "@chakra-ui/react";
import Layout from "../../Layout/Layout";
import { GlobalState } from "../../Context/Context";
import { useParams } from "react-router-dom";
import "./SinglePost.css"

const SinglePost = () => {
  const { setPageType } = GlobalState();
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [singlePost, setSinglePost] = React.useState(null);

  React.useLayoutEffect(() => {
    setPageType("single");
  });

  React.useEffect(() => {
    setIsLoading(true);
    var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:5000/api/post/"+id, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result.post);
    setIsLoading(false);
    setSinglePost(result.post);
  })
  .catch(error => console.log('error', error));
  }, [id])

  return (
    <Layout>
      <Box>
        {
          !isLoading ?
            <Box>
              {singlePost ? (
        <Box className='single_post_container'>
          <span className="post_title">{singlePost.title}</span>
          <Box className="post_body_container">
            <Box className="image_container">
              <Img src={singlePost.image} className="post_image" />
            </Box>
            <Box className="post_text">
              {singlePost.body}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className='loading'>Sorry! could not find any post...</Box>
      )}
            </Box> :
            <Box className='loading'>Loading...</Box>
        }
      </Box>
    </Layout>
  );
};

export default SinglePost;
