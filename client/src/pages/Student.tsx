import { fetchStudents } from '@/api/student';
import { AddStudentForm } from '@/components/forms/AddStudentForm';
import SidebarPageLayout from '@/components/SidebarPageLayout';
import StickyHeader from '@/components/StickyHeader';
import StudentFilter from '@/components/StudentFilter';
import StudentsTable from '@/components/StudentsTable';
import Header from '@/components/ui/header';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import PaginationController from '@/components/PaginationController';
import { useStudentFilterStore } from '@/store/studentsFilter';
import { useUserStore } from '@/store/user';

export default function Student() {
	const userRole = useUserStore((state) => state.user?.role);
	const { page, pageSize, setPage, course, gender, search, sortBy, year } =
		useStudentFilterStore((state) => state);

	const {
		data: studentsFetchResult,
		isLoading: studentsLoading,
		error: studentsError,
	} = useQuery({
		queryKey: [
			QUERY_KEYS.STUDENT,
			{ search, course, gender, year, page, pageSize, sortBy },
		],
		queryFn: () =>
			fetchStudents({ search, gender, year, course, sortBy }, page, pageSize),
	});

	if (studentsError) {
		return <p>Error</p>;
	}

	return (
		<SidebarPageLayout>
			<div className='mt-5' />
			<StickyHeader>
				<Header>Students</Header>
				{userRole === 'admin' && <AddStudentForm />}
			</StickyHeader>
			<StudentFilter />
			<StudentsTable
				isLoading={studentsLoading}
				students={studentsFetchResult?.data}
			/>
			{studentsLoading && <p>Loading...</p>}

			{studentsFetchResult && (
				<div className='absolute w-full p-5 bottom-0'>
					<PaginationController
						currentPage={page ?? 1}
						nextPage={studentsFetchResult.next}
						prevPage={studentsFetchResult.prev}
						setPage={setPage}
					/>
				</div>
			)}
		</SidebarPageLayout>
	);
}
