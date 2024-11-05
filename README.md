[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Next App Template

A starter template using Next 15 that includes boilerplate for ui and authentication

## Prerequisites

This project requires NodeJS and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
10.2.4
v20.11.1
```

## Table of contents

- [Next App Starter](#next-app-starter)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Set Up](#set-up)
  - [Starting Development Server](#starting-development-server)
  - [Learn More](#learn-more)
  - [Contributing](#contributing)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Set Up

1. Install dependancies

```cmd
npm i --legacy-peer-deps
```

2. Add environment variables file

```cmd
touch .env
```

Required environment variables

| Name        | Default Value       |
| ----------- | ------------------- |
| AUTH_SECRET | 'Some random value' |
| APP_NAME    | 'MyApp'             |

## Starting Development Server

1. Start the development server in the command line:

```cmd
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about packages used, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Zod](https://zod.dev) - learn about Zod features and API.
- [Radix Primatives](https://www.radix-ui.com/primitives) - learn about Radix components used.

## Contributing

This is a pet project to save me time at work. It is still under development and not ready for use.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/B-Jones-RFD/sp-rest-connect/tags).

## Authors

- **B Jones RFD** - _Package Noob_ - [B-Jones-RFD](https://github.com/B-Jones-RFD)

## License

[MIT License](https://github.com/B-Jones-RFD/next-app-template/blob/main/LICENSE)
