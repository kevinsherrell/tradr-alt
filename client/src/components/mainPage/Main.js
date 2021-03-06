import React, {useContext, useEffect, useState} from 'react';
import {connect} from 'react-redux'
import axios from 'axios';
import ListAnItem from "./ListAnItem";
import ItemListing from "./ItemListing";
import PostItem from "./PostItem";

import uuid from 'uuid';
import {ListingContext} from "../../context/ListingContext";

const Main = (props) => {
    const {allListings,fetchAllListings,fetchAllListingsByCategory} = useContext(ListingContext);
    const [browserWidth, setBrowserWidth]= useState(window.innerWidth)
    const [catMenuOpened, setCatMenuOpened]= useState(false)
    const [postItemForm, setPostItemForm]= useState(false)

    const handleCatMenu = () => {
        setCatMenuOpened(!catMenuOpened)
    }

    const togglePostItem = (e) => {
        e.preventDefault();
        setPostItemForm(!postItemForm)
    }

    const mapListings = allListings && allListings.map(listing => {
            return (
                <ItemListing key={uuid()} {...listing}/>
            )
        })
    useEffect(() => {
        fetchAllListings();
        window.addEventListener('resize', () => {
            setBrowserWidth(window.innerWidth)
        })
    }, [])
    return (
        <div className="home">
            <div className="home__inner-container container">
                <div className={`sidebar ${browserWidth < 1023 && 'hidden'}`}>
                    <p className={'sidebar__listAnItem'} onClick={togglePostItem}>List an Item</p>
                    <h4 className={'sidebar__category-header'}>Categories: </h4>
                    <ul className={'sidebar__category-list'}>
                        <li className={'sidebar__category-list-item'} onClick={fetchAllListings}>
                            <p
                                className={'sidebar__category-list-link'}>All</p>
                        </li>
                        <li className={'sidebar__category-list-item'}
                            onClick={() => fetchAllListingsByCategory("computers")}>
                            <p
                                className={'sidebar__category-list-link'}>Computers</p>
                        </li>
                        <li className={'sidebar__category-list-item'}
                            onClick={() => fetchAllListingsByCategory("tablets")}>
                            <p
                                className={'sidebar__category-list-link'}>Tablets</p>
                        </li>
                        <li className={'sidebar__category-list-item'}
                            onClick={() => fetchAllListingsByCategory("phones")}>
                            <p
                                className={'sidebar__category-list-link'}>Phones</p>
                        </li>
                        <li className={'sidebar__category-list-item'}
                            onClick={() => fetchAllListingsByCategory("tvs")}>
                            <p
                                className={'sidebar__category-list-link'}>TVs</p>
                        </li>
                        <li className={'sidebar__category-list-item'}
                            onClick={() => fetchAllListingsByCategory("video games/consoles")}>
                            <p
                                className={'sidebar__category-list-link'}>Video
                                Games/Consoles</p></li>
                        <li className={'sidebar__category-list-item'}
                            onClick={() => fetchAllListingsByCategory("appliances")}>
                            <p
                                className={'sidebar__category-list-link'}>Appliances</p>
                        </li>
                        <li className={'sidebar__category-list-item'}
                            onClick={() => fetchAllListingsByCategory("vehicles")}>
                            <p
                                className={'sidebar__category-list-link'}>Vehicle</p>
                        </li>
                    </ul>
                    <form className="sidebar__update-form">
                        {/*<h4 className={'sidebar__update-form-condition-header'}>Condition: </h4>*/}
                        {/*<ul className={'sidebar__update-form-condition-list'}>*/}
                        {/*    <li className={'sidebar__update-form-condition-list-item'}><input type="radio"*/}
                        {/*                                                                      name={'condition'}*/}
                        {/*                                                                      value={'new'}*/}
                        {/*                                                                      className={'sidebar__update-form-condition-list-input'}/> New*/}
                        {/*    </li>*/}
                        {/*    <li className={'sidebar__update-form-condition-list-item'}><input type="radio"*/}
                        {/*                                                                      name={'condition'}*/}
                        {/*                                                                      value={'used'}*/}
                        {/*                                                                      className={'sidebar__update-form-condition-list-input'}/> Used*/}
                        {/*    </li>*/}
                        {/*    <li className={'sidebar__update-form-condition-list-item'}><input type="radio"*/}
                        {/*                                                                      name={'condition'}*/}
                        {/*                                                                      value={'damaged'}*/}
                        {/*                                                                      className={'sidebar__update-form-condition-list-input'}/> Damaged*/}
                        {/*    </li>*/}
                        {/*    <li className={'sidebar__update-form-condition-list-item'}><input type="radio"*/}
                        {/*                                                                      name={'condition'}*/}
                        {/*                                                                      value={'broken'}*/}
                        {/*                                                                      className={'sidebar__update-form-condition-list-input'}/> Broken*/}
                        {/*    </li>*/}
                        {/*</ul>*/}

                        {/*<h4 className={'sidebar__update-form-price-header'}>Price: </h4>*/}
                        {/*<div className="sidebar__update-form-price-wrapper">*/}
                        {/*    <input type="text" placeholder={'min'}*/}
                        {/*           className={'sidebar__update-form-price-input'}/> To <input type="text"*/}
                        {/*                                                                      placeholder={'max'}*/}
                        {/*                                                                      className={'sidebar__update-form-price-input'}/>*/}
                        {/*</div>*/}

                        <h4 className={'sidebar__update-form-distance-header'}>Miles (from your location): </h4>
                        <div className="sidebar__update-form-distance-wrapper">
                            <input type="text" placeholder={'miles'}
                                   className={'sidebar__update-form-distance-input'}/> from <input type="text"
                                                                                                   placeholder={'zip'}
                                                                                                   className={'sidebar__update-form-distance-input'}/>
                        </div>
                        <button className={'sidebar__update-form-submit'}>Update Search</button>
                    </form>
                </div>
                <div className={"content"}>
                    <section className="content__sort-header ">
                        <div className={'content__sort-menu-wrapper'} onClick={handleCatMenu}>
                            <p className={'content__sort-menu-btn'}>Sort/Filter: All <i
                                className="content__sort-menu-icon material-icons">keyboard_arrow_down</i></p>


                            <div
                                className={`${catMenuOpened ? "content__sort-menu-drop-down--open" : "content__sort-menu-drop-down--closed"}`}>
                                <ul className={'content__sort-menu-drop-down-list'}>
                                    <li className={'content__sort-menu-drop-down-item'}>Oldest</li>
                                    <li className={'content__sort-menu-drop-down-item'}>Newest</li>
                                    <li className={'content__sort-menu-drop-down-item'}>Price: low to high</li>
                                    <li className={'content__sort-menu-drop-down-item'}>Price: high to low</li>
                                    <li className={'content__sort-menu-drop-down-item'}>Distance: closest</li>
                                </ul>
                            </div>
                        </div>


                        <p className={"content__sort-description"}>Listings near
                            you</p>
                    </section>
                    <section className="content__listings">
                        {mapListings}
                    </section>
                </div>

            </div>
            {/*{browserWidth < 1000 && (*/}
            {/*    <ListAnItem/>*/}
            {/*)}*/}

            <ListAnItem togglePostItem={togglePostItem}/>
            {postItemForm && (
                <PostItem
                    catMenuOpened={catMenuOpened}
                    postItemForm={postItemForm}
                    browserWidth={browserWidth}
                    togglePostItem={togglePostItem}/>
            )}
        </div>

    )
}


export default Main

