fs = require("fs")
papa = require("papaparse")

data = fs.readFileSync("data/raw/proteinTableData.csv").toString()
proteinTable = papa.parse(data, {header: true})["data"]

uniqueProteins = proteinTable.map(a => a["Protein"]).filter((protein, i, ar) => ar.indexOf(protein) === i).filter((protein) => protein != "").filter((protein) => protein != undefined).map(a => {
    return {
            "name": a.trim(),
            "description": "",
            "ranges": []
    } 
})
fs.writeFileSync("data/uniqueProteins.json", JSON.stringify(uniqueProteins, null, 4))