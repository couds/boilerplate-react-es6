FROM nodesource/node:5.9.0

ENV NODE_ENV development
ADD package.json package.json
RUN npm i -d
ADD . .

CMD ["npm","start"]
EXPOSE 3000
