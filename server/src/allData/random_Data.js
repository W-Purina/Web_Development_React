import dummyjson from 'dummy-json';
import fs from 'fs';
import dayjs from 'dayjs';

const myHelpers = {
    date(min, max) {
        const minTime = dayjs(min).toDate().getTime();
        const maxTime = dayjs(max).toDate().getTime();
        const newTime = dummyjson.utils.randomInt(minTime, maxTime);
        return dayjs(new Date(newTime)).format();
    }
}

const template = fs.readFileSync('./src/allData/random_Data.hbs', { encoding: 'utf-8' });
const randomDataString = dummyjson.parse(template, { helpers: myHelpers });
const randomData = JSON.parse(randomDataString);

export {
    randomData
};