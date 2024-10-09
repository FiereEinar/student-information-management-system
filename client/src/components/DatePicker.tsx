import { format } from 'date-fns';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type DatePickerProps = {
	date: Date | undefined;
	setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
	error: string | undefined;
};

export default function DatePicker({ date, setDate, error }: DatePickerProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className='text-muted-foreground space-y-1'>
					<Label className='flex gap-1 items-center'>
						Date:
						<p className='text-xs text-muted-foreground'>
							(Leave empty to default to now)
						</p>
					</Label>
					<Button
						type='button'
						variant={'outline'}
						className={cn(
							'w-full justify-start text-left font-normal',
							!date && 'text-muted-foreground'
						)}
					>
						<CalendarIcon className='mr-2 h-4 w-4' />
						{date ? format(date, 'PPP') : <span>Pick a date </span>}
					</Button>
					{error && <p className='text-xs text-destructive'>{error}</p>}
				</div>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={date}
					onSelect={setDate}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}