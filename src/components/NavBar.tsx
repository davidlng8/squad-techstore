import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

// TODO: Fix sticky scroll
// TODO: configure add item using product modal
export default function NavBar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-3xl font-bold flex-1 text-center">Squad TechStore</div>
      <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Item <FontAwesomeIcon icon={faCirclePlus} beatFade />
      </button>
    </nav>
  );
}
