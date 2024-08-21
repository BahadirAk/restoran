import yelp from "@/api/yelp";
import { useEffect, useState } from "react";

export default () => {
    const [results, setResults] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const searchApi = async (searchTerm: string ) => {
      try {
        const response =  await yelp.get('/search', {
          params: {
              term: searchTerm,
              location: 'İstanbul',
              limit: 50
          },
        });
        setResults(response.data.businesses);
        setErrorMessage('');
      } catch (error) {
        setErrorMessage('Bağlantı hatası meydana geldi.');
      }
    };

  useEffect(() => {
    searchApi('Toast');
  }, []);

  return [searchApi, results, errorMessage]; 
}