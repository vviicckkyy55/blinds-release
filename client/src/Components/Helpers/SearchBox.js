import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}




// import React from 'react'
// import { TextField, InputAdornment, Button } from '@material-ui/core';

// import SearchIcon from '@material-ui/icons/Search';
// import FilterListIcon from '@material-ui/icons/FilterList';


// export default function SearchBox({ buttonIcon, buttonLabel, buttonPath}) {
//   return (
//     <div>
//       <div >
//         <div className="row center">
//           <div className="card">
//           <TextField 
//             id="input-with-icon-textfield"
//             variant="outlined"
//             size="small"
//             label="Search"
//             fullWidth
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <SearchIcon />
//                 </InputAdornment>
//               )}}
//             ></TextField>
//           </div>
//           <div className="card">
//             <Button
//               variant="contained"
//               color="secondary"  
//               fullWidth
//               startIcon={<SearchIcon />}
//             >Search
//             </Button>
//           </div>
//           <div className="card">
//             <Button
//               variant="contained"
//               fullWidth 
//               startIcon={<FilterListIcon />}
//             >Filter
//             </Button>
//           </div>
//           <div className="card">
//             <Button
//                 variant="contained"
//                 color="primary" 
//                 startIcon={buttonIcon}
//                 onClick={() => {
//                   window.location.replace(`${buttonPath}`)
//                 }}
//               >{buttonLabel}
//               </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
