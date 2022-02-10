const getData = (() => {
    let data = []

    return () => {
        if (data.length == 0) {
            return new Promise((resolve) => {
                fetch('https://signatures-tracker-cors-proxy.herokuapp.com/https://presidentielle2022.conseil-constitutionnel.fr/telechargement/parrainagestotal.json', {mode: 'cors'})
                    .then(res => { 
                        res.json()
                            .then(parsedRes => {
                                data = parsedRes
                                resolve(data)
                            })
                    })
            })
        } else {
            return new Promise((resolve) => {
                resolve(data)
            })
        }
    }
})()
