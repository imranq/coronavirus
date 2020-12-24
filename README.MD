## Analyzing the Coronavirus Genome
**![Alt text](public/covidimg.png?raw=true "Title")**

## Description

The Coronavirus, or SARS-CoV-2 (SC2), is a virus that infects humans and causes a disease referred to as COVID19. While most people infected with this virus have no symptoms, others suffer severe flu-like conditions and shortness of breath. How does something that cannot even be classified as "living" create such disturbing consequences? Our goal is to analyze the SARS-CoV-2 genome from first principles so we can understand how it operates and what makes its behaviour so strange.

All living things, while incredibly mysterious in aggregate, are all composed of cells. Cells, in turn, have been well studied by biologists and other scientists. In fact, cell follow just 3 basic principles: they hold genetic material in the form of DNA, that genetic material is translated into amino acid sequences, and those amino acid sequences fold up into unique shapes which determine their respective functions. This drives all the cell processes necessary for life. While this description is just scratching the surface of the rich complexity in a cell, it is all we need to understand the basic behavior of SC2.

Like other viruses, SC2 infects the body by injecting its genetic material (RNA in this case) into a human cell. As mentioned above, cells typically read their own DNA to make the proteins that drive their processes, but in this case SC2 introduces RNA such that the cell's own tools are used to read and translate it into more SC2 virus. After this has gone on long enough, the cell bursts from excess coronavirus and the new coronaviruses begin the process again in other cells. 

### Going from Corona RNA to Corona Proteins

How does the coronavirus genetic material make more coronavirus? 

To answer this, let's first look at how a normal cells processes genetic material. Deep inside the nucleus of a cell, DNA nucleotides called Thymine (T), Guanine (G), Cytosine (C), and Adenine (A) are paired up across two sugar-based strands. Thymine pairs with Adenine and Guanine pairs with Cytosine. The double stranded nature of DNA allows for incredible stability in cell reproduction, but more importantly for our purposes, the sequence of A's, T's, C's, and G's provide a unique code which can be read and represent what the cell should do.

DNA is useless if the rest of the cell cannot read it for instructions. However, DNA cannot move in and out of the nucleus (and you wouldn't want it to either, its too crucial!), so we need a "messenger" that can send a signal to build the proteins the cell needs. The cell solves this with RNA. Like DNA, RNA is composed of nucleotides, but with one difference: RNA replaces Thymine with Uracil, another nucleotide. A sequence of DNA like `ATGAGTGTTATTGC` would be converted to `AUGAGUGUUAUUGC` The cell translates its DNA into RNA which can move out of the nucleus and finally start work.

The next step is to convert RNA into amino acids. Like nucleotides, amino acids are a type of alphabet for the cell, but this time for spelling out proteins. Regions of RNA like `AUGAGUGUUAUUGC`

Many researchers have already sequence

All known Sars-Cov-2 proteins data available in `data/knownproteins.json` (gathered from the New York Times Article ["The Coronavirus Unveiled"](https://www.nytimes.com/interactive/2020/health/coronavirus-unveiled.html))

Full RNA sequences available here in `data/rawrna.json` (Obtained from [NCBI GenBank](https://www.ncbi.nlm.nih.gov/labs/virus/vssi/#/virus?SeqType_s=Nucleotide&VirusLineage_ss=SARS-CoV-2,%20taxid:2697049&Completeness_s=complete))

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
