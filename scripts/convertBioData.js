papa = require('papaparse')
fs = require('fs')

suppData = papa.parse(fs.readFileSync("data/raw/aminoacidmolecular2.csv").toString(),{"header": true})["data"]
mainData = JSON.parse(fs.readFileSync("data/aminoAcidProps.json").toString())

// console.log(suppData)



result = mainData.map(a => {
    ind = suppData.map(s => s["Abbreviation1"].toLowerCase()).indexOf(a["char"])
    a["linearFormula"] = suppData[ind]["Linear formula"]
    a["molecularFormula"] = suppData[ind]["Molecular formula"]
    return a
})

console.log(JSON.stringify(result))

