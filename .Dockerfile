FROM node:lts-alpine3.18

WORKDIR /app

COPY package*.json ./

COPY Frontend/package*.json Frontend/
RUN npm install --prefix Frontend --omit=dev

COPY backend/package*.json backend/
RUN npm install --prefix backend --omit=dev

COPY Frontend/ Frontend/
RUN npm run build --prefix Frontend

COPY backend/ backend/

USER node

CMD ["npm","start","--prefix","backend"]

EXPOSE 413