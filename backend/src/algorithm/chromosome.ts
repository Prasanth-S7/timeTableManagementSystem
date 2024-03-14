import Gene from "./Gene";
import { Subject } from "./inputData";

class Chromosome {
    genes: Gene[];
    fitness: number;

    constructor(subjects: Subject[], timeSlots: number) {
        this.genes = [];
        this.fitness = 0;

        // Initialize genes with subjects
        for (let i = 0; i < timeSlots; i++) {
            const gene = new Gene(i);
            this.genes.push(gene);
        }

        // Assign subjects to genes
        for (const gene of this.genes) {
            gene.assignSubject(this.getRandomSubject(subjects));
        }
    }

    calculateFitness(): void {
        // Calculate fitness based on constraints and objectives
        let clashes = 0;

        // Count subject clashes
        for (let i = 0; i < this.genes.length; i++) {
            const currentGene = this.genes[i];
            const currentSubject = currentGene.subject;
            if (currentSubject) {
                for (let j = i + 1; j < this.genes.length; j++) {
                    const otherGene = this.genes[j];
                    const otherSubject = otherGene.subject;
                    if (otherSubject && currentSubject.name === otherSubject.name) {
                        clashes++;
                    }
                }
            }
        }

        // Fitness is inversely proportional to the number of clashes
        this.fitness = 1 / (1 + clashes);
    }

    mutate(subjects: Subject[]): void {
        // Implement mutation operation
        // Randomly select a gene and change its assigned subject
        const randomIndex = Math.floor(Math.random() * this.genes.length);
        const gene = this.genes[randomIndex];
        gene.mutate(subjects);
    }

    crossover(partner: Chromosome): Chromosome {
        // Implement crossover operation
        // Randomly select a crossover point and create a new chromosome by swapping genes from both parents
        const crossoverPoint = Math.floor(Math.random() * this.genes.length);
        const childGenes = [...this.genes.slice(0, crossoverPoint), ...partner.genes.slice(crossoverPoint)];
        const child = new Chromosome([], this.genes.length);
        child.genes = childGenes;
        return child;
    }

    private getRandomSubject(subjects: Subject[]): Subject {
        const randomIndex = Math.floor(Math.random() * subjects.length);
        return subjects[randomIndex];
    }
}

export default Chromosome;
