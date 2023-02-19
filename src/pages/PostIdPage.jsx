import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import Loader from '../components/UI/Loader/Loader';
import {useFetching} from '../hooks/useFetching';
import PostService from '../API/PostService';

const PostIdPage = (props) => {

  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  })
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data);
  })

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div>
      <h1>Вы открыли страницу поста с id = {params.id}</h1>

      {isLoading
        ? <Loader/>
        : <div>
            {post.id}. {post.title}
            <div>
              {post.body}
            </div>

          </div>
      }

      {isComLoading
        ? <Loader/>
        : <div>
            {comments.map(comm =>
              <div key={comm.id}>
                <h5>{comm.email}</h5>
                <h5>{comm.body}</h5>
              </div>
            )}
          </div>
      }

    </div>





  )
}

export default PostIdPage;
