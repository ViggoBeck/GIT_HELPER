import express from 'express';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.static('public'));
app.use(express.json());