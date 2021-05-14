import React from 'react'
import './Header.css'
import Logo from './Logo'
import ButtonVoltar from './Button'

const header = () =>{
   return  (<header className="header container">
    <Logo />
    <ButtonVoltar />
    </header>)
}
export default header