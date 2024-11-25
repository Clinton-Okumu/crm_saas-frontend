import React, { useState, useEffect } from 'react';
import { Plus, Search, Globe, Share } from 'lucide-react';
import axios from 'axios';

const DocumentManagement = () => {
  // State variables for managing documents, loading state, errors, search queries, and view modes
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('all');

  // Fetch documents when viewMode changes
  useEffect(() => {
    fetchDocuments();
  }, [viewMode]);

  // Debounce search queries to limit API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) fetchDocuments();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Fetch documents from the backend
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const url = `http://127.0.0.1:8000/api/documents${viewMode !== 'all' ? `/${viewMode}` : ''}${searchQuery ? `?search=${searchQuery}` : ''}`;
      const response = await axios.get(url);
      setDocuments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  // Create a new document
  const handleCreateDocument = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/documents/', {
        title: 'New Document',
        is_public: false,
      });
      fetchDocuments();
    } catch (error) {
      console.error('Error creating document:', error);
      setError('Failed to create document');
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-4">Documents</h1>

        {/* Search and Create Section */}
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

      {/* View Mode Buttons */}
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

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading documents...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">{error}</div>
      ) : documents.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          {searchQuery
            ? `No results found for "${searchQuery}"`
            : viewMode === 'all'
            ? 'No documents yet. Create your first document!'
            : `No ${viewMode} documents found`}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentManagement;

