"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/store";
import { fetchCategories } from "@/store/slice/home/categorySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function ListCategory() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return null;
  }
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <ul className="flex space-x-6 text-accent-100 font-semibold">
      {data.map((cat) => (
        <li key={cat.id} className="relative group">
          <Link
            href={`/category/${cat.name}`}
            className="flex items-center space-x-1 hover:text-accent transition px-2 py-2"
          >
            <span>{cat.name}</span>
            {cat.children?.length > 0 && (
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-xs text-accent-300"
              />
            )}
          </Link>

          {cat.children && cat.children.length > 0 && (
            <ul
              className="absolute left-0 top-full hidden group-hover:flex flex-col
                bg-primary-900/95 backdrop-blur-md border border-primary-700
                rounded-xl shadow-xl min-w-[220px] py-2 z-50"
            >
              {cat.children.map((child) => (
                <li
                  key={child.id}
                  className="relative group/sub hover:bg-primary-800/70"
                >
                  <Link
                    href={`/category/${child.name}`}
                    className="block px-4 py-2 text-accent-100 hover:text-accent transition items-center justify-between"
                  >
                    <span>{child.name}</span>
                    {child.children?.length > 0 && (
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-[10px] text-accent-300"
                      />
                    )}
                  </Link>

                  {child.children && child.children.length > 0 && (
                    <ul
                      className="absolute left-full top-0 hidden group-hover/sub:grid
                                                        bg-primary-900/95 border border-primary-700 rounded-xl shadow-xlpy-2 z-5
                                                            grid-cols-3 gap-x-6 gap-y-1 min-w-[600px] max-w-[800px] px-4"
                    >
                      {child.children.map((sub) => (
                        <li
                          key={sub.id}
                          className="hover:bg-primary-800/70 rounded-md px-3 py-2 transition"
                        >
                          <Link
                            href={`/category/${sub.name}`}
                            className="block text-accent-100 hover:text-accent transition text-sm font-medium"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}

                      <li className="col-span-3 border-t border-primary-700 mt-2 pt-2 text-center">
                        <Link
                          href={`/category/${child.name}`}
                          className="block text-accent-200 hover:text-accent text-sm"
                        >
                          View all {child.name} →
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
