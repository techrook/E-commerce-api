# E-Commerce Api

This is an api for a E-commerce app

---

## Requirements

1. Users and admins should be able to signup
2. Users and admins should be able to login
3. logged in User or non logged in user should be able to see products on the app
4. logged in User or non logged in user should be able to get a product
5. admins should be able to add product to app
6. admins should be able to update and delete products

---

## Setup

- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm install` for dependencies
- run `npm run start:dev`

example.env

```
PORT = 8080
MONGODB_URL= enter your mongoDB URL
JWT_SECRET = JCNBDU498BFINE849 (any random characters)
JWT_LIFESPAN= '4h'

CLOUDINARY_CLOUD_NAME = enter your  cloudinary cloud username
CLOUDINARY_API_KEY = cloudinary api key
CLOUDINARY_API_SECRET = cloudinary api secret
```

## Base URL

- https://e-commerce-api.hop.sh/

## Models

---

### User

| field     | data_type | constraints       |
| --------- | --------- | ----------------- |
| id        | string    | required          |
| firstname | string    | required          |
| lastname  | string    | required          |
| email     | string    | required          |
| password  | string    | required          |
| isAdmin   | Boolean   | required, default |

### Admin

| field     | data_type | constraints       |
| --------- | --------- | ----------------- |
| id        | string    | required          |
| firstname | string    | required          |
| lastname  | string    | required          |
| email     | string    | required          |
| password  | string    | required          |
| isAdmin   | Boolean   | required, default |

### cart

| field    | data_type | constraints       |
| -------- | --------- | ----------------- |
| id       | string    | required          |
| product  | objectId  | required          |
| user     | objectId  | required          |
| quantity | number    | required, default |

### category

| field | data_type | constraints |
| ----- | --------- | ----------- |
| id    | string    | required    |
| name  | name      | required    |

### Product

| field        | data_type | constraints       |
| ------------ | --------- | ----------------- |
| id           | string    | required          |
| name         | string    | required          |
| category     | objectId  | required          |
| description  | string    | required          |
| price        | number    | required          |
| productimage | Buffer    | required          |
| quantity     | Number    | required, max(25) |

## APIs


### registar User

- Route: user/register
- Method: POST
- Body:

[screenshot](https://res.cloudinary.com/dtof4ew2t/image/upload/v1675283872/e-commerce/userregister_dmoahu.jpg)
<img src = "https://res.cloudinary.com/dtof4ew2t/image/upload/v1675283872/e-commerce/userregister_dmoahu.jpg" />

### Login User

- Route: user/login
- Method: POST
- Body:

[screenshot](https://res.cloudinary.com/dtof4ew2t/image/upload/v1675283864/e-commerce/userlogin_wtiims.jpg)

<img src = "https://res.cloudinary.com/dtof4ew2t/image/upload/v1675283864/e-commerce/userlogin_wtiims.jpg" />

---

### register Admin

- Route: admin/register
- Method: POST
- Body:
  [screenshot](https://res.cloudinary.com/dtof4ew2t/image/upload/v1675283837/e-commerce/adminReg_briaqm.jpg)

<img src = "https://res.cloudinary.com/dtof4ew2t/image/upload/v1675283837/e-commerce/adminReg_briaqm.jpg" />

### Login Admin

- Route: admin/login
- Method: POST
- Body:

<img src = "https://res.cloudinary.com/dtof4ew2t/image/upload/v1675283872/e-commerce/adminlogin_pcxxiw.jpg" />

---

### Add product

- Route: /products/
- Method: POST
- Header
  - Authorization: Bearer {token}
- Body:

```
image

```

---

### Get product

- Route: /products/:id
  - Enter product id with url
- Method: GET

- Responses

Success

```
IMG
```

---

### Get products

- Route: /products/
- Method: GET
- Header:
  - Authorization: Bearer {token}
- Responses

Success

```

```

---

### Update blogs

- Route: /products/:id
  - enter products id with url
- Method: PATCH
- Header
  - Authorization: Bearer {token}
- Body:

```

```

- Depends on product property you want to update
  Success

```

```

---

### Delete product

- Route: /products/:id
  - enter products id with url
- Method: DELETE
- Header
  - Authorization: Bearer {token}

```
{

}
```

---

## Contributor

- Itohowo Monday :
  [Github](https://github.com/techrook)
  [twitter](https://twitter.com/Itohowo23)

- ceasar :
  [Github](https://github.com/caesarkutaa)
  [twitter](https://twitter.com/Caesarkuta)

---
