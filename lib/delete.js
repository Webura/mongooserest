module.exports = function handleDelete(model, id, res) {
  if (id) {
    model.findOneAndRemove({_id: id}, function (err) {
      if (err) throw new Error(err);
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
};