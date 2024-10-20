import { MongoEntity } from './mongoEntity';
import { TransactionsData } from './transaction';

export type Student = MongoEntity & {
	firstname: string;
	lastname: string;
	studentID: string;
	middlename: string;
	gender: string;
	course: string;
	year: number;
	email?: string;
};

// TODO: rename this shit
export type StudentWithTransactions = Student & TransactionsData;

export type StudentFilterValues = {
	search?: string;
	gender?: 'All' | 'M' | 'F';
	course?: string;
	year?: 'All' | '1' | '2' | '3' | '4';
};
