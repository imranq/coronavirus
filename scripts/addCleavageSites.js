fs = require("fs")

translated = JSON.parse(fs.readFileSync("./data/processed/translatedComparison.json").toString())
cleavageSites = JSON.parse(fs.readFileSync("./data/processed/proteinCleavageSites.json").toString())

//for each translated protein that does not have an exact match, we will search through the cleavage sites and add any exact matches
foundProteins = 0

merged = translated.map(tp => {
    mp = tp
    mp["cleavageSites"] = [] //includes name, sequence, position, description
    if (tp["editDistance"] > 1) {
        mp["name"] = "N/A"
        mp["knownSequence"] = "N/A"
        mp["description"] = "N/A"
        mp["cleavageSites"] = cleavageSites.filter(cs => cs["parentAminoAcidSequence"] == tp["translatedSequence"] && cs["minEditDistance"] <= 5)
        foundProteins += mp["cleavageSites"].length
    } else {
        foundProteins += 1
    }
    return mp
}) 


fs.writeFileSync("./data/processed/mergedProteins.json", JSON.stringify(merged, null, 4))
console.log(`Found ${foundProteins} compared with match`)