const levenshtein = require("js-levenshtein")
const fs = require("fs")

coronaRna = JSON.parse(fs.readFileSync("data/rawrna.json"))
codonMap = JSON.parse(fs.readFileSync("data/codonmap.json"))
aminoAcids = JSON.parse(fs.readFileSync("data/aminoacids.json")).reduce((acc, obj, i) => {
    acc[obj["abbr"]] = obj
    return acc
}, {})

//assumes data source is 5' -> 3', which is the orientation RNA is translated
fullseq = coronaRna.filter(a => a["name"] == "sarscov2-sequence1")[0]["sequence"].toLowerCase().replace(/t/g, "u")
proteins = []

currentlyCoding = false
start = 0
end = 3

while(end <= fullseq.length) {
    //get the codon 
    rnaCodon = fullseq.slice(start, end) //make sure T's have gone to U's
    //start coding if we find start codon
    if (rnaCodon == "aug") {
        currentlyCoding = true
        newProtein = {
            "rnaStart": start,
            "rnaEnd": end,
            "aminoAcidSequence": ""
        }
        //partition the remaining proteins into distinct 3-section pairs
        //var testCodons = fullseq.slice(start).match(/.{1,3}/g)
        while (codonMap[fullseq.slice(start,end)] != "*" && end <= fullseq.length) {
            newProtein["aminoAcidSequence"] += aminoAcids[codonMap[fullseq.slice(start,end)]]["char"]
            start += 3
            end += 3
        }
        newProtein["rnaEnd"]  = end
        newProtein["rnaSequence"] = fullseq.slice(newProtein["rnaStart"], newProtein["rnaEnd"])
        proteins.push(newProtein)
    } else {
        start += 1
        end += 1
    }        
}

fs.writeFileSync("data/processed/translatedProteins.json", JSON.stringify(proteins, null, 4))
console.log(`Number of proteins found ${proteins.length}`)