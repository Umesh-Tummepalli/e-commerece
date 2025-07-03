import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Mail,
  User,
  MessageSquare,
  AlertTriangle,
  Loader2,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedMessageId, setExpandedMessageId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get("http://localhost:4000/user/message", {
        headers: {
          token: localStorage.getItem("adminToken") || "",
        },
      });
      if (res.data.success) {
        setQueries(res.data.messages);
      } else {
        console.log(res.status);
        setError("Failed to fetch queries");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      if (err.response.status === 401) {
        localStorage.removeItem("adminToken");
        return navigate("/admin/login");
      }
      setError(
        err.response?.data?.message ||
          "Failed to fetch queries. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/user/message/${id}`,
        {
          headers: {
            token: localStorage.getItem("adminToken"),
          },
        }
      );

      if (res.data.success) {
        setQueries(queries.filter((query) => query._id !== id));
      }
    } catch (err) {
      console.error(err);
      setError("Failed to delete query. Please try again.");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const toggleMessageExpansion = (id) => {
    setExpandedMessageId(expandedMessageId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
        <p className="mt-4 text-gray-600">Loading queries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={fetchQueries}
                className="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Customer Queries</h1>
          <p className="mt-2 text-sm text-gray-600">
            A list of all customer messages and inquiries.
          </p>
        </div>
      </div>

      {queries.length === 0 ? (
        <div className="mt-8 text-center bg-gray-50 rounded-lg p-12">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No queries yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Customer messages will appear here when they contact you.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {/* Mobile View */}
          <div className="sm:hidden space-y-4">
            {queries.map((query) => (
              <div
                key={query._id}
                className="bg-white shadow overflow-hidden rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {query.name}
                        </h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          {query.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleMessageExpansion(query._id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {expandedMessageId === query._id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                      {deleteConfirmId === query._id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDelete(query._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(query._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      {query.subject}
                    </h4>
                    <div
                      className={`mt-2 text-sm text-gray-600 ${
                        expandedMessageId === query._id ? "" : "line-clamp-3"
                      }`}
                    >
                      {query.message}
                    </div>
                    {query.message.length > 150 && (
                      <button
                        onClick={() => toggleMessageExpansion(query._id)}
                        className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {expandedMessageId === query._id
                          ? "Show less"
                          : "Read more"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden sm:block flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Subject
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Message
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {queries.map((query) => (
                        <tr key={query._id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-gray-500" />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {query.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-gray-400" />
                              {query.email}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {query.subject}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            <div
                              className={`${
                                expandedMessageId === query._id
                                  ? ""
                                  : "line-clamp-2"
                              }`}
                            >
                              {query.message}
                            </div>
                            {query.message.length > 100 && (
                              <button
                                onClick={() =>
                                  toggleMessageExpansion(query._id)
                                }
                                className="mt-1 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                {expandedMessageId === query._id
                                  ? "Show less"
                                  : "Read more"}
                              </button>
                            )}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            {deleteConfirmId === query._id ? (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleDelete(query._id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirmId(query._id)}
                                className="text-red-600 hover:text-red-800 hidden"
                                title="Delete"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Queries;
