import React, { useContext, useState, useEffect, useRef } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "../components/Title";
import Card from "../components/Card";
import Search from "../components/Search";
import { motion } from "framer-motion";
const Collection = () => {
  const { products } = useContext(shopContext);
  const [filteredProds, setFilteredProds] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortBy, setSortBy] = useState("relevant");
  const unsortedData = useRef(products);
  const [search, setsearch] = useState("");
  function toggleCategory(e) {
    setCategory((prev) => {
      if (prev.includes(e.target.value)) {
        return prev.filter((cat) => cat != e.target.value);
      } else {
        return [...prev, e.target.value];
      }
    });
  }
  function toggleSubCategory(e) {
    setSubCategory((prev) => {
      if (prev.includes(e.target.value)) {
        return prev.filter((cat) => cat != e.target.value);
      } else {
        return [...prev, e.target.value];
      }
    });
  }
  useEffect(() => {
    let Productsfiltered = search
      ? products.filter((item) => item.name.toLowerCase().includes(search))
      : products;
    if (category.length > 0) {
      Productsfiltered = products.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      Productsfiltered = Productsfiltered.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    unsortedData.current = [...Productsfiltered];
    setFilteredProds(Productsfiltered);
  }, [category, products, subCategory, search]);
  useEffect(() => {
    setFilteredProds((prev) => {
      const sorted = [...prev]; // clone the array
      switch (sortBy) {
        case "low-high":
          return sorted.sort((a, b) => a.price - b.price);
        case "high-low":
          return sorted.sort((a, b) => b.price - a.price);
        default:
          return unsortedData.current;
      }
    });
  }, [sortBy, unsortedData]);

  return (
    <>
      <Search search={search} setsearch={setsearch} />
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10">
        {/* Filter Options */}
        <div className="md:sticky top-4 h-fit">
          <p className="font-bold text-2xl text-center">Filters</p>
          {/* Categories */}
          <div className="p-3 flex flex-col gap-3 m-4 border rounded-lg">
            <h2 className="font-bold text-center">Categories</h2>

            <label htmlFor="MenBox" className="mx-3">
              <input
                className="mr-2 accent-black scale-125"
                type="checkbox"
                name="Men"
                value="Men"
                id="MenBox"
                onChange={toggleCategory}
              />
              Men
            </label>

            <label htmlFor="WomenBox" className="mx-3">
              <input
                className="mr-2 accent-black scale-125"
                type="checkbox"
                name="Women"
                value="Women"
                id="WomenBox"
                onChange={toggleCategory}
              />
              Women
            </label>

            <label htmlFor="KidsBox" className="mx-3">
              <input
                className="mr-2 accent-black scale-125"
                type="checkbox"
                name="Kids"
                value="Kids"
                id="KidsBox"
                onChange={toggleCategory}
              />
              Kids
            </label>
          </div>

          {/* Sub Categories */}
          <div className="p-3 flex flex-col gap-3 mx-4 border rounded-lg">
            <h2 className="font-bold text-center">Sub Categories</h2>

            <label htmlFor="TopwearBox" className="mx-3 flex">
              <input
                className="mr-2 accent-black scale-125"
                type="checkbox"
                name="Topwear"
                value="Topwear"
                id="TopwearBox"
                onChange={toggleSubCategory}
              />
              <span className="whitespace-nowrap">Top Wear</span>
            </label>

            <label htmlFor="BottomwearBox" className="mx-3 flex">
              <input
                className="mr-2 accent-black scale-125"
                type="checkbox"
                name="Bottomwear"
                value="Bottomwear"
                id="BottomwearBox"
                onChange={toggleSubCategory}
              />
              <span className="whitespace-nowrap">Bottom Wear</span>
            </label>

            <label htmlFor="WinterwearBox" className="mx-3 flex">
              <input
                className="mr-2 accent-black scale-125"
                type="checkbox"
                name="Winterwear"
                value="Winterwear"
                id="WinterwearBox"
                onChange={toggleSubCategory}
              />
              <span className="whitespace-nowrap">Winter Wear</span>
            </label>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full p-4">
          <div className="flex justify-between">
            <Title text1="All" text2="Collection" />
            <select
              name="Sortby"
              value={sortBy}
              className="border rounded-lg p-2"
              onChange={(e) => {
                setSortBy(e.target.value);
              }}
            >
              <option value="relevant">Sort By : relevant</option>
              <option value="low-high">Sort By : low-high</option>
              <option value="high-low">Sort By : high-low</option>
            </select>
          </div>

          <motion.div layout className="flex flex-wrap">
            {filteredProds.map((item) => {
              return (
                <motion.div
                  className="div inline"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 50 }}
                  key={item._id}
                  layoutId={item._id}
                >
                  <Card item={item} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Collection;
