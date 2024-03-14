import { TimetableInput, Department,inputData } from "./inputData";

class TimeTableGenerator {
    private readonly inputData: TimetableInput;

    constructor(inputData: TimetableInput) {
        this.inputData = inputData;
    }

    generateTimeTable(): void {
        for (const department of this.inputData.departments) {
            console.log("Generating timetable for department:", department.name);

            for (let section = 1; section <= department.sections; section++) {
                console.log("\nTimetable for Section", section, ":");

                // Generate and print timetable for each section
                const timetable = this.generateSectionTimeTable();
                this.printTimeTable(timetable);
            }
        }
    }

    private generateSectionTimeTable(): string[][] {
        const timetable: string[][] = [];

        // Create an empty timetable grid
        for (let day = 0; day < this.inputData.daysPerWeek; day++) {
            timetable[day] = [];
            for (let slot = 0; slot < this.inputData.hoursPerDay; slot++) {
                timetable[day][slot] = "FREE";
            }
        }

        // Fill in the timetable with subjects
        let currentSubjectIndex = 0;
        for (let day = 0; day < this.inputData.daysPerWeek; day++) {
            for (let slot = 0; slot < this.inputData.hoursPerDay; slot++) {
                if (currentSubjectIndex >= this.inputData.departments[0].subjects.length) {
                    return timetable; // All subjects assigned
                }
                const subject = this.inputData.departments[0].subjects[currentSubjectIndex];
                if (timetable[day][slot] === "FREE") {
                    timetable[day][slot] = subject.name;
                    subject.hoursPerWeek--;
                    if (subject.hoursPerWeek === 0) {
                        currentSubjectIndex++; // Move to the next subject
                    }
                }
            }
        }

        return timetable;
    }

    private printTimeTable(timetable: string[][]): void {
        for (let day = 0; day < this.inputData.daysPerWeek; day++) {
            console.log("Day", day + 1, ":");
            for (let slot = 0; slot < this.inputData.hoursPerDay; slot++) {
                console.log("Slot", slot + 1, ":", timetable[day][slot]);
            }
            console.log(""); // Empty line for readability
        }
    }
}

const timetableGenerator = new TimeTableGenerator(inputData);
timetableGenerator.generateTimeTable();
