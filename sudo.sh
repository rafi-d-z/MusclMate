sudo su -
cd ../home/ec2-user/MusclMate/
pm2 stop index
git pull
cd backend
pm2 start server/index.ts