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
            }, 
            storage: {
              type: 'LOCALSTORAGE'
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


          client.on(client.Event.SDK_UPDATE, ()=> {
            console.log('SDK_UPDATE')
            let treatment = client.getTreatment("demo_split");
            console.log('treatment = '+treatment);
            this.treatment=treatment;        
          });

    });
}
}
