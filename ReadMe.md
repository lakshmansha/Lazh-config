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
lzconfig --path=<path> --app=<appname> --env=<environment>
```

Example

```node
lzconfig --path=input.json --app=sample --env=cdev
```


## License

This plugin was created under the MIT license.