# Config-Setup

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

Example 

```json 
[
    {
        "Name": "12 Factor App",
        "Code": "12factor",
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