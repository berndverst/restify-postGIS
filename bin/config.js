var multipaas   = require('config-multipaas');
var autoconfig  = function (config_overrides){
  var config    = multipaas(config_overrides).add({
    table_name  : process.env.POSTGRESQL_DATABASE || process.env.TABLE_NAME || 'parks',
    collection_name : process.env.MONGODB_DATABASE || process.env.COLLECTION_NAME || 'parks',
    db_svc_name : process.env.DATABASE_SERVICE_NAME || "postgresql"
  })

  var db_config = config.get('POSTGRESQL_DB_URL');
      table     = config.get('table_name');

  //normalize db connection string
  var options_index = db_config.indexOf("?");
  if(options_index>1){
    var start = db_config.slice(0, options_index);
    var end = db_config.slice(options_index, db_config.length);

    if(start[start.length - 1] !== "/"){
      start += '/';
    }
    db_config = start + table + end
    config.add({db_config: db_config});
  }
  else {
    if(db_config[db_config.length - 1] !== "/"){
    db_config += '/';
    }
    config.add({db_config: db_config+table});
  }
  return config;
}
exports = module.exports = autoconfig();
