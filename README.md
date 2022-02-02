# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

## Features
- Tweets
  - Loads tweets on page load in reverse-chronological order
  - Sends composed tweet to in-memory database
  - Loads new tweet after its been inserted to db
  - Automatic tweet age calculation
- Site
  - Reactive to screen size
  - Animated error messages
  - Appropriate hover effects
  - Dynamic navigation buttons

## Final Product Images
### 1900px width screen
![desktop](/readme_resources/imgs/desktop.png)
### 1100px width screen
![smaller desktop](/readme_resources/imgs/desktop-smaller.png)
### 1000px width screen
![mobile](/readme_resources/imgs/mobile.png)

## Dependencies

- Required
  - [Node 5.10.x or above](https://nodejs.org/en/)
  - [Express](https://expressjs.com/)
  - [body-parser](https://www.npmjs.com/package/body-parser)
  - [chance](https://www.npmjs.com/package/chance)
  - [md5](https://www.npmjs.com/package/md5)
  - in public/index.html
    - [Normalize.css](https://necolas.github.io/normalize.css/)
    - External JS
      - [jQuery 3.4.1](https://code.jquery.com/jquery-3.4.1.js)
      - [timeago.js](https://timeago.org/)
      - [Font Awesome Library](https://fontawesome.com/)
    - Fonts
      - [Bungee](https://fonts.google.com/specimen/Bungee)
      - [Source Sans Pro](https://fonts.google.com/specimen/Source+Sans+Pro)
- Dev
  - [Sass](https://sass-lang.com/)
  - [Nodemon](https://www.npmjs.com/package/nodemon)

## Getting Started

1. ```git clone git@github.com:JoshuaOLoduca/Tweeter.git```\
to a folder
2. cd into folder and run ```npm install```
3. run ```npm start``` to spin up a testing server\
OR ```npm run local``` to spin up a development server with nodemon
4. access in web browser @ http://localhost:8080

If developing, run ```npm sass-watch``` to compile sass templates in real time.