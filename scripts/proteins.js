const { Console } = require("console")
const levenshtein = require('js-levenshtein');


fs = require("fs")

corona = JSON.parse(fs.readFileSync("data/SARSCov2Genome.json"))
codonMap = JSON.parse(fs.readFileSync("data/codonMap.json"))

fullseq = corona.filter(a => a["name"] == "sarscov2-sequence1")[0]["sequence"]
coronaProteins = corona.filter(a => a["type"] == "protein_coding_region_sequence")

console.log("Identified protein sequences")

proteins = []

currentlyCoding = false
for (i=0; i < fullseq.length-2; i += currentlyCoding ? 3 : 1) {
    start = i
    end = i+3
    
    rnaCodon = fullseq.slice(start, end).replace(/t/g, "u")
    if (!currentlyCoding) {   
        if (rnaCodon == "aug") {
            currentlyCoding = true
            proteins.push({
                "range": [start,end],
                "aminoAcidSequence": [codonMap[rnaCodon]],
                "rnaSequence": "",
                "description": "",
                "name": ""
            })
        }
    } else { //currently coding
        if (codonMap[rnaCodon] == "*" || i+3 >= fullseq.length) {
            currentlyCoding = false
            proteins[proteins.length-1]["range"][1] = end

            seq = fullseq.slice(proteins[proteins.length-1]["range"][0], proteins[proteins.length-1]["range"][1]).replace(/t/g, "u")
            proteins[proteins.length-1]["rnaSequence"] = seq
            //see if we can match a protein to description
            coronaProteins.forEach((cp) => {
                if (cp["sequence"].includes(seq) && Math.abs(cp["sequence"].length - seq.length) < 100){
                    proteins[proteins.length-1]["description"] = cp["description"]
                    proteins[proteins.length-1]["name"] = cp["name"]
                }
            })
        } else {
            proteins[proteins.length-1]["aminoAcidSequence"].push(codonMap[rnaCodon])
        }
    }    
}


fs.writeFileSync("data/fpProteins.json", JSON.stringify(proteins, null, 4))
console.log(`Number of proteins found ${proteins.length}`)
console.log(`Number of proteins researched ${coronaProteins.length}`)
console.log(`Number of proteins in common ${proteins.filter(a => a["name"].length > 0).length}`)

// console.log(JSON.stringify(fpMapNcbi, null, 4))


