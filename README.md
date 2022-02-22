# Market App

Market app is a React project that performs basic operations which are used in frontend development often; like filtering and sorting, calling API to to get or send data.
It consists of a single page that mocks an e-commerce page. User can filter products by brand, tag and item type, sort products by date or price and can add product to shopping cart or remove from it.

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
##Project Structure under src folder looks like this:

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
