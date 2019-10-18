<h1 align="center">Point Of Sales RESTful API</h1>

# Overview


## List of Contents
* [Introduction](#introduction)
    * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Requirements](#requirements)
  * [Installation](#installation)   
* [Endpoints](#endpoints)
* [Support](#support)

## Introduction

Point of Sales API is an API that helps users to run their trading business. There're some features included in the API. User can handle management stock of product and store the order transaction

### Built With

[![Node.js](https://img.shields.io/badge/Node.js-v.10.16.2-green.svg?style=flat-square&logo=appveyor)](https://nodejs.org/) [![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=flat-square&logo=appveyor)](https://expressjs.com/en/starter/installing.html) [![MySQL](https://img.shields.io/badge/mysql-v2.17.1-blue?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/mysql) [![body-parser](https://img.shields.io/badge/body--parser-v1.19.0-red?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/body-parser) [![morgan](https://img.shields.io/badge/morgan-v1.9.1-success?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/body-parser) [![dotenv](https://img.shields.io/badge/dotenv-v1.9.1-black?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/body-parser) [![cors](https://img.shields.io/badge/cors-v2.8.5-blueviolet?style=flat-square&logo=appveyor)](https://www.npmjs.com/package/body-parser)

## Getting Started

### Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. <a href="https://www.npmjs.com/">NPM</a>
3. <a href="https://www.getpostman.com/">Postman</a>

![node.js](https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png)

#### Node.js
Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.

Nodejs allow developers to use javascript to write command line tools and for **server side scripting**. Hence, Nodejs represent what we know about "Javascript Everywhere" Paradigm, which allow us to us javascript on both **client-side** and **server-side**. Nodejs use **V8** Javascript Engine, the same engine for Chrome and Chromium based browser used.

Nodejs was written in 2009 by Ryan Dahl, 13 years after the introduction of first server-side javascript environment which is **Netscape's LiveWire Pro Web**. Dahl write Nodejs based on his critic on the performance limitation of the most popular web server in 2009, Apache HTTP Server.

The initial release of Nodejs in 2009 supported only Linux and Mac OS X. Later in July 2011, the first Nodejs build supporting Windows was released.

![express](https://expressjs.com/images/express-facebook-share.png)

#### Express.js
Express.js, or simply Express, is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.

The philosophy of Expressjs is to provide a small and robust tooling for HTTP servers. Making it a great solution for single page apps, website, hybrids, or public HTTP APIs. 

![restful api](https://s3.amazonaws.com/kinlane-productions/salesforce/salesforce-rest-api.png)

#### RESTFul API
A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST and DELETE data.

A RESTful API -- also referred to as a RESTful web service -- is based on representational state transfer (REST) technology, an architectural style and approach to communications often used in web services development.

Representational State Transfer is a software architectural style that defines a set of constraints to be used for creating Web services. Web services that conform to the REST architectural style, called RESTful Web services, provide interoperability between computer systems on the Internet.

RESTful API design was defined by Dr. Roy Fielding in his 2000 doctorate dissertation. In order to be a true RESTful API, a web service must adhere to the following six REST architectural constraints:

* Use of a uniform interface (UI). Resources should be uniquely identifiable through a single URL, and only by using the underlying methods of the network protocol, such as DELETE, PUT and GET with HTTP, should it be possible to manipulate a resource.
* Client-server based. There should be a clear delineation between the client and server. UI and request-gathering concerns are the client’s domain. Data access, workload management and security are the server’s domain. This loose coupling of the client and server enables each to be developed and enhanced independent of the other.
* Stateless operations. All client-server operations should be stateless, and any state management that is required should take place on the client, not the server.
* RESTful resource caching. All resources should allow caching unless explicitly indicated that caching is not possible.
* Layered system. REST allows for an architecture composed of multiple layers of servers.
* Code on demand. Most of the time a server will send back static representations of resources in the form of XML or JSON. However, when necessary, servers can send executable code to the client.

#### HTTP Requests
All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

- `GET` Get a resource or list of resources
- `POST` Create a resource
- `PUT/PATCH` Update a resource
- `DELETE` Delete a resource

#### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

| Code  | Status               | Description                                                                         |
| :---- | :------------------- | :---------------------------------------------------------------------------------- |
| `200` | `OK`                 | The request was successful                                                          |
| `400` | `Bad Request`        | There was a problem with the request (security, malformed, data validation, etc.)   |

### Installation

1. Clone or download this repository
2. Open app's directory in CMD or Terminal.
3. Type in Terminal `npm i` or `npm install` to install the required packages.
4. Make a new file, **.env** and setup the file. [instruction here](#setup-env-file)
5. Turn on Web Server and MySQL, (Also can be done with third-party tools like XAMPP, WAMP, etc)
6. Setup the database. [instruction here](#setup-database)
7. Open **Postman** desktop application or Chrome web extension (Install **Postman** if you haven't yet)
8. Choose HTTP Method and enter the request URL.(i.e. localhost:3000/product)
9. Check all **Endpoints** [here](#endpoints)

## Setup .env file
Duplicate **.env.example** file to **.env** on code editor and change the variable or copy the code below :

```
DB_HOST = 'localhost'
DB_USER = 'username'
DB_PASSWORD = 'password'
DB_DATABASE = 'database'
PORT = 3000
```

## Setup Database
You can import file `database.sql` to **phpmyadmin**.

## Endpoints

#### **Homepage**

- **Request** : **`GET /`**
- **Response** :

  ```
    {
        "message": "Welcome to Point Of Sales RESTful API, You can read the documentation at README.md",
        "author": "Irsyaad Budi Prasetianto",
        "email": "irsyaad.budip@gmail.com",
        "github": "github.com/irsyaadbp"
    }
  ```

#### **CRUD Product Endpoint**
* **Get All Product**
  - **Request** : **`GET /product`**
  - **More Options** :
    - **Search** : add params **`?search=`**
    - **Sort By** : add params **`?sortby=name/category/updated` and `?orderby=asc/desc`**
    - **Pagination**: add params **`?page=`** to get page of product and **`?perpage=`** to show the max product, if not add the params, default value for **page** is **1** and **perpage** is **10**

  - **Response** :
    ```
    {
        "status": 200,
        "result": {
            "infoPage": {
                "page": 1,
                "totalProduct": 13,
                "maxPage": 2
            },
            "data": [
                {
                    "id": 1,
                    "product_name": "Nasi Kucing",
                    "description": "Cuma nasi dengan porsi seekor kucing, bukan nasi dengan daging kucing",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Nasi_kucing_langgi.jpg",
                    "category": "Food",
                    "price": 1500,
                    "quantity": 23,
                    "created_at": "2019-10-18T05:40:32.000Z",
                    "updated_at": "2019-10-18T09:35:43.000Z"
                },
                {
                    "id": 2,
                    "product_name": "Nasi Gajah",
                    "description": "Cuma nasi dengan porsi seekor Gajah, bukan nasi dengan daging Gajah",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Nasi_kucing_langgi.jpg",
                    "category": "Food",
                    "price": 1500,
                    "quantity": 23,
                    "created_at": "2019-10-18T05:41:02.000Z",
                    "updated_at": "2019-10-18T09:35:43.000Z"
                },
                {
                    "id": 3,
                    "product_name": "Nasi Hiu",
                    "description": "Cuma nasi dengan porsi seekor Hiu, bukan nasi dengan daging Hiu",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Nasi_kucing_langgi.jpg",
                    "category": "Food",
                    "price": 1500,
                    "quantity": 23,
                    "created_at": "2019-10-18T05:41:14.000Z",
                    "updated_at": "2019-10-18T09:35:43.000Z"
                },
                {
                    "id": 4,
                    "product_name": "Nasi Manusia",
                    "description": "Cuma nasi dengan porsi seekor Manusia, bukan nasi dengan daging Manusia",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Nasi_kucing_langgi.jpg",
                    "category": "Food",
                    "price": 1500,
                    "quantity": 25,
                    "created_at": "2019-10-18T05:41:50.000Z",
                    "updated_at": "2019-10-18T09:35:43.000Z"
                },
                {
                    "id": 5,
                    "product_name": "Nasi Ayam",
                    "description": "Kalo yang ini nasi dengan ayam, bukan nasi dengan porsi seekor ayam",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Nasi_kucing_langgi.jpg",
                    "category": "Food",
                    "price": 15000,
                    "quantity": 25,
                    "created_at": "2019-10-18T05:42:26.000Z",
                    "updated_at": "2019-10-18T09:35:43.000Z"
                },
                {
                    "id": 6,
                    "product_name": "Sayur asem",
                    "description": "Sayur yang rasanya asem",
                    "image": "https://cdns.klimg.com/merdeka.com/i/w/news/2018/04/25/968568/670x335/5-cara-masak-sayur-asem-yang-enak-segar-dan-mudah-ala-sunda-betawi-serta-jawa-rev-1.jpg",
                    "category": "Food",
                    "price": 15000,
                    "quantity": 25,
                    "created_at": "2019-10-18T05:44:32.000Z",
                    "updated_at": "2019-10-18T09:35:43.000Z"
                },
                {
                    "id": 7,
                    "product_name": "Es Cendol",
                    "description": "Cuma es cendol biasa, gak ada yang spesial",
                    "image": "https://awsimages.detik.net.id/community/media/visual/2019/02/21/32e9715c-976c-4939-ac14-6833baa85138.jpeg?w=700&q=90",
                    "category": "Drink",
                    "price": 3500,
                    "quantity": 25,
                    "created_at": "2019-10-18T05:45:51.000Z",
                    "updated_at": "2019-10-18T07:09:40.000Z"
                },
                {
                    "id": 8,
                    "product_name": "Es Dawet",
                    "description": "Sama aja kayak es cendol, cuma beda nama aja",
                    "image": "https://awsimages.detik.net.id/community/media/visual/2019/02/21/32e9715c-976c-4939-ac14-6833baa85138.jpeg?w=700&q=90",
                    "category": "Drink",
                    "price": 1500,
                    "quantity": 25,
                    "created_at": "2019-10-18T05:46:35.000Z",
                    "updated_at": "2019-10-18T07:09:40.000Z"
                },
                {
                    "id": 9,
                    "product_name": "Es Teh",
                    "description": "Es yang dikasih teh",
                    "image": "https://cdn2.tstatic.net/travel/foto/bank/images/es-teh_20171221_075643.jpg",
                    "category": "Drink",
                    "price": 2000,
                    "quantity": 25,
                    "created_at": "2019-10-18T05:47:44.000Z",
                    "updated_at": "2019-10-18T07:09:40.000Z"
                },
                {
                    "id": 10,
                    "product_name": "Es Jeruk",
                    "description": "Perasan jeruk yang dikasih es",
                    "image": "http://basoafung.com/wp-content/uploads/2017/01/es-jeruk.jpg",
                    "category": "Drink",
                    "price": 2000,
                    "quantity": 25,
                    "created_at": "2019-10-18T05:49:00.000Z",
                    "updated_at": "2019-10-18T07:09:40.000Z"
                }
            ]
        }
    }
    ```

* **Get Product By Id**
  - **Request** : **`GET /product/:prod_id`**
  - **Response** :
    ```
    {
        "status": 200,
        "result": [
            {
                "id": 1,
                "product_name": "Nasi Kucing",
                "description": "Cuma nasi dengan porsi seekor kucing, bukan nasi dengan daging kucing",
                "image": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Nasi_kucing_langgi.jpg",
                "category": "Food",
                "price": 1500,
                "quantity": 23,
                "created_at": "2019-10-18T05:40:32.000Z",
                "updated_at": "2019-10-18T09:35:43.000Z"
            }
        ]
    }
    ```
* **Create a Product**
  - **Request** : **POST /product**
    ```
    {
        "prod_name": "Fried Chicken",
        "prod_desc": "Fried Chicken",
        "prod_image": "http://image.com/fried-chicken.jpg",
        "category_id": 1,
        "price": 10000,
        "quantity": 6
    }
    ```
  - **Response** :
    ```
    {
        "status": 200,
        "result": "Product added sucessfully"
    }
    ```
* **Update a Product**
  - **Request** : **`PUT /product/:prod_id`**
    ```
    {
        "prod_id": 11,
        "prod_name": "Es Cendol",
        "prod_desc": "Cuma es cendol biasa, gak ada yang spesial",
        "prod_image": "https://awsimages.detik.net.id/community/media/visual/2019/02/21/32e9715c-976c-4939-ac14-6833baa85138.jpeg?w=700&q=90",
        "category_id": 2,
        "price": 3500,
        "quantity": 25
    }
    ```
  - **Response** :
    ```
    {
        "status": 200,
        "result": "Product updated sucessfully"
    }
    ```
* **Delete a Product** 
  - **Request** : **`DELETE /prod_id/:prod_id`**
  - **Response** : 
    ```
    {
        "status": 200,
        "result": "Product deleted successfully"
    }
    ```

#### CRUD Category Endpoint
* **Read All Category**
  - **Request** : **`GET /category`**
  - **More Options** : 
    - **Pagination** : add params **`?page=`** to get page of product and **`?perpage=`** to show the max product, if not add the params default value for **page** is **1** and **perpage** is **10**
  - **Response** :
    ```
    {
        "status": 200,
        "result": {
            "infoPage": {
                "page": 1,
                "totalProduct": 3,
                "maxPage": 1
            },
            "result": [
                {
                    "id": 1,
                    "name": "Uncategorized",
                    "created_at": "2019-10-18T07:12:13.000Z",
                    "updated_at": null
                },
                {
                    "id": 2,
                    "name": "Drink",
                    "created_at": "2019-10-18T07:12:20.000Z",
                    "updated_at": "2019-10-18T12:52:19.000Z"
                },
                {
                    "id": 3,
                    "name": "Food",
                    "created_at": "2019-10-18T09:34:27.000Z",
                    "updated_at": null
                }
            ]
        }
    }
    ```
* **Create a Category**
  - **Request** : **`POST /category`**
    ```
    {
        "category_name": "Food"
    }
    ```
  - **Response** :
    ```
    {
        "status": 200,
        "result": "Category added successfully"
    }
    ```
* **Update a Category**
  - **Request** : **`PUT /category/:category_id`**
    ```
    {
        "category_name": "Snack"
    }
    ```
  - **Response** :
    ```
    {
        "status": 200,
        "result": "Category updated successfully"
    }
    ```
* **Delete a Category**
  - **Request** : **`DELETE /category/:category_id`**
  - **Response** :
    ```
    {
        "status": 200,
        "result": "Category deleted successfully"
    }
    ```

#### Transaction Order Endpoint

* **Get All Order**
  - **Request** : **`GET /order`**
  - **More Options** : 
    - **Pagination** : add params **`?page=`** to get page of product and **`?perpage=`** to show the max product, if not add the params default value for **page** is **1** and **perpage** is **10**
  - **Response** :
    ```
    {
        "status": 200,
        "result": {
            "infoPage": {
                "page": 1,
                "totalProduct": 3,
                "maxPage": 1
            },
            "result": [
                {
                    "id": 1,
                    "admin_id": 1,
                    "order_id": 380699,
                    "total_price": 1000000,
                    "status": "success",
                    "cancel_reason": null,
                    "created_at": "2019-10-18T07:47:51.000Z",
                    "updated_at": null
                },
                {
                    "id": 2415,
                    "admin_id": 1,
                    "order_id": 241190,
                    "total_price": 20000000,
                    "status": "success",
                    "cancel_reason": null,
                    "created_at": "2019-10-18T13:11:02.000Z",
                    "updated_at": null
                },
                {
                    "id": 2416,
                    "admin_id": 1,
                    "order_id": 132206,
                    "total_price": 20000000,
                    "status": "success",
                    "cancel_reason": null,
                    "created_at": "2019-10-18T13:15:37.000Z",
                    "updated_at": null
                }
            ]
        }
    }
    ```

* **Create New Order**
  <br/>
    **IMPORTANT!** When create order, quantity of product is automatically reduce, because we use **trigger** in **mysql**
  - **Request** : **`POST /order`**
    ```
    {
        "admin_id": 1,
        "total_price": 20000000,
        "detail_order": [
            {"prod_id": 1, "quantity": 3, "sub_total": 20000},
            {"prod_id": 2, "quantity": 3, "sub_total": 30000}
        ]
    }
    ```
  - **Response** : 
    ```
    {
        "status": 200,
        "result": "Order added successfully"
    }
    ```
* **Update Status Order**
  - **Request** : **`PUT /order/:order_id`**
    <br/>
    value of **status** only **success** or **cancel**
    ```
    {
        "status": "cancel",
        "cancel_reason": "product defective production"
    }
    ```
  - **Response** : 
    ```
    {
        "status": 200,
        "result": "Order updated to 'cancel'"
    }
    ```


### Support

For API support, please email irsyaad.budip@gmail.com