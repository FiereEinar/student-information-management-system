import express from 'express';
import {
	create_transaction,
	delete_transaction,
	get_all_transactions,
	get_dashboard_data,
	get_transaction,
	get_transaction_list_file,
	update_transaction,
	update_transaction_amount,
} from '../controllers/transactionController';
import {
	createTransactionValidation,
	updateTransactionAmountValidation,
} from '../middlewares/validations/transactionValidation';
import { transactionQueryFilter } from '../middlewares/transactions-filter';
import { isValidMongooseId } from '../middlewares/validations/validation';
import { adminAuth } from '../middlewares/adminAuth';

const router = express.Router();

router.get('/', transactionQueryFilter, get_all_transactions);

router.get('/download', transactionQueryFilter, get_transaction_list_file);

router.get('/dashboard-data', get_dashboard_data);

router.get(
	'/:transactionID',
	isValidMongooseId('transactionID', { from: 'params' }),
	get_transaction
);

router.post('/', adminAuth, createTransactionValidation, create_transaction);

router.put(
	'/:transactionID',
	adminAuth,
	isValidMongooseId('transactionID', { from: 'params' }),
	createTransactionValidation,
	update_transaction
);

router.put(
	'/:transactionID/amount',
	adminAuth,
	isValidMongooseId('transactionID', { from: 'params' }),
	updateTransactionAmountValidation,
	update_transaction_amount
);

router.delete(
	'/:transactionID',
	adminAuth,
	isValidMongooseId('transactionID', { from: 'params' }),
	delete_transaction
);

export default router;
