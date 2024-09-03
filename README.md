

# ChatBot Project



Follow the steps below to clone, install dependencies, and run the project.

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker]()

### Step 1: Clone the Project

Clone the repository using the following command:

```powershell
git clone https://github.com/senadmustafi/ChatBot_Backend.git
```

# Instructions

### Step 2: Navigate to the Project Directory
```powershell
cd <project_directory>
```
### Step 3: Build and Run the Project

```powershell
$env:TAG='v1.0.0'; docker compose build --no-cache
docker compose up
```

This will build the project with the specified tag (`v1.0.0`) and start the services defined in your `docker-compose.yml` file.


## Step 4: Set Up the Frontend

After setting up the backend, follow the instructions to set up the frontend by visiting [this link](https://github.com/senadmustafi/ChatBot).
