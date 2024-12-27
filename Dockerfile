# Use an official Nginx image to serve the static files
FROM nginx:alpine

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy your frontend files into the container
# Make sure to replace ./dist/ with the actual folder where your static files are located
COPY . .

# Expose port 80
EXPOSE 80

# Command to run Nginx in the background
CMD ["nginx", "-g", "daemon off;"]