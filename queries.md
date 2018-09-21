# 00-hello-world.js

``` graphql
{
  hello
}
# from scratch with GraphiQL
# schema exploration
# insomnia to curl - drop down on query
```

# 01-echo.js

``` graphql
{
  echo(message:"hola!")
}
```

# 02-multi-args.js and 03-multi-args-built.js

``` graphql
{
	echo(message:"hola!")
}
```

``` graphql
{
	echo(message:"hola!", prefix:"Simone says")
}
```

``` graphql
{
  echo(prefix:"bear says", message:"tasty lunch!")
}
```

# 02b-multi-args-type-return and 03b-multi-args-typed-return.js

``` graphql
{
  echo(message:"good afternoon!", prefix: "bear says") {
    # id,
    # prefix,
    # message,
    built_message
  }
}
```

# 04-using-fields-bridges.js

``` graphql
{
  byId(id:0) { # what about large id # 3000 ?
    id,
    name,
    lat,
    lng,
    year,
    length,
    width
  }
}
```

``` graphql
{
  narrower(maxWidth:10.2) {
    name, width, year
  }
}
```

``` graphql
{
  bridges {
    name
    year
  }
}
```

# 05-related-types-bridge-friends.js

``` graphql
{
  trollById(id:0) {
    name,
    color,
    bridge {
      id,
      name,
      length,
      width
    }
  }
}
```

# 05b-related-types-bridge-friends-typed.js

``` graphql
{
  bridgeById(id:0) {
    id, name, lat, lng, year, length, width
  }
}
```

``` graphql
{
  bridges {
    id, name, lat, lng, year, length, width
  }
}
```

``` graphql
{
  narrowBridge(maxWidth:10) {
    name, width, year
  }
}
```

Not all trolls live under a bridge!  (but these do)

``` graphql
{
  trollById(id:8) {
    id, name, gender, color,
    bridge {
      name
    }
  }
}
```

``` graphql
{
  trolls {
    id, name, gender, color,
    bridge {
      id, name, length
    }
  }
}
```

# 06-mutations.js

Current location -- 9

``` graphql
{
  trollById(id: 7) {
    name
    bridge {
      id,
      name
    }
  }
}
```

Migration

``` graphql
mutation
{
  relocateTrollToBridge(trollId:7, bridgeId: 5) {
    name,
    bridge {
      id, name
    }
  }
}
```