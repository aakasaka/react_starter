# What is this

Repository of react + typescript starter.

Rewrite [ReactTutorial](https://facebook.github.io/react/tutorial/tutorial.html) by
typescript and webpack.

webpack setting is here.
http://blog.morizotter.com/2016/01/12/react-tutorial-again-with-web-pack/

# How to startup React with typescript

```
yarn install
npm install -g webpack typesctiprt
```
*(Why I don't use yarn global?)* *

and compile with webpack

```
webpack
```

open index.html

## Why I don't use yarn global?

*yarn global add couse trouble in my PC.


yarn command does not work well...like this.

```
yarn global add webpack eslint
```

So I use npm instead of yarn.

```
npm install -g webpack eslint
```