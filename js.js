import express from 'express';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Helper function to execute git commands safely
function executeGitCommand(command) {

    try {
        const result = execSync(command, {
            encoding: 'utf8',
            cwd: process.cwd(),
            timeout: 5000
        });
        return { success: true, output: result.trim() };
    }


    catch (error) {
        return { success: false, output: error.message };
    }
}
