# Development Stage
FROM node:18-alpine as development

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

# Run TypeScript compilation
RUN npm run build

# Set the correct working directory
WORKDIR /app

# Production Stage
FROM node:18-alpine as production

WORKDIR /app

COPY package*.json /app

RUN npm install --only=production

# Create the 'build' directory in the production stage
RUN mkdir -p /app/build

# Copy the build artifacts directly from the development stage
COPY --from=development /app/dist /app/build

COPY . .

CMD npm run prod
