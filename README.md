# E-Commerce Api
This is an api for a E-commerce app

---

## Requirements
1. Users and admins should be able to signup 
2. Users and admins should be able to login
3.  logged in User or non logged in user should be able to see products on the app
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

## Base URL
- 


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  firstname | string  |  required|
|  lastname  |  string |  required  |
|  email     | string  |  required |
|  password |   string |  required  |
|  isAdmin |   Boolean |  required, default  |

### Admin
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  firstname | string  |  required|
|  lastname  |  string |  required  |
|  email     | string  |  required |
|  password |   string |  required  |
|  isAdmin |   Boolean |  required, default  |



### cart
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  product |  objectId |  required |
|  user |  objectId |  required |
|  quantity  |  number |  required, default  |


### category 
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  name |  name |  required |

### Product
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  name | string  |  required|
|  category  |  objectId |  required  |
|  description     | string  |  required |
|  price |   number |  required  |
|  productimage |   Buffer |  required  |
|  quantity |   Number |  required, max(25)  |

## APIs
---

### Signup User

- Route: user/register
- Method: POST
- Body: 
```
{ "firstname" : "james",
  "lastname" : "harden",
  "email": "harden@gmail.com",
  "password": "thebeard13"
}
```

- Responses

signup successful
```
{ "firstname" : "james",
  "lastname" : "harden",
  "email": "harden@gmail.com",
  "password": "thebeard13"
}
```
---
### Login User

- Route: user/login
- Method: POST
- Body: 
```
{
  "email": "harden@gmail.com",
  "password": "thebeard13"
}
```

- Responses

Success
```
{   name : james,
    token: 'sjlkafjkldsfjsdjc92u11u8ex e nxjjurvnroie83y37712jbuewbdjbcbc'
}
```

---

### Signup Admin

- Route: admin/register
- Method: POST
- Body: 
```
{ "firstname" : "steph",
  "lastname" : "curry",
  "email": "curry@gmail.com",
  "password": "chefcurry30"
}
```

- Responses

signup successful
```
{ "firstname" : "steph",
  "lastname" : "curry",
  "email": "curry@gmail.com",
  "password": "chefcurry30"
}
```
---
### Login Admin

- Route: admin/login
- Method: POST
- Body: 
```
{
  "email": "curry@gmail.com",
  "password": "chefcurry30"
}
```

- Responses

Success
```
{   admin : steph,
    token: 'sjlkafjkldsfjsdjc92u11u8ex e nxjjurvnroie83y37712jbuewbdjbcbc'
}
```

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
image
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
    -  enter products id with url
- Method: DELETE
- Header
    - Authorization: Bearer {token}

```
{

}
```

---



## Contributor
- Itohowo Monday
- ceasar

---




