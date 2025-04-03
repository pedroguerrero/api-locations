FROM node:22.14.0-alpine AS base
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:22.14.0-alpine
WORKDIR /app
RUN adduser -h /app -s /sbin/nologin -D -H -u 1001 app && \
  chown -R app:app /app
COPY --chown=app:app --from=base /app/dist /app/dist
USER app
COPY --chown=app:app package.json .
COPY --chown=app:app package-lock.json .
RUN npm install --omit=dev
CMD ["npm", "run", "start:prod"]
EXPOSE 3000
