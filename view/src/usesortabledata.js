import { useState, useMemo } from 'react';

export default function useSortableData (data, config = null) {
	const [sortConfig, setSortConfig] = useState(config);
	
	const sortedData = useMemo(() => {
		let sortableData = [...data];
		
		if (sortConfig) {
			sortableData.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ASC' ? -1 : 1;
				if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ASC' ? 1 : -1;
				return 0;
			});
		}
		return sortableData;
	}, [data, sortConfig]);
	
	const requestSort = (key) => {
		let direction = 'ASC';
		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === 'ASC'
		) {
			direction = 'DESC';
		}
		setSortConfig({ key, direction });
	}
	return { data: sortedData, requestSort, sortConfig };
}
