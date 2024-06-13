import React, { useEffect, useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

export default function TableSearch({ setQueryFilter, method }) {
  const [authToken] = useState(Cookies.get("authToken"));
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setQueryFilter(searchQuery));
    dispatch(method({ authToken }));
  };

  useEffect(() => {
    setSearchQuery("");
    dispatch(setQueryFilter(""));
  }, []);

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
      </InputGroup>
    </>
  );
}
