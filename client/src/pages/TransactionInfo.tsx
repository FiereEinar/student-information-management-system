import { fetchCategories } from '@/api/category';
import { fetchTransactionByID } from '@/api/transaction';
import BackButton from '@/components/buttons/BackButton';
import EditAndDeleteTransactionButton from '@/components/buttons/EditAndDeleteTransactionButton';
import UpdateTransactionAmountForm from '@/components/forms/UpdateTransactionAmountForm';
import SidebarPageLayout from '@/components/SidebarPageLayout';
import StudentDataCard from '@/components/StudentDataCard';
import TransactionDataCard from '@/components/TransactionDataCard';
import TransactionsTable from '@/components/TransactionsTable';
import Header from '@/components/ui/header';
import { QUERY_KEYS } from '@/constants';
import { isAuthorized } from '@/lib/utils';
import { useUserStore } from '@/store/user';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function TransactionInfo() {
	const userRole = useUserStore((state) => state.user?.role);
	const { transactionID } = useParams();
	if (!transactionID) return;

	const {
		data: transaction,
		isLoading: TLoading,
		error: TError,
	} = useQuery({
		queryKey: [QUERY_KEYS.TRANSACTION, { transactionID }],
		queryFn: () => fetchTransactionByID(transactionID),
	});

	const {
		data: categories,
		isLoading: CLoading,
		error: CError,
	} = useQuery({
		queryKey: [QUERY_KEYS.CATEGORY],
		queryFn: fetchCategories,
	});

	if (TLoading || CLoading) {
		return <p>Loading...</p>;
	}

	if (TError || CError || !transaction || !categories) {
		return <p>Error</p>;
	}

	return (
		<SidebarPageLayout>
			<BackButton />
			<div className='flex justify-between'>
				<Header>Transaction Details</Header>
				{isAuthorized(userRole, 'governor', 'treasurer', 'auditor') && (
					<EditAndDeleteTransactionButton
						categories={categories}
						transaction={transaction}
					/>
				)}
			</div>
			<hr />
			<TransactionDataCard transaction={transaction} />

			<Header>Transaction Owner</Header>
			<hr />
			<StudentDataCard
				studentID={transaction.owner.studentID}
				studentData={transaction.owner}
			/>
			<hr />
			<div className='flex justify-end'>
				{isAuthorized(userRole, 'governor', 'treasurer', 'auditor') && (
					<UpdateTransactionAmountForm transaction={transaction} />
				)}
			</div>
			<TransactionsTable isLoading={TLoading} transactions={[transaction]} />
		</SidebarPageLayout>
	);
}
