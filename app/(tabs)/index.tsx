import { StyleSheet, View, Text } from 'react-native';

import { useRouter } from 'expo-router';
import SearchBar from '@/components/SearchBar';
import useResult from '@/hooks/useResult';
import ResultList from '@/components/ResultList';
import { useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const [searchApi, results, errorMessage] = useResult();
  const [term, setterm] = useState('')
  // console.log(results );
  
  const filterResultsByPrice = (price: string) => {
    return results.filter((result) => { 
      return result.price === price;
    });
  };

  return (
    <View>
      <SearchBar term={term} onTermChange={setterm} onTermSubmit={() => searchApi(term)}/>
      {errorMessage ? <Text>{errorMessage}</Text> : null }
      <ResultList title='Ucuz Restoranlar' results={filterResultsByPrice("₺")}/>
      <ResultList title='Uygun Restoranlar' results={filterResultsByPrice("₺₺")}/>
      <ResultList title='Pahalı Restoranlar' results={filterResultsByPrice("₺₺₺")}/>
    </View>
  );
}

const styles = StyleSheet.create({});
