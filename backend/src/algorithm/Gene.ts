import { Subject } from "./inputData";

class Gene {
    subject: Subject | null;
    slotNo: number;

    constructor(slotNo: number) {
        this.subject = null;
        this.slotNo = slotNo;
    }

    assignSubject(subject: Subject): void {
        this.subject = subject;
    }

    unassignSubject(): void {
        this.subject = null;
    }

    isAssigned(): boolean {
        return this.subject !== null;
    }

    mutate(subjects: Subject[]): void {
        // Implement mutation operation
        // Randomly select a subject and assign it to the gene
        const randomIndex = Math.floor(Math.random() * subjects.length);
        this.assignSubject(subjects[randomIndex]);
    }
}

export default Gene;
