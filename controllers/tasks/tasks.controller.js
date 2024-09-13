import Task from "../../models/tasks/tasks.model.js";
import moment from 'moment';

export const createTask = async (req, res) => {
    console.log("aaaa", req.body);
    try {
        const { title, description, dueDate, priority, assignedMember, status } = req.body;
console.log("bbbb");
        const task = new Task({
            title,
            description,
            dueDate: moment(dueDate).toDate(),
            priority,
            assignedMember,
            status
        });

        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.log('cccc');
        res.status(400).json({ message: error.message });
    }
};

export const updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getTasksReport = async (req, res) => {
    const { startDate, endDate, member } = req.query;

    const filter = {
        status: 'completed',
        ...(startDate && endDate ? {
            updatedAt: {
                $gte: moment(startDate).startOf('day').toDate(),
                $lte: moment(endDate).endOf('day').toDate(),
            }
        } : {}),
        ...(member ? { assignedMember: member } : {}),
    };

    try {
        const tasks = await Task.find(filter);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getTaskCompletionStats = async (req, res) => {
    try {
        const tasks = await Task.find({ status: 'completed' });

        if (tasks.length === 0) {
            return res.status(200).json({ message: 'No tasks completed yet' });
        }

        let totalTimeSpent = 0;
        tasks.forEach(task => {
            const createdAt = moment(task.createdAt);
            const updatedAt = moment(task.updatedAt);
            const timeSpent = updatedAt.diff(createdAt, 'days');
            totalTimeSpent += timeSpent;
        });

        const averageTime = totalTimeSpent / tasks.length;

        res.status(200).json({
            totalTasksCompleted: tasks.length,
            averageTimeToCompleteTasks: averageTime.toFixed(2) + ' days',
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};