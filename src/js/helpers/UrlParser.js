
import qs from 'querystring';
class UrlParser {
    constructor() {
      this.params = {};
    }
  
    parseUri() {
      const params = window.location.search.slice(1);
      this.paramsAsObject = qs.parse(params);
    }
  
    getParam(name) {
      if (typeof(this.paramsAsObject[name]) !== 'undefined') {
        return this.paramsAsObject[name];
      }
  
      return null;
    }
  }
  
  export  {UrlParser}