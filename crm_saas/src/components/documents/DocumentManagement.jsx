import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Globe, Share } from 'lucide-react';

// Helper function to get tokens
const getToken = (type) => localStorage.getItem(type);

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('all');

  useEffect(() => {
    fetchDocuments();
  }, [viewMode]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) fetchDocuments();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Helper function to build the query URL
  const buildUrl = () => {
    const params = new URLSearchParams();
    if (viewMode !== 'all') {
      params.append('is_public', viewMode === 'public');
    }
    if (searchQuery) {
      params.append('search', searchQuery);
    }
    return `http://127.0.0.1:8000/api/documents?${params.toString()}`;
  };

  // Function to refresh the access token
  const refreshAccessToken = async () => {
    const refreshToken = getToken('refresh');
    if (!refreshToken) {
      setError('Authentication required');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
        refresh: refreshToken,
      });
      const newAccessToken = response.data.access;
      localStorage.setItem('access', newAccessToken); // Save new access token
      return newAccessToken;
    } catch (error) {
      console.error('Failed to refresh access token:', error);
      setError('Session expired. Please log in again.');
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    }
  };

  // Function to fetch documents
  const fetchDocuments = async () => {
    setLoading(true);
    const token = getToken('access');

    if (!token) {
      setError('Authentication token is missing');
      return;
    }

    try {
      const url = buildUrl();
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocuments(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          // Retry fetching documents with the new access token
          fetchDocuments();
        }
      } else {
        setError('Failed to load documents');
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to handle document creation
  const handleCreateDocument = async () => {
    const token = getToken('access');
    if (!token) {
      setError('Authentication token is missing');
      return;
    }

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/documents/',
        {
          title: 'New Document',
          is_public: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchDocuments(); // Refresh documents after creation
    } catch (error) {
      setError('Failed to create document');
    }
  };

  // Function to handle document deletion
  const handleDeleteDocument = async (docId) => {
    const token = getToken('access');
    if (!token) {
      setError('Authentication token is missing');
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/documents/${docId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchDocuments(); // Refresh documents after deletion
    } catch (error) {
      setError('Failed to delete document');
    }
  };

  const handleRetry = () => {
    setError(null);
    fetchDocuments();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-4">Documents</h1>
        <div className="flex justify-between items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>
          <button
            onClick={handleCreateDocument}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Document
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setViewMode('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            viewMode === 'all' ? 'bg-blue-500 text-white' : 'hover:bg-gray-50'
          }`}
        >
          All Documents
        </button>
        <button
          onClick={() => setViewMode('public')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            viewMode === 'public' ? 'bg-blue-500 text-white' : 'hover:bg-gray-50'
          }`}
        >
          <Globe className="w-4 h-4" />
          Public Documents
        </button>
        <button
          onClick={() => setViewMode('shared')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            viewMode === 'shared' ? 'bg-blue-500 text-white' : 'hover:bg-gray-50'
          }`}
        >
          <Share className="w-4 h-4" />
          Shared Documents
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading documents...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">
          {error}
          <button
            onClick={handleRetry}
            className="ml-4 text-blue-500 hover:underline"
          >
            Retry
          </button>
        </div>
      ) : documents.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No documents available. Create your first document!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow p-4"
            >
              <h3 className="text-lg font-medium">{doc.title}</h3>
              <p className="text-gray-500">{doc.description || 'No description available'}</p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => handleDeleteDocument(doc.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentManagement;
