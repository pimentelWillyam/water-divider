FROM NODE:lts

WORKDIR /usr/src/app

COPY package+.json ./
RUN npm install yarn
RUN yarn server
COPY . .

ENV MARIADB_HOST = localhost 
ENV MARIADB_PORT = 3306
ENV MARIADB_USERNAME = root
ENV MARIADB_PASSWORD = mariadb

EXPOSE 4000