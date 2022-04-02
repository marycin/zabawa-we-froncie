fetch("https://restcountries.com/v3.1/name/Poland",{
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers:{
        'Content-Type' : 'application/json'
    },
    redirect:'follow',
    referrerPolicy: 'no-referrer',
})
.then(res =>{
    if (res.ok){
        return res.json()
    }
    else{
        return Promise.reject(`Http error: ${res.status}`);
    }
}).then(res=>{
    console.log(res)
}).catch(error =>{
    console.log(error)
})