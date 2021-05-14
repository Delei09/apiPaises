import {Switch, Route, Redirect} from 'react-router-dom'
import Formulario from './Form'
import Pagina2 from './Pagina2'

export default function Routes() {
    return(
        <Switch>
            <Route exact path =  '/'>
                <Formulario />
            </Route>
            <Route path = '/2'>
                <Pagina2 />
            </Route>
            <Redirect  to = '*' >
                <Formulario />
            </Redirect>
        </Switch>
    )
}

