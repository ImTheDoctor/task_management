import { body } from 'express-validator';
import { assignedMemberIsRequired, descriptionLength, dueDateIsInvalid, dueDateIsRequired, priorityIsIn, priorityIsRequired, statusIsIn, titleIsRequired, titleLength } from '../utils/errorMessages';

export const taskValidationRules = () => {
    return [
        body('title')
            .notEmpty().withMessage(titleIsRequired)
            .isLength({ min: 3 }).withMessage(titleLength),

        body('description')
            .optional()
            .isLength({ min: 5 }).withMessage(descriptionLength),

        body('dueDate')
            .notEmpty().withMessage(dueDateIsRequired)
            .isISO8601().withMessage(dueDateIsInvalid),

        body('priority')
            .notEmpty().withMessage(priorityIsRequired)
            .isIn(['low', 'medium', 'high']).withMessage(priorityIsIn),

        body('assignedMember')
            .notEmpty().withMessage(assignedMemberIsRequired),

        body('status')
            .optional()
            .isIn(['pending', 'in-progress', 'completed']).withMessage(statusIsIn),
    ];
};
