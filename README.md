# Jamotion fork of MEAN Stack

## Prerequisites

Please check the Prerequisites of [original MEAN Stack](https://github.com/linnovate/mean/blob/master/README.md)

## Quick Install

Install our fork of MEAN Stack

     npm install jamotion/mean
   
   
Create CMD File for executing mean commands without need of global installation

    echo "node.exe node_modules\mean\node_modules\meanio\bin\mean %*" > mean.cmd
    
Create your first App

    mean init <appname>
    cd <appname>
    npm install
    
Start the web application

    grunt
    
As default the firefox browser will be started when runnig the application. If you do not have firefox installed please change the browser in Gruntfile.js
