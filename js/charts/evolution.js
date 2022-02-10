var evolutionChart

getData()
    .then(res => {
        // Date range
        let minDate = null
        let maxDate = null
        // Signatures per candidate per date
        let dates = {}
        // Signatures per candidate
        let candidates = {}
        // For each signature
        res.forEach(signature => {
            // Get date object
            let currentDate = new Date(signature.DatePublication)
            // Increment candidate's signatures count
            if (!Object.keys(candidates).includes(signature.Candidat)) {
                candidates[signature.Candidat] = 1
            } else {
                candidates[signature.Candidat]++
            }
            // Put the signature count in dates
            if (!Object.keys(dates).includes(currentDate.toString())) dates[currentDate.toString()] = {}
            dates[currentDate.toString()][signature.Candidat] = candidates[signature.Candidat]
            // Get dates range
            if (minDate == null || minDate > currentDate) {
                minDate = currentDate
            }
            if (maxDate == null || maxDate < currentDate) {
                maxDate = currentDate
            }
        })
        let datasets = []
        Object.keys(candidates).forEach(candidate => {
            let data = []
            // For each day in date range
            for (let date = new Date(minDate); date <= maxDate; date.setDate(date.getDate() + 1)) {
                // Put candidate's signatures count at that date, or -1 if not defined, in the list
                data.push({
                    x: date.toLocaleString().slice(0, 8),
                    y: Object.keys(dates).includes(date.toString()) ? Object.keys(dates[date.toString()]).includes(candidate) ? dates[date][candidate] : null : null
                })
            }
            datasets.push({
                label: candidate,
                data: data,
                spanGaps: true,
                tension: 0.4,
                borderColor: "rgb(" + [...(function*() { for(let i = 0; i < 3; i++) yield Math.floor(Math.random() * (235 - 75 + 1) + 75); })()].join(", ") + ")"
            })
        })
        // Annotations plugin
        Chart.register({id:"chartjs-annotation-plugin"})
        // Build chart
        const ctx = document.getElementById("per_candidate_evolution_chart").getContext("2d")
        evolutionChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: datasets
            },
            options: {
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: "Nombre de signatures"
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: "Jour de publication des signatures"
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxHeight: 0
                        }
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
        evolutionChart.mHiddenState = false
        evolutionChart.mToggleAll = () => {
        if (evolutionChart.mHiddenState) {
            evolutionChart.mHiddenState = false
            evolutionChart.data.datasets.forEach(e => {
                e.hidden = false
            })
        } else {
            evolutionChart.mHiddenState = true
            evolutionChart.data.datasets.forEach(e => {
                e.hidden = true
            })
        }
        evolutionChart.update()
        }
    })
