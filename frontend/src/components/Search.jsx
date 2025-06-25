import React,{useRef,useEffect} from 'react'

const Search = (props) => {
    const {search,setsearch}=props;
    const searchRef=useRef();
    useEffect(()=>{
        searchRef.current.focus();
    },[])
  return (
    <div className="text-center">
        <input type="text" ref={searchRef} className="w-1/2 border-1 p-3 rounded-lg " placeholder="Search here"
        value={search}
        onChange={(e)=>{setsearch(e.target.value.toLowerCase())}}
        />
    </div>
  )
}

export default Search