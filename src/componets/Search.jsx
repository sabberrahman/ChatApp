import React from 'react';

const Search = () => {
    return (
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder='Find your Friend' />
            </div>
            <div className="userChat">
                <img src="https://images.pexels.com/photos/20144196/pexels-photo-20144196/free-photo-of-a-woman-in-sunglasses-and-a-floral-shirt-standing-in-front-of-a-wall.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" alt="" />
                <div className="userChatInfo">
                    <span>sabber</span>
                </div>
            </div>
        </div>
    );
};

export default Search;