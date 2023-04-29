import { useState } from 'react';

function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block">
            <button onClick={handleToggleDropdown} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                Toggle Dropdown
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10 transition duration-[3000ms] ease-in-out">
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Item 1</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Item 2</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Item 3</a>
                </div>
            )}
        </div>
    );
}

export default Dropdown;
