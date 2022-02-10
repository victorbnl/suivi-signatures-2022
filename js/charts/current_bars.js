let currentBarsChart

getData()
    .then(res => {
        // Get candidates signatures
        let data = {}
        res.forEach(e => {
            Object.keys(data).includes(e.Candidat) ? data[e.Candidat]++ : data[e.Candidat] = 1
        })
        // Annotations plugin
        Chart.register({id:"chartjs-annotation-plugin"})
        // Build chart
        const ctx = document.getElementById("per_candidate_bars").getContext("2d")
        currentBarsChart = new Chart(ctx, {
            type: "bar",
            data: {
                datasets: [
                    {
                        label: "Signatures",
                        data: data,
                        backgroundColor: '#3a4abd'
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: "Nombre de signatures"
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    annotation: {
                        annotations: {
                            500: {
                                type: 'line',
                                yMin: 500,
                                yMax: 500,
                                borderColor: '#eb4242',
                                borderWidth: 2,
                                label: {
                                    display: true,
                                    enabled: true,
                                    backgroundColor: '#eb4242',
                                    content: () => "500 signatures"
                                }
                            }
                        }
                    }
                }
            }
        })
    })
