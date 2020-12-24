const levenshtein = require("js-levenshtein")

fs = require("fs")
levenshtein = require("js-levenshtein")

coronaRna = JSON.parse(fs.readFileSync("data/rawrna.json"))
codonMap = JSON.parse(fs.readFileSync("data/codonmap.json"))


fullseq = corona.filter(a => a["name"] == "sarscov2-sequence1")[0]["sequence"]
proteins = []

currentlyCoding = false
start = i
end = i+3

while(end <= fullseq.length)
    //get the codon 
    rnaCodon = fullseq.slice(start, end).replace(/t/g, "u")
    //start coding if we find start codon
    if (rnaCodon == "aug") {
        currentlyCoding = true
        newProtein = {
            "rnaStart": start,
            "rnaEnd": end,
            "aminoAcidSequence": []
        }
        //partition the remaining proteins into distinct 3-section pairs
        var testCodons = fullseq.slice(start).match(/.{1,3}/g)

        var codonIdx = 0
        while (codonMap[testCodons[codonIdx]] != "*") {
            newProtein["aminoAcidSequence"].push(testCodons[codonIdx])
            codonIdx += 1
            end += testCodons[codonIdx].length
        }
        newProtein["rnaEnd"]  = codonIdx
    } else {
        start += 1
        end += 1
    }        
}

fs.writeFileSync("data/translatedProteins.json", JSON.stringify(proteins, null, 4))
console.log(`Number of proteins found ${proteins.length}`)