# runner

```
yarn run dev
yarn run build
```

.babelrc

```
"env": {
    // "development": {
    //   "plugins": ["inline-dotenv"]
    // },
    "production": {
      "plugins": ["transform-inline-environment-variables"]
    }
  }
```