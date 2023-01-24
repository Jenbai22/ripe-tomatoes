# Data models

## Users

| name            | type | unique | optional |
| --------------- | ---- | ------ | -------- |
| id              | int  | yes    | no       |
| username        | str  | yes    | no       |
| firstname       | str  | no     | no       |
| lastname        | str  | no     | no       |
| email           | str  | yes    | no       |
| hashed_password | str  | no     | no       |

## Reviews

| name     | type     | unique | optional |
| -------- | -------- | ------ | -------- |
| id       | int      | yes    | no       |
| body     | str      | no     | no       |
| imdb     | str      | no     | no       |
| posted   | datetime | no     | no       |
| username | str      | yes    | no       |
| edited   | bit      | no     | no       |

## Favorites

| name     | type | unique | optional |
| -------- | ---- | ------ | -------- |
| id       | int  | yes    | no       |
| imbd     | str  | no     | no       |
| username | str  | no     | no       |
| poster   | str  | no     | no       |
