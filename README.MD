## Analyzing the Coronavirus Genome

How to use:

> `rawrna.json`: Contains sequenced coronavirus genome
> 
> `codonmap.json`: Map between 3-nucleotide sequence to amino acid
> 
> `aminoacids.json`: Contains info on 20 amino acids used in cells and their properties
> 
> `knownproteins.json`: Known protein sequences gathered from the New York Times Article ["The Coronavirus Unveiled"](https://www.nytimes.com/interactive/2020/health/coronavirus-unveiled.html) 

Install the node modules with `npm install`. Run `translate.js` to grab the coded proteins.

**![Alt text](public/covidimg.png?raw=true "Title")**

## Why study the Coronavirus?

The Coronavirus, or SARS-CoV-2 (SC2), is a virus that infects humans and causes a disease referred to as COVID19. While most people infected with this virus have no symptoms, others suffer severe flu-like conditions and shortness of breath. How does something that cannot even be considered "living" cause such disturbing consequences? Our goal is to analyze the SARS-CoV-2 genome from first principles to answer such questions.

All living things, while incredibly mysterious in aggregate, are composed of cells. Cells, in turn, have been well studied by biologists and other scientists. In fact, cells follow just 3 basic principles: they hold genetic material in the form of DNA, that genetic material is translated into amino acid sequences, and those amino acid sequences fold up into unique shapes (called proteins) which determine their respective functions. And proteins drive all cell processes necessary for life. While this description is just scratching the surface of the rich complexity in a cell, it is all we need to understand the basic behavior of SC2.

## Going from Corona RNA to Corona Proteins

How does the coronavirus genetic material make more coronavirus? 

To answer this, let's first look at how a normal cells processes genetic material. Deep inside the nucleus of a cell, DNA nucleotides called Thymine (T), Guanine (G), Cytosine (C), and Adenine (A) are paired up across two sugar-based strands. Thymine pairs with Adenine and Guanine pairs with Cytosine. The double stranded nature of DNA allows for incredible stability in cell reproduction, but more importantly for our purposes, the sequence of A's, T's, C's, and G's provide a unique code which can be read and represent what the cell should do.

DNA is useless if the rest of the cell cannot read it for instructions. However, DNA cannot move in and out of the nucleus (and you wouldn't want it to either, its too crucial!), so we need a "messenger" that can send a signal to build the proteins the cell needs. The cell solves this with messenger RNA (or mRNA). Like DNA, mRNA is composed of nucleotides, but with one difference: RNA replaces Thymine with Uracil, another nucleotide. A sequence of DNA like `ATGAGTGTTATTGC` would be converted to `AUGAGUGUUAUUGC` as RNA. Once the cell translates its DNA into a single mRNA strand, it can move out of the nucleus and finally start work.

The next step is to convert or "translate" mRNA into amino acids. Like nucleotides, amino acids are a type of alphabet for the cell, but this time for spelling out proteins. You can see all the amino acids and their properties in `data/aminoacids.json`. Regions of RNA like `AUGAGUGUUAUUGC` are processed through ribosomes and paired with amino acids based on every 3-nucleotide sequence. So the ribosome will look at a section like `AGU` which would correspond with the amino acid `Serine` which is a polar non-charged molecule with the linear formula `HO-CH2-CH(NH2)-COOH`. The ribosome starts coding when it encounters `AUG` and stops at a stop codon like `UAA`. More info about the codons and their corresponding amino acids are available in `data/codonmap.json`

Once the primary sequence of amino acids are linked together, something remarkable happens. These amino acids begin folding up via electromagnetic forces as proteins. These are incredible structures capable of miracles in the molecular world, such as making reactions happen way faster. They are also the mechanism by which Coronaviruses operate.

Like other viruses, SC2 infects the body by injecting its genetic material (RNA in this case) into a human cell. The cell's own ribosomes, which are normally used to construct cellular proteins, are used to construct the viral proteins. These viral proteins roam about the cell taking in material and assembling even more coronavirus. After this has gone on long enough, the cell bursts from excess coronavirus and the new coronaviruses begin the process again in other cells. 

More information in the references section.

## Verifying Corona Proteins

As a first step in confirming our understanding, let's verify that the raw Coronavirus RNA maps to the known proteins that it generates. As a recap, here is the data used (see data directory):

> `rawrna.json`: Contains sequenced coronavirus genome
> 
> `codonmap.json`: Map between 3-nucleotide sequence to amino acid
> 
> `aminoacids.json`: Contains info on 20 amino acids used in cells and their properties
> 
> `knownproteins.json`: Known protein sequences gathered from the New York Times Article ["The Coronavirus Unveiled"](https://www.nytimes.com/interactive/2020/health/coronavirus-unveiled.html) which was sourced from [Zhang Lab] (https://zhanglab.ccmb.med.umich.edu/COVID-19/)

We will simulate the transcription and translation process with some basic code found here `scripts/translate.js`

The resulting proteins can be found here: `processed/translatedProteins.json`

But something seems wrong. If we compare those proteins with ones sequenced by a lab (like from Zhang Lab here: `data/knownproteins.json`), there are quite a few more proteins and with different sequences than what the mRNA to protein algorithm suggests. We can see the comparison between these two proteins in `data/processed/translatedComparison.json` (which is generated by running `scripts/compareTranslated.js`). Only 7 out of 20 proteins match our translated proteins exactly. So why is there such a big difference?

## Post-translational modifications


## References

**Genetic Data Sources**

All known Sars-Cov-2 proteins data available in `data/knownproteins.json` (gathered from the New York Times Article ["The Coronavirus Unveiled"](https://www.nytimes.com/interactive/2020/health/coronavirus-unveiled.html))

Full RNA sequences available here in `data/rawrna.json` (Obtained from [NCBI GenBank](https://www.ncbi.nlm.nih.gov/labs/virus/vssi/#/virus?SeqType_s=Nucleotide&VirusLineage_ss=SARS-CoV-2,%20taxid:2697049&Completeness_s=complete))

Building phylogenetic trees + other lecture notes
- https://www.ncbi.nlm.nih.gov/CBBresearch/Przytycka/download/lectures/PCB_Lect11_Phylogen_Trees.pdf
- https://www.ncbi.nlm.nih.gov/CBBresearch/Przytycka/index.cgi#lectures

Zhan Lab - SARS CoV 2 - Nucleotide, Coding Region, and Protein sequences
https://zhanglab.ccmb.med.umich.edu/COVID-19/

SARS CoV 2 - Tree of Complete Sequences: https://www.ncbi.nlm.nih.gov/labs/virus/vssi/#/precomptree

Labs Protein Databank: https://www.uniprot.org/uniprot/Q0ZJN1

**Open Source Libraries**

George Hotz Covid19: https://github.com/geohot/corona

Other open source resources: http://open-source-covid-19.weileizeng.com/

Awesome-Coronavirus https://github.com/soroushchehresa/awesome-coronavirus

Deep Learning Coronavirus Cure: https://github.com/mattroconnor/deep_learning_coronavirus_cure

**Biology Resources**

Textbook: Life: Science of Biology

EdX Biology Course (see translation and transcription)
- https://www.edx.org/course/introduction-to-biology-the-secret-of-life-3

MIT OCW Biology 
- https://ocw.mit.edu/courses/biology/7-014-introductory-biology-spring-2005/index.htm
- https://ocw.mit.edu/courses/biology/7-012-introduction-to-biology-fall-2004/index.htm


Biology basics - https://www.khanacademy.org/science/biology

**Other Resources**

Turning Genome Data into Proteins 
https://biology.stackexchange.com/questions/19658/turning-publicly-available-genome-data-into-proteins?rq=1

And thanks to the Harvard Extension Biology team for providing a lot of the background for this post!
