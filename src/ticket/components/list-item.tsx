
export const ListItem = ({ item }) => {
    const { title, category, price } = item
    return (
        <li>
            <div className="flex items-center justify-between">
                <div>
                    <strong>{title}</strong> -- <span>{category}</span>
                </div>
                <div>
                    {price}
                </div>
            </div>
        </li>
    )
}
