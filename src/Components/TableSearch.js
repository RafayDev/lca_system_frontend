import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from "@chakra-ui/react";
import { Search, X } from "lucide-react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";


const TableSearch = forwardRef(({ setQueryFilter, method }, ref) => {
  const [authToken] = useState(Cookies.get("authToken") || sessionStorage.getItem("authToken"));
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setQueryFilter(searchQuery));
    dispatch(method({ authToken }));
  };

  const clearSearch = () => {
    setSearchQuery("");
    dispatch(setQueryFilter(""));
    dispatch(method({ authToken }));
  };

  useEffect(() => {
    setSearchQuery("");
    dispatch(setQueryFilter(""));
  }, []);

  useImperativeHandle(ref, () => ({
    clearSearch
  }));

  return (
    <>
      <InputGroup size="lg" variant="filled" bg="white">
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
        >
          <Search />
        </InputLeftElement>
        <Input
          placeholder="Search..."
          borderRadius="xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
        />
        <InputRightElement width="2.8rem">
          {searchQuery && (
            <IconButton
              h="calc(100% - 0.9rem)"
              size="md"
              borderRadius={"lg"}
              marginRight={"0.5rem"}
              onClick={() => clearSearch()}
            >
              <X />
            </IconButton>
          )}
        </InputRightElement>
      </InputGroup>
    </>
  );
});

export default TableSearch;
