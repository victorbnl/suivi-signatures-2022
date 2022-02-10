const sides = {"ARTHAUD Natalie":"Extrême gauche","ASSELINEAU François":"Aucun","DUPONT-AIGNAN Nicolas":"Droite","HIDALGO Anne":"Gauche","JADOT Yannick":"Gauche","KAZIB Anasse":"Extrême gauche","KUZMANOVIC Georges":"Aucun","LASSALLE Jean":"Centre","LE PEN Marine":"Extrême droite","MACRON Emmanuel":"Centre","MÉLENCHON Jean-Luc":"Extrême gauche","PÉCRESSE Valérie":"Droite","POUTOU Philippe":"Extrême gauche","ROUSSEL Fabien":"Extrême gauche","THOUY Hélène":"Attrape-tout","ZEMMOUR Éric":"Extrême droite","BARNIER Michel":"Droite","TAUBIRA Christiane":"Gauche","CAU Marie":"Gauche","MARÉCHAL Philippe Célestin":"Extrême droite"}

let sidesPieChart

getData()
    .then(signatures => {
        let data = {
            "Extrême gauche": 0,
            "Gauche": 0,
            "Centre": 0,
            "Droite": 0,
            "Extrême droite": 0,
            "Attrape-tout": 0,
            "Aucun": 0
        }
        signatures.forEach(signature => {
            if (Object.keys(data).includes(sides[signature.Candidat])) {
                data[sides[signature.Candidat]]++
            }
        })
        const ctx = document.getElementById("sides_pie_chart").getContext("2d")
        sidesPieChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: Object.keys(data),
                datasets: [
                    {
                        data: Object.values(data),
                        backgroundColor: [
                            "#fa2323", // Extrême gauche
                            "#cf1d1d", // Gauche
                            "#808080", // Centre
                            "#3335b0", // Droite
                            "#272af2", // Extrême droite
                            "#d622a6", // Attrape-tout
                            "#404040"  // Autre
                        ]
                    }
                ]
            }
        })
    })
