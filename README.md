<div align="center">

# BFF utils

[![npm](https://img.shields.io/npm/v/fyndiq-bff-utils.svg?style=flat-square)](https://www.npmjs.com/package/fyndiq-bff-utils) [![Travis](https://img.shields.io/travis/fyndiq/bff-utils.svg?style=flat-square)](https://travis-ci.org/fyndiq/bff-utils)

This repository includes some utilities to share accross BFFs

</div>


# Installation

Install with NPM

`npm install -S fyndiq-bff-utils`

## HttpClient

### Usage

This HttpClient for Node is based on [node-fetch](https://github.com/bitinn/node-fetch) and includes a built-in logger.

``` js
const { HttpClient } = require('fyndiq-bff-utils')

// Make a GET request and parse the json
const getData = async () => {
  const response = await HttpClient.get('http://my-api-remote/')
  const data = await response.json()
  return data
}

// Make a POST request with some body data
HttpClient.post('http://my-api-remote/post', {
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify({
    id: 123,
    name: 'My name',
  }),
})

// Handle server errors
try {
  await HttpClient.get('http://my-api-remote/some-api-that-might-fail')
} catch (error) {
  if (error.output && error.output.statusCode === 500) {
    // Do something to handle the server error gracefully...
  }
}
```

### API

**HttpClient.get(url, options)**  
**HttpClient.post(url, options)**  
**HttpClient.put(url, options)**  
**HttpClient.delete(url, options)**  

The methods GET, POST, PUT and DELETE have the same API as **fetch**. For more informations about the `options` field, check the [fetch reference](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Syntax)

Contrary to `fetch`, HttpClient will throw an error if the response status is **4xx** or **5xx**. The error object thrown is a [Boom Error](https://github.com/hapijs/boom). If you are using a [Koa](http://koajs.com/) server, you can use `KoaBoom` exported by `fyndiq-bff-utils` as a middleware:

``` js
const Koa = require('koa')
const { KoaBoom } = require('fyndiq-bff-utils')

app = new Koa()
app.use(KoaBoom())

// rest of your middlewares
```

Doing so will enable you to forward the HTTP error to the client.
