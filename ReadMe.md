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