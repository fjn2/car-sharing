sed "s/.*const serverUrl.*/const serverUrl = 'http:\/\/naveira.com.ar:3051'/" fe/main.js > fe/main.js2;
cp fe/main.js2 fe/main.js;
rm fe/main.js2