
# Dhan Yojana

The Dhan Yojana is a powerful and user-friendly web application designed to help users manage their expenses and split costs with friends, roommates, and colleagues. The web app allows users to keep track of shared expenses, settle debts, and maintain a fair and transparent financial record among groups or individuals. The following specification outlines the key features and functionalities of the Dhan Yojana web app.

## How to run

To run development 

```bash
  npm start
```

To build

```bash
  npm build
```

## Features

- User Accounts and Authentication
- Expense Management
- Debt Tracking and Settlement
- Reminders
- Activity Feed and History
- Settings and Personalization
- Security and Privacy
- Graphical Analysis
- Settling the simplified debts


## API Reference

#### Get all group details

```http
   /api/groups
```


| Endpoint | Method     | Description                |
| :-------- | :------- | :------------------------- |
 |   `/addNewGroup `|`POST` | To add a new group |
 |   `/addUserToGroup `|`POST` | To add new user to group |
 |   `/findFriends/:groupId `|`GET` | To find members of group |
 |   `/getPayments/:groupId `|`GET` | To find all payments of a group |

#### Get all payment details

```http
   /api/payments

```
| Endpoint | Method     | Description                |
| :-------- | :------- | :------------------------- |
|    `/:paymentId`|`GET` | To get a payment from id |
|    `/addPayment`|`POST` | To add a new payment |
|    `/updatePayment/:paymentId`|`POST` | To update a payment from id |

#### Get all user details

```http
   /api/user
```
| Endpoint | Method     | Description                |
| :-------- | :------- | :------------------------- |
|    `/getAllUser`|`GET` | To get all users in a group |
|    `/getAllGroupDetails `|`GET` | To get all details of the group|
|    `/getPayments`|`GET` | To get payment details of a group |
|    `/getGroupUserAnalysis/:groupId`|`GET` | To get user details in that group |

#### Get all comment details

```http
   /api/comment

```
| Endpoint | Method     | Description                |
| :-------- | :------- | :------------------------- |
| `/:paymentId`|`GET` | To get payment details with all comments  |
|    `/addComments`|`POST` | To add a coment in a group |


#### Get all comment details

```http
   /api/auth

```
| Endpoint | Method     | Description                |
| :-------- | :------- | :------------------------- |
| `/signin`|`GET` | To sign in a user  |
|    `/signout`|`GET` | To sign out a user |


## Database Design

![App Screenshot](https://drive.google.com/uc?export=view&id=1JYwkto0IQDMdjc5hJrPNkZoTrD_j8D0M)

## ER Model 

![App Screenshot](https://drive.google.com/uc?export=view&id=1_4K1LfK1NufeV_WLLkOGaJb0lzuahYQx)

## Authors

- [@Ankit Patel](https://github.com/Chinmay-024)
- [@Chinmay Negi](https://github.com/AnkitPatel27)
- [@Ritik Gupta](https://github.com/ritik3131)

