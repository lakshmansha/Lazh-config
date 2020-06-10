# Lazh-Config

## Description

Configuration Tools Used to Generate the Configuration for various SASS Aased Applications.

## Configuration File Template

```json
[
    {
        "Name": "<AppName>",
        "Code": "<appCode>",
        "Envirnoments": [
             {
                "EnvName": "<envName>",
                "EnvConfig": {
                   "Key":  "Value"
                }
            }
        ]
    }
]
```

Example 

```json 
[
    {
        "Name": "Sample App",
        "Code": "sample",
        "Envirnoments": [
             {
                "EnvName": "cdev",
                "EnvConfig": {
                   "Key":  "Value"
                }
            }
        ]
    }
]
```

## Installation CLI

Just type the following statement to install CLI.

```node
npm install -g @lazh/config
```

## Usage

To Generate Configuration for App with its Environment.

```node
lzconfig --path=<path> --app=<appname> --env=<environment> --output=<output-path>
```

Example

```node
lzconfig --path=input.json --app=sample --env=cdev --output=e:\assets\config
```

### Parameters :

1. **Path**
    - To Provide Configuration File Path.
    
1. **App** 
    - Name of the App available in Configuration.

1. **Env**
    - Environment of the App available in Configuration.

1. **Output** 
    - Optional parameter to create config file with directory.
    - Default Path: Currently Directory + /dist/appname/environment.

### Output : 

- **Config.json** File will be generated with default or Specified Output Path.


## License

This plugin was created under the MIT license.