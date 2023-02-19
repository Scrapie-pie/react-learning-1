import React, {useState} from 'react';
import PostItem from './PostItem';
import {TransitionGroup, CSSTransition} from "react-transition-group";

const PostList = ({posts, title, remove}) => {

  if (!posts.length) {
    return (
      <h1 style={{textAlign: 'center'}}>
        Посты не найдены!
      </h1>
    )
  }

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>
        {title}
      </h1>

      <TransitionGroup>
          {posts.map((post, index) =>
            <CSSTransition
              key={post.id}
              timeout={500}
              classNames="post"
            >
              <PostItem remove={remove} number={++index} post={post} key={post.id}/>
            </CSSTransition>
          )}

      </TransitionGroup>

    </div>
  );
};

export default PostList;


// <PostList
//    remove={removePost}
//    posts={sortedAndSearchedPosts}
//    title="Список постов JS"
//  />
