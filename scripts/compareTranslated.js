fs = require("fs")
const levenshtein = require("js-levenshtein")
const { start } = require("repl")


translated = JSON.parse(fs.readFileSync("./data/processed/translatedProteins.json").toString())
known = JSON.parse(fs.readFileSync("./data//knownproteins.json").toString())

// console.log(translated)
// console.log(known)

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

//compare the other way, find the known protein sequences that are not matching and see if they fit within the translated proteins
/*
    Strategy: Detect whether a known protein was cleaved from the translated proteins
    
    Take a mismatched protein sequence from the known proteins (data/known proteins)
    and compare it with each translated proteins as follows:
    - use a sliding window to go through the known proteins and record the minimumEditDistance
    - Record the range of the segment that matches the most out of all the translated proteins
    - Detect any range conflicts between known proteins. 
*/

matchedProteins = results.filter((a) => a["editDistance"] <= 1).map(a => a["knownSequence"])
mismatchedKnownProteins = known.filter((a) => !matchedProteins.includes(a))


//this takes a while to run
cleavageSites = known.map(kp => {
    newEntry = {
        "name": kp["name"],
        "description": kp["description"],
        "aminoAcidSequence": kp["aminoAcidSequence"],
        "parentAminoAcidSequence": "",
        "minEditDistance": Infinity,
        "startRna": -1,
        "endRna": -1
    }

    translated.forEach(tp => {
        var start = 0
        var end = kp["aminoAcidSequence"].length    
        while (end < tp["aminoAcidSequence"].length) {
            testSequence = tp["aminoAcidSequence"].slice(start, end)
            testEditDistance = levenshtein(testSequence, kp["aminoAcidSequence"])
            // console.log(testSequence)
            // console.log(kp["aminoAcidSequence"])
            // console.log(testEditDistance)
            if (testEditDistance < newEntry["minEditDistance"]) {
                newEntry["startRna"] = start
                newEntry["endRna"] = end
                newEntry["minEditDistance"] = testEditDistance
                newEntry["parentAminoAcidSequence"] = tp["aminoAcidSequence"]
                newEntry["parentAminoAcidSequenceSegment"] = testSequence
            }

            start += 1
            end += 1
        }
    })

    return newEntry

})



fs.writeFileSync("./data/processed/translatedComparison.json", JSON.stringify(results, null, 4))
fs.writeFileSync("./data/processed/proteinCleavageSites.json", JSON.stringify(cleavageSites, null, 4))