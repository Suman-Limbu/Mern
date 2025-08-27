import userServices from "../services/userService.js";

const createUser = async (req, res) => {
  try {
    const data = await userServices.createUser(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUser = async (req, res) => {
  const data = await userServices.getUser();
  res.json(data);
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const data = await userServices.getUserById(id);
  res.status(200).json(data);
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userServices.updateUser(id, req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await userServices.deleteUser(id);
    res.send(`User deleted successfully with id : ${id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default { createUser, getUser, getUserById, updateUser, deleteUser };
