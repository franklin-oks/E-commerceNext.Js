"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Searchbar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const debounceRef = useRef(null);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1); // keyboard nav

  useEffect(() => {
    // close dropdown when clicking outside
    function onClick(e) {
      if (!containerRef.current?.contains(e.target)) {
        setShowDropdown(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!query || query.trim().length === 0) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    // debounce
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const fetchSuggestions = async (q) => {
    setLoading(true);
    try {
      // use ilike for case-insensitive partial match
      const { data, error } = await supabase
        .from("products")
        .select("id,title,image_url,price")
        .ilike("title", `%${q}%`)
        .limit(8);

      if (error) {
        console.error("Supabase suggestions error", error);
        setSuggestions([]);
      } else {
        setSuggestions(data || []);
        setShowDropdown((data && data.length > 0) || false);
        setActiveIndex(-1);
      }
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    // navigate to results page (you can read ?q= on /products page)
    router.push(`/products?q=${encodeURIComponent(trimmed)}`);
    setShowDropdown(false);
  };

  const goToProduct = (product) => {
    // navigate to product detail page
    // change to match your routes. I'm using /product/[id]
    router.push(`/detail/${product.id}`);
    setShowDropdown(false);
  };

  const onKeyDown = (e) => {
    if (!showDropdown) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      // if a suggestion is active, navigate to it
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        e.preventDefault();
        goToProduct(suggestions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  };

  useEffect(() => {
    // keep input value focused when navigating suggestions via keyboard
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      // optionally set query to active suggestion title
      // setQuery(suggestions[activeIndex].title);
    }
  }, [activeIndex, suggestions]);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <form onSubmit={onSubmit} className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setShowDropdown(true);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search products..."
          className="w-full rounded-xl py-2 px-4 outline-none bg-gray-100"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white text-sm"
        >
          Search
        </button>
      </form>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-72 overflow-auto">
          {loading && <div className="p-3 text-sm">Loading suggestions...</div>}
          {!loading && suggestions.length === 0 && (
            <div className="p-3 text-sm">No products found</div>
          )}
          <ul>
            {suggestions.map((p, idx) => (
              <li
                key={p.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(-1)}
                onClick={() => goToProduct(p)}
                className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                  activeIndex === idx ? "bg-gray-100" : ""
                }`}
              >
                <div className="w-12 h-12 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                  {p.image_url ? (
                    // image_url name may differ; change to your column name
                    // using native <img> is fine; optimize as needed.
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                      No image
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="text-sm font-medium truncate">{p.title}</div>
                  {p.slug && (
                    <div className="text-xs text-gray-500 truncate">
                      {p.price}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
