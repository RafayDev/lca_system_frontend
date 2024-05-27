import React from "react";
import { Tr, Td } from "@chakra-ui/react";

function TableRowLoading({ nOfColumns = 4, actions = ["w-20", "w-20"] }) {
  return (
    <>
      <Tr>
        {[...Array(nOfColumns)].map((_, index) => (
          <Td key={index} className="animate-pulse">
            <div className="h-4 my-2 bg-gray-200 rounded-full"></div>
          </Td>
        ))}
        <Td className="animate-pulse flex gap-3 justify-end">
          {actions.map((action, index) => (
            <div
              key={index}
              className={`h-4 my-2 bg-gray-200 rounded-full ${action}`}
            ></div>
          ))}
        </Td>
      </Tr>
    </>
  );
}

export default TableRowLoading;
