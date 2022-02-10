const allSignaturesTable = (() => {
    let data = []
    let displayData = []
    let sPerPage = 13
    let currentSortColumn = 0
    let currentSortOrder = 1

    let allSignaturesTable = {
        // Previous page
        previousPage: () => {
            let currentPage = document.getElementById("current_page").value
            if (currentPage > 0) {
                document.getElementById("current_page").value--
                allSignaturesTable.update()
            }
        },

        // Next page
        nextPage: () => {
            let currentPage = document.getElementById("current_page").value
            let pagesCount = Math.floor(displayData.length / sPerPage)
            if (currentPage < pagesCount) {
                document.getElementById("current_page").value++
                allSignaturesTable.update()
            }
        },

        // Sort by column (toggle order)
        toggleSortBy: (column) => {
            if (currentSortColumn == column) {
                currentSortOrder *= -1
            } else {
                currentSortOrder = 1
            }
            currentSortColumn = column
            document.getElementById("current_page").value = 0
            allSignaturesTable.update()
        },

        // Update table with data
        update: () => {
            // Check search query
            let searchField = document.getElementById("search_field")
            if (searchField.value != "") {
                displayData = []
                data.forEach(signature => {
                    if (signature.join(" ").toLowerCase().includes(searchField.value)) {
                        displayData.push(signature)
                    }
                })
            } else {
                displayData = data
            }
            // Sort data
            displayData.sort((f, s) => {
                // If sorting by date
                if (currentSortColumn == 5) {
                    return ((new Date(f[currentSortColumn].replace(/(\d+[/])(\d+[/])/, '$2$1'))) < (new Date(s[currentSortColumn].replace(/(\d+[/])(\d+[/])/, '$2$1'))) ? 1 : -1) * currentSortOrder
                } else {
                    return f[currentSortColumn].localeCompare(s[currentSortColumn]) * currentSortOrder
                }
            })
            // Check if page is in range
            let currentPage = document.getElementById("current_page").value * 1
            let pagesCount = Math.floor(displayData.length / sPerPage)
            // If page < 0 or page > pages total, reset page to 0
            if (currentPage < 0 || currentPage > pagesCount) {
                document.getElementById("current_page").value = 0
            }
            // Generate HTML
            let html = "<thead><tr>"
            let columns = ["Nom de l'élu", "Prénom de l'élu", "Circonscription", "Département", "Candidat", "Date"]
            columns.forEach((column, i) => {
                html += 
                    "<th onclick=\"allSignaturesTable.toggleSortBy("+ i +")\">"
                    + column
                    + (currentSortColumn == i ? currentSortOrder == -1 ? " <i class=\"fa-solid fa-sort-up\"></i>" : " <i class=\"fa-solid fa-sort-down\"></i>" : "")
                    + "</th>"
            })
            html += "</tr></thead><tbody>"
            displayData.slice(currentPage * sPerPage, (currentPage + 1) * sPerPage).forEach(s => {
                html += "<tr><td>" + s.join("</td><td>") + "</td></tr>"
            })
            html += "</tbody>"
            document.getElementById("all_signatures_table").innerHTML = html
            document.getElementById("page_total").innerText = pagesCount
        }
    }

    getData()
        .then(res => {
            // Update data
            data = []
            for (let i = 0; i < res.length; i++) {
                data.push([
                    res[i].Nom,
                    res[i].Prenom,
                    res[i].Circonscription,
                    res[i].Departement,
                    res[i].Candidat,
                    (new Date(res[i].DatePublication)).toLocaleDateString()
                ])
            }
            currentPage = 0
            currentSortColumn = 0
            currentSortOrder = 1
            allSignaturesTable.update()
        })

        return allSignaturesTable
})()
