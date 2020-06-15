# Lazh-Config

## Description

Configuration Tools Used to Generate the Configuration for various SASS Based Applications.

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
          "Key": "Value"
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
          "Key": "Value"
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

### Commands :

1. **Generate**

   - To Generate Configuration for App with its Environment.
   - Parameters:
     | Params | Description | Is Mandatory |
     | ----- | ------- | ------ |
     | path | To Provide Configuration File Path | Yes |
     | app | Name of the App available in Configuration | Yes |
     | env | Environment of the App available in Configuration | Yes |
     | output | Create config file with provided directory | No |  
     | | |
   - To Use

     ```node
     lzconfig generate --path=<path> --app=<appname> --env=<environment> --output=<output-path>

     lzconfig generate -p=<path> -a=<appname> -e=<environment> -o=<output-path>

     lzconfig generate -p <path> -a <appname> -e <environment> -o <output-path>
     ```

   - Example

     ```node
     lzconfig generate --path=input.json --app=sample --env=cdev --output=e:\assets\config

     lzconfig generate -p=input.json -a=sample -e=cdev -o=e:\assets\config

     lzconfig generate -p input.json -a sample -e cdev -o e:\assets\config
     ```
   - Output

     - **Config.json** File will be generated with default or Specified Output Path.
1) **Help**

   - Name of the App available in Configuration.
   - To Use
     ```node
     lzconfig help | --help | -h
     ```

1) **Version**
   - Environment of the App available in Configuration.
   - To Use
     ```node
     lzconfig version | --version | -v
     ```

## License

This Package was created under the MIT license.
