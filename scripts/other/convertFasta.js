fs = require("fs")
fasta2json = require("fasta2json")

/*
Algorithm to extract sequences into JSON format:
- Find '>' character
*/

function parseFasta(str, type, re) {    
    fastaJson = fasta2json.ParseFasta(str);
    
    return fastaJson.filter(a => a["head"].length > 0).map((entry) => {
        newEntry = {
            "source": "",
            "description": "",
            "type":type,
            "name": "",
            "sequence": ""
        }
        
        baseMatch = entry["head"].match(re)
        newEntry["source"] = baseMatch[1]
        newEntry["name"] = baseMatch[2]
        newEntry["description"] = baseMatch[3]
        newEntry["sequence"] = entry["seq"].toLowerCase().replace(/(t)/g, "u")
        
        return newEntry
    })
}

proteinsAARaw = fs.readFileSync("data/raw/proteins.fasta").toString()
nucleotideSequencesRaw = fs.readFileSync("data/raw/sequenceData.fasta").toString()
proteinsCodingRegionsRaw = fs.readFileSync("data/raw/codingRegion.fasta").toString()

fs.writeFileSync("data/proteinCodingRegion.json", JSON.stringify(parseFasta(proteinsCodingRegionsRaw, "protein_coding_region_sequence", /(.*?)\|(.*?)\[(.*?)\]/), null, 4))
fs.writeFileSync("data/rnaFullSequence.json", JSON.stringify(parseFasta(nucleotideSequencesRaw, "rna_full_sequence", /(.*?)\|(.*?)/), null, 4))
fs.writeFileSync("data/proteinAminoAcids.json", JSON.stringify(parseFasta(proteinsAARaw, "protein_aminoacid_sequence", /(.*?)\|(.*?)\[(.*?)\]/), null, 4))

//protein_coding_region_sequence