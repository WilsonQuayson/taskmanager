export interface TaskItem {
    id: number;
    title: string;
    description: string; // Optional field, corresponds to string? in C#
    isCompleted: boolean;
    createdAt: string; // DateTime in C# corresponds to string in JSON (ISO 8601 format)
    dueDate: string | null; // Nullable DateTime corresponds to string or null
}
