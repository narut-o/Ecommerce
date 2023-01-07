import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Search.css";

const Search = () => {
    const [keyword,setKeyword] = useState('');
    const navigate = useNavigate();
    const searchSubmitHandler = (event)=>{
        event.preventDefault();
        if(keyword.trim())
        {
            navigate(`/products/${keyword}`);
        }else{
            navigate('/products');
        }
    

    }
  return (
    <>
        <form className='searchBox' onSubmit={searchSubmitHandler} >
          <input
          type='text'
          placeholder='Search a product...'
          onChange={(event)=>setKeyword(event.target.value)}
           />
           <input
               type='submit'
               value='search'
           />
        </form>
    </>
  )
}

export default Search
