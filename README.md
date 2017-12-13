# BFF utils

This repository includes some utilities to share accross BFFs

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
