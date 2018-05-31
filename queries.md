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
