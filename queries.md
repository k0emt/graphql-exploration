# 00-hello-world.js
```
{
    hello
}
```

# 01-echo.js
```
{
	echo(message:"hola!")
}
```

# 02-multi-args.js and 03-multi-args-built.js
```
{
	echo(message:"hola!")
}
```

```
{
	echo(message:"hola!", prefix:"Simone says")
}
```

```
{
  echo(prefix:"bear says", message:"tasty lunch!")
}
```

# 02b-multi-args-type-return and 03b-multi-args-typed-return.js
```
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
```
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

```
{
  narrower(maxWidth:10.2) {
    name, width, year
  }
}
```

```
{
  bridges {
    name
    year
  }
}
```

# 05-related-types-bridge-friends.js
```
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
```
{
	bridgeById(id:0) {
    id, name, lat, lng, year, length, width
  }
}
```

```
{
	bridges {
    id, name, lat, lng, year, length, width
  }
}
```

```
{
  narrowBridge(maxWidth:10) {
    name, width, year
  }
}
```

Not all trolls live under a bridge!  (but these do)
```
{
	trollById(id:8) {
    id, name, gender, color, 
	bridge {
      name
    }
  }
}
```

```
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
```
```