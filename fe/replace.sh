sed "s/.*const serverUrl.*/const serverUrl = 'http:\/\/naveira.com.ar:3050'/" main.js > main.js2;
cp main.js2 main.js;
rm main.js2
