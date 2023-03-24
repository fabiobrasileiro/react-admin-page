import { useState, useEffect } from 'react' 
import { Paper, TableContainer, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material"
import IRestaurante from '../../../interfaces/IRestaurante';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';



function AdministraçãoRestaurante () {


    
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])


    useEffect(() => {
            axios.get('http://localhost:8000/api/v2/restaurantes/')
                .then(resposta => {
                    setRestaurantes(resposta.data)
                })
        }, [])

    const excluirRestaurante = (restauranteExcluido: IRestaurante) =>{
        axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteExcluido.id}/`)
        .then(() =>{
            const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteExcluido.id )
            setRestaurantes([ ...listaRestaurantes ])
        })
    }

    return(
        <TableContainer component={Paper} >
            <TableHead >
                <TableRow >
                    <TableCell >
                        <h1>Nome</h1>
                    </TableCell>
                    <TableCell>
                        <h5>Editar</h5>
                    </TableCell>
                    <TableCell>
                        <h5>Excluir</h5>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody >
                {restaurantes.map(restaurante => (
                    <TableRow key={restaurante.id}>
                        <TableCell>
                            {restaurante.nome}
                        </TableCell>
                        <TableCell>
                            [ <Link to={`/adm/restaurantes/${restaurante.id}`}>Editar</Link> ]
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" color="error" onClick={() => excluirRestaurante(restaurante)}>
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </TableContainer>
     
    )
}

export default AdministraçãoRestaurante