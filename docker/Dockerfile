FROM node:22-alpine

# Add Zscaler certificate
RUN apk add --no-cache ca-certificates
COPY ../cert/zscaler.crt /usr/local/share/ca-certificates/zscaler.crt
RUN update-ca-certificates
ENV NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/zscaler.crt

# Set the working directory to /app
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

EXPOSE 3000

CMD ["pnpm"]