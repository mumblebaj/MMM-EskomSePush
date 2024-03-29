# MMM-EskomSePush

A [MagicMirror²](https://magicmirror.builders) module to display South African Loadshedding schedule using data from [EskomSePush](https://eskomsepush.gumroad.com/l/api).

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

## 2.5hr Stint

![Example](images/image-1.png)

## 4.5hr Stint

![Example](images/image-2.png)

## Dependencies
- Requires MagicMirror² v2.23.0
- node-fetch v2.6.1
- luxon v3.4.2

## Installation

In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/mumblebaj/MMM-EskomSePush.git
````
````
cd MMM-EskomSePush
npm install
````

Add the module to the modules array in the `config/config.js` file:
````javascript
        {
            module: "MMM-EskomSePush",
            position: "middle_center", //Works best at middle_center. May not display all that well in other positions
            disabled: false,
            config: {
              token: "your token",
              area: "yourarea",
              updateInterval: 30*60*1000,
              fetchInterval: 30*60*1000
            }
},
````
## Updates
### V1.2.2
- Updates to remove invalid extra 30 minutes from display
- With recent updates by City Power the current area code has been updated. Ensure latest area code is used if you live in the Johannesburg area.

## Registration for Token
Go to [EskomSePush](https://eskomsepush.gumroad.com/l/api) and register for a free account. This allows you 50 calls per day. Obtain your token and determine your area as both these are required as input into the module.

## Updating

To update the module to the latest version, use your terminal to go to your MMM-EskomSePush module folder and type the following command:

````
cd MMM-EskomSePush
git pull
npm install

```` 