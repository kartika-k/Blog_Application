import React, { useEffect, useState } from 'react';
import { get } from '../../services/Endpoint';

export default function Admin() {
 const [post,setPost]=useState([])
 const [users,setUsers]=useState([])
 const [comments,setComments]=useState([])
  console.log(post)
  useEffect(()=>{
    const GetData=async()=>{
      try {
        const request= await get('/dashboard')
        const response= request.data

        console.log(response)
        if (request.status===200) {
          setPost(response.Posts)
          setUsers(response.Users)
          setComments(response.comments)
        }
      } catch (error) {
        console.log(response)
      }
    }
    GetData()
  },[])
  return (
<>
<div>
  <h2 className="mb-4 text-black">Dashboard</h2>
  <div className="row">
    <div className="col-md-4">
      <div className="card mb-4 custom-users-card">
        <div className="card-body text-white">
          <h5 className="card-title">Total Users</h5>
          <p className="card-text">{users ? users.length : '0'}</p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card mb-4 custom-posts-card">
        <div className="card-body text-white">
          <h5 className="card-title">Total Posts</h5>
          <p className="card-text">{post ? post.length : '0'}</p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card mb-4 custom-comments-card">
        <div className="card-body text-white">
          <h5 className="card-title">Total Comments</h5>
          <p className="card-text">{comments ? comments.length : '0'}</p>
        </div>
      </div>
    </div>
  </div>

  <style jsx>{`
    .custom-users-card {
      background-color:rgb(124, 97, 176); /* Purple */
      border: none;
    }
    .custom-posts-card {
      background-color:rgb(18, 91, 102); /* Teal (info-like color) */
      border: none;
    }
    .custom-comments-card {
      background-color:rgb(237, 133, 48); /* Orange */
      border: none;
    }
  `}</style>
</div>

  </>
  );
}
