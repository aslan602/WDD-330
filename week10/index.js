import { getJSON, getLocation } from './utilities.js';
import QuakesController from './QuakesController.js';


async function getURL() {
    return getLocation().then(response => {
        const lat = response.coords.latitude;
        const long = response.coords.longitude;
        const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-03-02&latitude=${lat}&longitude=${long}&maxradiuskm=100`
        return url;
    });
};
getJSON(getURL());
const myQuakesController = new QuakesController('#quakeList');
myQuakesController.init();

