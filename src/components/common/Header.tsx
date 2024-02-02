import { NavLink, Outlet } from 'react-router-dom'

function Header() {
  return (
    <>
      <nav className='inline-block'>
        <NavLink to='/'>
          <img src='images/prography.webp' alt='프로그라피 로고' />
        </NavLink>
      </nav>
      <Outlet />
    </>
  )
}

export default Header
