import React from 'react'
import './Button.css'
import seta from '../Img/seta.svg'


const button = () => {
 return  (  <a href = '/' >
    <button className ='botaoVoltar'>
        <img alt = 'seta' className = 'seta' src = {seta} /> Voltar
    </button>
    </a>)
}
export default button
   
