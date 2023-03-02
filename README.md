# Split-SFDX-Demo

![image](https://user-images.githubusercontent.com/1207274/222344939-253ad534-a77d-4228-86c4-1378029b4597.png)

Demo showing how you can use Split in a SalesForce Lightning Web Component.

Salesforce Lightning is Salesforce’s new, modern, and sleek UI. Lightning allows the use of Lightning Web Components (LWC) as a way of allowing developers to make Salesforce Components out of pure HTML, CSS, and JavaScript (JS). 

Split can work in a lightning web component. You can use the SDK in JS in a LWC just like you would use on any other web page. Split's JavaScript SDK meets all the security requirements for the Lightning Locker so you do not have to worry about any security issues. 



There are a few steps that are required to make this happen. 

## Add the split sdk as a static resource. 
![image](https://user-images.githubusercontent.com/1207274/222343021-c0e65655-d46f-4b86-8d1e-390f0ee049c1.png)

It is important to note that you need to upload the SDK JS file to Salesforce as a Static Resource. Remote JS libraries cannot be loaded in Lightning. 

You can download the minified version from split's CDN as linked on our [JS SDK Help page](https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK). Once you have the minified SDK, upload it to Salesforce by clicking the 'new' button and uploading the file. Ensure that cache-control is set to public. 

## Allow the split sdk endpoints as a trusted site. 
![image](https://user-images.githubusercontent.com/1207274/222343608-c75e0c29-d34f-4490-8d09-15bd69967d88.png)

Add `https://*.split.io` and ensure that the `connect-src` directive is checked

![image](https://user-images.githubusercontent.com/1207274/222344394-eee6d2c4-f178-4b33-940c-f29625737eb4.png)

## Link the SFDX code to a Salesforce Org using SFDX and the VSCode extension
![image](https://user-images.githubusercontent.com/1207274/222344577-5258d74c-bd0f-45e3-98ab-0fc1e33159ad.png)



## Set your SDK key in the helloWorld.js file
![image](https://user-images.githubusercontent.com/1207274/222346489-4bac6493-7033-4a1a-bae7-781d502f55f3.png)


## Set your Split Name in the callback
![image](https://user-images.githubusercontent.com/1207274/222440460-13046d4a-3675-4677-9296-2307de732ed7.png)




##  Deploy by right clicking `default` in the VSCode tree
![image](https://user-images.githubusercontent.com/1207274/222344641-e0761765-5b3d-467e-9804-0363fdd38595.png)



## See the treatment displayed in Salesforce!
![image](https://user-images.githubusercontent.com/1207274/222344695-411b58a6-9be6-48a6-974f-798a41bcd03c.png)


## Code Snippets

The key part of this code is the `helloWorld.js` file that contains the logic to load the Split SDK

````javascript
import { LightningElement, api } from 'lwc';

// download the split SDK and put it into a static resource called splitsdk
// also ensure that you have added *.split.io to the content security policy
import splitsdk from '@salesforce/resourceUrl/splitsdk';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';


export default class HelloWorld extends LightningElement {
   treatment = "new"
   treatmentNotLoaded= true;
   renderedCallback() {      
    loadScript(this, splitsdk).then(() => {
        // your code with calls to the JS library
        var factory = splitio({ 
            core: {
              authorizationKey: 'SDK_KEY', // your sdk key
              // key represents your internal user id, or the account id that 
              // the user belongs to. 
              // This could also be a cookie you generate for anonymous users
              key: 'key'
            }
          });
          // And get the client instance you'll use
          var client = factory.client();
          client.on(client.Event.SDK_READY, ()=> {
            console.log('SDK_READY')
            let treatment = client.getTreatment("demo_split");
            console.log('treatment = '+treatment);
            this.treatment=treatment;        
            this.treatmentNotLoaded=false;
          });
    });
}
}
````
It works with the helloworld.html below

````html
<template>
<template lwc:if={treatmentNotLoaded}>
    <lightning-card  title="HelloWorld" icon-name="custom:custom14" split-managed="true" >
        <div class="slds-m-around_medium" >
            <p></p>
        </div>
   </lightning-card>
  </template>
<template lwc:else>
    <lightning-card title="HelloWorld" icon-name="custom:custom14" split-managed="true" >
        <div class="slds-m-around_medium" >
            <p>Treatment={treatment}</p>
        </div>
   </lightning-card>
  </template>
</template>

````

Here we are using an `lwc:if` directive on the template to display or hide entire templates. You could also do this with information from the treatment. This is a very powerful capability. 
