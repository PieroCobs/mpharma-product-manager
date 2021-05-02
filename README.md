# **mPharma Product Management App**

Displays a list of pharmaceutical products and their historical prices. Users can:
- Add new products; 
- Delete product; or 
- Edit product details, including prices. 

## Packages / Libraries Used
The project was built with `ReactJS` using the `NextJS` framework, `Redux` for state management, and `styled-components` for styling. Below is a detailed breakdown of packages/libraries used:

**Dependencies:**
| Package | Version |
| ----------- | ----------- |
| [react](https://reactjs.org/) | ^17.0.2 |
| [react-dom](https://reactjs.org/docs/react-dom.html) | ^17.0.2 |
| [next](https://nextjs.org/) | ^10.2.0 |
| [redux](https://redux.js.org/) | ^4.1.0 |
| [react-redux](https://react-redux.js.org/) | ^7.2.4 |
| [styled-components](https://styled-components.com/) | ^5.2.3 |
| [moment](https://momentjs.com/) | ^2.29.1 |
| [react-spinners](https://www.npmjs.com/package/react-spinners) | ^0.10.6 |

<br/>

**Dev Dependencies:**
| Package | Version |
| ----------- | ----------- |
| [redux-devtools-extension](https://www.npmjs.com/package/redux-devtools-extension) | ^2.13.9 |

*Refer to `package.json` file for specific versions of above packages*

## Setup / Installation
**Start Development Server**
1. Clone the repo by running this command: `git clone https://github.com/PieroCobs/mpharma-product-manager.git`
2. Run `npm install` in your terminal to install dependencies <br/>(You'd have to have NodeJS installed on your machine to use npm. Head to [https://nodejs.org/en/](https://nodejs.org/en/) if not already installed)
3. Run `npm run dev` to start development server
4. Open browser and navigate to `localhost:3000`

> The code for the development server is located at `/server.js`. The server runs on a port number defined as `CUSTOM_PORT` inside `/.env` — in this case, **3000**. This can change when being run in production.

**Create a static build**

To create a static build to be uploaded to a shared hosting server: 
1. Run `npm export`, which runs `next build` and `next export`.
2. Find the output of the previous command in `/out/`. This static build can be uploaded to the server. 


