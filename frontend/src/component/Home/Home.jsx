import React from 'react'
import Banner from '../SocialMedia/Banner'
import PostPost from '../Post/PostPost'
import { useSelector } from 'react-redux';

export default function Home() {
  const { postDetails } = useSelector((state) => state.postDetails);
  return (
    <div>
      <Banner />
      <PostPost postDetails={postDetails?.data} />
    </div>
  )
}
