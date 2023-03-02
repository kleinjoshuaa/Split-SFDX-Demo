# Split-SFDX-Demo

![image](https://user-images.githubusercontent.com/1207274/222344939-253ad534-a77d-4228-86c4-1378029b4597.png)

Demo showing how you can use Split in a SalesForce Lightning Web Component.


There are a few steps that are required to make this happen. 

## Add the split sdk as a static resource. 
![image](https://user-images.githubusercontent.com/1207274/222343021-c0e65655-d46f-4b86-8d1e-390f0ee049c1.png)

You can download the minified version from split's CDN as linked on our [JS SDK Help page](https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK). Once you have the minified SDK, upload it to Salesforce by clicking the 'new' button and uploading the file. Ensure that cache-control is set to public. 

## Allow the split sdk endpoints as a trusted site. 
![image](https://user-images.githubusercontent.com/1207274/222343608-c75e0c29-d34f-4490-8d09-15bd69967d88.png)

Add `https://*.split.io` and ensure that the `connect-src` directive is checked

![image](https://user-images.githubusercontent.com/1207274/222344394-eee6d2c4-f178-4b33-940c-f29625737eb4.png)

## Link the SFDX code to an org using SFDX and the VSCode extension
![image](https://user-images.githubusercontent.com/1207274/222344577-5258d74c-bd0f-45e3-98ab-0fc1e33159ad.png)



## Set your SDK key in the helloWorld.js file
![image](https://user-images.githubusercontent.com/1207274/222346489-4bac6493-7033-4a1a-bae7-781d502f55f3.png)


## Set your Split Name in the callback
![image](https://user-images.githubusercontent.com/1207274/222440460-13046d4a-3675-4677-9296-2307de732ed7.png)




##  Deploy by right clicking `default` in the VSCode tree
![image](https://user-images.githubusercontent.com/1207274/222344641-e0761765-5b3d-467e-9804-0363fdd38595.png)



## See the treatment displayed in salesforce!
![image](https://user-images.githubusercontent.com/1207274/222344695-411b58a6-9be6-48a6-974f-798a41bcd03c.png)
