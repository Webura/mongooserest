module.exports = function handlePut(model, id, data, res) {
  if (!data || typeof data == 'string')
    throw new Error('Missing data, please check that you have a body-parser');
  delete data._id;
  if (id) {
    model.findOne({_id: id}, function (err, one) {
      if (err) throw new Error(err);
      for (var field in data)
        one[field] = data[field];
      one.save(function(err, data){
        res.send(data);
      });
    });
  } else {
    res.sendStatus(400);
  }
};