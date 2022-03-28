FROM node
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3012
RUN npm run build
CMD ["npm", "start"] 