# Market App

Market app is a React project that performs basic operations which are used in frontend development often; like filtering and sorting, calling API to to get or send data.
It consists of a single page that mocks an e-commerce page. User can filter products by brand, tag and item type, sort products by date or price and can add product to shopping cart or remove from it.

#### Heroku link to working project: 
https://market-app-getir.herokuapp.com/

#### Netlify link to working project: 
https://62155ab04053812703c01a79--super-cool-site-by-n-sare.netlify.app/

# Installation and Usage
Use the package manager [npm](https://www.npmjs.com/package/download) to install project.

To clone project, run command: 
```bash
git clone https://github.com/n-sare/market-app.git
```
After cloning project to your local computer, cd into project folder using terminal and then run:

```bash
npm install
```
After libraries and modules installed successfully, you can run project using:

```bash
npm start
```
## Project Folder Structure

Project structure under scr folder looks like this. [Atomic design pattern](https://medium.com/@janelle.wg/atomic-design-pattern-how-to-structure-your-react-application-2bb4d9ca5f97) is used for folder structuring. 

```bash
src
├───api
├───components
│   ├───atoms
│   │   ├───ButtonComponent
│   │   ├───FooterComponent
│   │   └───PreloaderComponent
│   ├───molecules
│   │   └───CardComponent
│   └───organisms
│       ├───BrandFilterComponent
│       ├───ButtonRadioComponent
│       ├───CardContainer
│       ├───Header
│       ├───ShoppingCartContainer
│       ├───SortingComponent
│       └───TagFilterComponent
├───pages
│   ├───MainDesktopPage
│   └───MainMobilePage
├───redux
│   └───modules
│       ├───cart
│       ├───company
│       └───product
└───utils
```
## Libraries and Modules

#### Redux and Thunk Middleware
Redux and Thunk are used for state management. Actions are defined in modules/cart, modules/company and modules/product folders. At action files also reducer is created by functionality defined in utils folder (createReducer.js). Constants are in types.js file located under redux folder directly. redux/modules.index.js file where reducers are combined.

#### AntDesign 
Antd is used as UI kit along with styled components.

#### Axios
Axios is used to send requests to get, put, update or delete data via apis.

#### React Device Detect
React device detect library is used to increase user experience by defining different UI behaviors in mobile and desktop. This library detects if user is on mobile or on desktop.

