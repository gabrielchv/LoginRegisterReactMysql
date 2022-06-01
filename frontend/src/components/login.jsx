import React from 'react';

function Login(){

    let [username, setUsername] = React.useState('')
    let [password, setPassword] = React.useState('')
    let [loginMsg, setLoginMsg] = React.useState('')
    
    function usernameType(event){
        if (event.target.name == "username"){
            setUsername(event.target.value)
        }
        if (event.target.name == "password"){
            setPassword(event.target.value)
        }   
    }

    async function loginButton(){
            const response = await fetch('/api/login', {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await response.json()
            console.log(data);
            setLoginMsg(data.msg)
            if (data.status == true){
                window.location.href = "/main"
            }
    }
    async function registerButton(){
        const response = await fetch('/api/register', {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data);
        setLoginMsg(data.msg)
    }

    return (
        <div className="container">
            <div className="m-auto text-center loginForm">
                <h2>Olá {username}<span className='blink'>_</span></h2>
                <h5>{loginMsg}</h5>
                <div className="input-group mb-2">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1"><i class="icon fa-solid fa-user"></i></span>
                </div>
                    <input onChange={usernameType} name="username" type="text" className="form-control" placeholder="Usuário" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div className="input-group mb-2">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1"><i class="icon fa-solid fa-key"></i></span>
                </div>
                    <input onChange={usernameType} type="password" name="password" className="form-control" placeholder="Senha" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <button  onClick={registerButton} className="btn btn-lg btn-outline-secondary btn-block">Registrar</button>
                <button onClick={loginButton} className="btn btn-lg btn-outline-success btn-block">Entrar</button>
            </div>
        </div>
    )
}

export default Login
