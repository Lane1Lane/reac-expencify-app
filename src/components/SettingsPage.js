import React, { useState } from 'react';
import CategoriesList from './CategoriesList';



const AccountsPage = () => {
    const [unHide, setUnHide] = useState(false);
    const svgName = unHide ? 'up' : 'down';
    return (
        <div>
            <div className="page-header">
                <div className="content-container">
                    <div className="list-item pointer" onClick={()=>setUnHide(!unHide)}>
                        <h3 className="list-item__title">Категории</h3>
                        <img src={`/images/${svgName}.svg`} className="list-item__img"/>
                    </div>
                    {unHide ? <CategoriesList/> : null } 
                </div>
            </div>
        </div>
    
)}

export default AccountsPage;