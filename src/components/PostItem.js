import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostItem = ({ post: { id, title, subredditTitle, subredditName, date, author, commentCount, type, postedUrl } }) => {
    return (
      <div className='card text-center'>
        <h3>{title}</h3>
        <p>{postedUrl}</p>
        <p>{subredditName}</p>
        <div>
          <Link to={`/post/${id}`} className='btn btn-dark btn-sm my-1'>
            More
          </Link>
        </div>
      </div>
    );
  };
  
  PostItem.propTypes = {
    post: PropTypes.object.isRequired
  };
  
  export default PostItem;