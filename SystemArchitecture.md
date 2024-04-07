# MusclMate Application Architecture

This document describes the overall architecture of the MusclMate Web Application. 

## Highlevel Component Digram

![Component Diagram](images/component_diagram.jpeg)

The webclient's UI is served with React.js + Vite, using components from the [Shadcn/ui](https://ui.shadcn.com/) library to create a modern looking library. The UI is served in CI/CD via Vercel - which deploys all changes to the main branch to our [production web page](muscl-mate.vercel.app). 

The server and all subsequent API interactions for the logic of the code currently go through AWS's EC2 instance on the free tier. This rotues our express server written in TypeScript to the internet, allowing it to be accessed from all devices no matter where they are. Additionally, using AWS's RDS system, we also have a Postgresql Database connected to the server - which allows storage of data that is served to the main page. In order for this to work, the EC2 instance and RDS instance had to share the same security group. 

Docker and Github actions are being explored to add continous devliery to the EC2 instance. 

## Relationship Diagram

![Relationship Diagram](images/er_diagram.png)

As of this moment, we have three tables, they are: exercises, user, workout_plans. The three represent the basic information we need on the site as of this moment, the exercises table contains all of the exercises and relevant information related to them. The user table contains basic user information that we can use in their session to show them their favorite exercises and workouts. The workout_plans table just contains (in order) the list of exercises contained within a playlist. 
The exercises and public playlists all contain a "keywords" array which is a planned feature that allows us to search more efficiently based on semenatic meaning (embeddings, etc.). Currently they will only represent a certain topic that will be displayed on the user's webpage. 

## Flow Diagram

![Flow Diagram](images/sequence_diagram.jpeg)

CoRise Stretch: replace the diagram image, and add a text description