import { Box, Button, TextField, Typography } from "@mui/material";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

export default function FormularioRestaurante() {

    const params = useParams()
  
    useEffect(() => {
        if (params.id){
            http.get<IRestaurante>(`restaurantes/${params.id}/`)
            .then(resposta =>  setNomeRestaurante(resposta.data.nome))
        }
    }, [params])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeter = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()


        if (params.id) {
            http.put(`restaurantes/${params.id}/`, {
                nome: nomeRestaurante
            })
            .then(() => {
                alert('Restaurante atualizado com sucesso')
            })
        } else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
            .then(() => {
                alert('Restaurante cadastrado com sucesso')
            })
        }

       
    }

  
    return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems:"center", }}> 
    <Typography component="h1" variant="h6" >Cadastre Um novo Restaurante</Typography>
        <Box component='form' onSubmit={aoSubmeter} > 
            <TextField 
                value={nomeRestaurante}
                onChange ={evento => setNomeRestaurante(evento.target.value)}
                label="Filled" 
                variant="filled"
                required
                fullWidth
            />
            <Button sx={{ marginTop: '20px' }}type='submit' variant="contained" fullWidth>Cadastrar</Button>
        </Box>
    </Box>
  )
}
