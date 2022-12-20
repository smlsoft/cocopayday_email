FROM node:8.8.1-alpine
LABEL maintainer="Fish <fishphatuna@gmail.com>"

COPY . /usr/app
WORKDIR /usr/app
RUN chmod 777 -R /usr/app/log
EXPOSE 4250

RUN npm install --production

USER node

CMD ["npm", "start"]
