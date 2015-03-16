module.exports = function handlePut(model, id, data, res) {
  if (!data || typeof data == 'string')
    throw new Error('Missing data, please check that you have a body-parser');
  if (id) {
    model.findOneAndUpdate({_id: id}, data, function (err, data) {
      if (err) throw new Error(err);
      res.send(data);
    });
  } else {
    res.sendStatus(400);
  }
};