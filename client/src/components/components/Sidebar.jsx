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

    const handleCheckboxChecked = (e) => {
        const target = e.target;
        console.log(target);
    }

    // TODO: Move hidden components into a function
    return (
        <>
        <div className="dropdown" onClick={handleDropdownSelected}>
            <h3 className="dropdown-category">{category}</h3>
            <i className="fa-solid fa-chevron-down arrow-icon"/>
            <i className="fa-solid fa-chevron-up arrow-icon hidden"/>
        </div>
        <div className="values hidden">
            {values.map((value) => {
                return (
                <div id="dropdown-selection" key={value}>
                    <label htmlFor={value} className="checkbox-label">
                        <input type="checkbox" name="checkbox" id={value} className="checkbox" onChange={handleCheckboxChecked}/>
                        {value}
                    </label>
                </div>
                )
            })}
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