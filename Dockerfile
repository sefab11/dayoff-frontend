# FROM node:16-alpine

# # Install @expo/ngrok globally
# # RUN npm install -g @expo/ngrok@^4.1.0 --quiet
# RUN npm install -g @expo/ngrok --quiet

# # Set environment variables
# # Set PATH to include ngrok
# ENV PATH="/node_modules/.bin:${PATH}"
# # ...

# # Set the working directory
# WORKDIR /app

# # Copy package.json and yarn.lock
# COPY package.json yarn.lock* ./

# # Install dependencies
# RUN yarn install --frozen-lockfile --production

# # Install Expo CLI and add it to PATH
# RUN npm install -g expo-cli


# # Copy remaining app files
# COPY . .

# # Expose ports
# EXPOSE 19000
# EXPOSE 19001

# # Set backend URL as an environment variable
# ENV EXPO_PUBLIC_API_URL=http://0.0.0.0:8000

# # Set ngrok authentication token as an environment variable
# ENV NGROK_AUTH_TOKEN=2hSh688SfspinEMldCDLa35Zw2e_J8GREVLwceqVLKSmDuWL

# # Start Metro Bundler
# # Start Metro Bundler without interactive prompts
# CMD ["expo", "start", "--tunnel"]

FROM node:16-alpine

# Install @expo/ngrok globally
RUN npm install -g @expo/ngrok --quiet

# Set environment variables
ENV PATH="/node_modules/.bin:${PATH}"

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile --production

# Install Expo CLI and add it to PATH
RUN npm install -g expo-cli

# Copy remaining app files
COPY . .

# Expose ports
EXPOSE 19000
EXPOSE 19001

# Set backend URL as an environment variable
ENV EXPO_PUBLIC_API_URL=http://0.0.0.0:8000

# Set ngrok authentication token as an environment variable
ENV NGROK_AUTH_TOKEN=<your_ngrok_auth_token>

# Start ngrok and then start Metro Bundler with Expo
CMD ngrok http 19000 --authtoken $NGROK_AUTH_TOKEN & expo start --tunnel


