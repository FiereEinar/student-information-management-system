import { fetchCategoryAndTransactions } from '@/api/category';
import BackButton from '@/components/buttons/BackButton';
import EditAndDeleteButton from '@/components/buttons/EditAndDeleteButton';
import SidebarPageLayout from '@/components/SidebarPageLayout';
import TransactionsTable from '@/components/TransactionsTable';
import Header from '@/components/ui/header';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function CategoryInfo() {
	const { categoryID } = useParams();
	if (!categoryID) return;

	const { data, isLoading, error } = useQuery({
		queryKey: [`category_${categoryID}`],
		queryFn: () => fetchCategoryAndTransactions(categoryID),
	});

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error || !data) {
		return <p>Error</p>;
	}

	return (
		<SidebarPageLayout>
			<BackButton />
			<div className='flex justify-between'>
				<div>
					<p className='text-sm text-muted-foreground'>
						Previous transactions for{' '}
					</p>
					<Header>{data.category.name}</Header>
				</div>
				<EditAndDeleteButton />
			</div>
			<TransactionsTable transactions={data.categoryTransactions} />
		</SidebarPageLayout>
	);
}