import React, { useState, useMemo } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components:
import PokemonTable from './PokemonTable';
import MovesTable from './MovesTable';


////////////////////////////////////////////////

const useSortableData = (items, config = null) => {
	const [sortConfig, setSortConfig] = useState(config);
	
	const sortedItems = useMemo(() => {
		let sortableItems = [...items];
		
		if (sortConfig) {
			sortableItems.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ASC' ? -1 : 1;
				if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ASC' ? 1 : -1;
				return 0;
			});
		}
		return sortableItems;
	}, [items, sortConfig]);
	
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
	return { items: sortedItems, requestSort, sortConfig };
}

// THE SAMPLE SORTABLE TABLE COMPONENT
// https://www.smashingmagazine.com/2020/03/sortable-tables-react/
function ProductTable (props) {
	const { items, requestSort, sortConfig } = useSortableData(props.products);
	
	const getClassNamesFor = (name) => {
		if (!sortConfig) return;
		return sortConfig.key === name ? sortConfig.direction : undefined;
	};
	
	return (
		<table>
			<caption>Our products</caption>
			<thead>
				<tr>
					<th>
						<button 
							type="button"
							onClick={() => requestSort('name')}
							// className={getClassNamesFor('name')}
						>
							Name
						</button>
					</th>
					<th>
						<button 
							type="button"
							onClick={() => requestSort('price')}
							// className={getClassNamesFor('price')}
						>
							Price
						</button>
					</th>
					<th>
						<button 
							type="button"
							onClick={() => requestSort('stock')}
							// className={getClassNamesFor('stock')}
						>
							In Stock
						</button>
					</th>
				</tr>
			</thead>
			<tbody>
				{items.map(product => (
					<tr key={product.id}>
						<td>{product.name}</td>
						<td>{product.price}</td>
						<td>{product.stock}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

////////////////////////////////////////////////



export default function Search () {
	return (
		<>
		<h1>Search</h1>
		<p>Hi!</p>
		<div className="table-links">
			<a href="/search" className="table-link"><button>Pokemon</button></a>
			<a href="/search/moves" className="table-link"><button>Moves</button></a>
		</div>
		<h2>Sample Table</h2>
		<ProductTable 
			products={[
					{ id: 1, name: "Cheese", price: 4.9, stock: 20 },
          { id: 2, name: "Milk", price: 1.9, stock: 32 },
          { id: 3, name: "Yoghurt", price: 2.4, stock: 12 },
          { id: 4, name: "Heavy Cream", price: 3.9, stock: 9 },
          { id: 5, name: "Butter", price: 0.9, stock: 99 },
          { id: 6, name: "Sour Cream ", price: 2.9, stock: 86 },
          { id: 7, name: "Fancy French Cheese 🇫🇷", price: 99, stock: 12 }
			]}
		/>
		<hr></hr>
		<BrowserRouter>
			<Switch>
				<Route exact path="/search" component={PokemonTable} key={'pokemon-table'} />
				<Route exact path="/search/moves" component={MovesTable} key={'moves-table'} />
			</Switch>
		</BrowserRouter>
		</>
	)
}
