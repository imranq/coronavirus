papa = require("papaparse")
fs = require("fs")

data = papa.parse(fs.readFileSync("./data/raw/zhanglabdata.csv").toString(),{"header":true})["data"]
data = data.map(a => {
    entry = {
        "id": a["Protein sequence translated from SARS-CoV-2 genome"].split("\n")[0],
        "aminoAcidSequence": a["Protein sequence translated from SARS-CoV-2 genome"].split("\n").slice(1).join("").split(" ").join("").toLowerCase(),
        "description": a["Protein name and function (based on UniProt curation of SARS-CoV-2 proteome)"].split("\n").slice(1).join(" "),
        "name": a["Protein name and function (based on UniProt curation of SARS-CoV-2 proteome)"].split("\n")[0]
    }
    return entry
})

fs.writeFileSync("./data/knownproteins.json", JSON.stringify(data, null, 4))