
import qs from 'querystring';
class UrlParser {
    constructor() {

    }
  
    parseUri() {
      const params = window.location.search.slice(1);
      this.paramsAsObject = qs.parse(params);
    }
  
    getParam(name) {
      console.log(this.paramsAsObject);
      return this.paramsAsObject[name];
    }
  }
  
  export  {UrlParser}