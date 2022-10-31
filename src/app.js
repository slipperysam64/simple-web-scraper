const feedDisplay = document.querySelector('#feed')

fetch('http://localhost:8000/results')
    .then(response => {return response.json()})
    .then(data => {
        data.forEach(returns => {
            const title = `<div><h3>` + returns.title + `</h3><a href=`+returns.url+ `>Visit</a></div>` 
            feedDisplay.insertAdjacentHTML("beforeend", title)        
        })
    })
    .catch(err => console.log(err))
