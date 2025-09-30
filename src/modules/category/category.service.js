const autoBind = require("auto-bind");

class ServiceController {
  #service;
  constructor() {
    autoBind(this);
    this;
  }
  async create(categoryDto)
  {
    
  }
}

module.exports = new ServiceController();
