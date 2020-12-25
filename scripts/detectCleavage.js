fs = require("fs")
const levenshtein = require("js-levenshtein")


//compare the other way, find the known protein sequences that are not matching and see if they fit within the translated proteins
/*
    Strategy: Detect whether a known protein was cleaved from the translated proteins
    
    Take a mismatched protein sequence from the known proteins (data/known proteins)
    and compare it with each translated proteins as follows:
    - use a sliding window to go through the known proteins and record the minimumEditDistance
    - Record the range of the segment that matches the most out of all the translated proteins
    - Detect any range conflicts between known proteins. 
*/



translated = JSON.parse(fs.readFileSync("./data/processed/translatedProteins.json").toString())
known = JSON.parse(fs.readFileSync("./data//knownproteins.json").toString())

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



fs.writeFileSync("./data/processed/proteinCleavageSites.json", JSON.stringify(cleavageSites, null, 4))