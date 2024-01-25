FROM NODE:lts

WORKDIR /app

COPY package.json ./

COPY . .

ENV MARIADB_HOST = localhost 
ENV MARIADB_PORT = 3306
ENV MARIADB_USERNAME = root
ENV MARIADB_PASSWORD = mariadb

EXPOSE 8080

CMD ["npm", "install", "yarn","npm", "run", "server"]
