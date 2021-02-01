import React, { useState, useEffect } from "react";

import SearchBox from "../searchBox/searchBox.component";
import List from "../list/list.component";

import "./autoComplete.styles.css";

const AutoComplete = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [users, setUsers] = useState(null);

  const handleSearchTextChange = (searchText) => {
    setSelectedUserName(searchText);
    setSearchQuery(searchText);
  };

  const handleUserSelection = (user) => {
    setSelectedUserName(user.name);
    setUsers([]);
  };

  const getFilteredUsers = (users, searchQuery) => {
    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  const sortUserList = (users) => {
    users.sort((userA, userB) => {
      let userAEmail = userA.email.toLowerCase();
      let userAName = userA.name.toLowerCase();
      let userBEmail = userB.email.toLowerCase();
      let userBName = userB.name.toLowerCase();
      let lowerCasedSearchQuery = searchQuery.toLowerCase();

      // Check for exact matches first
      let userANameParts = userAName.split(" ");
      let userBNameParts = userBName.split(" ");
      if (userANameParts.includes(lowerCasedSearchQuery)) {
        return -1;
      } else if (userBNameParts.includes(lowerCasedSearchQuery)) {
        return 1;
      }

      // If no exact match was found, sort by email matches
      if (userAEmail.includes(lowerCasedSearchQuery)) {
        return -1;
      } else if (userBEmail.includes(lowerCasedSearchQuery)) {
        return 1;
      }

      // If no email match was found, sort by name matches
      if (userAName.includes(lowerCasedSearchQuery)) {
        return -1;
      } else if (userBName.includes(lowerCasedSearchQuery)) {
        return 1;
      }

      return 0;
    });
  };

  useEffect(() => {
    const fetchFunc = async () => {
      if (searchQuery === "") {
        setUsers([]);
        return;
      }

      let response = await fetch(
        `http://127.0.0.1:8080/?search=${searchQuery}`
      );
      let responseJson = await response.json();

      // Filter and sort the results
      let filteredUsers = getFilteredUsers(responseJson, searchQuery);
      sortUserList(filteredUsers);
      setUsers(filteredUsers);
    };
    fetchFunc();
  }, [searchQuery]);

  return (
    <div className="autoComplete">
      <SearchBox
        value={selectedUserName}
        placeholder="Enter name"
        handleChange={handleSearchTextChange}
      ></SearchBox>

      {users && users.length ? (
        <List listItems={users} handleClick={handleUserSelection}></List>
      ) : null}
    </div>
  );
};

export default AutoComplete;
