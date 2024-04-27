import create_app from './app';
import https from 'https';
import http from 'http';
import fs from 'fs';

async function startServer() {
  try {  
    const appClient = await create_app();
    const app = appClient[0]
  
    const privateKey = fs.readFileSync('../../../../etc/letsencrypt/live/api-muscleman.com/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('../../../../etc/letsencrypt/live/api-muscleman.com/cert.pem', 'utf8');
    const ca = fs.readFileSync('../../../../etc/letsencrypt/live/api-muscleman.com/chain.pem', 'utf8'); 
    
    const options = {
    	key: privateKey,
    	cert: certificate,
    	ca: ca
    };
    
    http.createServer(app).listen(80);
    https.createServer(options, app).listen(443);
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
}

startServer();
