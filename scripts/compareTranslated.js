fs = require("fs")
const levenshtein = require("js-levenshtein")


translated = JSON.parse(fs.readFileSync("./data/processed/translatedProteins.json").toString())
known = JSON.parse(fs.readFileSync("./data//knownproteins.json").toString())

// console.log(translated)
// console.log(known)

matchData = []

results = translated.map((tp) => {
    //order the known proteins by levenstein distance 
    minDistProtein = known.sort( (ka, kb) => {
        editDistanceB =  levenshtein(kb["aminoAcidSequence"], tp["aminoAcidSequence"]) 
        editDistanceA = levenshtein(ka["aminoAcidSequence"], tp["aminoAcidSequence"])
        return editDistanceA-editDistanceB
    })[0]

    // console.log(minDistProtein)

    entry = {
        "name": minDistProtein["name"],
        "translatedSequence": tp["aminoAcidSequence"],
        "knownSequence": minDistProtein["aminoAcidSequence"],
        "rnaStart": tp["rnaStart"],
        "rnaEnd": tp["rnaEnd"],
        "editDistance": levenshtein(minDistProtein["aminoAcidSequence"], tp["aminoAcidSequence"]),
        "description": minDistProtein["description"]
    }

    return entry
})

fs.writeFileSync("./data/processed/translatedComparison.json", JSON.stringify(results, null, 4))