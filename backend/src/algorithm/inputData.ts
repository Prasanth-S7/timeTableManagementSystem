export interface Subject {
    name: string;
    teacher: string;
    hoursPerWeek: number;
}

export interface Teacher {
    name: string;
    subjects: string[];
}

export interface Department {
    name: string;
    sections: number;
    subjects: Subject[];
    teachers: Teacher[];
}

export interface TimetableInput {
    departments: Department[];
    hoursPerDay: number;
    daysPerWeek: number;
}

// Sample input data
export const inputData: TimetableInput = {
    departments: [
        {
            name: "Computer Science",
            sections: 3,
            subjects: [
                { name: "Mathematics", teacher: "John Doe", hoursPerWeek: 4 },
                { name: "Computer Programming", teacher: "Alice Smith", hoursPerWeek: 3 },
                // Add more subjects...
            ],
            teachers: [
                { name: "John Doe", subjects: ["Mathematics"] },
                { name: "Alice Smith", subjects: ["Computer Programming"] },
                // Add more teachers...
            ],
        },
        // Add more departments...
    ],
    hoursPerDay: 8,
    daysPerWeek: 5,
};
