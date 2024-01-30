# OCP Node.js Starter Application

## Overview

This application demonstrates how to consume the IM services from the OpenText Cloud Platform using Node.js. This is intended to be a server-side app with the simplest set-up to get developers started making API calls to an OCP application using the client_credentials grant.

## Technologies

### Language

JavaScript

### Dependencies
 
[**dotenv**](https://github.com/motdotla/dotenv)  
Reads in environment variables with overrides in .env.

[**axios**](https://github.com/axios/axios)  
Promise based HTTP client for the browser and node.js.

## Prerequisites

- Install the [latest version of Node JS](https://nodejs.org/en/download/current).
- You must have a trial set up with an organization and tenant. You will also need to create a test app and have the confidential client ID and secret values ready to use for authentication. For background information on this see the [documentation](https://developer.opentext.com/imservices/developertools).

## Configuration

- Clone this repository and open it in your IDE. [Visual Studio Code](https://code.visualstudio.com/) can be used for this if you don't have a preferred IDE.
- Update the `.env` file and replace the values using the config for your OCP app.
- Create a file in the root of the project called `.env.secret`. Copy the following into it and replace the secret value using the config for your OCP app:

  ```text
  CLIENT_SECRET=replace-with-clientSecret
  ```

> This is for local development purposes only. The .env.secret file should never be committed to source control. The client secret should always be handled using a secure secret management procedure.

## Usage

To run the application using Node.js, open a terminal in your IDE and run the following commands (from the project root).

```
npm install
npm start
```

The application will fetch a token and will print the names of the Content Metadata service traits in your app.

## Background

### Authentication

Uses the confidential client id and secret with the `client_credentials` grant type. See [fetchAccessToken](src/ocp/fetchAccessToken.js) for the implementation.

### APIs

This example calls the [Content Metadata Service](https://developer.opentext.com/imservices/products/contentmetadataservice) and uses the following endpoint:

#### Trait

* GET Returns list of all trait definitions
