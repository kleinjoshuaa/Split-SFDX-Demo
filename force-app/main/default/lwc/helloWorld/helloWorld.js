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
        const that=this;
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
          client.on(client.Event.SDK_READY, function() {
            console.log('SDK_READY')
            let treatment = client.getTreatment("demo_split");
            console.log('treatment = '+treatment);
            that.treatment=treatment;        
            that.treatmentNotLoaded=false;
          });

    });
}
}
