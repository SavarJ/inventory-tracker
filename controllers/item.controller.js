const editItem = async (req, res) => {
  const { name, price, quantity, description } = req.body;
  const { item } = req;
  item.name = name;
  item.price = price;
  item.quantity = quantity;
  item.description = description;
  await item.save();
  return res.redirect("/");
};

const decrementQuantity = async (req, res) => {
  const { item } = req;
  item.quantity--;
  await item.save();
  return res.redirect("/");
};

const incrementQuantity = async (req, res) => {
  const { item } = req;
  item.quantity++;
  await item.save();
  return res.redirect("/");
};

const deleteItem = async (req, res) => {
  const { deletionComment } = req.body;
  const { item } = req;
  item.isDeleted = true;
  item.deletionComment = deletionComment;
  await item.save();
  return res.redirect("/");
};

const recoverItem = async (req, res) => {
  const { itemId } = req.params;
  const { item } = req;
  item.isDeleted = false;
  item.deletionComment = null;
  await item.save();
  return res.redirect("/");
};

module.exports = {
  editItem,
  decrementQuantity,
  incrementQuantity,
  deleteItem,
  recoverItem,
};
