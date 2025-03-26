# auto-sales-admin

## Running the Project with Docker

To run this project using Docker, follow the steps below:

### Prerequisites

Ensure you have the following installed:
- Docker version 20.10 or higher
- Docker Compose version 1.29 or higher

### Environment Variables

- Define any required environment variables in a `.env` file if needed. Refer to the `docker-compose.yml` file for details.

### Build and Run

1. Build and start the services:
   ```bash
   docker-compose up --build
   ```
2. Access the services:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:8080](http://localhost:8080)

### Exposed Ports

- `next-front`: 3000
- `product-services`: 8080

For further details, refer to the respective `Dockerfile` and `docker-compose.yml` files.