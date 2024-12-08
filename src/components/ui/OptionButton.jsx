import React from 'react'

const OptionButton = ({selected, option, select}) => {
    return (
        <button onClick={select} className={` ${selected === option ? 'bg-green-600 text-black' : 'bg-transparent text-white '} w-80 h-20 border border-gray-400 rounded-xl hover:border-green-400`}>{option}
        </button>
    )
}
export default OptionButton