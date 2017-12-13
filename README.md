<center>

# BFF utils

[![npm](https://img.shields.io/npm/v/fyndiq-bff-utils.svg?style=flat-square)](https://www.npmjs.com/package/fyndiq-bff-utils)

This repository includes some utilities to share accross BFFs

</center>


# Installation

Install with NPM

`npm install -S fyndiq-bff-utils`

## HttpClient

### Usage

This HttpClient for Node is based on [node-fetch](https://github.com/bitinn/node-fetch) and includes a built-in logger.

``` js
const { HttpClient } = require('bff-utils')

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
```

### API

**HttpClient.get(url, options)**  
**HttpClient.post(url, options)**  
**HttpClient.put(url, options)**  
**HttpClient.delete(url, options)**  

The methods GET, POST, PUT and DELETE have the same API as **fetch**. For more informations about the `options` field, check the [fetch reference](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Syntax)
