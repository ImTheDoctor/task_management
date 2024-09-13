import express from "express";
import { createTask, getTask, getTaskCompletionStats, getTasksReport, updateTaskStatus } from "../../controllers/tasks/tasks.controller.js";
const router = express.Router();

router.post('/', createTask);
router.put('/:id', updateTaskStatus);
router.get('/:id', getTask);
router.get('/reports/completion', getTasksReport);
router.get('/reports/completion-stats', getTaskCompletionStats);

export default router;