import { useContext } from 'react'
import { useShortcuts } from 'react-shortcuts-hook'
import { useMedia } from 'react-use'
import ColorModeToggler from './colormodetoggler'
import { SideBarContext, ToggleSideBarContext } from './context'
import { Hamburger } from './svgicons'
import { _ } from './text'

function NavBar({ title, part }) {
  const sideBar = useContext(SideBarContext)
  const toggleSideBar = useContext(ToggleSideBarContext)
  const isWide = useMedia('(min-width: 1024px)')

  useShortcuts(['M'], () => toggleSideBar(), [sideBar])

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-content'>
          <button
            id='toggle-sidebar-btn'
            className='btn btn-action'
            type='button'
            onClick={toggleSideBar}
            title={_('Table Of Contents')}
          >
            <Hamburger />
          </button>
          <div className='ml-10 hidden-sm-and-down text-muted'>
            <kbd className='text-muted font-size-12'>M</kbd>
          </div>
        </div>
        <span className='mx-auto font-weight-bold'>
          {isWide && part && `${part} / `}
          {title}
        </span>
        <div className='navbar-content ml-10 ml-xs-auto'>
          <ColorModeToggler />
        </div>
      </nav>
      <div className='sidebar-overlay' onClick={toggleSideBar}></div>
    </>
  )
}

export default NavBar
