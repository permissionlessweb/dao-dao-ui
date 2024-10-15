# Use the official Node.js image as the base
FROM node:18 AS builder

# Set the working directory to /app
WORKDIR /app

# Copy env variables
COPY ./apps/sda/.env.testnet .

# Copy the package.json and yarn.lock files
COPY package*.json yarn.lock ./ 

# Install the workspace dependencies using yarn first
RUN yarn install

# Copy the application code into the docker container
COPY . .

# Change to the apps/sda directory
WORKDIR /app/apps/sda

# Install the dependencies specifically for the sda app this time
RUN yarn install

# Build the Next.js application, make sure build doesnt crash 
RUN NODE_OPTIONS=--max_old_space_size=8192 yarn build 

EXPOSE 3000
CMD ["yarn", "run", "start"]

# # Bundle static assets with Nginx
# FROM nginx:1.21.0-alpine as production
# ENV NODE_ENV production
# # Copy built assets from `builder` image
# COPY  --from=builder /app/apps/sda/.next /usr/share/nginx/html
# # Add your nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# # Expose port
# EXPOSE 80
# # Start nginx
# CMD ["nginx", "-g", "daemon off;"]