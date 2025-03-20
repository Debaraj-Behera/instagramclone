import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import UseGetAllPosts from '@/hooks/UseGetAllPosts';
import UseGetSuggestedUsers from '@/hooks/UseGetSuggestedUsers';

export default function Home() {
  UseGetAllPosts();
  UseGetSuggestedUsers();
  return (
    <div className='flex'>
      <div className='flex-grow'>
        <Feed />
        <Outlet />
      </div>
      <RightSidebar />
    </div>
  )
}
