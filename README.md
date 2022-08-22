# Twitter API Clone
Twitter API clone with basic Twitter functionality, such as posting tweets, creating accounts, adding friends, etc. 👤📶🔍😀

# Development Setup
- Setup Postgres DB First Using Init.SQL file provided in init folder.
- Add custom neccessary environment variables such as pg connection string, etc.
```bash
npm install --save
npm run dev
```

# Docker Setup
- Set NODE_ENV to production
- Setup necessary environment variables such as pg username + password
```bash
docker-compose up -d
```
