import http from 'http';
import url from 'url';
import { milesToKilometers, kilometersToMiles } from "./converter.js";

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const type = queryObject.type;
    const distance = parseFloat(queryObject.distance);
    console.log('type:', type)
    console.log('distance: ', distance)

    res.writeHead(200, { 'Content-Type': 'text/html' });

    let result;
    if (type === 'mi_to_km') {
        result = milesToKilometers(distance);
        res.end(`${distance} miles is equal to ${result} kilometers`);
    } else if (type === 'km_to_mi') {
        result = kilometersToMiles(distance);
        res.end(`${distance} kilometers is equal to ${result} miles`);
    } else {
        res.end('Invalid conversion type. Use "type=mi_to_km" or "type=km_to_mi">');
    }
    console.log('result:', result)
});

const PORT = process.argv[2] || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});