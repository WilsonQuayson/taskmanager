import { NextApiRequest, NextApiResponse } from "next";
import { TaskItem } from "../../../types";

// pages/api/example.js
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const response = await fetch('http://localhost:5113/api/TaskItems');
        if(response.ok){
            const data: TaskItem[] = await response.json();
            res.status(200).json(data);
        }else{
            throw new Error("Failed to fetch data from backend")
        }
    } 
    else if (req.method === 'POST') {
        const body = req.body;
        const response = await fetch('http://localhost:5113/api/TaskItems', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data: TaskItem = await response.json();
        res.status(201).json(data);
    }
    else if (req.method === 'DELETE') {
        const { id } = req.query;
        if (!id || typeof id !== 'string') {
            res.status(400).json({ error: "Missing or invalid task ID" });
            return;
        }

        const taskId = parseInt(id, 10);

        if (isNaN(taskId)) {
            res.status(400).json({ error: "Invalid task ID" });
            return;
        }

        const response = await fetch(`http://localhost:5113/api/TaskItems/${taskId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            res.status(204).end(); // No content
        } else {
            res.status(500).json({ error: "Failed to delete task" });
        }
    }
    else if (req.method === "PATCH") {
        const { id } = req.query;

        if (!id || typeof id !== 'string') {
            res.status(400).json({ error: "Missing or invalid task ID" });
            return;
        }

        const taskId = parseInt(id, 10);

        if (isNaN(taskId)) {
            res.status(400).json({ error: "Invalid task ID" });
            return;
        }

        const response = await fetch(`http://localhost:5113/api/TaskItems/${taskId}/complete`, {
            method: 'PATCH',
        });

        if (response.ok) {
            res.status(204).end(); // Success, no content
        } else {
            res.status(500).json({ error: "Failed to update task" });
        }
    }
}
