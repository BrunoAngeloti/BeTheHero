import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const history = useHistory()

    async function handleLogin(e){
        e.preventDefault()

        try {
            const response = await api.post('sessions', { email, senha })

            localStorage.setItem('ongId', response.data.id)
            localStorage.setItem('ongName', response.data.name)

            console.log(response.data.id)
            history.push('/profile')
        } catch (err){
            alert('Email ou senha errados')
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="logoBeTheHero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>              
            </section>

            <img src={heroesImg} alt="heroes"/>
        </div>
    )
}