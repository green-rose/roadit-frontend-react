import React, { useContext, useEffect} from 'react';
import PostItem from './PostItem';
import Context from '../context/Context';



const Posts = () => {

  const context = useContext(Context);
  const { posts } = context;

  useEffect(() => {
    context.getPosts();
    // eslint-disable-next-line
  }, []);

  if (posts !== null && posts.length === 0) {
    return <h4>No available posts</h4>;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
