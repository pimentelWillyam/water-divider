FROM NODE:lts

WORKDIR /usr/water-divider

COPY package+.json ./
RUN npm install yarn
RUN yarn
COPY . .
EXPOSE 4000
CMD yarn server