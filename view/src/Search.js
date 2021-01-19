import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components:
import PokemonTable from './PokemonTable';
import MovesTable from './MovesTable';

// Utility:
const useSortableData = require('./usesortabledata.js').default;

////////////////////////////////////////////////


// THE SAMPLE SORTABLE TABLE COMPONENT
// https://www.smashingmagazine.com/2020/03/sortable-tables-react/
function ProductTable (props) {
	const { data, requestSort, sortConfig } = useSortableData(props.products);
	
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
				{data.map(product => (
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
	const [pokemon, setPokemon] = useState([]);
	const [moves, setMoves] = useState([]);
	
	const getPokemon = async () => {
		try {
			const response = await fetch('http://localhost:5000/search/pokemon');
			const jsonData = await response.json();
			setPokemon(jsonData);
		} catch (error) {
			console.error(error.message);
		}
	}
	
	const getMoves = async () => {
		try {
			const response = await fetch('http://localhost:5000/search/moves');
			const jsonData = await response.json();
			setMoves(jsonData);
		} catch (error) {
			console.error(error.message);
		}
	}
	
	useEffect(() => {
		getPokemon();
	}, []);
	
	useEffect(() => {
		getMoves();
	}, []);
	
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
				<Route exact path="/search">
					<PokemonTable pokemon={pokemon} />
				</Route> 
				<Route exact path="/search/moves">
					<MovesTable moves={moves} />
				</Route> 
			</Switch>
		</BrowserRouter>
		</>
	)
}
