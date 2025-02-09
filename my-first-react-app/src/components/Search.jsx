import React from 'react'

const Search = ({ searchTearm, setsearchTearm }) => {
    return (
        <div className='search'>
            <div>
                <img src="search.svg" alt="search" />
                <input type="text"
                    placeholder='Search through thousands of movies'
                    value={searchTearm}
                    onChange={(e) => setsearchTearm(e.target.value)} />
            </div>
        </div>
    )
}

export default Search