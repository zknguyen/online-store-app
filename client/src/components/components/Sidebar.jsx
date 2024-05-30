import './Sidebar.css';

// TODO: Rename this stuff
function Dropdown({ category, values }) {
    const handleDropdownSelected = (e) => {
        const dropdownValues = e.target.nextSibling;
        if (dropdownValues.classList.contains('hidden')) {
            dropdownValues.classList.remove('hidden');
        } else {
            dropdownValues.classList.add('hidden');
        }
    }

    const handleChildElementClicked = (e) => {
        e.stopPropagation();
    }
    // TODO: merge all these somehow
    return (
        <>
        <div className="dropdown" onClick={handleDropdownSelected}>
            <h3 className="dropdown-category" onClick={handleChildElementClicked}>{category}</h3>
            <i className="fa-solid fa-chevron-down" onClick={handleChildElementClicked}/>
            <i className="fa-solid fa-chevron-up hidden" onClick={handleChildElementClicked}/>
        </div>
        <div className="values hidden">
            {values.map((value) => <p key={value} className="dropdown-values">{value}</p>)}
        </div>
        </>
    )
}

function Sidebar({ categories }) {
    
    return (
        <div id="sidebar">
            {Object.entries(categories).map(
                ([category, values]) => <Dropdown className="category" key={category} category={category} values={values}/>
            )}
        </div>
    )
}

export default Sidebar;