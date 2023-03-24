import { useState } from 'react'
import logo from '../../assets/logo.png'
import searchLogo from '../../assets/search-svgrepo-com.svg'
import { homeSvg, messageSvg, notificationSvg } from '../../assets/svgContainer'

interface NavLink {
    id: number,
    text: string
    active: boolean
    svg: (className: string) => JSX.Element
}

export default function Navbar() {
    
    const initialLinksArray: NavLink[] = [{id: 1, text: 'Home', active: true, svg: homeSvg},
                                            {id: 2, text: 'Messaging', active: false, svg: messageSvg},
                                            {id: 3, text: 'Notifications', active: false, svg: notificationSvg},

]
const [links, setLinks] = useState<NavLink[]>(initialLinksArray)
function handleClick(id: number) {
    let newLinks: NavLink[] = links.map((link) => {
        link.id === id ? link.active = true : link.active = false
        return link
        })
    setLinks(newLinks)

}
    return (
        <div className="navbar-container">
            <header>
                
                <div className="logo-search-container">
                    <img  className="logo" src={logo}/>
                    <div className="search-bar-left"><img className="search-bar-logo" src={searchLogo}/></div>
                    <input className="search-bar" type="text" placeholder='Search'/>
                </div>
                <ul className="nav-container">
                    {links.map((link) => {let className: string = '';
                    link.active ? className  = 'nav-li-active' :  className  = 'nav-li';
                     return <li key={link.id} className={className} onClick={() => handleClick(link.id)}>
                                {link.svg(className)}<a className="nav-button" href ={'#'} >{link.text}</a>
                            </li>}
                        )}
                        <img className="avatar" src={logo} />
                </ul>
            </header>
        </div>

    )
}