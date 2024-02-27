const { Router } = require("express");
const TodoController = require("../controllers/todoController");
const auth = require("../middlewares/auth");
const router = Router();

router.get('/todo', TodoController.all)
router.post("/todo/add", TodoController.store);
router.get("/todo/:id", TodoController.detail);
router.put("/todo/update/:id", TodoController.update);
router.delete("/todo/delete/:id", TodoController.delete);

module.exports = router;