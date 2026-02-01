# GreenRecycle SG (C346 CA2)

Express + MySQL web service for community recycling under the Singapore Green Plan 2030 theme.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file:
   ```env
   PORT=3000
   DB_HOST=your_host
   DB_PORT=3306
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=your_database
   ```
3. Start the server:
   ```bash
   node server.js
   ```

## API Endpoints

| Method   | Route        | Description               |
| :------- | :----------- | :------------------------ |
| `GET`    | `/items`     | Fetch all items           |
| `POST`   | `/items`     | Create a new item         |
| `PUT`    | `/items/:id` | Update an item (Member 2) |
| `DELETE` | `/items/:id` | Delete an item (Member 2) |

### Create Item (POST /items)

Request body:

```json
{
	"itemName": "Old Newspapers",
	"itemCategory": "Paper",
	"locationDescription": "Blk 123 Toa Payoh Void Deck",
	"healthStatus": "Available"
}
```

---

## Database Schema: GreenRecycle SG

This project uses a MySQL database to manage community recycling efforts. The schema is designed to support full CRUD (Create, Read, Update, Delete) operations via the Express web service.

## Table: `ItemsForCollection`

| Column Name           | Data Type      | Constraints                 | Description                                           |
| :-------------------- | :------------- | :-------------------------- | :---------------------------------------------------- |
| `id`                  | `INT`          | Primary Key, Auto-Increment | Unique identifier for each item.                      |
| `itemName`            | `VARCHAR(255)` | NOT NULL                    | The name/title of the recyclable item.                |
| `itemCategory`        | `VARCHAR(100)` | NOT NULL                    | Category (e.g., Paper, Plastic, Metal, Electronics).  |
| `locationDescription` | `VARCHAR(255)` | NOT NULL                    | Where the item is located for pickup.                 |
| `healthStatus`        | `VARCHAR(50)`  | Default: 'Available'        | Current status (e.g., Available, Pending, Collected). |
| `createdAt`           | `TIMESTAMP`    | Default: CURRENT_TIMESTAMP  | The date and time the entry was created. (Optional)   |

---

## SQL Creation Script

```sql
CREATE TABLE ItemsForCollection (
    id INT AUTO_INCREMENT PRIMARY KEY,
    itemName VARCHAR(255) NOT NULL,
    itemCategory VARCHAR(100) NOT NULL,
    locationDescription VARCHAR(255) NOT NULL,
    healthStatus VARCHAR(50) DEFAULT 'Available',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Mapping (CRUD)

| Operation  | SQL Query                                           | Express Route       |
| :--------- | :-------------------------------------------------- | :------------------ |
| **Create** | `INSERT INTO ItemsForCollection (...) VALUES (...)` | `POST /items`       |
| **Read**   | `SELECT * FROM ItemsForCollection`                  | `GET /items`        |
| **Update** | `UPDATE ItemsForCollection SET ... WHERE id = ?`    | `PUT /items/:id`    |
| **Delete** | `DELETE FROM ItemsForCollection WHERE id = ?`       | `DELETE /items/:id` |

---

## Example JSON Data

When interacting with the web service, the data object follows this structure:

```json
{
	"id": 1,
	"itemName": "Old Newspapers",
	"itemCategory": "Paper",
	"locationDescription": "Blk 123 Toa Payoh Void Deck",
	"healthStatus": "Available",
	"createdAt": "2026-01-22T15:00:00Z"
}
```
