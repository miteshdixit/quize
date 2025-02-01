Quiz App
This is a Quiz App built with React, Vite, and TailwindCSS. It demonstrates the use of APIs, proxy configuration in Vite, localStorage management, and industrial design principles with illustrations. The app is designed for an engaging and responsive user experience.

<!-- Features -->

API Integration: Fetches quiz data dynamically from an external API using a proxy configuration.
Proxy Configuration: Configured via Vite’s proxy feature to handle API requests and avoid CORS issues during development.
LocalStorage Management: Stores and retrieves user data such as score and player name for personalized experience.
Responsive UI with TailwindCSS: Tailored for modern web design, ensuring a responsive interface across devices.
Illustrations: SVG illustrations are used throughout the app to enhance visual appeal and engage the user.
Getting Started

Prerequisites
npm or yarn: You can choose to use either npm or yarn as your package manager.

<!-- Installation -->

Clone the repository:

<!-- Git Details  -->

git clone https://github.com/miteshdixit/quiz.git
cd my-app

<!-- Dependensies -->

Install the dependencies:

npm install

# or

yarn install
Running the App
Start the development server:

npm run dev

# or

yarn dev
Open your browser and navigate to http://localhost:3000.

API Proxy Configuration
The Vite configuration file (vite.config.js) includes a proxy setup to handle API requests. This ensures that API calls are routed through the development server, avoiding CORS issues during development.

<!-- // vite.config.js -->

import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';

export default defineConfig({
plugins: [tailwindcss()],
server: {
proxy:
process.env.NODE_ENV === "development"
? {
"/api": {
target: "https://api.jsonserve.com", // Your actual API endpoint
changeOrigin: true,
rewrite: (path) => path.replace(/^\/api/, ""),
},
}
: {},
},
});

<!-- SOME IMPORTANT CHANGES -->

i have facing issues with api url as there is CORS issues so i need to store the data locally in public directory and i am fetcing data from there , once api get fix issues will be fixed only need is to change the api url.

<!-- LOCAl storage  -->

LocalStorage Management
The app uses localStorage to store the player's score and name. This data is used to personalize the results page and provide a custom greeting.

<!-- uses of loacal storage -->

// /src/pages/Result.jsx
const score = localStorage.getItem("score") || 0;
const player_name = localStorage.getItem("name") || "Player";

// Render personalized results:

<div>
  <h1>Well Done, {player_name}!</h1>
  <p>Your score: {score}</p>
</div>
Design and Illustrations
The app uses TailwindCSS for styling, ensuring that the interface is modern and fully responsive. Additionally, SVG illustrations are used to enhance the user experience and make the app visually appealing.

// /src/pages/Result.jsx

<div className="absolute top-[5%] right-[-10%] z-1000 md:right-[23%] md:top-[18%]">
  <img
    src="result.svg"
    alt="Result Illustration"
    className="h-[5%] w-[50%] opacity-100"
  />
</div>
<!-- Features in Detail -->

API Integration:
The app fetches quiz questions from an API endpoint. The questions are displayed sequentially, allowing users to answer them one by one.
The app dynamically retrieves questions, ensuring a fresh quiz each time.

<!-- State Management: -->

The app uses React's useState and useEffect hooks to manage state such as the current question, score, and timer.
It uses localStorage to persist the user’s score and name across page reloads.

<!-- Dynamic Quiz Timer: -->

The quiz has a built-in countdown timer, which is paused when the hint modal is open. Once the timer reaches zero, the quiz ends, and the results are displayed.

<!-- Results Page: -->

After completing the quiz, the player is shown a personalized result page with their score. The name and score are retrieved from localStorage.
Future Enhancements

<!-- Question Randomization: -->

Currently, questions are fetched in a fixed order. Implementing a randomization feature would make each quiz session unique.

Mobile-First Design: Enhance mobile experience with more optimization.
Project Structure

<!-- Project Structure -->

/quiz-app
|-- /public
| |-- index.html # Entry HTML file
| |-- result.svg , puzzle.svg etc..... # SVG illustrations
|-- /src
| |-- /components
| |--|--Hint.jsx
| |--|--Timer.jsx
| |-- /pages
| | |-- Home.jsx  
| | |-- Result.jsx # Displays results after the quiz
| | |--Quize.jsx # Displays the main quiz page
| |-- App.jsx # Main React component
| |-- index.js # React entry point
|-- /styles
| |-- tailwind.css # TailwindCSS file
| |-- global.css # Global CSS for custom styles
|-- vite.config.js # Vite configuration file
|-- package.json # Project dependencies and scripts

License
This project is licensed under the MIT License.

<!-- No license currently -->
