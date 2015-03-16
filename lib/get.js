module.exports = function handleGet(model, id, params, res) {
  if (id == 'count') {
    model.count(function (err, count) {
      if (err) throw new Error(err);
      res.send({count: count});
    });
  } else if (!id) {
    params = params || {};
    params.query = params.query ? JSON.parse(params.query) : {};
    var query = model.find(params.query);
    if (params.skip)
      query.skip(parseInt(params.skip, 10));
    if (params.limit)
      query.limit(parseInt(params.limit, 10));
    if (params.sort)
      query.sort(params.sort);
    query.exec(function (err, list) {
      if (err) throw new Error(err);
      res.send(list);
    });
  } else {
    model.findOne({_id: id}, function (err, one) {
      if (err) throw new Error(err);
      res.send(one);
    });
  }
};
