FROM node:20-alpine as build
WORKDIR /app


COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:20-alpine as prod

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/.env ./
COPY --from=build /app/.production.env ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/database ./database
COPY --from=build /app/.sequelizerc ./.sequelizerc

EXPOSE 8080
CMD ["npm", "run", "deploy"]