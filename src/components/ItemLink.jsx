// Item.js
import React from "react";

import { deleteLink, votes } from "../services/LinkService";

import StarRating from "./Stars";
import { useAppContext } from "../context/AppContext";

const ItemLink = ({ item }) => {
  const { links, setLinks, setAlert } = useAppContext();

  const handleRatingChange = async (newRating) => {
    let res = await votes({
      linkId: item.id,
      value: parseInt(newRating),
    });

    if (res.status === "ok") {
      setAlert({ show: true, message: "Gracias por su voto", type: "info" });
      links.map((link) => {
        if (link.id === item.id) {
          link.votedByMe = true;
        }
        return link;
      });

      setLinks([...links]);
    } else {
      setAlert({ show: true, message: res.message, type: "error" });
    }
    return res;
  };

  const handledelete = async () => {
    let res = await deleteLink(item.id);
    if (res.status === "ok") {
      let resfilter = links.filter((link) => link.id !== item.id);
      setAlert({ show: true, message: "Link eliminado", type: "success" });
      setLinks([...resfilter]);
    } else {
      setAlert({ show: true, message: res.message, type: "error" });
    }
  };

  return (
    
    <div className="bg-white border rounded-lg shadow-sm p-4 mb-4">
      {/* Encabezado de la tarjeta */}
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
        <div className="ml-3">
          <a  href={item.url} target="_blank" className="text-gray-800 font-semibold">{item.title}</a>
          <div className="text-gray-500">@{item.username}</div>
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="mt-4 text-gray-800">{item.description}</div>

      {/* Pie de la tarjeta */}
      <div className="flex items-center justify-between mt-2">
        {item.owner ? (
          <button
            className="flex bg-red-100 rounded-lg px-2 py-2 text-red-600 "
            onClick={handledelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        ) : (
          <div></div>
        )}

        <div
          className={`flex bg-indigo-50 rounded-lg pb-1 px-2 ${
            item.votedByMe ? "bg-indigo-100" : "bg-indigo-50"
          }`}
        >
          <StarRating
            isDisabled={item.votedByMe}
            initialRating={item.votes}
            maxRating={5}
            onRatingChange={handleRatingChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemLink;
