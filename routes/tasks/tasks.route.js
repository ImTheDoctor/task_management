import express from "express";
import { createTask, getTask, getTaskCompletionStats, getTasksReport, updateTaskStatus } from "../../controllers/tasks/tasks.controller.js";
import { validate } from "../../middleware/validationMiddleware.js";
import { taskValidationRules } from "../../middleware/taskValidation.js";
const router = express.Router();

router.post('/', taskValidationRules, validate, createTask);
router.put('/:id', taskValidationRules, validate, updateTaskStatus);
router.get('/:id', getTask);
router.get('/reports/completion', getTasksReport);
router.get('/reports/completion-stats', getTaskCompletionStats);

export default router;