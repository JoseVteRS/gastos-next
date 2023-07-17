
import { ListItem } from "./list-item"

export const TiketItem = ({ day, nameDay }) => {
    return (
        <article className="text-xs mb-10" >
            <div className="mb-4 border-b border-black" >
                <h2 className="font-bold text-lg" >Dia {day}</h2>
                <span>{nameDay}</span>
            </div>

            <div>
                <ul>
                    <ListItem item={{ title: 'Hola', category: 'Compra', price: '50.30' }} />
                    <ListItem item={{ title: 'Mercadona', category: 'Compra', price: '50.30' }} />
                    <ListItem item={{ title: 'Le Smash', category: 'Uber eats', price: '50.30' }} />
                    <ListItem item={{ title: 'Hola', category: 'Compra', price: '50.30' }} />
                    <ListItem item={{ title: 'Hola', category: 'Compra', price: '50.30' }} />
                    <ListItem item={{ title: 'Hola', category: 'Compra', price: '50.30' }} />
                </ul>
            </div>

            <div className="flex justify-between items-start border-t border-b-2 border-black p-2 mt-3" >
                <p>TOTAL DÍA:</p>
                <p>65.32€</p>
            </div>

        </article>
    )
}