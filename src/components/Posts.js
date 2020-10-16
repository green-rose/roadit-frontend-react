import React, { useContext, useEffect} from 'react';
import PostItem from './PostItem';
import Context from '../context/Context';
import Spinner from './Spinner';



const Posts = () => {

  const context = useContext(Context);
  const { posts, loading, getPosts } = context;

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);
  if (loading) return <Spinner />
  if (posts !== null && posts.length === 0) {
    return <h4>No available posts</h4>}
  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
