import React from 'react'
import Logo from '../Img/logo_principal.png'
import './Logo.css'

const logo = () =>{
    return (<a href = '/' >
          <img alt = 'logo' className = 'logo' src= {Logo} />
      </a>)
}

export default logo
