import { useCallback } from "react";

function EntryItem({ entryData }) {
    const { description, amount, isExpense } = entryData;

    const buildCSSClasses = useCallback((baseClass) => {
        let classes = baseClass;
        if (isExpense) {
            classes += ' alert';
        } else {
            classes += ' success';
        }
        return classes;
    }, [isExpense]);   

    return (
        <li className="entry-item">
            <div className={buildCSSClasses('entry-item')}>
                <p>
                    <span>{description}</span>
                    <span>{amount}</span>
                </p>
            </div>
        </li>
    );
}

export default EntryItem;