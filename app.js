const express = require('express');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

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
	} catch (error) {
		return { success: false, output: error.message };
	}
}

// Routes
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get git status
app.get('/api/git/status', (req, res) => {
	const result = executeGitCommand('git status --porcelain');
	res.json(result);
});

// Get git log
app.get('/api/git/log', (req, res) => {
	const result = executeGitCommand('git log --oneline -10');
	res.json(result);
});

// Get git branch info
app.get('/api/git/branches', (req, res) => {
	const result = executeGitCommand('git branch -a');
	res.json(result);
});

// Get git remote info
app.get('/api/git/remotes', (req, res) => {
	const result = executeGitCommand('git remote -v');
	res.json(result);
});

// Get git diff
app.get('/api/git/diff', (req, res) => {
	const result = executeGitCommand('git diff --name-only');
	res.json(result);
});

// Get repository info
app.get('/api/git/info', (req, res) => {
	const repoPath = process.cwd();
	const gitDir = path.join(repoPath, '.git');

	const info = {
		repositoryPath: repoPath,
		isGitRepo: fs.existsSync(gitDir),
		gitDir: gitDir
	};

	if (info.isGitRepo) {
		const configResult = executeGitCommand('git config --list --local');
		info.config = configResult;
	}

	res.json(info);
});

// Add and commit files
app.post('/api/git/commit', (req, res) => {
	const { message, files } = req.body;

	try {
		// Add files
		if (files && files.length > 0) {
			const addResult = executeGitCommand(`git add ${files.join(' ')}`);
			if (!addResult.success) {
				return res.json(addResult);
			}
		}

		// Commit
		const commitResult = executeGitCommand(`git commit -m "${message}"`);
		res.json(commitResult);
	} catch (error) {
		res.json({ success: false, output: error.message });
	}
});

// Create a new branch
app.post('/api/git/branch', (req, res) => {
	const { branchName } = req.body;
	const result = executeGitCommand(`git checkout -b ${branchName}`);
	res.json(result);
});

// Switch branch
app.post('/api/git/checkout', (req, res) => {
	const { branchName } = req.body;
	const result = executeGitCommand(`git checkout ${branchName}`);
	res.json(result);
});

app.listen(PORT, () => {
	console.log(`🚀 Local Git Explorer running on http://localhost:${PORT}`);
	console.log(`📂 Repository: ${process.cwd()}`);
});