# Local Git Explorer 🔄

A Node.js web application that provides a visual interface to explore and interact with your local Git repository.

## Features

- 📊 **Repository Status**: Check working directory status and view changes
- 📜 **Commit History**: View recent commits in an easy-to-read format
- 🌿 **Branch Management**: List, create, and switch between branches
- 🌐 **Remote Information**: Display configured remote repositories
- 💾 **Commit Changes**: Add and commit files with custom messages
- ⚙️ **Git Configuration**: View local git configuration settings
- 🤖 **AI Safety Education**: Learn safe Git workflows when working with AI coding assistants

## Prerequisites

- Node.js (version 14.0.0 or higher)
- Git installed on your system
- A git repository (the app will work in any directory, but git features require a git repo)

## Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:
	 ```bash
	 npm install
	 ```

## Usage

1. **Navigate to your git repository** (or any directory where you want to explore git):
	 ```bash
	 cd /path/to/your/git/repository
	 ```

2. **Copy the app files to your repository** or **run the app from the LOCAL_GIT directory**:
	 ```bash
	 # Option 1: Run from your git repository (copy files there first)
	 npm start

	 # Option 2: Run from LOCAL_GIT directory (it will explore the LOCAL_GIT repo itself)
	 npm start
	 ```

3. **Open your browser** and go to:
	 ```
	 http://localhost:3000
	 ```

4. **Explore your repository** using the web interface:
	 - Check repository status
	 - View commit history
	 - Manage branches
	 - Commit changes
	 - And more!

## Development

To run in development mode with auto-reload:
```bash
npm run dev
```

## API Endpoints

The app provides several REST API endpoints:

- `GET /api/git/status` - Get repository status
- `GET /api/git/log` - Get commit history
- `GET /api/git/branches` - List all branches
- `GET /api/git/remotes` - Show remote repositories
- `GET /api/git/diff` - Show file changes
- `GET /api/git/info` - Get repository information
- `POST /api/git/commit` - Commit changes
- `POST /api/git/branch` - Create new branch
- `POST /api/git/checkout` - Switch branches

## File Structure

```
LOCAL_GIT/
├── app.js              # Main Express server
├── package.json        # Node.js dependencies and scripts
├── README.md          # This file
└── public/
		└── index.html     # Web interface
```

## How It Works

1. **Express Server**: The `app.js` file creates an Express server that serves the HTML interface and provides REST API endpoints for git operations.

2. **Git Commands**: The app uses Node.js `child_process.execSync()` to execute git commands and return the results to the web interface.

3. **Web Interface**: The HTML page provides a user-friendly interface with buttons and forms to interact with the git repository.

4. **Real-time Updates**: The interface updates in real-time as you perform git operations.

## Safety Features

- Commands are executed with timeouts to prevent hanging
- Error handling for invalid git commands
- Safe command execution with proper error reporting
- Limited to read-only operations by default (except for explicit commit/branch operations)

## Notes

- The app will work best when run from within a git repository
- If not in a git repository, it will show appropriate messages
- All git operations are performed on the local repository only
- The app does not perform any remote git operations (push, pull, fetch)

Enjoy exploring your git repository! 🚀