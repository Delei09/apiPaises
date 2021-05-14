import React, { Component } from 'react'
import './Form.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {resposta} from './Pagina2'



const inicial = {
    select : '' ,
    input : '',
    selectRegiao: '',
    saida: [],
    lista : [],
    saidaPesquisa : [],
    qtdBotao : 0,
    botao:[],
    paginacao : [],
    listaPais : [],
    pesquisarApi : ''
}
const Api = axios.create({
    baseURL: 'https://restcountries.eu/rest/v2/'
})
const UrlRegiao = 'region/';
const UrlLIngua = 'lang/';
const UrlCapital =  'capital/';


export default class Formulario extends Component{

    state = {...inicial}

      //Opções Formulario
    select(evento){
        const selecionado = evento.target.value;
        this.setState({select: selecionado})
        if(selecionado  ==='regiao')this.entrada(selecionado)
        if(selecionado === 'capital')this.entrada(selecionado)
        if(selecionado === 'lingua')this.entrada(selecionado)
        if(selecionado === 'pais')this.entrada(selecionado)
        if(selecionado === 'codigo')this.entrada(selecionado)
     
    }
    selectRegiao(evento){
        const selecionado = evento.target.value
        this.setState({selectRegiao: selecionado})
    }
    entrada(props){
        if(props === 'regiao'){
            const ok = ( 
                <div className = 'divSelect'>
                    <label className = 'selectLabel'>Região</label>
                    <select onChange = {evento => this.selectRegiao(evento)} >
                        <option >Escolha uma região</option>
                        <option value = 'Africa'>Africa</option>
                        <option value = 'Americas'>Americas</option>
                        <option value = 'Asia'>Asia</option>
                        <option value = 'Europe'>Europa</option>
                        <option value = 'Oceania'>Oceania</option>
                    </select>
                </div>
            )
            this.setState({saida : ok})
        }
        if(props === 'pais'){
            const ok = (
                <div className = 'divSelect'>
                <label className = 'selectLabel'>Digite o nome de um pais</label>
                <input className ='input-dados' 
                    placeholder = 'Brasil, Chile, Italia...'
                    onChange = {evento => this.inputTexto(evento)}
                ></input>
                </div>
            )
            console.log(ok)
            this.setState({saida: ok})
        }
        if(props === 'codigo'){
            const ok = (
                <div className = 'divSelect'>
                <label className = 'selectLabel'>Digite o codigo de um pais</label>
                <input className ='input-dados' 
                    placeholder = '55, 1, 128...'
                    onChange = {evento => this.inputTexto(evento)}
                ></input>
                </div>
            )
            this.setState({saida: ok})
        }
        if(props === 'capital'){
            const ok = (
                <div className = 'divSelect'>
                <label className = 'selectLabel'>Digite o nome de uma capital</label>
                <input className ='input-dados' 
                    placeholder = 'Brasilia, Lisboa, Santiago...'
                    onChange = {evento => this.inputTexto(evento)}
                ></input>
                </div>
            )
            this.setState({saida: ok})
        }
        if(props === 'lingua'){
            const ok = (
                <div className = 'divSelect'>
                <label className = 'selectLabel'>Digite o codigo de uma lingua</label>
                <input className ='input-dados' 
                    placeholder = 'pt, es, ar...'
                    onChange = {evento => this.inputTexto(evento)}
                ></input>
                </div>
            )
            this.setState({saida: ok})
        }
     
    }
    inputTexto(evento){
        const texto = evento.target.value
        this.setState({input : texto})
    }
    dados(){
        const {saida} = this.state
        return saida;
    }

    //arrumar Api pais

    componentDidUpdate(){
        let {input ,pesquisarApi, selectRegiao, select} = this.state
        if(select === 'regiao'){
                Api.get(`${UrlRegiao}${selectRegiao}`)
                .then(resp => resp.data)
                .then(dados => dados.map(dado => {
                     const arr = {nome: dado.name , bandeira:dado.flag }   
                    return arr
                }) )
                .then(dados => {
                        this.setState({lista : dados})
                })
        }
        if(select === 'capital'){
    
                Api.get(`${UrlCapital}${input}`)
                .then(resp => resp.data)
                .then(dados => dados.map(dado => {
                    const arr = {nome: dado.name , bandeira:dado.flag }   
                    return arr
                }) )
                .then(dados => {
                        this.setState({lista : dados})
                })
          
        }
        if(select === 'lingua'){
            
                Api.get(`${UrlLIngua}${input}`)
                .then(resp => resp.data)
                    .then(dados => dados.map(dado => {
                         const arr = {nome: dado.name , bandeira:dado.flag }   
                        return arr
                    }) )
                    .then(dados => {
                            this.setState({lista : dados})
                    })
        }
        if(select === 'pais'){
            
                const UrlPais = `https://restcountries.eu/rest/v2/name/${input}`
                Api.get(UrlPais)
                   .then(resp => resp.data)
                   .then(dados => dados.map(dado => {
                       const arr = {nome: dado.name , bandeira:dado.flag }   
                       return arr
                   }) )
                   .then(dados => {
                           this.setState({lista : dados})
                   })
            
        }
        if(select === 'codigo'){
                const UrlCodigo = `callingcode/${input}`
                Api.get(UrlCodigo)
                   .then(resp => resp.data)
                   .then(dados => dados.map(dado => {
                       const arr = {nome: dado.name , bandeira:dado.flag }   
                       return arr
                   }) )
                   .then(dados => {
                           this.setState({lista : dados})
                   })


        }
    }

    Pesquisar (props){
        const {lista} = this.state
        const resultado =  lista.map((dados, i) =>{
           return (
            <div className="divItem" key = {i}>
                <Link to = '/2' onClick = {ev => resposta(dados.nome)} >
                    <img key = {dados.nome} id = {dados.nome} alt = {dados.nome}className = 'img-fluid' src = {dados.bandeira} />
                </Link>
            </div>
           )
        })
        
        const qtdButton = Math.ceil(resultado.length / 10)
        this.setState({qtdBotao : qtdButton});
        this.botao(qtdButton);
        const pagina = resultado.slice(0,10)
        this.setState({saidaPesquisa : resultado})
        this.setState({paginacao: pagina})

    }
    botao(qtd){
        const but = [];
        for(let i = 0; i < qtd; i++){
            but.push( <button type="button" value = {i + 1} class="btn btn-light" onClick = {evento => this.paginacao(evento)} >{i + 1}</button>)
        }
        this.setState({botao : but })
    }
   paginacao(evento){
    const valor = evento.target.value
    const {saidaPesquisa} = this.state
    const res = saidaPesquisa.slice( ( (valor * 10) - 10 )  , (valor * 10) )
    this.setState({paginacao : res})
    

}

    render(){
        return(
            <div className = 'container' key = {'i'}>
            <form>
                <div className = 'divSelect'>
                    <label className = 'selectLabel'>Filtrar por</label>
                    <select onChange = {evento => this.select(evento)} >
                        <option >Escolha uma opção</option>
                        <option value = 'regiao'>Região</option>
                        <option value = 'capital'>Capital</option>
                        <option value = 'lingua'>Lingua</option>
                        <option value = 'pais'>Pais</option>
                        <option value = 'codigo'>Codigo de Ligação</option>
                    </select>
                </div>
                <div>
                    {this.dados()}
                </div>
                <button className = 'buttonPesquisar' type = 'button' 
                    onClick = {evento => {
                        this.Pesquisar(evento) 
                        this.setState({pesquisarApi : 'ok'})
                        }
                    }
                    
                    
                >
                    Pesquisar
                </button>
            </form>
            <div className="grid">
                    {this.state.paginacao}
            </div>
            <div>
                {this.state.botao}
            </div>
            </div>
            
        )
    }
}
