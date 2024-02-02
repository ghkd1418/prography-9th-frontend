import { Outlet } from 'react-router-dom'

function Header() {
  return (
    <>
      <nav className='inline-block'>
        <div>
          <img src='images/prography.webp' alt='프로그라피 로고' />
        </div>
      </nav>
      <Outlet />
    </>
  )
}

export default Header
