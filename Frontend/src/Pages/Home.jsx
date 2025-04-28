import React, { useEffect, useState } from 'react';
import LatestPost from '../Components/LatestPost';
import { get } from '../services/Endpoint';

export default function Home() {

  return (
    <>
      <div className="container-fluid bg-dark hero-section text-center">
        <h1 className="fs-1 fw-bold text-light">Explore, Share, and Connect – Welcome to BlogHub!</h1>
        <p className="text-light fs-5 mt-3">
        Ignite your creativity, discover fresh insights, and find inspiration in every corner of BlogHub.
        </p>
      </div>

<div className='container-fluid  p-5'>

    <LatestPost />

</div>
    </>
  );
}
