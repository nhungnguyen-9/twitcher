# Development
FROM node:23-alpine3.19 AS development

WORKDIR /client

COPY package.json /client/package.json
COPY package-lock.json /client/package-lock.json

# TODO: Remove --force when the package-lock.json is updated
RUN npm ci --force

COPY . /client


# Build
FROM node:23-alpine3.19 AS build

WORKDIR /client

COPY package.json /client/package.json
COPY package-lock.json /client/package-lock.json
RUN npm install

COPY . /client
RUN npm run build