import React, {useState, useMemo, useEffect, useRef} from 'react';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import MySelect from '../components/UI/select/MySelect';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import {usePosts} from '../hooks/usePosts';
import {useFetching} from '../hooks/useFetching';
import {useObserver} from '../hooks/useObserver';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import {getPageCount, getPagesArray} from '../utils/pages.js';
import Pagination from '../components/UI/Pagination/Pagination';
import '../styles/App.css';
const axios = require('axios').default;

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    const totalCount = response.headers['x-total-count'];
    setPosts([...posts, ...response.data]);
    setTotalPages(getPageCount(totalCount, limit));
  })

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  const changePage = (page) => {
    setPage(page);
  }

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  return (
    <div className="Posts">
      <MyButton onClick={() => setModal(true)}>
        ?????????????? ????????
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{margin: '15px 0'}}></hr>

      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />

      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="??????-???? ???????????? ???? ????????????????"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: '???????????????? ??????'},
        ]}
      />

      {postError &&
        <h1>????????????: {postError}</h1>
      }

      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="???????????? ???????????? JS" />

      <div
        ref={lastElement}
        style={{height:20, background: 'red'}}
      />

      {isPostsLoading &&
        <Loader />
      }

      <Pagination
        page={page}
        totalPages={totalPages}
        changePage={changePage}
      />
    </div>
  );
}

export default Posts;
