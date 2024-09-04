# CSIRT Showcase Application

## Overview

The CSIRT Showcase Application is designed to showcase Computer Security Incident Response Teams (CSIRTs) across Africa. The application allows users to view CSIRTs on a map according to their country location, filter the CSIRT list by various attributes, and see detailed information about each CSIRT. The backend is built with Django REST Framework, and the frontend is developed using Vue 3 and Tailwind CSS.

## Features

- **Map Visualization**: Display CSIRTs on a map of Africa based on their geographical location.
- **Filter List**: Filter the CSIRT list by name, country, website, and description.
- **Detail View**: View detailed information about each CSIRT.

## Technologies

- **Frontend**: Vue 3, Tailwind CSS
- **Backend**: Django REST Framework
- **Deployment**: Netlify

## Installation

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm (Node Package Manager)

### Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>

## Install Dependencies
npm install

##Set Up Environment Variables
Create a .env file in the root directory with the following content:
VUE_APP_API_BASE_URL=http://localhost:8000/api

##Running the Application Locally
1 Start the Development Server
2 Open in Browser

Visit http://localhost:8080 to view the application.

##Building for Production
This command will generate a dist directory with production-ready files.


Deployment on Netlify
Create a Netlify Account

Sign up for a Netlify account if you do not already have one.

Connect Your Repository

Log in to Netlify.
Click on “New site from Git.”
Connect to your Git repository (GitHub, GitLab, or Bitbucket).
Configure Build Settings

Build Command: npm run build
Publish Directory: dist
Deploy

Click “Deploy site” to start the deployment process.
Netlify will automatically build and deploy your application.
Once deployed, Netlify will provide a live URL for your application.
Update Environment Variables on Netlify

If your application uses environment variables (e.g., VUE_APP_API_BASE_URL), set them up in Netlify:

Go to your Netlify dashboard.
Navigate to your site’s settings.
Under the “Build & Deploy” section, click “Environment.”
Add your environment variables here, such as VUE_APP_API_BASE_URL with the appropriate value.
Verify Deployment

After deployment, visit the provided Netlify URL to ensure everything is working correctly.
Check the console and network tabs in your browser’s developer tools for any issues.
Usage
View CSIRTs on Map: Navigate to the map view to see CSIRTs displayed by their location.
Filter CSIRT List: Use the search bar to filter CSIRTs by name, country, website, or description.
View CSIRT Details: Click on any CSIRT in the list or on the map to view detailed information.

