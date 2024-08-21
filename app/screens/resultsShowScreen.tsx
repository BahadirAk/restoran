import { FlatList, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import yelp from "@/api/yelp";
import { useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MapView, { Marker } from 'react-native-maps';

export default function resultsShowScreen() {
  const [result, setresult] = useState(null);
  const { id } = useLocalSearchParams();

  const getResult = async (id: string) => {
    const response = await yelp.get(`/${id}`);
    setresult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  const isOpen = !result.is_closed;
  return (
    // <View>
    //   <Text style={styles.title}>{result.name}</Text>
    //   <Text style={styles.phone}>{result.phone}</Text>
    //   <View style={styles.icon}>
    //   {result.is_closed ? (
    //     <AntDesign
    //       name="closecircleo"
    //       size={30}
    //       color="black"
    //     />
    //   ) : (
    //     <MaterialIcons
    //       name="delivery-dining"
    //       size={30}
    //       color="black"
    //     />
    //   )}
    //   </View>
    //   <Image style={styles.image} source={{ uri: result.image_url }} />
    //   <FlatList
    //     data={result.photos}
    //     renderItem={({ item }) => {
    //       return (
    //         <Image style={{ width: 100, height: 100 }} source={{ uri: item }} />
    //       );
    //     }}
    //   />
    // </View>
    <ScrollView style={styles.container}>
      <Image source={{ uri: result.image_url }} style={styles.image} />

      <Text style={styles.name}>{result.name}</Text>

      <View style={styles.statusContainer}>
        <MaterialIcons
          name={isOpen ? "check-circle" : "cancel"}
          size={24}
          color={isOpen ? "green" : "red"}
        />
        <Text style={[styles.status, { color: isOpen ? "green" : "red" }]}>
          {isOpen ? "Open Now" : "Closed"}
        </Text>
      </View>

      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>Rating: {result.rating} ★</Text>
        <Text style={styles.reviewCount}>({result.review_count} Reviews)</Text>
      </View>

      <Text style={styles.price}>Price: {result.price}</Text>

      <View style={styles.addressContainer}>
        {result.location.display_address.map((line, index) => (
          <Text key={index} style={styles.address}>{line}</Text>
        ))}
      </View>

      <TouchableOpacity onPress={() => Linking.openURL(`tel:${result.phone}`)}>
        <Text style={styles.phone}>{result.display_phone}</Text>
      </TouchableOpacity>

      <View style={styles.categoryContainer}>
        {result.categories.map((category, index) => (
          <Text key={index} style={styles.category}>{category.title}</Text>
        ))}
      </View>

      <TouchableOpacity onPress={() => Linking.openURL(result.url)}>
        <Text style={styles.link}>View on Yelp</Text>
      </TouchableOpacity>

      {result.attributes?.menu_url && (
        <TouchableOpacity onPress={() => Linking.openURL(result.attributes.menu_url)}>
          <Text style={styles.link}>View Menu</Text>
        </TouchableOpacity>
      )}

      {/* Google Maps Visualization */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: result.coordinates.latitude,
          longitude: result.coordinates.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: result.coordinates.latitude,
            longitude: result.coordinates.longitude,
          }}
          title={result.name}
          description={result.location.address1}
        />
      </MapView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
//   image: {
//     height: 180,
//     margin: 10,
//     borderRadius: 20,
//   },
//   title: {
//     alignSelf: "center",
//     fontSize: 25,
//     marginVertical: 10,
//   },
//   phone: {
//     alignSelf: "center",
//     fontSize: 20,
//   },
//   icon: {
//     alignSelf: "center",
//   },
container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  status: {
    fontSize: 16,
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewCount: {
    fontSize: 14,
    marginLeft: 5,
    color: '#888',
  },
  price: {
    fontSize: 16,
    marginVertical: 5,
  },
  addressContainer: {
    marginVertical: 10,
  },
  address: {
    fontSize: 16,
    color: '#555',
  },
  phone: {
    fontSize: 16,
    color: '#0066cc',
    marginVertical: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  category: {
    fontSize: 14,
    color: '#333',
    backgroundColor: '#e0e0e0',
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  link: {
    fontSize: 16,
    color: '#0066cc',
    marginVertical: 10,
  },
  map: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 40,
    borderRadius: 10,
  },
});
