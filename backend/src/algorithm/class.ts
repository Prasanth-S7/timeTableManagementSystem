// Define the input data structure
interface Subject {
    name: string;
    teacherCount: number;
    hoursPerWeek: number;
}

interface TimeSlot {
    startTime: string;
    endTime: string;
}

interface Department {
    name: string;
    sectionCount: number;
}

interface TimetableInput {
    department: Department;
    subjects: Subject[];
    daysPerWeek: number;
    timeSlotsPerDay: number;
    timeSlotDuration: number; // in minutes
    startTime: string;
    endTime: string;
}

// Function to prompt user for department and section count
function promptUserForDepartment(): Department {
    let departmentName: string | null = null;
    let sectionCount: number | null = null;

    while (!departmentName) {
        departmentName = prompt("Enter department name:");
        if (departmentName === null) {
            console.log("Department name cannot be empty. Please enter a valid department name.");
        }
    }

    while (sectionCount === null) {
        const sectionCountString = prompt("Enter number of sections in the department:");
        if (sectionCountString === null) {
            console.log("Section count cannot be empty. Please enter a valid section count.");
        } else {
            sectionCount = parseInt(sectionCountString);

            if (isNaN(sectionCount) || sectionCount <= 0) {
                console.log("Invalid section count. Please enter a positive integer.");
                sectionCount = null;
            }
        }
    }

    return { name: departmentName, sectionCount };
}


// Define the input data
export const inputData: TimetableInput = {
    department: promptUserForDepartment(),
    subjects: [
        { name: "Math", teacherCount: 2, hoursPerWeek: 6 },
        { name: "Science", teacherCount: 3, hoursPerWeek: 5 },
        { name: "English", teacherCount: 1, hoursPerWeek: 4 },
        // Add more subjects as needed
    ],
    daysPerWeek: 5,
    timeSlotsPerDay: 8,
    timeSlotDuration: 5,
    startTime: "8:00 AM",
    endTime: "3:00 PM"
};
