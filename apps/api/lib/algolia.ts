import algoliasearch from 'algoliasearch';

const algolia_client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_APP_SEARCH_API_KEY,
);

// Initialize index
const index = algolia_client.initIndex(process.env.ALGOLIA_APP_INDEX_NAME);

const Algolia = {
  search: index.search.bind(index),
  addObject: index.saveObject.bind(index),
  deleteObject: index.deleteObject.bind(index),
};

export default Algolia;
