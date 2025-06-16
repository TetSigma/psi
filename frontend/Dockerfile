# Use official Node.js v20 image for building and running dev server
FROM node:20

WORKDIR /app

# Copy only package files first (for better caching)
COPY package*.json ./

# Install dependencies inside container
RUN npm install

# Copy the rest of the frontend source code
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
