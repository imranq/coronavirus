## Analyzing the Coronavirus Genome
**![Alt text](public/covidimg.png?raw=true "Title")**

## Setup


### Techstack
- Javascript / ObservableHQ (to process data and work on visualizations)
- MongoDB (to store genomic data to analyze for large scale)
- Python (to create genomic trees and deep learning models)
  
### Tools
- PyTorch (deep learning library)
- Auto download NCBI sequences

### Experiments


#### Understand the RNA Genome
- Find where the proteins position themselves in the full sequence
- Locate positions of coding regions in RNA (generate visualization)
- If the protein sequences overlap
- Where the protein starts and stops translation in the RNA sequence

#### Understand Viral Proteins Translated
- Composition of amino acids in proteins
- Predicing protein sub-structures such as alpha helices

#### Understand evolution of virus over time
- Understanding the path of mutation and how the proteins change

#### Extrapolating / Wild Ideas
- Deep learning to predict the next base pair in viral RNA
- Deep learning to detect which sequences in Viral RNA will code proteins

## Notes
- Sequencing coronavirus in home lab: https://nanoporetech.com/products/minion
- Converting the RNA sequence: 
  - When does the protein start?
  - What other proteins are coded that have not been downloaded?

- Hidden Markov Model

**Breaking down the virus in terms of:**
- Disease
- Symptoms
  - Light, Medium, Severe
  - What are the common factors between each?
- Public Health / Epidemiology
- Treatment
    - Does hydroxychloroquine work?
    - What are the different vaccines for?



## References
Building phylogenetic trees + other lecture notes
- https://www.ncbi.nlm.nih.gov/CBBresearch/Przytycka/download/lectures/PCB_Lect11_Phylogen_Trees.pdf
- https://www.ncbi.nlm.nih.gov/CBBresearch/Przytycka/index.cgi#lectures

SARS CoV 2 - Nucleotide, Coding Region, and Protein sequences
- https://www.ncbi.nlm.nih.gov/labs/virus/vssi/#/virus?SeqType_s=Nucleotide&VirusLineage_ss=SARS-CoV-2,%20taxid:2697049&Completeness_s=complete

SARS CoV 2 - Tree of Complete Sequences
- https://www.ncbi.nlm.nih.gov/labs/virus/vssi/#/precomptree

Visualization example
- https://observablehq.com/@analyzer2004/svgtable


3b1b Simulation of epidemics
- https://www.youtube.com/watch?v=gxAaO2rsdIs&vl=en
- R, travel restrictions, social distancing, central hubs,
- Second wave

Other open source resources
- http://open-source-covid-19.weileizeng.com/
- https://github.com/soroushchehresa/awesome-coronavirus
- George Hotz stream on Covid19
  - https://github.com/geohot/corona

Labs
- https://www.uniprot.org/uniprot/Q0ZJN1

## Textbook: Life: Science of Biology

Shoutout to the Harvard Extension BIOS E-1A Course!
