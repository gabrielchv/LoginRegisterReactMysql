import React from 'react';

// /main

function Logged(){
    let [loginMsg, setLoginMsg] = React.useState('a')
    
    async function get() {
        const response = await fetch('/api/logincookie', {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
        setLoginMsg(data.username)
    }

    

    return(
        <div>
            {loginMsg}
        </div>
    )
}

export default Logged