import React, { Component} from 'react'
import axios from 'axios'
import './Pagina2.css'


let pais = ''
export const resposta = (props) => {
    pais = props
}

export default class Pagina2 extends Component {
state = {
    lista: [],
    bandeiraVizinhos: [],
    vizinhos : [],
    saidaVizinho: ['']
}    

componentWillMount() {    
        axios.get(`https://restcountries.eu/rest/v2/name/${pais}?fullText=true`)
        .then(resp => resp.data)
        .then(dados => dados.map(dado => {
            const lingua = dado.languages.map(lingua => lingua.name)
            const arr = [{bandeira :dado.flag, nome : dado.name, capital: dado.capital,
                        regiao: dado.region, subregiao: dado.subregion,
                        populacao: dado.population, vizinhos: dado.borders,
                        lingua :lingua}]
            this.setState({lista : arr})  
            return dado.borders  
        }))
        .then(vizIniciArray => {
            const paises = []
            vizIniciArray.forEach(palavra => palavra.forEach(a => {
                axios.get(`https://restcountries.eu/rest/v2/alpha/${a}`)
                    .then(resp => resp.data)
                    .then(dados => {
                        const pais = [{nome : dados.name, bandeira: dados.flag}]
                        paises.push(pais)
                        return pais
                            }   
                        )
                    .then(resp => this.setState({vizinhos : resp}))
                   } 
                 )
               )
               return paises;
              } 
            )
        .then(resp => resp.forEach(res => this.setState({vizinhos : res})))
            
 
}

paisVizinhos(){
   
}

pagina(){
    const {lista} = this.state
    const saida = lista.map((pais) => {
        return(
            <div className = 'pagina2 container'>
                <div className = 'paginaBandeira'>
                   <div className = 'imgBandeira'> <img alt= 'bandeira'  src = {pais.bandeira} /></div>
                    <div className = 'paginaNomes'>
                        <h3>Nome: {pais.nome}</h3>
                        <h3>Capital: {pais.capital}</h3>
                        <h3>Região: {pais.regiao}</h3>
                        <h3>Sub-região: {pais.subregiao}</h3>
                        <h3>População: {pais.populacao}</h3>
                        <h3>Linguas: {pais.lingua}</h3>
                    </div>
                </div>
            </div>
        )
    })
    return saida
}

   render(){
    return(
        this.pagina()
     )
   }
        
}





