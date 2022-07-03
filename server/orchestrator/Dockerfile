FROM node:16.15.1

WORKDIR /usr/local/app

ENV PORT=4000


COPY package.json package-lock.json /usr/local/app/

RUN npm install && npm cache clean --force 

COPY ./ /usr/local/app

CMD ["npm", "run", "dev"]