# Code 301 Final Project: Goya
Final Project Repo

## Team Members 
Nadya Ilinskaya
Quang Nguyen
Sam Gnuschke
Sarah Fisher 

## Version
1.0.0 

## Project title
Goya - Live your story

The name Goya comes from the Urdu language. It refers to the suspension of disbelief that happens when fantasy is so realistic that it temporarily becomes reality. It's commonly associated with powerful storytelling and is included in the world's 20 most beautiful, untranslateable words. 

## Problem Domain
Our concept is to break through the language barriers for travelers and those living in a place where they are new to the common tongue. The app allows the user to communicate across any language currently supported by Google's Translate API.

## Deployment
https://goya-translation.herokuapp.com/

## Instructions to run the app on your computer
- npm install in terminal
- open PSQL, run command: CREATE DATABASE goya
- add schema to your database, run command: psql -d goya -f ./data/schema.sql
- Google Cloud API key: Follow the instructions in the following link to create your API key
  - https://cloud.google.com/speech-to-text/docs/reference/libraries#client-libraries-install-nodejs
- add .env file to your local copy of the app code
  - include your localhost port: PORT = 3000
  - the google API: GOOGLE_APPLICATION_CREDENTIALS = /pathfromtheplaceyoustoredyourGoogleAPIJSONfile
  - the database: (Windows) DATABASE_URL = postgres://user:password@localhost:5432/goya (Mac) DATABASE_URL = postgres://@localhost:5432/goya
- run node server.js
- open web browser and go to localhost:3000 to view the homepage

### Contribute
No contribution guidelines at this point. 

## Build status
### Planning phase
#### User Stories
"As a user, I want to be able to translate what I am saying so that another person can see what I said translated into their language."
"As a user, I want to be able to save past translations so that I can see them later."
"As a user, I want to be able to play back past translations so I can 'speak' to others in their language."
"As a developer, I want the user to have a comfortable experience with the application."
"As a developer, I want the application to be mobile first yet capable of being used from a computer that has a microphone."
"As a developer, I want to save the user information so that individuals can have their own saved translations."
"As a user, I want to be able to access the 'How to use' information in multiple languages."
"As a user, I want to see my username displayed in the app pages while I am logged in"
"As a developer, I want useful and descriptive error functions throughout the code actions to assist with debugging and communicating with the user."
"As a developer, I want to convey my story and that of my team to the user."

#### Wireframes
![alt text](/assets/Wireframe-Draft)

#### Code of Conduct and Conflict Plan
- We will strive to create an open and welcoming environment where participation and contribution to the project and general community is a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.
- We will use welcoming and inclusive language, be respectful of differing viewpoints and experiences, gracefully accept constructive criticism, focus on what is best for the team and the community, and show empathy towards others.
- We will not tolerate unwelcome sexual attention or advances, trolling, insulting/derogatory comments, and personal or political attacks, public or private harassment, publishing others’ private information, or other conduct which could reasonably be considered inappropriate in an academic and professional setting.
- We agree to work as a team to hold each other accountable to these responsibilities and take appropriate and fair corrective action in response to any instances of unacceptable behavior. We will not retaliate against those who have a differing opinion or those who hold others accountable.
- We will work as a team to support each individual reaching their full potential.
- If disagreements arise in the team we will make sure that everyone has a chance to state their opinion and be heard, not spoken over or dismissed, and discuss possible solutions as a team. If attempts to resolve the conflict is unsuccessful and a solution cannot be agreed upon we will escalate the discussion by asking one of the TAs or the instructor to mediate.
- If a team member is not adequately contributing we will raise the concern by speaking with them individually or as a team. We will focus on how we can help them contribute more. Are they struggling with something that is keeping them from moving forward? Are there other areas of the project they feel more comfortable contributing to? Consider the needs of the individual as well as the team.

#### Communication Plan
- We will strive to make sure the team members communicate with each other regularly to keep the team running at the same pace and that everyone feels comfortable speaking up.
- We will you communicate after hours through Slack. If there is any work done (coding, Trello, etc) the team member will send a summary of what was done so everyone is on the same page and we can keep the documentation updated.
- We will listen to hear, not to reply, to ensure everyone's voice is heard. We will also make sure each team member agrees to the decisions made in the project before they are acted upon.
- We will create a safe environment where everyone feels comfortable speaking up by following our code of conduct and keeping each other accountable.

### Project Scope
#### MVP
- Main app page has two translation interfaces where the user can select languages to translate between. The user can speak to the app in one language and have the transcipt display in the selected second language. There will be a second page displaying past translations and a third page that shares information about the team.
#### Stretch
- Create unique usernames and allow each user to have custom data assigned to their username
- Have a custom menu to move smoothly between the multiple pages
- Have a custom, animated recording icon so the user more easily can see when the app is listening
- Give the user the option to save translations to their account
- Display the saved translations on a page based on the users database
- Give the user the ability to delete saved translations
- Give the user the ability to modify saved translation strings
- Have the username display on each page when the user is logged in to the app
- Build user authentification
- Display a custom message on the Saved Translations page when there are none saved yet to remind the user they are able to save
- Display a custom message on the Saved Translations page when the code is not able to find a user's saved translations
- Build a How to use the app page to support new users learning the app's functionality
- Give the user language options on the How to use the app page to translate the instructions

### Project Organization
 - Kanban board on Trello: https://trello.com/b/5HxdkU7g/goya-app

├── package-lock.json
├── package.json
├── public
|   ├── assets
|   ├── styles
|   |   ├── base.css
|   |   ├── layout.css
|   |   └── reset.css
|   └── js
|       └── app.js
├── data
|   └── schema.sql
├── server.js
└── views
    ├── index.ejs
    ├── about-us.ejs
    ├── footer.ejs
    ├── head.ejs
    ├── how-to.ejs
    ├── savedPhrases.ejs
    └── header.ejs

#### Daily Team Workflow
Day 1: Brainstorm project scope, build organization and repo on Github, declare MVP, designate stretch goals, create basic wireframes, start writing user stories based on MVP, build repo branch structure, deploy on Heroku and complete proof of life check, decide on app name, built About Me page with content, draft ReadMe, start code in app.js, base.css, modules.css, and templates (ejs), created Trello team and board, build database structure, write and agree on code of conduct, conflict and communication plans.

Day 2: Delete functionality, save functionality, created database page, saved phrases displayed, hacked heroku site properly displaying translation, added users, local storage, and requirement for unique user name, coded base of UI, created skeleton page for How to Use App, .

Day 3: 

Day 4: 

Day 5: Presentation Day!

## Code style
Code style is strict JavaScript, HTML, CSS, jQuery, EJS

## API Reference
Google Cloud Translation API: https://cloud.google.com/translate/

## Database 
- Clearly defined database schemas

## Tests
No tests at this time. 
- Clearly defined API endpoints with sample responses


## Credits
* Jacob Knaack
* Dan-Huy Le
* https://meyerweb.com/eric/tools/css/reset/ CSS Reset Tool
* https://nodejs.org/en/

## License
MIT © Code Fellows
![CF](https://i.imgur.com/7v5ASc8.png)