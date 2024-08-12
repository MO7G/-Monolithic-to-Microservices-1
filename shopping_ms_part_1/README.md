Microservices Project Setup
This project consists of multiple microservices, each contained in its own directory. The current microservices are:

products
shopping
customer
Project Setup Instructions
To streamline the setup process, a shell script (setup.sh) is provided. This script will automatically create the necessary folders, initialize each microservice with npm, and install the required dependencies.

Prerequisites
Make sure you have the following installed on your system:

Node.js (v14 or above)
npm
Setup Steps
Clone the Repository

First, clone this repository to your local machine.

bash
Copy code
git clone https://your-repo-url.git
cd your-repo-directory
Make the setup.sh Script Executable

Before running the setup script, you'll need to make it executable. Run the following command:

bash
Copy code
chmod +x setup.sh
Run the Setup Script

Now, run the setup script to initialize the project and install dependencies for each microservice:

bash
Copy code
./setup.sh
