module.exports = function handlePost(model, data, res) {
  if (!data || typeof data == 'string')
    throw new Error('Missing data, please check that you have a body-parser');
  var m = new model(data);
  m.save(function (err, data) {
    if (err) throw new Error(err);
    res.send(data);
  });
};