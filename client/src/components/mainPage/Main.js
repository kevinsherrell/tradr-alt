import React from 'react';
import {connect} from 'react-redux'

import ListAnItem from "./ListAnItem";
import ItemListing from "./ItemListing";
import PostItem from "./PostItem";

import {fetchAllListings, fetchAllListingsByCategory} from "../../actions/listingActions";
import uuid from 'uuid';


class Main extends React.Component {
    state = {
        catMenuOpened: false,
        postItemForm: false,
        browserWidth: window.innerWidth,
        listings: this.props.listingData.listings
    }

    handleCatMenu = () => {
        this.setState({
            catMenuOpened: !this.state.catMenuOpened
        }, () => console.log("cat menu has been opened"))
    }

    togglePostItem = (e) => {
        e.preventDefault();
        this.setState({
            postItemForm: !this.state.postItemForm
        })
    }

    componentDidMount() {

        this.props.fetchAllListings()

        window.addEventListener('resize', () => {
            this.setState({
                browserWidth: window.innerWidth
            }, () => console.log(this.state))
        })
    }

    render() {
        console.log("rendered")
        console.log(this.state)
        const listings = this.props.listingData.listings
        const {browserWidth} = this.state.browserWidth
        const mapListings = listings.map(listing => {
            return (
                <ItemListing key={uuid()} {...listing}/>
            )
        })
        return (
            <div className="home">
                <div className="home__inner-container container">
                    <div className={`sidebar ${browserWidth < 1023 && 'hidden'}`}>
                        <p className={'sidebar__listAnItem'} onClick={this.togglePostItem}>List an Item</p>
                        <h4 className={'sidebar__category-header'}>Categories: </h4>
                        <ul className={'sidebar__category-list'}>
                            <li className={'sidebar__category-list-item'} onClick={this.props.fetchAllListings}>
                                <p
                                    className={'sidebar__category-list-link'}>All</p>
                            </li>
                            <li className={'sidebar__category-list-item'}
                                onClick={() => this.props.fetchAllListingsByCategory("computers")}>
                                <p
                                    className={'sidebar__category-list-link'}>Computers</p>
                            </li>
                            <li className={'sidebar__category-list-item'}
                                onClick={() => this.props.fetchAllListingsByCategory("tablets")}>
                                <p
                                    className={'sidebar__category-list-link'}>Tablets</p>
                            </li>
                            <li className={'sidebar__category-list-item'}
                                onClick={() => this.props.fetchAllListingsByCategory("phones")}>
                                <p
                                    className={'sidebar__category-list-link'}>Phones</p>
                            </li>
                            <li className={'sidebar__category-list-item'}
                                onClick={() => this.props.fetchAllListingsByCategory("tvs")}>
                                <p
                                    className={'sidebar__category-list-link'}>TVs</p>
                            </li>
                            <li className={'sidebar__category-list-item'}
                                onClick={() => this.props.fetchAllListingsByCategory("video games/consoles")}>
                                <p
                                    className={'sidebar__category-list-link'}>Video
                                    Games/Consoles</p></li>
                            <li className={'sidebar__category-list-item'}
                                onClick={() => this.props.fetchAllListingsByCategory("appliances")}>
                                <p
                                    className={'sidebar__category-list-link'}>Appliances</p>
                            </li>
                            <li className={'sidebar__category-list-item'}
                                onClick={() => this.props.fetchAllListingsByCategory("vehicles")}>
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
                            <div className={'content__sort-menu-wrapper'} onClick={this.state.handleCatMenu}>
                                <p className={'content__sort-menu-btn'}>Sort/Filter: All <i
                                    className="content__sort-menu-icon material-icons">keyboard_arrow_down</i></p>


                                <div
                                    className={`${this.state.catMenuOpened ? "content__sort-menu-drop-down--open" : "content__sort-menu-drop-down--closed"}`}>
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
                {browserWidth < 650 && (
                    <ListAnItem/>

                )}

                <ListAnItem togglePostItem={this.togglePostItem}/>
                {this.state.postItemForm && (<PostItem {...this.state} togglePostItem={this.togglePostItem}/>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    listingData: state.listingData
})

export default connect(mapStateToProps, {fetchAllListings, fetchAllListingsByCategory})(Main);


