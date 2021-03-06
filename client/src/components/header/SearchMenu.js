import React from 'react';

import search from "../../assets/images/search.png";
import location from "../../assets/images/location.png";

function SearchMenu(props) {
    // console.log(props)
    return (
        <div className={`header__search-menu ${props.searchToggle === false && "hidden"}`}>
            <div className="header__search-menu-inner-container container">
                <div className="header__search-menu-header">
                    <h3 className={'header__search-menu-logo'}>trad'r</h3>
                    <i className="header__search-menu-close material-icons" onClick={props.toggleSearchMenu}>close</i>
                </div>
                <form action="" className="header__search-menu-form">
                    <div className="header__search-menu-search-wrapper">
                        <input className={'header__search-menu-search-input'} type="text" placeholder={"Search"}/>
                        <img className={'header__search-menu-search-image'} src={search} alt=""/>
                    </div>
                    <div className="header__search-menu-location-wrapper">
                        <input className={'header__search-menu-location-input'} type="text" placeholder={"Location"}/>
                        <img className={'header__search-menu-location-image'} src={location} alt=""/>
                    </div>
                    <div className="header__search-menu-controls">
                        <button className={'header__search-menu-filter-toggle'} type={"button"}
                                onClick={props.toggleSearchMenuFilter}>Filter <i
                            className="header__search-menu-filter-icon material-icons">{props.searchMenuFilter ? "keyboard_arrow_up" : "keyboard_arrow_down"}</i>
                        </button>
                        <button
                            className={`header__search-menu-no-filter-submit ${props.searchMenuFilter ? "header__search-menu-no-filter-submit--filter-true" : undefined}`}>Search
                        </button>
                    </div>
                    <div className={`header__search-menu-filter-options ${!props.searchMenuFilter && "hidden"}`}>
                        {/*<div className="header__search-menu-price-outer-wrapper">*/}
                        {/*    <label className={'header__search-menu-price-label'}>Price</label>*/}
                        {/*    <div className={"header__search-menu-price-inner-wrapper"}>*/}
                        {/*        $<input className={'header__search-menu-price-input'} type="number" max={"999"}*/}
                        {/*                placeholder={"Min"}/>*/}
                        {/*        /!*<p>To</p>*!/*/}
                        {/*        $<input className={'header__search-menu-price-input'} type="number" max={"999"}*/}
                        {/*                placeholder={"Max"}/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="header__search-menu-distance-outer-wrapper">
                            <label className={'header__search-menu-distance-label'}>Distance</label>
                            <div className="header__search-menu-distance-inner-wrapper">
                                <input className={'header__search-menu-distance-input'} type="text"
                                       placeholder={"Miles"}/>
                                {/*<p>mi.</p>*/}
                            </div>
                        </div>
                        <div className="header__search-menu-category-wrapper">
                            <label className={'header__search-menu-category-label'}>Category</label>
                            <select className={"header__search-menu-category-input"}>
                                <option value="computers">Computers</option>
                                <option value="tablets">Tablets</option>
                                <option value="phones">Phones</option>
                                <option value="tvs">TVs</option>
                                <option value="appliances">Appliances</option>
                                <option value="vehicles">Vehicles</option>
                            </select>
                        </div>
                        <div className="header__search-menu-sort-wrapper">
                            <label className={'header__search-menu-sort-label'}>Sort by</label>
                            <select className={"header__search-menu-sort-input"}>
                                <option value="date">Date</option>
                                <option value="priceLow">Price: low to high</option>
                                <option value="priceHigh">Price: high to low</option>
                                <option value="Closest">Closest</option>
                            </select>
                        </div>

                        <button className={'header__search-menu-filter-submit'}>Search</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SearchMenu;